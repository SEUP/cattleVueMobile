<template>
    <v-content> 
            <v-img v-if="url" class="circle50" :src="baseUrl+url" height="90px" width="90px" contain></v-img>
            <img v-else class="circle50" src="@/assets/cattle.png" height="90px" width="90px" contain />

    </v-content>
</template>

<script>
    import {
        get
    } from "vuex-pathify"

    export default {
        name: "CattleAvatar",
        data() {
            return {
                baseUrl: 'http://mct.ict.up.ac.th:10008/',
            }
        },
        props: {
            url: null
        },
        methods: {}
    }
</script>

<style scoped>

</style>