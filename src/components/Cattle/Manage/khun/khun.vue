<template>
    <v-content>
        <!-----  <pre>{{loadBreeder}}</pre> ---->

        <v-divider class="mrt-20" light></v-divider>
        <center>
            <h1>การขุน
                <Forms :update="update" :cattle="cattle" :forms="khun.data[0]" />
            </h1>
        </center>
        <v-divider light></v-divider> 
        
        <v-layout row v-for="khun,index in khun.data" :key="index">
            <v-flex class="my-2" xs12>
              <v-card class="card--flex-toolbar elevation-0" style="border: 1px #e5e5e3 solid" v-if="index ==0"> 
                 
                <!--ข้อมูลเมื่อเริ่มขุน-->
                <template>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        วัน/เดือน/ปี ที่เริ่มขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.start_date ? getDate(khun.start_date) : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        รอบอก เมื่อเริ่มขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.start_chest ? khun.start_chest : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความสูง เมื่อเริ่มขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.start_height ? khun.start_height : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความยาวลำตัว เมื่อเริ่มขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.start_length ? khun.start_length : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        น้ำหนัก เมื่อเริ่มขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.start_weight ? khun.start_weight : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </template>

                <!--ข้อมูลเมื่อสิ้นสุดการขุน-->
                <template>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        วัน/เดือน/ปี ที่สิ้นสุดการขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.end_date ? getDate(khun.end_date) : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        รอบอก เมื่อสิ้นสุดการขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.end_chest ? khun.end_chest : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความสูง เมื่อสิ้นสุดการขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.end_height ? khun.end_height : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความยาวลำตัว เมื่อสิ้นสุดการขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.end_length ? khun.end_length : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        น้ำหนัก เมื่อสิ้นสุดการขุน
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{khun.end_weight ? khun.end_weight : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </template>
              </v-card>
            </v-flex>

        </v-layout>


    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/khun/forms";
    export default {
        name: "ChangeType",
        data() {
            return {
                Khun: {},
                update:false,
                dataKhun:{},

            }
        },
        components: {
            Forms
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setKhun: get('manageDef/setKhun'),
            khun: get('manageDef/khun'),
        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {
            
            getDate(c){
                return this.dateTH(c);
            },

            notNull(data) {
                if (data == null) {
                    return 'ไม่มีข้อมูล';
                } else {
                    return data;
                }
            },
            initial: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/khun',
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setKhun(data);
                this.dataKhun = this.khun.data[0]
                if(this.khun.data.length > 0){
                    this.update =true;
                }

            }

        }
    }
</script>

<style scoped>

</style>