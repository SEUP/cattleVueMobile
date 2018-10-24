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
                         <v-btn @click="update(data)">แก้ไข</v-btn>
                    </center>
                </v-card>
            </v-flex>

        </v-layout>
    
    <v-dialog
        v-model="dialog"
        scrollable fullscreen 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <pre>{{wormChoose}}</pre>
    </v-dialog>

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
                dialog:false

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
            choose:get('manageDef/getWormChoose'),
             wormChoose:get('manageDef/wormChoose')
        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {

            update(data){
                this.choose(data);
                this.dialog = true;
                 
            },
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