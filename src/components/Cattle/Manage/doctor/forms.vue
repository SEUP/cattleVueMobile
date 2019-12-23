<template>
    <v-content>
        <v-btn @click="openDialog()" v-if="!update" class="box-green">
            <h4>
                <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล
            </h4>
        </v-btn>
        <v-btn @click="openDialog()" v-if="update" class="box-yellow">
            <h4>
                <v-icon>mdi-pencil</v-icon>แก้ไขข้อมูล
            </h4>
        </v-btn>
        <v-btn @click="removeData()" v-if="update" class="box-red">
            <h4>
                <v-icon>mdi-delete</v-icon>ลบข้อมูล
            </h4>
        </v-btn>
   
        <v-dialog v-model="dialog" scrollable persistent :overlay="false" transition="dialog-transition">
            <v-card style="background-color:white;">

                <v-toolbar color="primary">
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h1 class="wh" v-if="!update">เพิ่มข้อมูล</h1>
                    <h1 class="wh" v-if="update">อัพเดทข้อมูล</h1>
                </v-toolbar>   
                
                <v-container grid-list-xs style="background-color:white;">
                  <!--- <pre>{{form}}</pre> ---> 
                    <h3>อาการ</h3>
                    <date-picker label="วัน/เดือน/ปี ที่สังเกตุอาการ" :valDate="form.observation_date" v-model="form.observation_date"
                        @change="form.observation_date = $event" />

                    <v-text-field v-model="form.initial_symptoms" label="ลักษณะอาการเบื้องต้น"></v-text-field>

                    <choice to="กลุ่มอาการ" :remark="form.options.symptom_group" v-model="form.symptom_group" @change="form.options.symptom_group = $event" />
                      
                    <choice to="โรค" :remark="form.options.disease" v-model="form.disease" @change="form.options.disease = $event" />

 
                    <h3>การรักษา</h3>
                    <date-picker label="วัน/เดือน/ปี ที่รักษา" :valDate="form.therapy_date" v-model="form.therapy_date"
                        @change="form.therapy_date = $event" />

                    <choice to="ผู้รักษา" :remark="form.options.therapist" v-model="form.therapist" @change="form.options.therapist = $event" />

                    <v-text-field v-model="form.therapy_method" label="วิธีการรักษา"></v-text-field>

                    <v-text-field v-model="form.medication" label="ยาที่รักษา"></v-text-field>
 
                    <h3>ผลการรักษา</h3>

                    <date-picker label="วัน/เดือน/ปี ที่ตรวจอีกครั้ง" :valDate="form.check_therapy_date" v-model="form.check_therapy_date"
                        @change="form.check_therapy_date = $event" />
                        
                    <choice to="ผลการรักษา" :remark="form.options.therapy_result" v-model="form.therapy_result" @change="form.options.therapy_result = $event" />


                </v-container>

                <center style="background-color:white;">
                    <v-btn v-if="!update" class="box-green full-width" @click="createData()" large>บันทึก</v-btn>
                    <v-btn v-if="update" class="box-yellow full-width" @click="updateData()" large>อัพเดท</v-btn>
                </center>
            </v-card>
        </v-dialog>

    </v-content>



</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import DatePicker from "@/components/Share/DatePicker";
    import Choice from "@/components/Share/Choice";

    export default {
        name: "Forms",
        components: {

            DatePicker,
            Choice
        },
        data() {
            return {
                To: 'therapy',
                DefaultForm: {},
                dialog: false,
                form: {},
                date: null,
            }
        },
        computed: {
            notNull: get('core/notNull'),
            setDoctor: get('manageDef/setDoctor'),
            loadDoctor: get('manageDef/doctor'),
        },
        props: {
            cattle: {},
            update: '',
            forms: {},

        },
        async mounted() {
            await this.initial();
        },
        methods: {
            openDialog() {
                this.dialog = true;
            },
           async closeDialog() {
                if (!this.update) {
                  await  this.getDefaultForm();
                }
              await  this.getData();
                this.dialog = false;
            },
            createData: async function () {
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/' + this.To,
                        form: this.form
                    }
                    this.form = await store.dispatch("manageDef/createData", params);
                    await this.closeDialog();
                },
                updateData: async function () {
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + this.forms.id,
                            form: this.form
                        }
                        let c = await store.dispatch("manageDef/updateData", params);
                        await this.closeDialog();
                    },
                    removeData: async function () {
                            let params = {
                                api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + this.forms.id,
                            }
                            this.form = await store.dispatch("manageDef/removeData", params);
                            await this.closeDialog();
                        },
                        getData: async function () {
                                let params = {
                                    api: 'farmer/cattles/' + this.cattle.id + '/' + this.To,
                                }
                                let data = await store.dispatch("manageDef/getData", params);
                                this.setDoctor(data);

                            },
                            getDefaultForm: async function () {
                                    let params = {
                                        api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/create',
                                    }
                                    try {
                                        this.form = await store.dispatch("manageDef/getForm", params);
                                    } catch (error) {

                                    }

                                },
                                initial: async function () {
                                    if (!this.update) {
                                       await this.getDefaultForm();
                                    } else {
                                        this.form = this.forms;
                                    }
                                }

        }
    }
</script>

<style scoped>

</style>