<template>
    <v-content class="font">

      

    </v-content>

</template>



<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"



    export default {
        name: 'App',
        components: {
   

        },
        data() {
            return {
                debug: true,

            }
        },
        props: {
            cattle: {}
        },
        async beforeRouteEnter(to, from, next) {

            next()
        },
        computed: {

        },
        async mounted() {


        },
        methods: {

        }


    }
</script>