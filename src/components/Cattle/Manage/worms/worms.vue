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

                        <v-btn @click="updateDialog(data)" class="box-yellow">
                            <h4>
                                <v-icon>mdi-pencil</v-icon>แก้ไขข้อมูล 
                            </h4>
                        </v-btn>
                        <v-btn @click="removeData(data)"   class="box-red">
                            <h4>
                                <v-icon>mdi-delete</v-icon>ลบข้อมูล 
                            </h4>
                        </v-btn>
                    </center>
                </v-card>
            </v-flex>

        </v-layout>

        <v-dialog v-model="dialog" scrollable :overlay="false" transition="dialog-transition">
            <v-card>
                <v-toolbar color="primary">
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h1 class="wh" v-if="!update">เพิ่มข้อมูล</h1>
                    <h1 class="wh" v-if="update">อัพเดทข้อมูล</h1>
                </v-toolbar>
                <v-container grid-list-xs>
                   <!---  {{form}} -->
                    <date-picker label="วัน/เดือน/ปี ที่ถ่ายพยาธิ" :valDate="form.worming_date" v-model="form.worming_date"
                        @change="form.worming_date = $event" />
                    <v-select v-model="form.maker" :items="notNull(maker)" item-text="choice" item-value="id" label="ผู้ทำ"
                        persistent-hint single-line></v-select>

                    <v-text-field v-if="form.maker == '080300'" name="name" v-model="form.options.maker" label="อื่นๆ"
                        id="id"></v-text-field>
                   <!--- {{form.worming_type}}  ---->
                    <v-select v-model="form.worming_type" :items="notNull(wormses)" item-text="choice" item-value="id"
                        label="ชนิดพยาธิ" persistent-hint single-line></v-select>

                    <v-text-field v-if="form.worming_type == '070500'" name="name" v-model="form.options.worming_type"
                        label="อื่นๆ" id="id"></v-text-field>



                </v-container>
                <center>
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
    import Forms from "@/components/Cattle/Manage/worms/forms";
    import DatePicker from "@/components/Share/DatePicker";
    import Choice from "@/components/Share/Choice";
    import multiSelectChoice from "@/components/Share/multiSelectChoice";
    export default {
        name: "ChangeType",
        data() {
            return {
                To: 'worming',
                dialog: false,
                maker: {},
                wormses: {},
                worms: {},
                form: {
                    options: {},
                    maker: '',
                },
                update: false,

            }
        },
        components: {
            Forms,
            DatePicker,
            Choice,
            multiSelectChoice
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

            openDialog: async function () {
                this.dialog = true;
            },

            closeDialog: async function () {
                this.dialog = false;
                this.getDefaultForm();
            },

            updateDialog: async function (params) {
                this.dialog = true;

                this.form = params;
                this.update = true;
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

                this.getDefaultForm();

            },

            getDefaultForm: async function () {

                this.wormses = await store.dispatch("choice/getChoicesByType", 'ชนิดพยาธิ');
                this.maker = await store.dispatch("choice/getChoicesByType", 'ผู้ทำ');
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/create',
                }

                this.form = await store.dispatch("manageDef/getForm", params);


            },
            updateData: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + this.form.id,
                    form: this.form
                }
                let c = await store.dispatch("manageDef/updateData", params);
                this.initial();
                this.closeDialog();
            },

            removeData: async function (data) {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/' + this.To + '/' + data.id,
                }
                this.form = await store.dispatch("manageDef/removeData", params);
                this.initial();
            },

        }
    }
</script>

<style scoped>

</style>