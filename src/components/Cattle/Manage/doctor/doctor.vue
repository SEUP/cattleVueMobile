<template>
    <v-content>
        <!-----  <pre>{{loadBreeder}}</pre> ---->

        <v-divider class="mrt-20" light></v-divider>
        <center>
            <h1>การรักษา
                <Forms :cattle="cattle" :form="{}" />
            </h1>
        </center>
        <v-divider light></v-divider> 
        
        <v-layout row v-for="doctor,index in datas.data" :key="index">
            <v-flex xs12 class="pd-20">
                <v-card class="box-blue  pd-10 wh">
                    <h3>วันที่: {{dateTH(doctor.therapy_date)}}</h3>
                    <v-card class=" mrt-6 pd-6">
                        <h4><b>กลุ่มโรค:</b> {{getType(doctor.symptom_group)}}</h4>
                        <h4 style="font-size:14px;"><b>อาการ:</b> {{notNull(doctor.initial_symptoms)}}</h4><hr>
                        <h4><b>ผล:</b> {{notNull(getType(doctor.therapy_result))}}</h4>  
                    </v-card>
                    <center class="mrt-10">
                         <Forms :cattle="cattle" :forms="doctor" :update="'asd'" /> 
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
    import Forms from "@/components/Cattle/Manage/doctor/forms";
    export default {
        name: "ChangeType",
        data() {
            return {
                vaccine: {},
                

            }
        },
        components: {
            Forms
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setData: get('manageDef/setDoctor'),
            datas: get('manageDef/doctor'),
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
                    api: 'farmer/cattles/' + this.cattle.id + '/therapy',
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setData(data);

            }

        }
    }
</script>

<style scoped>

</style>