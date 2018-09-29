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
                            <farmer-select-avatar/>
                        </v-flex>
                        <v-flex xs6 class="pa-1">
                            <farmer-capture-avatar/>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout column class="mt-3">
                <v-flex>
                    <farmer-profile-card/>
                    <farmer-logout/>
                </v-flex>

            </v-layout>
        </v-container>
    </v-content>

</template>

<script>

    import store from "@/store/"
    import {get} from 'vuex-pathify'
    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar";
    import FarmerProfileCard from "@/components/Farmer/Profile/FarmerProfileCard";
    import FarmerCaptureAvatar from "@/components/Farmer/Avatar/FarmerCaptureAvatar";
    import FarmerSelectAvatar from "@/components/Farmer/Avatar/FarmerSelectAvatar";
    import FarmerLogout from "@/components/Farmer/Profile/FarmerLogout";

    export default {
        name: 'App',
        components: {
            FarmerLogout,
            FarmerSelectAvatar,
            FarmerCaptureAvatar,
            FarmerProfileCard,
            FarmerAvatar

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
