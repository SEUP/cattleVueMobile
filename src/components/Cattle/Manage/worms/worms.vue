<template>
    <v-content>
        <!-----  <pre>{{loadBreeder}}</pre> ---->

        <v-divider class="mrt-20" light></v-divider>
        <center>
            <h1>การถ่ายพยาธิ
                <Forms :cattle="cattle" :form="{}" />
            </h1>
        </center>
        <v-divider light></v-divider> 
 
        <v-layout row v-for="data in datas.data">
            <v-flex xs12 class="pd-20">
                <v-card class="box-brown  pd-10 wh">
                    <h3>วันที่: {{dateTH(data.worming_date)}}</h3>
                    <v-card class=" mrt-6 pd-6">
                        <h4><b>ชนิด:</b> {{getType(data.worming_type)}}</h4>
                        <h4><b>ผู้ทำ:</b> {{notNull(getType(data.maker))}}</h4>  
                    </v-card>
                    <center class="mrt-10">
                         <Forms :cattle="cattle" :forms="data" :update="'asd'" /> 
                    </center>
                </v-card>
            </v-flex>

        </v-layout>
 

    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/worms/forms";
    export default {
        name: "ChangeType",
        data() {
            return {
                worms: {},
                

            }
        },
        components: {
            Forms
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