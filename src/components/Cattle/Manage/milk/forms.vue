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
       <!----- <v-btn @click="removeData()" v-if="update" class="box-red">
            <h4>
                <v-icon>mdi-delete</v-icon>ลบข้อมูล
            </h4>
        </v-btn> ---->

        <v-dialog v-model="dialog" scrollable persistent :overlay="false" transition="dialog-transition">
            <v-card style="background-color:white;">
                <v-toolbar color="primary">
            
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h1 class="wh" v-if="update">อัพเดทข้อมูล</h1>
                    <h1 class="wh" v-if="update">อัพเดทข้อมูล</h1>
                </v-toolbar>
                <v-container style="background-color:white;" >
                    <v-card-text style="background-color:white;">
                        <v-layout  >
                                  
                            <v-flex xs12 style="background-color:white;" >
                                <p class="title">เริ่มหย่านม</p>
                                <date-picker label="วัน/เดือน/ปี ที่เกิด" :valDate="form.start_date" v-model="form.start_date"
                                    @change="form.start_date = $event" />
                                <v-text-field label="น้ำหนักที่เริ่มหย่านม" suffix="กิโลกรัม" v-model="form.start_weight"></v-text-field>
                                <v-text-field label="ความยาวลำตัว" suffix="เซนติเมตร" v-model="form.start_length"></v-text-field>
                                <v-text-field label="รอบอก" suffix="เซนติเมตร" v-model="form.start_chest"></v-text-field>
                                <v-text-field label="ความสูง" suffix="เซนติเมตร" v-model="form.start_height"></v-text-field>
                           
                                <p class="title">สิ้นสุดการหย่านม</p>
                                <date-picker label="วัน/เดือน/ปี ที่หย่านม" :valDate="form.end_date" v-model="form.end_date"
                                    @change="form.end_date = $event" />
                                <v-text-field label="น้ำหนัก" suffix="กิโลกรัม" v-model="form.end_weight"></v-text-field>
                                <v-text-field label="ความยาวลำตัว" suffix="เซนติเมตร" v-model="form.end_length"></v-text-field>
                                <v-text-field label="รอบอก" suffix="เซนติเมตร" v-model="form.end_chest"></v-text-field>
                                <v-text-field label="ความสูง" suffix="เซนติเมตร" v-model="form.end_height"></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
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
                To: 'birth',
                DefaultForm: {},
                dialog: false,
                form: {},
                date: null,
            }
        },
        computed: {
            notNull: get('core/notNull'),
            setMilk: get('manageDef/setMilk'),
            loadMilk: get('manageDef/milk'),
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
            closeDialog() {
                if (!this.update) {
                    this.getDefaultForm();
                }
                this.getData();
                this.dialog = false;
            },
            createData: async function () {
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/' + this.To,
                        form: this.form
                    }
                    this.form = await store.dispatch("manageDef/createData", params);
                    this.closeDialog();
                },
                updateData: async function () {
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + this.forms.id,
                            form: this.form
                        }
                        let c = await store.dispatch("manageDef/updateData", params);
                        this.closeDialog();
                    },
                    removeData: async function () {
                            let params = {
                                api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + this.forms.id,
                            }
                            this.form = await store.dispatch("manageDef/removeData", params);
                            this.closeDialog();
                        },
                        getData: async function () {
                                let params = {
                                    api: 'farmer/cattles/' + this.cattle.id + '/' + this.To,
                                }
                                let data = await store.dispatch("manageDef/getData", params);
                                this.setMilk(data);

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
                                 
                                    this.form = this.forms;
                                }

        }
    }
</script>

<style scoped>

</style>