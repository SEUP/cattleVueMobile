<template>
    <v-content>

        <v-card>
            <v-container>
              
                <v-text-field v-model="form.name" label="ชื่อโค"></v-text-field>
                <v-text-field v-model="form.ear_number" label="เบอร์หู"></v-text-field>

                <choice to="พันธุ์โค" :remark="form.options.cattle_breeding" v-model="form.cattle_breeding" @change="form.options.cattle_breeding = $event" />

                <v-text-field v-model="form.number_children" v-if="form.cattle_type=='020200'" type="number" label="จำนวนการให้ลูก"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-text-field v-model="form.male_breed_id" label="ชื่อ/เบอร์หู พ่อพันธุ์"></v-text-field>
                <v-text-field v-model="form.female_breed_id" label="ชื่อ/เบอร์หู แม่พันธุ์"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-dialog ref="dialog" v-model="birthDate.dialog" :return-value.sync="birthDate.date" persistent lazy
                    full-width width="290px">
                    <v-text-field slot="activator" :value="dateTH(form.birth_date)" label="วัน/เดือน/ปี เกิด" readonly></v-text-field>
                    <v-date-picker v-model="form.birth_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="birthDate.dialog = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="getOlds()" @click.native="(birthDate.dialog=false)&&($refs.dialog.save(birthDate.date))">OK</v-btn>
                    </v-date-picker>
                </v-dialog>

                <v-text-field @change="ageChange()" v-model="birthDate.year" label="อายุ (ปี)"></v-text-field>
                <v-text-field @change="ageChange()" v-model="birthDate.month" label="อายุ (เดือน)"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-dialog ref="dialog" v-model="sellDate.dialog" :return-value.sync="sellDate.date" persistent lazy
                    full-width width="290px">
                    <v-text-field slot="activator" :value="dateTH(form.buy_date)" label="วัน/เดือน/ปี ที่ซื้อ" readonly></v-text-field>
                    <v-date-picker v-model="form.buy_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="sellDate.dialog = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click.native="(sellDate.dialog=false)&&$refs.dialog.save(sellDate.date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>


                <choice to="แหล่งที่มา" :remark="form.options.cattle_source" v-model="form.cattle_source" @change="form.options.cattle_source = $event" />
 
                <v-text-field type="number" v-model="form.buy_price" label="ราคา (บาท)"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-text-field type="number" v-model="form.weight" label="น้ำหนัก (กิโลกรัม)"></v-text-field>
                <v-text-field type="number" v-model="form.chest" label="รอบอก (เซนติเมตร)"></v-text-field>
                <v-text-field type="number" v-model="form.height" label="ความสูง (เซนติเมตร)"></v-text-field>
                <v-text-field type="number" v-model="form.body_length" label="ความยาวลำตัว (เซนติเมตร)"></v-text-field>
            </v-container>
        </v-card>

        <v-btn @click="create()" v-if="!form.update" large round class="mrt-20 box-green" style="width:100%;">
            <v-icon>mdi-content-save</v-icon>
            <h3>บันทึก</h3>
        </v-btn>
        <v-btn @click="update()" v-else large round class="mrt-20 box-yellow" style="width:100%;">
            <v-icon>mdi-content-save</v-icon>
            <h3>อัพเดทข้อมูล</h3>
        </v-btn>
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
        name: "AddForm",
        components: {
            Choice,
            DatePicker
        },
        data() {
            return {
                form: {
              
                },
                cattle_type: [],
                cattle_sex: [],
                cattle: {
                    type: {}
                },

                birthDate: {
                    dialog: false,
                    date: null,
                    year: null,
                    month: null
                },

                sellDate: {
                    dialog: false,
                    date: null
                }

            }
        },
        computed: {
             farmer: get("farmer/farmer"),
            test: get("core/test"),
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH')
        },
        props: {
            addData: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {

            getOlds() {
                let today = new moment();
                let birthdate = moment(this.form.birth_date).format("YYYY-MM-DD");
                this.birthDate.year = today.diff(birthdate, 'years')
                this.birthDate.month = today.diff(birthdate, 'month') % 12

                if(isNaN(this.birthDate.year) ){
                    
                     this.birthDate.year =0;
                }
                if(isNaN( this.birthDate.month )){
                     this.birthDate.month =0;
                }

            },
            ageChange: async function () {
                    let today = new moment();
                    today.set('date', 1)
                    today.subtract(parseInt(this.birthDate.year), 'years');
                    today.subtract(parseInt(this.birthDate.month), 'months');

                    this.form.birth_date = today.format("YYYY-MM-DD")

                },


                setData() {
                    this.form = this.addData;
                },
                create: async function () {
                       
                        let c = await store.dispatch("cattle/createCattle", this.form);
                        this.$router.go(-1);
                    },
                    update: async function () {
                            this.form.cattle_source = this.form.cattle_source.id;
                            this.form.cattle_breeding = this.form.cattle_breeding.id;
                            let c = await store.dispatch("cattle/updateCattle", this.form);
                            this.$router.go(-1);
                        },
                        notNull(data) {
                            if (data == null) {
                                return 'ยังไม่มีข้อมูล';
                            } else {
                                return data;
                            }
                        },
                        initial: async function () {
                                this.cattle_type = await store.dispatch("choice/getChoicesByType", 'แหล่งที่มา');
                                this.cattle_sex = await store.dispatch("choice/getChoicesByType", 'พันธุ์โค');
                                console.log(this.cattle_sex);
                                   this.getDefaultForm();
                                 this.setData();
                         
                                this.getOlds();
                             
                            },
                            getDefaultForm: async function () {  
                                    let params = {
                                        api: 'farmer/farmer/' + this.farmer.id + '/cattles/create',
                                    }
                                    try {
                                        this.form = await store.dispatch("manageDef/getForm", params);
                                    } catch (error) {

                                    }

                                    

                                },

        }
    }
</script>

<style scoped>

</style>