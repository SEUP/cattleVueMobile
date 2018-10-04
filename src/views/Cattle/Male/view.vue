<template>
    <v-content>
        <ActionBar />
        <v-container>
            <CattleListView :cattles="cattle.data" />
        </v-container>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";
    import CattleListView from "@/components/Cattle/CattleListView";
    import ActionBar from "@/components/Menu/ActionBar";
    export default {
        name: 'App',
        components: {
            FarmerAvatar,
            CattleListView,
            ActionBar
        },
        data() {
            return {

            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")
           // await store.dispatch("mobile/defaultActionBar")

            next()
        },
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("farmer/avatar"),
            cattle: get("cattle/cattles"),

        },
        async mounted() {
            await this.initial();
        },
        methods: {

            ActionBar: async function() {
                let params = {
                    bg: 'box-purple',
                    title: 'พ่อพันธุ์',
                    iconLeft: 'mdi-arrow-left',

                    btnFirst: true,
                    iconFirst: 'mdi-plus-circle',
                    pathFirst: '',
 
                };
                await store.dispatch("mobile/customActionBar",params) 
            },

            getCattle: async function () {
                    let params = {
                        farmerId: this.farmer.id,
                        cattle_type: '020100',
                    }
                    await store.dispatch("cattle/getCattle", params)
                    alert(this.farmer.id);
                },
                initial: async function () {
                        this.ActionBar();
                        this.getCattle();
                    },

        }


    }
</script>