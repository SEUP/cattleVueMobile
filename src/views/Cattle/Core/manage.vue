<template>
    <v-content>
        <ActionBar />
        <v-tabs color="cyan" dark slider-color="yellow">
            <v-tab key="0" ripple active> เปลี่ยนประเภทโค </v-tab>
            <v-tab-item key="0">
                <v-card flat>
                    <ChangeType :cattle="cattle" />
                </v-card>
            </v-tab-item>

            <v-tab v-if="cattle.cattle_type == '020300'"  key="1" ripple> การขุน </v-tab>
            <v-tab-item v-if="cattle.cattle_type == '020300'" key="1">
                <v-card flat>
                        <Khun :cattle="cattle" />  
                </v-card>
            </v-tab-item>

            <v-tab key="2" v-if="cattle.cattle_type == '020100' || cattle.cattle_type == '020200' " ripple> การผสมพันธุ์ </v-tab>
            <v-tab-item v-if="cattle.cattle_type == '020100' || cattle.cattle_type == '020200' "  key="2">
                <v-card flat>
                 <BreederFemale v-if="cattle.cattle_type == '020200'" :cattle="cattle" />
                    <BreederDef  v-if="cattle.cattle_type == '020100'" :cattle="cattle" /> 
                </v-card>
            </v-tab-item>

            <v-tab key="3" ripple> การทำวัคซีน </v-tab>
            <v-tab-item key="3">
                <v-card flat>
                  <Vaccine :cattle="cattle" /> 
                </v-card>
            </v-tab-item>

            <v-tab key="4" ripple> การถ่ายพยาธิ </v-tab>
            <v-tab-item key="4">
                <v-card flat>
                  <Worms :cattle="cattle" />
                </v-card>
            </v-tab-item>

            <v-tab key="5" ripple> การรักษา </v-tab>
            <v-tab-item key="5">
                <v-card flat>
                  <Doctor :cattle="cattle" /> 
                </v-card>
            </v-tab-item>
            <v-tab key="6" v-if="cattle.cattle_type == '020400'" ripple> การหย่านม </v-tab>
            <v-tab-item v-if="cattle.cattle_type == '020400'"  key="6">
                <v-card flat>
                        <Milk :cattle="cattle" />  
                </v-card>
            </v-tab-item>
            <v-tab key="7" ripple> การจำหน่าย </v-tab>
            <v-tab-item key="7">
                <v-card flat>
                 <Sell :cattle="cattle" />  
                </v-card>
            </v-tab-item>

        </v-tabs>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
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
            BreederFemale,Khun,Milk
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
            cattle : get("cattle/cattleChoose"),

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