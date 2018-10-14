<template>
    <v-content v-if="farmer" class="box-blue">
        
        <v-container fluid>
            <v-layout row align-center>
                <v-flex class="">
                    <farmer-avatar />
                </v-flex>
                <v-flex xs8>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2 dark class="text-truncate wh nm">{{farmer.firstname}} {{farmer.lastname}}</h2>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <v-btn round :to="{name : `farmer-profile`}" depressed color="success" block><v-icon>mdi-human-greeting</v-icon>ข้อมูลผู้ใช้</v-btn>
                        </v-flex>
                        <v-flex  xs6 class="pa-1">
                            <v-btn round :to="{name : `farmer-farm`}" depressed color="yellow" block><v-icon>mdi-home-assistant</v-icon>ข้อมูลฟาร์ม</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout  @click="$router.push({name : 'male-view'})"   row class="pd-20 ma-3 shadow circle box-white" >
               <v-flex xs4 ><v-icon class="mrl-18 pd-10 box-purple wh circle shadow"  style="font-size:40px;">mdi-cow</v-icon></v-flex>
                 <v-flex xs8>
                     <h2 class="nm">พ่อพันธุ์</h2>
                     <h4 class="nm">จัดการพ่อพันธุ์ของคุณ</h4>
                 </v-flex>
            </v-layout>

             <v-layout  @click="$router.push({name : 'female-view'})"   row class="pd-20 ma-3 shadow circle box-white" >
               <v-flex xs4 ><v-icon class="mrl-18 pd-10 box-pink wh circle shadow"  style="font-size:40px;">mdi-cow</v-icon></v-flex>
                 <v-flex xs8>
                     <h2 class="nm">แม่พันธุ์</h2>
                     <h4 class="nm">จัดการแม่พันธุ์ของคุณ</h4>
                 </v-flex>
            </v-layout>

             <v-layout  @click="$router.push({name : 'khun-view'})"   row class="pd-20 ma-3 shadow circle box-white" >
               <v-flex xs4 ><v-icon class="mrl-18 pd-10 box-brown wh circle shadow"  style="font-size:40px;">mdi-cow</v-icon></v-flex>
                 <v-flex xs8>
                     <h2 class="nm">โคขุน</h2>
                     <h4 class="nm">จัดการโคขุนของคุณ</h4>
                 </v-flex>
            </v-layout>

             <v-layout  @click="$router.push({name : 'young-view'})"   row class="pd-20 ma-3 shadow circle box-white" >
               <v-flex xs4 ><v-icon class="mrl-18 pd-10 box-greenLNB wh circle shadow"  style="font-size:40px;">mdi-cow</v-icon></v-flex>
                 <v-flex xs8>
                     <h2 class="nm">โคแรกเกิด</h2>
                     <h4 class="nm">จัดการโคแรกเกิดของคุณ</h4>
                 </v-flex>
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
                dialogx: false
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
            noti: get("core/noti"),
             notiState: get("core/notiState"),
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
                    //alert(this.noti );
                    if(this.noti == 0){
                        this.dialogx = true;
                        this.notiState();
                    }
                },
                close() {
                    this.dialogx = false;
                }
        }


    }
</script>