<template>
  <v-layout v-if="items && subItems">
    <v-flex xs12 >
      <v-layout row wrap>
        <v-flex xs12 class="pa-0 ma-0">
          <v-select hide-details
                    :items="items"
                    v-model="selectedValue"
                    item-text="choice"
                    return-object
                    @change="updateSelect"
          ></v-select>
        </v-flex>
        <v-flex xs12 v-if="selectedValue && selectedValue.choice == 'มีพื้นที่'">
          <v-layout row >
            <v-flex  xs6 class="align-center ">
              <v-card-text class="pa-0 pt-2"><b>รวมพื้นที่ที่ใช้เลี้ยงโคเนื้อ</b></v-card-text>
            </v-flex>
            <v-flex  class="ma-0 pa-0 mx-2">

              <v-text-field readonly suffix="ไร่"
                            :value="totaluseLand[0]"
              ></v-text-field>
            </v-flex>
            <v-flex  class="ma-0 pa-0 mx-2">
              <v-text-field readonly suffix="งาน"
                            :value="totaluseLand[1]"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div v-for="subItem in subItems" :key="subItem.id" class="py-1">
            <v-checkbox
              :label="subItem.choice"
              :item = "subItem"
              v-model="selectedCheckbox"
              @change="updateCheckbox"
              :value="subItem"
              hide-details
              class="pa-0 ma-0"
              color="success"
            >
            </v-checkbox>
            <v-layout row wrap class="ml-3">
              <v-flex xs6>
                <v-text-field suffix="ไร่"
                              @change="updateCheckbox"
                              v-model="subItem.pivot.area"
                              class="pa-0 ma-0" hide-details
                              placeholder="จำนวน (ไร่)">
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field suffix="งาน"
                              @change="updateCheckbox"
                              v-model="subItem.pivot.subarea"
                              class="pa-0 ma-0" hide-details
                              placeholder="จำนวน (งาน)">
                </v-text-field>
              </v-flex>
              <v-flex xs12 v-if="subItem.choice == 'พื้นที่ปลูกหญ้า'">
                <v-text-field
                              @change="updateCheckbox"
                              label ="ชนิดหญ้า"
                              v-model="subItem.pivot.remark"
                              class="pa-0 ma-0" hide-details
                              placeholder="ชนิดหญ้า">
                </v-text-field>
              </v-flex>

            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  let defaultChoice = {
    id : 0,
    has_text :0,
    choice : "กรุณาเลือก",
    children : []
  };
  export default {
    name: "useLand",
    data : ()=>({
      items : null,
      subItems: null,
      form : null,
      selectedValue : defaultChoice,
      selectedCheckbox : [],

    }),
    async created () {
      this.form = await this.$store.state.admin.farmOwners.farmOwner
      this.items = await [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType", 'use_land'));
      this.subItems = await this.$store.dispatch("admin/choices/getChoicesByType", 'sub_use_lands');
      // console.log(this.subItems,this.items,1)
      await this.syncSelect()
      await this.syncCheckbox()
    },
    computed :{
      totaluseLand :function () {
        let rai = 0;
        let ngan = 0;
        let items = this.selectedCheckbox;
        items.forEach((item) =>{
          rai += parseInt(item.pivot.area) ? parseInt(item.pivot.area) : 0
          ngan += parseInt(item.pivot.subarea) ? parseInt(item.pivot.subarea) : 0
        });
        this.form.total_use_lands = rai
        this.form.total_use_lands_sub = ngan
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
        return [rai,ngan]
      }
    },
    methods : {
      syncSelect:function () {
        let value = this.form.use_land;
        this.items.forEach((item)=>{
          let valID = value ? value.id : 0
          if(item.id == valID){
            this.selectedValue = value
          }
        })
      },
      syncCheckbox : function () {
        let items = this.subItems ? this.subItems : [];
        let sel = this.form.sub_use_lands ? this.form.sub_use_lands : [];
        let items_length = items.length;
        let sel_length = sel.length;
        for (let i = 0; i < items_length; i++) {
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              items[i] = sel[j]
              this.selectedCheckbox.push(sel[j])
            }
          }
        }
      },
      updateCheckbox :function () {
        this.form.sub_use_lands = this.selectedCheckbox
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
      },
      updateSelect :function () {
        this.form.use_land = this.selectedValue
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
      }
    }
  }
</script>

<style scoped>

</style>
