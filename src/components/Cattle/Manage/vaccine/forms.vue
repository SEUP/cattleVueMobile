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
            <v-card class="bgw">
                <v-toolbar color="primary">
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h1 class="wh" v-if="!update">เพิ่มข้อมูล</h1>
                    <h1 class="wh" v-if="update">อัพเดทข้อมูล</h1>
                </v-toolbar>
                <v-container grid-list-xs class="bgw" v-if="response" >
                      
                    <date-picker label="วัน/เดือน/ปี ที่ทำวัคซีน" :valDate="form.vaccine_date" v-model="form.vaccine_date"
                        @change="form.vaccine_date = $event" />

                    <choice to="ผู้ทำ" :remark="form.options.maker" v-model="form.maker" @change="form.options.maker = $event" />
 
                    <choice to="ชนิดวัคซีน" :disableFemale="(cattle.cattle_type == '020200')?true:false"  :remark="form.options.vaccine_type" v-model="form.vaccine_type" @change="form.options.vaccine_type = $event" />

                    <v-text-field label="ชุดการผลิตวัคซีน" v-model="form.vaccine_set"></v-text-field>

                    <date-picker label="วัน/เดือน/ปี ที่ผลิต" :valDate="form.exp_date" v-model="form.exp_date" @change="form.exp_date = $event" />

                    <date-picker label="วัน/เดือน/ปี ที่หมดอายุ" :valDate="form.mfg_date" v-model="form.mfg_date"
                        @change="form.mfg_date = $event" />

                   </v-container>
                   <center class="bgw">
                     <v-btn v-if="!update" class="box-green full-width" @click="createData()" large>บันทึก</v-btn>
                    <v-btn  v-if="update"  class="box-yellow full-width" @click="updateData()" large>อัพเดท</v-btn>
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
                To:'vaccine',
                DefaultForm: {},
                dialog: false,
                form: {
                   options:{maker:''}
                },
                date: null,

                response:false,
            }
        },
        computed: {
            notNull: get('core/notNull'),
            setVaccine: get('manageDef/setVaccine'),
            loadVaccine: get('manageDef/vaccine'),
        },
        props: {
            cattle: {},
            update: '',
            forms:{},

        },
        async mounted() {
            await this.initial();
        },
        methods: {
            openDialog() {
                this.dialog = true;
            },
            closeDialog() {
                if(!this.update){ 
                this.getDefaultForm();
                }
                this.getData();
                this.dialog = false;
            },
            createData:async function(){
                  let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To,
                    form:this.form
                }
                this.form = await store.dispatch("manageDef/createData", params);
                 this.closeDialog();
            },
            updateData:async function(){
                  let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To+'/'+this.forms.id,
                    form:this.form
                }
               let c  = await store.dispatch("manageDef/updateData", params);
                this.closeDialog();
            },
             removeData: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To+'/'+this.forms.id,
                }
                this.form = await store.dispatch("manageDef/removeData", params); 
                  this.closeDialog();
            },
            getData:async function(){
                 let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To,
                }
                let data = await store.dispatch("manageDef/getData", params);
                this.setVaccine(data);

            },
            getDefaultForm: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/'+this.To+'/create',
                }
                try {
                    this.form = await store.dispatch("manageDef/getForm", params);  
                } catch (error) {
                    
                }
                
            },
            updateForm: async function () {
                this.form = this.forms;
            },
            initial: async function () {
                if(!this.update){ 
                    await this.getDefaultForm();
                }else{ 
                    await this.updateForm();
                }
                this.response = true;
            }

        }
    }
</script>

<style scoped>

</style>