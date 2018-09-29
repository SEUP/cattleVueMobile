<template>
    <v-content v-if="farmer">
        <v-container fluid>
            <v-layout row align-center>
                <v-flex class="">
                    <farmer-avatar/>
                </v-flex>
                <v-flex xs8>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2 class="text-truncate">{{farmer.firstname}} {{farmer.lastname}}</h2>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <v-btn :to="{name : `farmer-profile`}" depressed color="success" block>ข้อมูลผู้ใช้</v-btn>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <v-btn depressed color="success" block>ข้อมูลฟาร์ม</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout column class="ma-3">
                <v-flex>

                </v-flex>
                <div>MENU1</div>
                <div>MENU1</div>
                <div>MENU1</div>
                <div>MENU1</div>
            </v-layout>
        </v-container>

    </v-content>
</template>

<script>

    import store from "@/store/"
    import {get, sync} from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";

    export default {
        name: 'App',
        components: {
            FarmerAvatar,
            HelloWorld,
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar")
            next()
        },
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("farmer/avatar")
        },
        async mounted() {
            await this.initial();
        },
        methods: {
            initial: async function () {

            }
        }


    }
</script>
