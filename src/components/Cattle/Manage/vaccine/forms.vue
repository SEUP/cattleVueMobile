<template>
    <v-content>
        <v-btn v-if="!update" round class="box-purple wh " @click="dialog.on = true"> + เพิ่มข้อมูล</v-btn>
        <v-btn v-else @click="(dialog.on = true)&&(form= forms)" round class="box-yellow">
            <h3>แก้ไข</h3>
        </v-btn>

        <v-btn v-if="update" @click="removeData()" round color="red" class="wh">
            <h3>ลบ</h3>
        </v-btn>
        <v-dialog v-model="dialog.on" persistent>
            <v-card>
                <v-container>
                    <h3>
                        <v-btn fab color="red" dark @click="closeDialog()">X</v-btn>การข้อมูลการผสมพันธุ์
                    </h3>
                    <v-divider light></v-divider>



                    <v-dialog ref="dialog0" v-model="datePicker[0].dialog" :return-value.sync="datePicker[0].date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" :value="dateTH(datePicker[0].date)" label="วัน/เดือน/ปี"
                            readonly></v-text-field>
                        <v-date-picker v-model="datePicker[0].date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="datePicker[0].dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native=" $refs.dialog0.save(datePicker[0].date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                 
                    <v-select v-model="form.maker" :items="notNull(items[0].key)" item-text="choice"  item-value="id"
                        :label="items[0].id" persistent-hint  single-line></v-select>


                    <v-select v-model="form.vaccine_type" :items="notNull(items[1].key)" item-text="choice" item-value="id"
                        :label="items[1].id" persistent-hint   single-line></v-select>


                    <v-text-field v-model="form.vaccine_set" label="ชุดการผลิตวัคซีน"></v-text-field>

                    <v-dialog ref="dialog1" v-model="datePicker[1].dialog" :return-value.sync="datePicker[1].date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" :value="dateTH(datePicker[1].date)" label="วัน/เดือน/ปี ที่ผลิต"
                            readonly></v-text-field>
                        <v-date-picker v-model="datePicker[1].date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="datePicker[1].dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native="$refs.dialog1.save(datePicker[1].date)" >OK</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog ref="dialog2" v-model="datePicker[2].dialog" :return-value.sync="datePicker[2].date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" :value="dateTH(datePicker[2].date)" label="วัน/เดือน/ปี ที่หมดอายุ"
                            readonly></v-text-field>
                        <v-date-picker v-model="datePicker[2].date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="datePicker[2].dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native=" $refs.dialog2.save(datePicker[2].date)">OK</v-btn>
                        </v-date-picker>

                    </v-dialog>
                    <v-btn v-if="!update" @click="createData()" large round class="box-green wh full-width">บันทึก</v-btn>
                    <v-btn v-else @click="updateData()" large round class="box-green wh full-width">แก้ไข</v-btn>


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
                dialog: {
                    on: false
                },
                form: {},
                tmp: {},
                /*******DatePicker***************/
                datePicker: [{
                        dialog: false,
                        date: null,
                    },
                    {
                        dialog: false,
                        date: null,
                    },
                    {
                        dialog: false,
                        date: null,
                    },
                ],
                /********************************/
                items: [{
                        id: 'ผู้ทำ',
                        key: {},
                    },
                    {
                        id: 'ชนิดวัคซีน',
                        key: {},
                    },
                ],
            }
        },
        computed: {
            dateTH: get('core/dateTH'),
            notNull: get('core/notNull'),
            setVaccine: get('manageDef/setVaccine'),
            loadVaccine: get('manageDef/vaccine'),
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

            updateDialog() {
                this.form = this.forms
            },
            closeDialog() {
                if (this.update) {
                    this.form = this.forms;
                } else {

                    this.form = {};
                }
                this.preDate();
                this.dialog.on = false
            },
            createData: async function () {
                    this.setDate();
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/vaccine',
                        form: this.form
                    }
                    let create = await store.dispatch("manageDef/createData", params);
                    this.closeDialog();
                    this.load();
                },
                updateData: async function () {
                        this.setDate();
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/vaccine/' + this.forms.id,
                            form: this.form
                        }
                        let create = await store.dispatch("manageDef/updateData", params);
                        this.closeDialog();
                        this.load();
                    },
                    removeData: async function () {
                            let params = {
                                api: 'farmer/cattles/' + this.cattle.id + '/vaccine/' + this.forms.id,
                                form: this.form
                            }
                            let check = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้');
                            if (check) {
                                let create = await store.dispatch("manageDef/removeData", params);
                            }


                            this.load();
                        },
                        load: async function () {
                                let params = {
                                    api: 'farmer/cattles/' + this.cattle.id + '/vaccine',
                                }
                                let data = await store.dispatch("manageDef/getData", params);
                                this.setVaccine(data);
                            },
                            setDate() {
                                this.form.vaccine_date = this.datePicker[0].date
                                this.form.exp_date = this.datePicker[1].date
                                this.form.mfg_date = this.datePicker[2].date
                                
                            },
                            preDate() {
                                if (this.update) {
                                    this.datePicker[0].date = this.forms.vaccine_date;
                                    this.datePicker[1].date = this.forms.exp_date;
                                    this.datePicker[2].date = this.forms.mfg_date;
                                } else {
                                    for (let index = 0; index < this.datePicker.length; index++) {
                                        this.datePicker[index].date = null;
                                    }
                                }
                            },
                            getSelect: async function (as) {

                                    return await this.tmp;
                                },
                                initial: async function () {
                                    this.preDate();
                                    for (let index = 0; index < this.items.length; index++) {
                                        this.items[index].key = await store.dispatch("choice/getChoicesByType",
                                            this.items[index].id);
                                    }

                                }

        }
    }
</script>

<style scoped>

</style>