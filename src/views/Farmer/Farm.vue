<template>
    <v-content>  <ActionBar />
        <v-container fluid>
            <v-layout column class="">
                <v-flex>
                    <farmer-farm-card/>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>

</template>

<script>

    import store from "@/store/"
    import FarmerFarmCard from "@/components/Farmer/Farm/FarmerFarmCard";
 import ActionBar from "@/components/Menu/ActionBar";
    export default {
        name: 'App',
        components: {FarmerFarmCard,ActionBar},
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
              await store.dispatch("mobile/defaultActionBar", 'ข้อมูลฟาร์ม')
            next()
        },
        computed: {},
        async mounted() {
            await this.initial();
        },
        methods: {
            initial: async function () {
                await this.$store.dispatch("farmer/getFarmer")
            }
        }


    }
</script>
