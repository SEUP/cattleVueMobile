<template>
    <v-content>
 

    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    export default {
        name: "Forms",
        data() {
            return {
        
            }
        },
        computed: {
            dateTH: get('core/dateTH'),
            notNull: get('core/notNull'),
            setBreeder: get('manageDef/setBreeder'),
            loadBreeder: get('manageDef/breeder'),
        },
        props: {
            cattle: {},
     
        },
        async mounted() {
   
        },
        methods: {
     
        }
    }
</script>

<style scoped>

</style>