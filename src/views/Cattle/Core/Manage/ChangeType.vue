<template>
    <v-content class="font">
        <ActionBar />
        <ChangeType :cattle="cattleChoose" />
    </v-content>

</template>



<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import ActionBar from "@/components/Menu/ActionBar";
    import ChangeType from '@/components/Cattle/Manage/changetype'

    export default {
        name: 'App',
        components: {
            ActionBar,
            ChangeType
        },
        data() {
            return {

            }
        },
        props: {
            cattle: {}
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch("mobile/defaultActionBar", 'การเปลี่ยนประเภทโค')
            next()
        },
        computed: {
            cattleChoose: get("cattle/cattleChoose"),
        },
        async mounted() {


        },
        methods: {

        }


    }
</script>