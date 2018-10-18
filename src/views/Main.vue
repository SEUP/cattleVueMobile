<template>
    <v-content v-if="farmer" class="box-blue font">

        <v-container class="elevation-0 wh font" style="background:transparent">
            <v-layout row>
                <v-flex xs2>
                    

                    <v-menu offset-y class="font">
                        <img slot="activator" dark class="circle shadow wh" style="height:38px; weigt:38px;" src="https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/37784883_1856053931120755_8597063430257508352_n.jpg?_nc_cat=109&oh=77b851796e69b5c79d0af54c4e99b2dc&oe=5C4F8471"
                        alt="">  
                        <v-list>
                            <v-list-tile  key="0" @click="$router.push({name : 'farmer-profile'})" >
                                <v-list-tile-title class="font"><v-icon>mdi-account-circle</v-icon>ข้อมูลผู้ใช้</v-list-tile-title>
                            </v-list-tile>
                              <v-list-tile  key="1" @click="$router.push({name : 'farmer-farm'})">
                                <v-list-tile-title class="font"><v-icon>mdi-home-variant</v-icon>ข้อมูลฟาร์ม</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>

                </v-flex>
                <v-flex xs8>
                    <center class="pdt-8">
                        <h3> {{farmer.firstname}}&nbsp;{{farmer.lastname}}</h3>
                    </center>
                </v-flex>
                <v-flex xs2 style="text-align:right;">

                    <v-menu offset-y>
                       
                        <v-icon class="wh" slot="activator" dark>mdi-menu</v-icon>
                        <v-list>
                            <v-list-tile  key="0" @click="logout()">
                                <v-list-tile-title  class="font"><v-icon>mdi-logout</v-icon>ออกจากระบบ</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-flex>
            </v-layout>


        </v-container>



        <v-container fluid>

            <!----  <v-layout row align-center>
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
            </v-layout> ---->

            <v-layout @click="$router.push({name : 'male-view'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-purple wh circle shadow" style="font-size:40px;">mdi-cow</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">พ่อพันธุ์</h2>
                    <h4 class="nm">จัดการพ่อพันธุ์ของคุณ</h4>
                </v-flex>
            </v-layout>

            <v-layout @click="$router.push({name : 'female-view'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-pink wh circle shadow" style="font-size:40px;">mdi-cow</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">แม่พันธุ์</h2>
                    <h4 class="nm">จัดการแม่พันธุ์ของคุณ</h4>
                </v-flex>
            </v-layout>

            <v-layout @click="$router.push({name : 'khun-view'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-brown wh circle shadow" style="font-size:40px;">mdi-cow</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">โคขุน</h2>
                    <h4 class="nm">จัดการโคขุนของคุณ</h4>
                </v-flex>
            </v-layout>

            <v-layout @click="$router.push({name : 'young-view'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-greenLNB wh circle shadow" style="font-size:40px;">mdi-cow</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">โคแรกเกิด</h2>
                    <h4 class="nm">จัดการโคแรกเกิดของคุณ</h4>
                </v-flex>
            </v-layout>

            <v-layout @click="$router.push({name : 'sell'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-blue wh circle shadow" style="font-size:40px;">mdi-sale</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">การจำหน่าย</h2>
                    <h4 class="nm">ข้อมูลการจำหน่ายโคของคุณ</h4>
                </v-flex>
            </v-layout>

            <v-layout @click="$router.push({name : 'noti'})" row class="pd-20 ma-3 shadow circle box-white">
                <v-flex xs4>
                    <v-icon class="mrl-18 pd-10 box-yellow wh circle shadow" style="font-size:40px;">mdi-bell</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h2 class="nm">การแจ้งเจือน</h2>
                    <h4 class="nm">ดูข้อมูลการแจ้งเตือนทั้งหมด</h4>
                </v-flex>
            </v-layout>
 
        </v-container>

        <v-dialog v-model="dialogx" class="font circle" width="500">
            <v-card>
                <v-card-title align-center justify-center class="headline " primary-title>
                    <v-layout class=" " align-center justify-center>
                        <v-icon class=" c-yellow f70 animated tada infinite">mdi-bell-ring</v-icon>
                    </v-layout>
                </v-card-title>
                <center>
                    <h2>คุณมีการแจ้งเตือนใหม่</h2>
                </center>
                <v-card-text class="pd-10">
                    <div class="box-gray pd-10 circle">
                   <h3>{{notificate.title}}</h3>
                        <h4>{{dateTH(notificate.start)}} </h4> 

                    </div>

                </v-card-text>

                <v-divider></v-divider>

                <v-card align-center justify-center>
                    <v-layout row>
                        <v-flex xs12 class="box-green pd-10">
                            <center>
                                <h2 class="nm" @click="$router.push({name : 'noti'})">ดูทั้งหมด</h2>
                            </center>
                        </v-flex>

                        <v-flex xs12 class="box-red pd-10">
                            <center>
                                <h2 class="nm" @click="close()">ปิด</h2>
                            </center>
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
                dialogx: false,
                notificate:{},
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
             setNoti: get('manageDef/setNoti'),
             dateTH: get('core/dateTH'),
        },
        async mounted() {
            await this.initial();
             this.notiLoad();
        },
        methods: {
            notiLoad:async function(){
                let params = {
                        api: 'farmer/farmers/' + this.farmer.id + '/reports/cattleEvents',
                    }
                 let data = await store.dispatch("manageDef/getData", params);
                
                for(let i=0; i<data.length; i++){
                    if(data[i].title){
                        this.notificate = data[i];
                        break;
                    }
                }
            },
            getCattle: async function () {
                    await store.dispatch("cattle/getCattle", this.farmer.id)
                },
                initial: async function () {
                        this.getCattle();
                       
                        //alert(this.noti );
                        if (this.noti == 0) {
                            this.dialogx = true;
                            this.notiState();
                        }
                    },
                    close() {
                        this.dialogx = false;
                    },
                    logout : async function(){
                await this.$store.dispatch("login/logout")
                this.$store.dispatch('loading/showLoad')
                let vm = this
                setTimeout( () => {
                    vm.$store.dispatch('loading/dismissLoad')
                    vm.$router.replace({name : 'home'})
                },1000)
            }
        }


    }
</script>