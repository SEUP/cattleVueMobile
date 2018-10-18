<template>
    <v-content>
        <!-----  <pre>{{loadBreeder}}</pre> ---->

        <v-divider class="mrt-20" light></v-divider>
        <center>
            <h1>การหย่านม
                <Forms :update="update" :cattle="cattle" :forms="milk.data[0]" />
            </h1>
        </center>
        <v-divider light></v-divider> 
        
        <v-layout row v-for="Milk in milk.data">
            <v-flex class="my-2" xs12>
              <v-card class="card--flex-toolbar elevation-0" style="border: 1px #e5e5e3 solid">
        
                <!--ข้อมูลเมื่อเริ่มหย่านม-->
                <template>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        วัน/เดือน/ปี ที่เริ่มหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.start_date ? getDate(Milk.start_date) : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        รอบอก เมื่อเริ่มหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.start_chest ? Milk.start_chest : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความสูง เมื่อเริ่มหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.start_height ? Milk.start_height : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความยาวลำตัว เมื่อเริ่มหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.start_length ? Milk.start_length : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        น้ำหนัก เมื่อเริ่มหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.start_weight ? Milk.start_weight : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </template>

                <!--ข้อมูลเมื่อสิ้นสุดการหย่านม-->
                <template>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        วัน/เดือน/ปี ที่สิ้นสุดการหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.end_date ? getDate(Milk.end_date) : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        รอบอก เมื่อสิ้นสุดการหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.end_chest ? Milk.end_chest : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความสูง เมื่อสิ้นสุดการหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.end_height ? Milk.end_height : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        ความยาวลำตัว เมื่อสิ้นสุดการหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.end_length ? Milk.end_length : "ไม่มีข้อมูล" }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs6 class="verticalBar">
                      <v-card-text class="font-weight-bold">
                        น้ำหนัก เมื่อสิ้นสุดการหย่านม
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        {{Milk.end_weight ? Milk.end_weight : "ไม่มีข้อมูล" }}
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
    import Forms from "@/components/Cattle/Manage/milk/forms";
    export default {
        name: "ChangeType",
        data() {
            return {
                milkc: {},
                update:false,
                

            }
        },
        components: {
            Forms
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setMilk: get('manageDef/setMilk'),
            milk: get('manageDef/milk'),
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
                    api: 'farmer/cattles/' + this.cattle.id + '/birth',
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setMilk(data);
                if(this.milk.data.length > 0){
                    this.update =true;
                }

            }

        }
    }
</script>

<style scoped>

</style>