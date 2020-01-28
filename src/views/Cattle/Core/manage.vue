<template>
<v-content>
    <ActionBar />
    <v-toolbar color="white" style="overflow-y: scroll;">
        <v-btn :outline="tabs==0" @click="tabs = 0" round color="success">เปลี่ยนประเภทโค</v-btn>

        <v-btn :outline="tabs==1" v-if="cattle.cattle_type == '020200'" @click="tabs = 1" round color="success">การผสมพันธุ์</v-btn>
        <v-btn :outline="tabs==2" v-if="cattle.cattle_type == '020100'" @click="tabs = 2" round color="success">การผสมพันธุ์</v-btn> 

        <v-btn :outline="tabs==3" v-if="cattle.cattle_type == '020300'" @click="tabs = 3" round color="success">การขุน</v-btn>

        <v-btn :outline="tabs==4" @click="tabs = 4" round color="success">การทำวัคซีน</v-btn>
        <v-btn :outline="tabs==5" @click="tabs = 5" round color="success">การถ่ายพยาธิ</v-btn>
        <v-btn :outline="tabs==6" @click="tabs = 6" round color="success">การรักษา</v-btn>

        <v-btn :outline="tabs==7" v-if="cattle.cattle_type == '020400'" @click="tabs = 7" round color="success">การหย่านม</v-btn>
        
        <v-btn :outline="tabs==8" @click="tabs = 8" round color="success">การจำหน่าย</v-btn>

    </v-toolbar>

    <v-layout column wrap>
        <ChangeType v-if="tabs==0"  :cattle="cattle" />
 
        <BreederFemale v-if="tabs==1"   :cattle="cattle" />
        <BreederDef   v-if="tabs==2"   :cattle="cattle" />

        <Khun  v-if="tabs==3"  :cattle="cattle" />
        <Vaccine v-if="tabs==4"  :cattle="cattle" />
        <Worms v-if="tabs==5"  :cattle="cattle" />
        <Doctor v-if="tabs==6"  :cattle="cattle" />
         <Milk v-if="tabs==7"  :cattle="cattle" />
        <Sell v-if="tabs==8" :cattle="cattle" />
       
    </v-layout>

 <!---   <v-tabs color="cyan" dark slider-color="yellow" v-if="cattle">
        <v-tab key="0" ripple active> เปลี่ยนประเภทโค </v-tab>
        <v-tab-item key="0">
            <v-card flat>
                <ChangeType :cattle="cattle" />
            </v-card>
        </v-tab-item>

        <v-tab key="1" v-if="cattle.cattle_type == '020100' || cattle.cattle_type == '020200' " ripple>
            {{ (cattle.cattle_type == '020300' )?'การขุน':'การผสมพันธุ์' }}
        </v-tab>
        <v-tab-item v-if="cattle.cattle_type == '020100' || cattle.cattle_type == '020200' " key="1">
            <v-card flat>
                <BreederFemale v-if="cattle.cattle_type == '020200'" :cattle="cattle" />
                <BreederDef v-if="cattle.cattle_type == '020100'" :cattle="cattle" />
                <Khun v-if="cattle.cattle_type == '020300'" :cattle="cattle" />
            </v-card>
        </v-tab-item>

        <v-tab key="2" ripple> การทำวัคซีน </v-tab>
        <v-tab-item key="2">
            <v-card flat>
                <Vaccine :cattle="cattle" />
            </v-card>
        </v-tab-item>

        <v-tab key="3" ripple> การถ่ายพยาธิ </v-tab>
        <v-tab-item key="3">
            <v-card flat>
                <Worms :cattle="cattle" />
            </v-card>
        </v-tab-item>

        <v-tab key="4" ripple> การรักษา </v-tab>
        <v-tab-item key="4">
            <v-card flat>
                <Doctor :cattle="cattle" />
            </v-card>
        </v-tab-item>
        <v-tab key="5" ripple> การจำหน่าย </v-tab>
        <v-tab-item key="5">
            <v-card flat>
                <Sell :cattle="cattle" />
            </v-card>
        </v-tab-item>
        <v-tab key="6" v-if="cattle.cattle_type == '020400'" ripple>
            การหย่านม
        </v-tab>
        <v-tab-item v-if="cattle.cattle_type == '020400'" key="6">
            <v-card flat>
                <Milk :cattle="cattle" />

            </v-card>
        </v-tab-item>
    </v-tabs> 
    -->
</v-content>
</template>

<script>
import store from "@/store/"
import {
    get,sync
} from "vuex-pathify"

import ActionBar from "@/components/Menu/ActionBar";
import ChangeType from "@/components/Cattle/Manage/changetype";
import BreederDef from "@/components/Cattle/Manage/breeder/breederDefault";

import Vaccine from "@/components/Cattle/Manage/vaccine/vaccine";

import Worms from "@/components/Cattle/Manage/worms/worms";

import Doctor from "@/components/Cattle/Manage/doctor/doctor";
import Sell from "@/components/Cattle/Manage/sell/sell";
import BreederFemale from "@/views/Cattle/Core/Manage/FemaleBreeder";

import Khun from "@/components/Cattle/Manage/khun/khun";
import Milk from "@/components/Cattle/Manage/milk/milk";

export default {
    name: 'App',
    components: {

        ActionBar,
        ChangeType,
        BreederDef,
        Vaccine,
        Worms,
        Doctor,
        Sell,
        BreederFemale,
        Khun,
        Milk
    },

    data() {
        return {
          
        }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch("mobile/defaultActionBar", 'การจัดการโค')
        next()
    },
    computed: {
        cattle: get("cattle/cattleChoose"),
        tabs:sync("core/tabs"),
    },
    async mounted() {
        await this.initial();
    },
    methods: {
        initial: async function () {

        },
    }

}
</script>
