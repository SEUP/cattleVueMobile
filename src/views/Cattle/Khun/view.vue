<template>
    <v-content>
        <ActionBar />
        <v-container>
            <CattleListView :params="params" />
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
                params:{},
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
                    bg: 'box-brown',
                    title: 'โคขุน',
                    iconLeft: 'mdi-arrow-left',

                    btnFirst: true,
                    iconFirst: 'mdi-plus-circle',
                    pathFirst: '/cattle/khun/add',
 
                };
                await store.dispatch("mobile/customActionBar",params) 
            },

            getCattle: async function () {
                    this.params = {
                        farmerId: this.farmer.id,
                        cattle_type: '020300',
                    }
                await store.dispatch("cattle/getCattle", this.params)
             
                },
                initial: async function () {
                        this.ActionBar();
                        this.getCattle();
                    },

        }


    }
</script>