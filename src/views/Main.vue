<template>
<v-content v-if="farmer" class="box-blue font">

    <v-container class="elevation-0 wh font" style="background:transparent">
        <v-layout row>
            <v-flex xs2>

                <v-menu offset-y class="font">
                    <img v-if="farmer.image_url" slot="activator" dark class="circle shadow wh" style="height:38px; weigt:38px; border-radius:50px;" :src="'http://mct.ict.up.ac.th:10008/'+farmer.image_url" alt="">
                    <v-btn v-else slot="activator" outline dark icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile key="0" @click="$router.push({name : 'farmer-profile'})">
                            <v-list-tile-title class="font">
                                <v-icon>mdi-account-circle</v-icon>
                                ข้อมูลผู้ใช้
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile key="1" @click="$router.push({name : 'farmer-farm'})">
                            <v-list-tile-title class="font">
                                <v-icon>mdi-home-variant</v-icon>
                                ข้อมูลฟาร์ม
                            </v-list-tile-title>
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
                        <v-list-tile key="0" @click="dialogKnowledge=true">
                            <v-list-tile-title class="font">
                                <v-icon>mdi-book</v-icon>
                                คลังความรู้
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile key="1" @click="logout()">
                            <v-list-tile-title class="font">
                                <v-icon>mdi-logout</v-icon>
                                ออกจากระบบ
                            </v-list-tile-title>
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

        <v-layout @click="$router.push({name : 'question'})" row class="pd-20 ma-3 shadow circle box-white">
            <v-flex xs4>
                <v-icon class="mrl-18 pd-10 red wh circle shadow" style="font-size:40px;">mdi-file-document-box-multiple</v-icon>
            </v-flex>
            <v-flex xs8>
                <h2 class="nm">แบบสอบถาม 8 ส่วน</h2>
                <h4 class="nm">ดู แก้ไข แบบสอบถาม</h4>
            </v-flex>
        </v-layout>

        <v-layout @click="$router.push({name : 'noti'})" row class="pd-20 ma-3 shadow circle box-white">
            <v-flex xs4>
                <v-icon class="mrl-18 pd-10 box-yellow wh circle shadow" style="font-size:40px;">mdi-bell</v-icon>
            </v-flex>
            <v-flex xs8>
                <h2 class="nm">การแจ้งเตือน</h2>
                <h4 class="nm">ดูข้อมูลการแจ้งเตือนทั้งหมด</h4>
            </v-flex>
        </v-layout>

        <v-layout @click="$router.push({name : 'about'})" row class="pd-20 ma-3 shadow circle box-white">
            <v-flex xs4>
                <v-icon class="mrl-18 pd-10 box-greenFX wh circle shadow" style="font-size:40px;">mdi-information
                </v-icon>
            </v-flex>
            <v-flex xs8>
                <h2 class="nm">เกี่ยวกับ</h2>
                <h4 class="nm">ดูข้อมูลเกี่ยวกับแอปพลิเคชัน</h4>
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
            <div style="text-align: center">
                <h2>คุณมีการแจ้งเตือนใหม่</h2>
            </div>
            <v-card-text class="pd-10">
                <div class="box-gray pd-10 circle">

                    <div v-for="txt,index in notiTxt" :key="index">
                        {{txt}}<br>
                    </div>

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

    <v-dialog v-model="dialogKnowledge" fullscreen>
        <v-card>
            <v-card-title align-center justify-center class="headline " primary-title>
                คลังความรู้ <v-spacer></v-spacer>
                <v-btn @click="dialogKnowledge=false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pd-10">
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%82%E0%B8%84.pdf')" block color="primary"> การจัดการด้านสุขภาพโค </v-btn>
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/%E0%B8%A2%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B9%83%E0%B8%99%E0%B9%82%E0%B8%84%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD.pdf')" block color="primary">ยาที่สำคัญในโคเนื้อ</v-btn>
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B9%83%E0%B8%99%E0%B9%82%E0%B8%84%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD.pdf')" block color="primary">โรคที่สำคัญในโคเนื้อ</v-btn>  
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B9%83%E0%B8%99%E0%B9%82%E0%B8%84%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD.pdf')" block color="primary">โรคพยาธิที่สำคัญในโคเนื้อ</v-btn><br>
                <v-divider></v-divider><br> 
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/android.pdf')" block color="primary">คู่มือการใช้งานระบบ Android</v-btn>
                <v-btn @click="openPdf('http://mct.ict.up.ac.th:10007/farmer/static/ios.pdf')" block color="primary">คู่มือการใช้งานระบบ IOS</v-btn>
            </v-card-text>

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
            dialogKnowledge: false,
            dialogx: false,
            notificate: {},
            notiTxt: [],
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
        await this.notiLoad();
        await this.initial();
        await this.getNoti();
    },
    methods: {
        async openPdf(url) {
            let iabRef = cordova.InAppBrowser.open(url, "_system", "beforeload=yes");
            iabRef.addEventListener('beforeload', function (params, callback) {
                // If the URL being loaded is a PDF
                if (params.url.match(".pdf")) {
                    // Open PDFs in system browser (instead of InAppBrowser)
                    cordova.InAppBrowser.open(params.url, "_system");
                } else {
                    // Invoke callback to load this URL in InAppBrowser
                    callback(params.url);
                }
            });

        },
        async getNoti() {

            let data = await store.dispatch("core/getNotification", this.farmer.id);
            let vaccine = (data.vaccine).length
            if (vaccine > 0) {
                this.notiTxt.push('วัคซีนป้องกันโรค : ' + vaccine + ' แจ้งเตือน');
            }
            let worming = (data.worming).length
            if (worming > 0) {
                this.notiTxt.push('พยาธิในโคเนื้อ : ' + worming + '  แจ้งเตือน');
            }
            let breed_out = (data.breed_out).length
            if (breed_out > 0) {
                this.notiTxt.push('การกลับสัด : ' + breed_out + ' แจ้งเตือน');
            }
            let beel = (data.beel).length
            if (beel > 0) {
                this.notiTxt.push('การตรวจท้อง : ' + beel + ' แจ้งเตือน');
            }
            let baby = (data.baby).length
            if (baby > 0) {
                this.notiTxt.push('การคลอด : ' + baby + ' แจ้งเตือน');
            }
            if (this.notiTxt.length > 0) {
                this.dialogx = true;
            }

        },
        notiLoad: async function () {

            let params = {
                api: 'farmer/farmers/' + this.farmer.id + '/reports/cattleEvents',
            }
            let data = await store.dispatch("manageDef/getData", params);

            for (let i = 0; i < data.length; i++) {
                if (data[i].title) {
                    this.notificate = data[i];
                    break;
                }
            }

        },
        getCattle: async function () {
            await store.dispatch("cattle/getCattle", this.farmer.id)
        },
        initial: async function () {
            await this.getCattle();
            if (this.noti == 0) {
                this.dialogx = false;
            } else {
                this.dialogx = true;
            }
        },
        close() {
            this.dialogx = false;
        },
        logout: async function () {
            await this.$store.dispatch("login/logout")
            this.$store.dispatch('loading/showLoad')
            let vm = this
            setTimeout(() => {
                vm.$store.dispatch('loading/dismissLoad')
                vm.$router.replace({
                    name: 'home'
                })
            }, 1000)
        }
    }

}
</script>
