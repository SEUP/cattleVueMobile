<template>
    <v-app id="app">
        <loading/>
        <router-view/>
    </v-app>
</template>

<script>
    import {get, sync, call} from 'vuex-pathify'
    import Loading from "./components/Share/Loading";

    export default {
        name: "App",
        components: {Loading},
        created () {
            // this.$store.dispatch("loading/showLoad")
        }
    }
</script>
