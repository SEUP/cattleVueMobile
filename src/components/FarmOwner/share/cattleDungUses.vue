<template>
  <div v-if="items && subItems && form">
    <v-layout row wrap v-for="item in items" :key="item.id">
      <v-flex xs12>
        <v-checkbox :label="item.choice" hide-details
                    class="pa-0 ma-0"
                    :value="item"
                    v-model="selectedCheckbox"
                    @change="updateChoice"
                    color="success"
        >
        </v-checkbox>
      </v-flex>
      <v-flex xs12 v-if="item.has_text" class="pa-0 ma-0 ml-5">
        <v-text-field
          hide-details class="pa-0 ma-0"
          suffix = "บาท/ปี"
          :value="item.pivot.price"
          v-model="item.pivot.price"
          @change="updateChoice"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="item.children.length > 0" class="pa-0 ma-0 ml-5">
        <v-select hide-details
                  :items="subItems"
                  v-model="selectedSelect"
                  item-text="choice"
                  return-object
                  @change="updateSelect"
        ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  let defaultChoice = {
    id : 0,
    has_text :0,
    choice : "กรุณาเลือก",
    pivot:{remark: null,amount:null}
  };
  export default {
    data: () => ({
      form : null ,
      items: null,
      subItems : null,
      selectedCheckbox: [],
      selectedSelect: defaultChoice,

    }),
    async created () {
      this.form = await  this.$store.state.admin.farmOwners.farmOwner;
      this.items = await this.$store.dispatch("admin/choices/getChoicesByType", 'cattle_dung_uses');
      this.subItems = [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType", 'biogas_status'));
      await this.sync()
      await this.syncSelect()
    },
    methods: {
      sync: function () {
        let items = this.items
        let sel = this.form.cattle_dung_uses
        let items_length = items.length;
        let sel_length = sel ? sel.length : [] ;
        for (let i = 0; i < items_length; i++) {
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              items[i] = sel[j]
              this.selectedCheckbox.push(sel[j])
            }
          }
        }
      },
      syncSelect: function () {
        let value = this.form.biogas_status ;
        if(value){
          this.subItems.forEach((i) => {
            if (i.id == value.id) {
              this.selectedSelect = i;
            }
          })
        }

      },
      updateSelect : function () {
        this.form.biogas_status = this.selectedSelect;
        this.selectedCheckbox.forEach((i)=>{
          if(i.choice =='ทำเเก๊สชีวภาพในครัวเรือน'){
            i.children = this.selectedSelect
          }
        });
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
        this.updateChoice()
      },
      updateChoice : function () {
        this.form.cattle_dung_uses = this.selectedCheckbox
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
      }
    },


  }

</script>
