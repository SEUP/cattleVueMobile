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
                    <h2>อาการ</h2>
                     <v-dialog ref="dialog0" v-model="datePicker[0].dialog" :return-value.sync="datePicker[0].date"
                        persistent lazy full-width width="290px">
                        <v-text-field slot="activator" :value="dateTH(datePicker[0].date)" :label="datePicker[0].key"
                            readonly></v-text-field>
                        <v-date-picker v-model="datePicker[0].date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="datePicker[0].dialog = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native=" $refs.dialog0.save(datePicker[0].date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <hr>
                    <h2>การรักษา</h2>
                    <v-dialog ref="dialog1" v-model="datePicker[1].dialog" :return-value.sync="datePicker[1].date"
                       persistent lazy full-width width="290px">
                       <v-text-field slot="activator" :value="dateTH(datePicker[1].date)" :label="datePicker[1].key"
                           readonly></v-text-field>
                       <v-date-picker v-model="datePicker[1].date" scrollable>
                           <v-spacer></v-spacer>
                           <v-btn flat color="primary" @click="datePicker[1].dialog = false">Cancel</v-btn>
                           <v-btn flat color="primary" @click.native=" $refs.dialog1.save(datePicker[1].date)">OK</v-btn>
                       </v-date-picker>
                   </v-dialog>

                    <hr>
                    <h2>ผลการรักษา</h2>
                    <v-dialog ref="dialog2" v-model="datePicker[2].dialog" :return-value.sync="datePicker[2].date"
                       persistent lazy full-width width="290px">
                       <v-text-field slot="activator" :value="dateTH(datePicker[2].date)" :label="datePicker[2].key"
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
                form: {},
                dialog: {
                    on: false
                },
                /*******DatePicker***************/
                datePicker: [
                    { key:'วัน/เดือน/ปี ที่สังเกตเห็นอาการ',
                    dialog: false,
                    date: null,},
                    { key:'วัน/เดือน/ปี ที่รักษา',
                    dialog: false,
                    date: null,},
                    { key:'วัน/เดือน/ปี ตรวจอาการอีกครั้ง',
                    dialog: false,
                    date: null,},
                ],
                /********************************/
                items: [{
                        id: 'กลุ่มอาการ',
                        key: {},
                    },
                    {
                        id: 'โรค',
                        key: {},
                    },
                     {
                        id: 'ผู้รักษา',
                        key: {},
                    },
                     {
                        id: 'ผลการรักษา',
                        key: {},
                    },
                ],
            }
        },
        computed: {
            dateTH: get('core/dateTH'),
            notNull: get('core/notNull'),
            setData: get('manageDef/setWorms'),
            data: get('manageDef/worms'),
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
                    this.form.options = { worming_type: "",
                                            maker: ""}
                    this.form.worming_type = [this.form.worming_type];
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/worming',
                        form: this.form
                    }
                    let create = await store.dispatch("manageDef/createData", params);
                    this.closeDialog();
                    this.load();
                },
                updateData: async function () {
                        this.setDate();
                          this.form.options = { worming_type: "",
                                            maker: ""}
                    this.form.worming_type = [this.form.worming_type];
                        let params = {
                            api: 'farmer/cattles/' + this.cattle.id + '/worming/' + this.forms.id,
                            form: this.form
                        }
                        let create = await store.dispatch("manageDef/updateData", params);
                        this.closeDialog();
                        this.load();
                    },
                    removeData: async function () {
                            let params = {
                                api: 'farmer/cattles/' + this.cattle.id + '/worming/' + this.forms.id,
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
                                    api: 'farmer/cattles/' + this.cattle.id + '/worming',
                                }
                                let data = await store.dispatch("manageDef/getData", params);
                                this.setData(data);
                            },
                            setDate() {
                                if (this.datePicker[0].date == null) {
                                    this.form.worming_date = moment();
                                } else {
                                    this.form.worming_date = this.datePicker[0].date
                                }

                            },
                            preDate() {
                                if (this.update) {
                                    this.datePicker[0].date = this.forms.worming_date;
                                } else {
                                    for (let index = 0; index < this.datePicker.length; index++) {
                                        this.datePicker[index].date = null;
                                    }
                                }
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