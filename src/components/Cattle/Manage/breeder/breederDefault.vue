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
        name: "ChangeType",
        data() {
            return {
                breeder: {}, 
            }
        },
        components:{
 
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setBreeder:get('manageDef/setBreeder'),
            loadBreeder:get('manageDef/breeder'),
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
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/malebreed',
                }
               let data = await store.dispatch("manageDef/getData", params);
               this.setBreeder(data);
               
            }

        }
    }
</script>

<style scoped>

</style>