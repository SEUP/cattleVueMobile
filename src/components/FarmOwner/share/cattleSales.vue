<template>
  <div v-if="form != null && items != null">
    <v-layout row wrap v-for="item in items" :key="item.id">
      <v-flex xs12 class="pa-0">
        <v-checkbox :label="item.choice" hide-details
                    class="pa-0 ma-0"
                    :value="item"
                    v-model="CheckboxSelected"
                    @change="updateChoice"
                    color="success"
        >
        </v-checkbox>
      </v-flex>
      <v-flex xs12 mb-2 pa-0 ml-3>
        <v-layout row>
          <v-flex md6>
            <v-select :items="price" hide-details class="ma-0 pt-3"
                      :value="item.pivot.remark"
                      label="ราคาขายต่อตัว" placeholder="กรุณาเลือก"
                      item-text="choice" @change="updateSelect1($event,item.choice)">

            </v-select>
          </v-flex>
          <v-flex md6>
            <v-select :items="age" hide-details class="ma-0 pt-3"
                      :value="item.pivot.age_range_sale"
                      label="ระยะเวลาที่เลี้ยง" placeholder="กรุณาเลือก"
                      item-text="choice" @change="updateSelect2($event,item.choice)">

            </v-select>
          </v-flex>
        </v-layout>

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
  export  default  {
    data : () => ({
      form : null,
      items : null,
      CheckboxSelected : [],
    }),
    async created () {
      this.items = await this.$store.dispatch("admin/choices/getChoicesByType",'cattle_sales')
      this.price =  [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType",'price_breeding_sale'))
      this.age =    [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType",'age_breeding_sale'))
      this.form = await this.$store.state.admin.farmOwners.farmOwner
      await this.sync()
    },
    methods :{
      syncSelect : function (selItem) {
        // console.log(selItem,item,this.price)
        this.price.forEach((p)=>{
          if(p.choice == selItem.pivot.remark){
            selItem.pivot.remark = p.choice
          }
        })
        this.age.forEach((a)=>{
          if(a.choice == selItem.pivot.age_range_sale){
            selItem.pivot.age_range_sale = a.choice
          }
        })
      },
      sync : function () {
        let items = this.items
        let sel = this.form.cattle_sales
        let items_length =this.items ? this.items.length : 0;
        let sel_length =this.form.cattle_sales? this.form.cattle_sales.length:0;
        for (let i = 0; i < items_length; i++) {
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              this.syncSelect(sel[j],items[i])
              items[i] = sel[j]
              this.CheckboxSelected.push(sel[j])
            }
          }
        }
      },
      updateChoice : function () {
        this.form.cattle_sales = this.CheckboxSelected
        this.$store.dispatch("admin/farmOwners/updateState",this.form)


      },
      updateSelect1 (value,main) {
        this.CheckboxSelected.forEach((i)=>{
          if(main == i.choice){
              i.pivot.remark = value
          }
        })
        this.updateChoice()
      },
      updateSelect2 (value,main) {
        this.CheckboxSelected.forEach((i)=>{
          if(main == i.choice){
              i.pivot.age_range_sale = value
          }
        })
        this.updateChoice()
      }
    }
  }
</script>
