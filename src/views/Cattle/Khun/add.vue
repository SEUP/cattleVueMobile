<template>
    <v-content>
        <ActionBar />
        <v-container>
            <AddForm :addData="addData"/>
        </v-container>
         
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";
    import AddForm from "@/components/Cattle/AddForm";
    import ActionBar from "@/components/Menu/ActionBar";
    export default {
        name: 'App',
        components: {
            FarmerAvatar, 
            ActionBar,
            AddForm
        },
        data() {
            return {
                addData:{},
            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")
            await store.dispatch("mobile/defaultActionBar",'เพิ่มโคขุน')

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
            setDataForAdd: async function () {
                this.addData = {
                        farmer_id :this.farmer.id,
                        name:'',
                       cattle_status: "010100",
                        cattle_type: "020300",
                        cattle_sex: "030100",
                        cattle_breeding: null, 

                }
            },
            getCattle: async function () {
                    let params = {
                        farmerId: this.farmer.id,
                        cattle_type: '020100',
                    }
                    await store.dispatch("cattle/getCattle", params)
               
                },
                initial: async function () { 
                        this.getCattle();
                        this.setDataForAdd();
                  },

        }


    }
</script>