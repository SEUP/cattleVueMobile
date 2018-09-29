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
                                <v-btn depressed color="success" block>เลือกภาพ</v-btn>
                            </v-flex>
                            <v-flex xs6 class="pa-1">
                                <v-btn depressed color="success" block>ถ่ายภาพ</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-layout column class="mt-3">
                    <v-flex>
                        <farmer-profile-card/>
                    </v-flex>

                </v-layout>
            </v-container>

        </v-content>

</template>

<script>

    import {get,sync} from 'vuex-pathify'
    import FarmerAvatar from "@/components/Farmer/FarmerAvatar";
    import FarmerProfileCard from "@/components/Farmer/FarmerProfileCard";

    export default {
        name: 'App',
        components: {
            FarmerProfileCard,
            FarmerAvatar

        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
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
                await this.$store.dispatch("farmer/getFarmer")
                await this.$store.dispatch("farmer/downloadAvatar")
            }
        }


    }
</script>
