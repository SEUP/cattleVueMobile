<template>
    <v-avatar size="75%">
        <v-img v-if="avatar"
               :src="avatar"
               :lazy-src="avatar"
               aspect-ratio="1"
               class="grey lighten-2"
        >
            <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
        </v-img>
    </v-avatar>
</template>

<script>

    import {get} from "vuex-pathify"

    export default {
        name: "FarmerAvatar",
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("cattle/avatar")
        },
        props : {
            size : {
                type : [Number,String],
                default : "100%"
            }
        },
        methods :{
        }
    }
</script>

<style scoped>

</style>
