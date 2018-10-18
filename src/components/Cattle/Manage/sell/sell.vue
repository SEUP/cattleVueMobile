<template>
    <v-content>
               
        <v-container>
             <center>
             <Forms :cattle="cattle" />   </center>
            
        </v-container>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/sell/form";
     import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "ChangeType",
        data() {
            return {
                sell: {},
           

            }
        },
        components: {
            Forms,
            CattleAvatar
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setData: get('manageDef/setWorms'),
            datas: get('manageDef/worms'),
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
                    return 'ไม่มีข้อมูล';
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