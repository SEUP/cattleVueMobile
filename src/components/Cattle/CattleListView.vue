<template>
    <v-content>
        <v-layout row v-for="cattle in cattles">
            <v-flex xs12 class="mrt-20">
                <v-card>
                    <v-layout>
                        <v-flex xs5 class="pd-20">
                            <v-img class="circle50" :src="baseUrl+cattle.image_url" height="90px" width="90px" contain></v-img>
                        </v-flex>
                        <v-flex xs7>
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">{{cattle.name}}</div>
                                    <v-divider light></v-divider>
                                    <div class="mrt-6"><b>เบอร์หู : </b> {{notNull(cattle.ear_number)}}</div>
                                    <div><b>อายุ : </b> {{getAge(cattle.birth_date)}} </div>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row>
                        <v-flex xs12 class="box-green pd-10" @click="close()">
                            <center>
                                <h3 class="nm"  @click="close()"><v-icon class="light">mdi-eye</v-icon> ดูข้อมูล</h3>
                            </center>
                        </v-flex>
                            <v-flex xs12 class="box-greenFX pd-10">
                            <center>
                                <h3 class="nm" @click="close()"><v-icon class="light">mdi mdi-settings</v-icon>จัดการ</h3>
                            </center>
                        </v-flex>
                            <v-flex xs12 class="box-red pd-10">
                            <center>
                                <h3 class="nm" @click="deleteCattle()"><v-icon class="light">mdi-delete</v-icon>ลบ</h3>
                            </center>
                        </v-flex>
                    </v-layout>
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
    export default {
        name: "CattleListView",
        data() {
            return {
                baseUrl: 'http://mct.ict.up.ac.th:10008/'
            }
        },
        computed: {
            getAge: get("cattle/getAge"),
        },
        props: {
            cattles: {}
        },
        methods: {
            notNull(data) {
                if (data == null) {
                    return 'ยังไม่มีข้อมูล';
                } else {
                    return data;
                }
            },
            close(){
                alert('hey');
            },
            deleteCattle: async function (){
                 confirm("Press a button!");

            }
        }
    }
</script>

<style scoped>

</style>