<template>
    <v-content>
        <ActionBar />
        <v-container>
            <center>
                <v-img @click="dialog=true" v-if="cattle.image_url" class="circle50" :src="baseUrl+cattle.image_url"
                    height="190px" width="190px" contain></v-img>
                <img @click="dialog=true" v-else class="circle50" src="@/assets/cattle.png" height="190px" width="190px"
                    contain />
            </center>
            <v-layout>
                <v-flex xs12>
                    <center>
                        <CaptureAvatar cattle:="cattle" />
                        <SelectAvatar cattle:="cattle"/>
                      </center>
                </v-flex>
            </v-layout>

            <AddForm class="mrt-20" :addData="cattle" />
        </v-container>

        <v-dialog v-model="dialog" width="500">

            <v-img v-if="cattle.image_url" :src="baseUrl+cattle.image_url" height="100%" width="100%" contain></v-img>
            <img @click="imageView(baseUrl+cattle.image_url)" v-else src="@/assets/cattle.png" height="100%" width="100%"
                contain />

        </v-dialog>

    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";
    import ActionBar from "@/components/Menu/ActionBar";
    import AddForm from "@/components/Cattle/AddForm";
     import CaptureAvatar from "@/components/Cattle/CattleCaptureAvatar";
    import SelectAvatar from "@/components/Cattle/CattleSelectAvatar";
    export default {
        name: 'App',
        components: {
            FarmerAvatar,
            ActionBar,
            AddForm,CaptureAvatar,SelectAvatar
        },
        props: {
            cattle: {}
        },
        data() {
            return {
                params: {},
                dialog: false,
                baseUrl: 'http://mct.ict.up.ac.th:10008/',
            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")
            await store.dispatch("mobile/defaultActionBar", 'ข้อมูลโค')

            next()
        },
        computed: {
            farmer: get("farmer/farmer"),

        },
        async mounted() {
            await this.initial();
        },
        methods: {

            imageView() {
                this.dialog = true;
            },
            getCattle: async function () {
                    this.cattle.update = 1
                },
                initial: async function () {
                        this.getCattle();
                    },

        }


    }
</script>