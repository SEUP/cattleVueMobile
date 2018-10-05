<template>
    <v-content>
        <v-layout row v-for="cattle in cattles">
            <v-flex xs12 class="mrt-20">
                <v-card>
                    <v-layout>
                        <v-flex xs5 class="pd-20">

                            <v-img v-if="cattle.image_url" class="circle50" :src="image(cattle.image_url)" height="90px" width="90px" contain></v-img>
                            <img v-else class="circle50" src="@/assets/cattle.png" height="90px" width="90px" contain />
                         
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
                                <h3 class="nm" @click="close()">
                                    <v-icon class="light">mdi-eye</v-icon> ดูข้อมูล
                                </h3>
                            </center>
                        </v-flex>
                        <v-flex xs12 class="box-greenFX pd-10">
                            <center>
                                <h3 class="nm" @click="close()">
                                    <v-icon class="light">mdi mdi-settings</v-icon>จัดการ
                                </h3>
                            </center>
                        </v-flex>
                        <v-flex xs12 class="box-red pd-10">
                            <center>
                                <h3 class="nm" @click="removeCattle(cattle)">
                                    <v-icon class="light">mdi-delete</v-icon>ลบ
                                </h3>
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
                baseUrl: 'http://mct.ict.up.ac.th:10008/',
                cattlesData: {},
            }
        },
        computed: {
            getAge: get("cattle/getAge"),
            cattles: get("cattle/cattles"),
        },
        props: {
            params: {}
        },
        async mounted() {
             this.initial();
        },
        methods: {
            initial: async function () {
                    this.getCattle();
                },
                image(image){

                    if(image){return this.baseUrl+image}
                    else{ return '@/assets/logo.png';} 
                },
                getCattle: async function () {

                        await store.dispatch("cattle/getCattle", this.params)
                     
                    },  
                    notNull(data) {
                        if (data == null) { 
                            return 'ยังไม่มีข้อมูล';
                        } else {
                            return data;
                        }
                    },

                    close() {
                        alert('hey');
                    },
                    removeCattle: async function (params) {
                        let check = confirm("คุณแน่ใจใช่ไหมที่จะลบข้อมูล");
                        if (check) {
                            await store.dispatch("cattle/removeCattle", params)
                        }
                        this.initial();
                    },
        }
    }
</script>

<style scoped>

</style>