<template>
    <v-content>
        <ActionBar />
        <v-container>
            <center @click="imageView() "> 
                <v-img v-if="avatar" style="border-radius:50%;" :src="avatar" height="190px" width="190px" contain></v-img>
                 <img style="border-radius:50%;"  @click="imageView(baseUrl+cattle.image_url)" v-else src="@/assets/cattle.png"  height="190px" width="190px"
                contain />
            <!--- <Avatar  />  ---->

      
            </center>
            <v-layout>
                <v-flex xs12>
                    <center>
                        <CaptureAvatar   cattle:="cattle" />
                        <SelectAvatar  cattle:="cattle"/>
                      </center>
                </v-flex>
            </v-layout>

            <AddForm class="mrt-20" :addData="cattle" updated="1"/>
        </v-container>

        <v-dialog v-model="dialog" width="500">

            <v-img v-if="avatar" :src="avatar" height="100%" width="100%" contain></v-img>
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
  import Avatar from "@/components/Cattle/Avatar/CattleAvatar";

    export default {
        name: 'App',
        components: {
            FarmerAvatar,
            ActionBar,
            AddForm,CaptureAvatar,SelectAvatar,Avatar
        },
        props: {
            cattle: {},
            updated:0,
        },
        data() {
            return {
                params: {},
                dialog: false,
                baseUrl: 'http://mct.ict.up.ac.th:10008/',
                updated2:0,
            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")
            await store.dispatch("mobile/defaultActionBar", 'ข้อมูลโค')
            await store.dispatch("cattle/downloadAvatar")
            next()
        },
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("cattle/avatar")

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
                        this.updated2 = this.updated
                    
                    },

            loadImage: async function (){
                
            }

        }


    }
</script>