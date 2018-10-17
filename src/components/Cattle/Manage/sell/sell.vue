<template>
    <v-content>
               <v-layout class="pd-30">
            <v-flex xs4>
                <CattleAvatar :url="cattle.image_url" />
            </v-flex>
            <v-flex xs8>
                <h2>{{cattle.name}}</h2>
                <h3>ประเภทคโค : {{typeCattle(cattle.cattle_type)}}</h3>
            </v-flex>

        </v-layout>
        <v-divider></v-divider>
        <v-container>
            <center>การจำน่าย</center>


          <v-text-field></v-text-field>
        </v-container>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/worms/forms";
     import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "ChangeType",
        data() {
            return {
                worms: {},
                

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
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/worming',
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setData(data);

            }

        }
    }
</script>

<style scoped>

</style>