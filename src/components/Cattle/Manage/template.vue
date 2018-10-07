<template>
    <v-content>
        <pre>{{cattle}}</pre>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    export default {
        name: "ChangeType",
        data() {
            return {
            }
        },
        computed: {

        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {

                    notNull(data) {
                        if (data == null) {
                            return 'ยังไม่มีข้อมูล';
                        } else {
                            return data;
                        }
                    },
                    initial: async function () {
   
                    }

        }
    }
</script>

<style scoped>

</style>