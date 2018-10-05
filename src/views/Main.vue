<template>
    <v-content v-if="farmer">
        <v-container fluid>
            <v-layout row align-center>
                <v-flex class="">
                    <farmer-avatar />
                </v-flex>
                <v-flex xs8>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2 class="text-truncate">{{farmer.firstname}} {{farmer.lastname}}</h2>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <v-btn :to="{name : `farmer-profile`}" depressed color="success" block>ข้อมูลผู้ใช้</v-btn>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <v-btn :to="{name : `farmer-farm`}" depressed color="success" block>ข้อมูลฟาร์ม</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout column class="ma-3">
              <v-btn :to="{name : `male-view`}">พ่อพันธุ์</v-btn>
            </v-layout>
            
            <v-layout column class="ma-3">
              <v-btn :to="{name : `female-view`}">แม่พันธุ์</v-btn>
            </v-layout>

            <v-layout column class="ma-3">
              <v-btn :to="{name : `khun-view`}">โคขุน</v-btn>
            </v-layout>

            <v-layout column class="ma-3">
              <v-btn :to="{name : `young-view`}">โคแรกเกิด</v-btn>
            </v-layout>
        </v-container>

        <v-dialog v-model="dialogx" width="500">
            <v-card>
                <v-card-title align-center justify-center class="headline " primary-title>
                    <v-layout align-center justify-center>
                        <v-icon class=" c-yellow f70">mdi-bell-ring</v-icon>
                    </v-layout>
                </v-card-title>
                <center>
                    <h2>คุณมีการแจ้งเตือนใหม่</h2>
                </center>
                <v-card-text class="pd-10">
                    <div class="box-gray pd-10 circle">
                        <h3>การผสม</h3>
                        <h4>วันที่ 12/02/2561</h4>
                    </div>

                </v-card-text>

                <v-divider></v-divider>

                <v-card align-center justify-center >
                    <v-layout row >
                        <v-flex xs12 class="box-green pd-10">
                            <center><h2 class="nm" @click="close()">ดูทั้งหมด</h2></center>
                        </v-flex>

                        <v-flex xs12 class="box-red pd-10">
                             <center><h2 class="nm" @click="close()">ปิด</h2></center>
                        </v-flex>


                    </v-layout>

                </v-card>
            </v-card>
        </v-dialog>

    </v-content>
</template>
<style>
    .circle {
        border-radius: 50px;
    }
</style>
<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";

    export default {
        name: 'App',
        components: {
            FarmerAvatar,
        },
        data() {
            return {
                dialogx: true
            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")

            next()
        },
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("farmer/avatar"),
        },
        async mounted() {
            await this.initial();

        },
        methods: {
            getCattle: async function(){
               await store.dispatch("cattle/getCattle",this.farmer.id)
            },
            initial: async function () {
                    this.getCattle();
                    this.dialogx = true;
                },
                close() {
                    this.dialogx = false;
                }
        }


    }
</script>