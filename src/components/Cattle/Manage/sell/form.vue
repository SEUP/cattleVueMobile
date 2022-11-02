<template>
    <v-content>
   <v-card>
            
                <v-container grid-list-xs>
                    <v-text-field label="ชื่อ" v-model="cattle.name" readonly></v-text-field>
                  <v-text-field label="เบอร์หู" v-model="cattle.ear_number" readonly></v-text-field>
                  <date-picker label="วัน/เดือน/ปี" :valDate="form.sale_date"
                               v-model="form.sale_date"
                               @change="form.sale_date = $event"/>

                  <v-text-field label="สรุปจำนวนวันที่เลี้ยง" :value="totalDate()" readonly></v-text-field>

                  <choice to="หมายเหตุการจำหน่าย" :remark="form.options.sale_note"
                          v-model="form.sale_note"
                          @change="form.options.sale_note = $event"/>

                  <div v-if="form.sale_note == '220100'">
                  <v-textarea
                    label="ข้อมูลผู้ซื้อ" 
                    v-model="form.options.customer"
                  ></v-textarea>
                    <choice to="ช่องทางการจำหน่าย" :remark="form.options.sale_chanel"
                            v-model="form.sale_chanel"
                            @change="form.options.sale_chanel = $event"/>

                    <choice to="ลักษณะการจำหน่าย" :remark="form.options.sale_characteristics"
                            v-model="form.sale_characteristics"
                            @change="form.options.sale_characteristics = $event"/>

                    <div v-if="form.sale_characteristics == '190200'">
                      <v-text-field label="น้ำหนัก" v-model="form.options.weight_sale" suffix="กิโลกรัม"></v-text-field>
                  
                    </div>
                    <div v-if="form.sale_characteristics == '190300'">
                      <v-text-field label="น้ำหนักซาก" v-model="form.options.weight_sale"
                                    suffix="กิโลกรัม"></v-text-field>
                      <v-text-field label="เกรดซาก" v-model="form.options.scrap_grades"></v-text-field>
                    </div>

                    <v-text-field v-if="form.sale_characteristics != null "
                                  label="ราคา"
                                  v-model="form.sale_price"
                                  suffix="บาท">
                    </v-text-field>
                  </div>

                   </v-container>
                   <center>
                     <v-btn v-if="!update" class="box-green full-width" @click="createData()" large>บันทึก</v-btn>
               </center>
            </v-card>
     

    </v-content>



</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import DatePicker from "@/components/Share/DatePicker";
    import Choice from "@/components/Share/Choice";

    export default {
        name: "Forms",
        components: {

            DatePicker,
            Choice
        },
        data() {
            return {
                To:'sale',
                DefaultForm: {},
                dialog: false,
                form: {},
                date: null,
            }
        },
        computed: {
            notNull: get('core/notNull'),
            setSell: get('manageDef/setSell'),
            loadSell: get('manageDef/sell'),
        },
        props: {
            cattle: {},
            update: '',
            forms:{},

        },
        async mounted() {
            await this.initial();
        },
        methods: {
     
            createData:async function(){
                try {
                    if(this.form.sale_date == null){
                        this.form.sale_date = moment().format("YYYY-MM-DD")
                    } 
                    if(this.form.sale_note == '' || this.form.sale_note == null){
                        this.form.sale_note = '220200'
                    }

                    // if(this.form.sale_price == '' || this.form.sale_price == null){
                    //   this.form.sale_price = 0
                    // }
                    
                    } catch (error) { 
                    }
                  let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To,
                    form:this.form
                }
                this.form = await store.dispatch("manageDef/createData", params);
           
                 this.$router.push('/main');
            },
       
          
            getData:async function(){
                 let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To,
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setSell(data);

            },

            totalDate : function(){

        console.log("birth_date",this.cattle.birth_date)
        console.log("buy_date",this.cattle.buy_date)
        console.log("sale_date",this.form.sale_date)
        let dateDiff  = 0
        if(this.cattle.birth || this.cattle.buy_date == null){
          let birthDate = moment(this.cattle.birth_date)
          let saleDate = moment(this.form.sale_date)

          dateDiff = birthDate.diff(saleDate,'day')


        }else {
          let buyDate = moment(this.cattle.buy_date)
          let saleDate = moment(this.form.sale_date)

          dateDiff = buyDate.diff(saleDate,'day')

        }
        return dateDiff ? Math.abs(dateDiff) : 0
      },
            
            getDefaultForm: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To+'/create',
                }
                try {
                    this.form = await store.dispatch("manageDef/getForm", params);  
                } catch (error) {
                    
                }
                
            },
            initial: async function () {
                if(!this.update){ 
                this.getDefaultForm();
                }else{ 
                    this.form = this.forms;
                }
            }

        }
    }
</script>

<style scoped>

</style>