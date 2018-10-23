<template>
    <v-content>
        <ActionBar />

        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab key="0" ripple>
                ทำลาย
            </v-tab>
            <v-tab-item key="0" style="height:100%;">
                <div v-for="cattle in sale.data" >
                    
              
                <v-layout class="pd-20" v-if="cattle.sale.sale_price == null">
              
                    <v-card flat class="box-blue shadow pd-12 full-width wh"  >
                        <v-layout row>
                            <v-flex xs4 class="pdt-20">     <CattleAvatar :url="cattle.image_url" /></v-flex>
                        <v-flex xs8>
                              <v-card-title primary-title>
                                <div>
                                   <h3> {{cattle.name}}</h3>
                                    <v-divider light></v-divider>
                                    <div class="mrt-6"><b>เบอร์หู : </b> {{notNull(cattle.ear_number)}}</div>
                                    <div><b>อายุ : </b> {{getAge(cattle.birth_date)}} </div>
                                </div>
                                <v-btn @click="reCattle(cattle)">ยกเลิกการทำลาย</v-btn>
                            </v-card-title>
                        </v-flex>
                        </v-layout>
                   
                    </v-card>
                    
                </v-layout>
   </div>
            </v-tab-item>

            <v-tab key="1" ripple>
                จำหน่าย
            </v-tab>
          <v-tab-item key="1" style="height:100%;">
              <div v-for="cattle in sale.data" v-if="cattle.sale.sale_price != null">
                     <v-layout  class="pd-20"> 
                    <v-card flat class="box-blue shadow pd-12 full-width wh"  >
                        <v-layout row>
                            <v-flex xs4 class="pdt-20">     <CattleAvatar :url="cattle.image_url" /></v-flex>
                        <v-flex xs8>
                              <v-card-title primary-title>
                                <div>
                                   <h3> {{cattle.name}}</h3>
                                    <v-divider light></v-divider>
                                    <div class="mrt-6"><b>เบอร์หู : </b> {{notNull(cattle.ear_number)}}</div>
                                    <div><b>อายุ : </b> {{getAge(cattle.birth_date)}} </div>
                                </div>
                                <v-btn @click="reCattle(cattle)">ยกเลิกการจำหน่าย</v-btn>
                            </v-card-title>
                        </v-flex>
                        </v-layout>
            
             
                   
                    </v-card>
                    
                </v-layout>
   </div>
            </v-tab-item>
        </v-tabs>






    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/vaccine/forms";
    import ActionBar from "@/components/Menu/ActionBar";
    import CattleListView from "@/components/Cattle/CattleListView";
    import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "ChangeType",
        data() {
            return {
                vaccine: {},



            }
        },
        components: {
            Forms,
            ActionBar,
            CattleListView,
            CattleAvatar
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            farmer: get("farmer/farmer"),
            setSale: get('manageDef/setSale'),
            sale: get('manageDef/sale'),
        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {


            notNull(data) {
                if (data == null) {
                    return 'ไม่มีข้อมูล';
                } else {
                    return data;
                }
            },
            reCattle: async function (cattle) {
                let reCattle =  store.dispatch('manageDef/backSell',cattle);
               

                this.initial();
                this.$router.go(-1);
            },
            initial: async function () {
                await store.dispatch("mobile/defaultActionBar", 'ข้อมูลการจำน่าย')
                let params = {
                    api: 'farmer/farmer/' + this.farmer.id + '/cattles?keyword=&cattle_status=010200',
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setSale(data);

            }

        }
    }
</script>

<style scoped>

</style>