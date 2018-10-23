<template>
    <v-content>
        <v-btn v-if="!update" round class="box-purple wh " @click="breederDialog.on = true"> + เพิ่มข้อมูล</v-btn>
        <v-btn v-else @click="(breederDialog.on = true)&&(form= forms)" round class="box-yellow">
            <h3>แก้ไข</h3>
        </v-btn>

            <v-btn  v-if="update" @click="removeData()"  round color="red" class="wh">
                            <h3>ลบ</h3>
                        </v-btn>
        <v-dialog v-model="breederDialog.on" persistent>

       <v-toolbar color="primary">
            
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h1 class="wh">ข้อมูลการผสมพันธุ์</h1>
        
                </v-toolbar>

            <v-card> 
                <v-container>  
                 

                    <v-dialog v-if="!update" ref="dialog" v-model="breederDate.dialog" :return-value.sync="breederDate.date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" :value="dateTH(form.breeding_date)" label="วัน/เดือน/ปี"
                            readonly></v-text-field>
                        <v-date-picker v-model="form.breeding_date" value="moment()" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="breederDate.dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native="(breederDate.dialog=false)&&$refs.dialog.save(breederDate.date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog v-else ref="dialog" v-model="breederDate.dialog" :return-value.sync="breederDate.date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" v-if="dateTmp == null" :value="dateTH(form.breeding_date)" label="วัน/เดือน/ปี"
                            readonly></v-text-field>
                        <v-text-field slot="activator" v-else :value="dateTH(dateTmp)" label="วัน/เดือน/ปี" readonly></v-text-field>
                        <v-date-picker locale="th" v-model="dateTmp" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="breederDate.dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native="(breederDate.dialog=false)&&$refs.dialog.save(breederDate.date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                 
                    <v-select v-model="form.breed_type" :items="notNull(type)" item-text="choice" item-value="id" label="การให้น้ำเชื้อ"
                        persistent-hint return-object single-line></v-select>
              
                    <v-select v-if="check()||checks" v-model="form.maker" :items="notNull(maker)" item-text="choice" item-value="id"
                        label="ผู้ทำ" persistent-hint single-line></v-select>
                 <v-text-field v-if="form.maker ==  '080300'"   v-model="form.options.maker" slot="activator"  label="ผู้ทำอื่นๆ" ></v-text-field>
                    <v-textarea v-model="form.breed_detail" label="หมายเหตุ"></v-textarea>

                    <v-divider light></v-divider>
                    <v-btn v-if="!update" @click="createData()" large round class="box-green wh full-width">บันทึก</v-btn>
                    <v-btn v-else @click="updateData()" large round class="box-green wh full-width">บันทึก</v-btn>
                </v-container>
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
    export default {
        name: "Forms",
        data() {
            return {
                form: { maker:'',
                options:{
                    maker:'',
                } },
                breederDialog: {
                    on: false,
                },
                breederDate: { 
                    dialog: false,
                    date: null
                },
                maker: {},
                type: {},
                dateTmp: null,
                checks:0,
            }
        },
        computed: {
            dateTH: get('core/dateTH'),
            notNull: get('core/notNull'),
            setBreeder: get('manageDef/setBreeder'),
            loadBreeder: get('manageDef/breeder'),
        },
        props: {
            cattle: {},
            forms: {},
            update: null
        },
        async mounted() {
            await this.initial();
        },
        methods: {
            check() {
                    let y_check = false;
                    try {
                        if (this.form.breed_type.id == '240200' || this.form.breed_type == '240200') {
                            y_check = true;
                        } else {
                             y_check =  false;
                        }

                    } catch (error) {
                         y_check =  false;
                    }
                    this.checks = y_check;
 
            },
            checkMaker(){
     
                    try {
                        if (this.form.maker.id == '080300' || this.form.maker == '080300') {
                            return true;
                        } else {
                             return false;
                        }

                    } catch (error) {
                         return false;
                    } 
            },
            updateDialog() {
                this.form = this.forms
            },
            closeDialog() {
                if (this.update) {
                    this.form = this.forms;
                } else {

                    this.form = {};
                }
                this.breederDialog.on = false
            },
            createData: async function () {
                    if (this.form.breeding_date == null) {
                        this.form.breeding_date = moment().format("YYYY-MM-DD");
                    }
                    try {
                        this.form.breed_type = this.form.breed_type.id;
                        this.form.maker = this.form.maker.id;
                    } catch (error) {

                    }

                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/malebreed',
                        form: this.form
                    }
                    let create = await store.dispatch("manageDef/createData", params);
                    this.closeDialog();
                    this.load();
                },
                updateData: async function () {
                               
                        if (this.dateTmp != null) {
                            this.form.breeding_date = moment(this.dateTmp).format("YYYY-MM-DD");
                
                      }else{
                          delete this.form.breeding_date
                      }

                        try {
                            this.form.breed_type = this.form.breed_type.id;
                            this.form.maker = this.form.maker.id;
                        } catch (error) {

                        } 
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/malebreed/' + this.forms.id,
                            form: this.form
                        }
                        let create = await store.dispatch("manageDef/updateData", params);
                        this.closeDialog();
                        this.load();
                    },
                    removeData: async function (){ 
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/malebreed/' + this.forms.id,
                            form: this.form
                        }
                        let check = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้');
                       if(check){
                              let create = await store.dispatch("manageDef/removeData", params);
                        }
                   
                  
                        this.load();
                    },
                    load: async function () {
                            let params = {
                                api: 'farmer/cattles/' + this.cattle.id + '/malebreed',
                            }
                            let data = await store.dispatch("manageDef/getData", params);
                            this.setBreeder(data);
                        },
                        initial: async function () {
                            this.type = await store.dispatch("choice/getChoicesByType", 'การให้น้ำเชื้อ');
                            this.maker = await store.dispatch("choice/getChoicesByType", 'ผู้ทำ');
                          

                        }

        }
    }
</script>

<style scoped>

</style>