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

            <v-tab key="1" ripple> การขุน </v-tab>
            <v-tab-item key="1">
                <v-card flat>
                    การขุน
                </v-card>
            </v-tab-item>

            <v-tab key="2" ripple> การผสมพันธุ์ </v-tab>
            <v-tab-item key="2">
                <v-card flat>
                    <BreederFemale :cattle="cattle" />
                   <!---- <BreederDef :cattle="cattle" /> ---->
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
            <v-tab key="6" ripple> การอย่านม </v-tab>
            <v-tab-item key="6">
                <v-card flat>
                    การอย่านม
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
            BreederFemale
        },
        props: {
            cattle: {}
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