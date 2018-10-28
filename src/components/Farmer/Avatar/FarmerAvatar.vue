<template>
    <v-avatar size="75%">
        <v-img v-if="avatar"
               :src="avatar"
               :lazy-src="avatar"
               aspect-ratio="1"
               class="grey lighten-2"
               @click="profile()"
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

<v-dialog v-model="dialog" width="500">

            <v-img v-if="avatar" :src="avatar" height="100%" width="100%" contain></v-img>
            <img   v-else src="@/assets/cattle.png" height="100%" width="100%"
                contain />

        </v-dialog>

    </v-avatar>
</template>

<script>

    import {get} from "vuex-pathify"

    export default {
        name: "FarmerAvatar",
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("farmer/avatar")
        },
          data() {
            return {
                params: {},
                dialog: false,
              
            }
        },
        props : {
            size : {
                type : [Number,String],
                default : "100%"
            }
        },
        methods :{
            profile(){
                this.dialog = true;
            }
        }
    }
</script>

<style scoped>

</style>
