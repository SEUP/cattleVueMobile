<template>
<v-content>
    <ActionBar />
    <v-layout column>
        <v-tabs v-model="tab" color="primary" dark slider-color="primary" v-if="response">
            <v-tab>
                วัคซีนป้องกันโรค
            </v-tab>
            <v-tab-item>
                <div v-for="res,i in vaccine" :key="i">
                    <v-card style="margin:10px;">
                        <v-card-title primary-title class="box-blue ">
                            <h3 class="wh">{{res.cattle}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h4><b>วัคซีน : </b> {{res.vaccine}}</h4>
                            <h4><b>วันที่ : </b> {{dateTH(res.vaccine_date)}}</h4>
                        </v-card-text>
                    </v-card>
                </div>

            </v-tab-item>
            <v-tab>
                พยาธิ
            </v-tab>
            <v-tab-item>
                <div v-for="res,i in worming" :key="i">
                    <v-card style="margin:10px;">
                        <v-card-title primary-title class="box-blue ">
                            <h3 class="wh">{{res.cattle}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h4><b>ถ่ายพยาธิ : </b> {{res.worming}}</h4>
                            <h4><b>วันที่ : </b> {{dateTH(res.worming_date)}}</h4>
                        </v-card-text>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab>
                การกลับสัด
            </v-tab>
            <v-tab-item>
                <div v-for="res,i in breed_out" :key="i">
                    <v-card style="margin:10px;">
                        <v-card-title primary-title class="box-blue ">
                            <h3 class="wh">{{res.cattle}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h4><b>วันที่ : </b> {{dateTH(res.date)}}</h4>
                        </v-card-text>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab>
                การตรวจท้อง
            </v-tab>
            <v-tab-item>
                <div v-for="res,i in beel" :key="i">
                    <v-card style="margin:10px;">
                        <v-card-title primary-title class="box-blue ">
                            <h3 class="wh">{{res.cattle}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h4><b>วันที่ : </b> {{dateTH(res.date)}}</h4>
                        </v-card-text>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab>
                การคลอด
            </v-tab>
            <v-tab-item>
                <div v-for="res,i in baby" :key="i">
                    <v-card style="margin:10px;">
                        <v-card-title primary-title class="box-blue ">
                            <h3 class="wh">{{res.cattle}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h4><b>วันที่ : </b> {{dateTH(res.date)}}</h4>
                        </v-card-text>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab>
                อื่นๆ
            </v-tab>
            <v-tab-item >
                <div v-if="noti">
                    <v-layout v-for="Noti in noti" v-bind:key="Noti.id">
                        <div v-if="Noti.title" style="width:100%;">
                            <v-card class=" mr-10 shadow pd-12 full-width wh">
                                <v-layout class="box-blue pd-10" row>
                                    <h4>{{Noti.title}}</h4>
                                </v-layout>
                                <v-layout class="pd-10" row>
                                    <h4 style="color:black;">{{dateTH(Noti.start)}}</h4>
                                </v-layout>
                            </v-card>
                        </div>
                    </v-layout>
                </div>
                <div v-else>
                    <v-layout>
                        <div style="width:100%;">
                            <v-card class=" mr-10 shadow pd-12 full-width wh">
                                <v-layout class="box-blue pd-10" row>
                                    <h4>ยังไม่มีการแจ้งเตือนใหม่ในขณะนี้</h4>
                                </v-layout>
                            </v-card>
                        </div>
                    </v-layout>
                </div>
            </v-tab-item>
        </v-tabs>

    </v-layout>
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
            tab: 0,
            response: false,
            vaccine: [],
            worming: [],
            breed_out: [],
            beel: [],
            baby: [],
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
        setNoti: get('manageDef/setNoti'),
        noti: get('manageDef/noti'),
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
            await store.dispatch('manageDef/backSell', cattle);
            await this.initial();
            this.$router.go(-1);
        },
        async getNoti() {
            let data = await store.dispatch("core/getNotification", this.farmer.id);
            this.vaccine = data.vaccine

            this.worming = data.worming

            this.breed_out = data.breed_out

            this.beel = data.beel

            this.baby = data.baby

        },
        initial: async function () {
            await store.dispatch("mobile/defaultActionBar", 'การเเจ้งเตือน')
            let params = {
                api: 'farmer/farmers/' + this.farmer.id + '/reports/cattleEvents',
            }
            let data = await store.dispatch("manageDef/getData", params);
            this.setNoti(data);
            await this.getNoti();
            this.response = true;

        }

    }
}
</script>

<style scoped>

</style>
