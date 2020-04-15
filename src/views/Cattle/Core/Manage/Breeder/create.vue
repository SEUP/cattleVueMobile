<template>
    <v-content class="font">
        <ActionBar/>

        <v-container class="bg-white" v-if="responseFrom">

            <v-stepper v-model="form.status_id">
                <v-stepper-header>
                    <v-stepper-step :complete="form.status_id > 1 " step="1">
                        การเหนี่ยวนำ
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>

                    <v-stepper-step :complete="form.status_id > 2" step="2">
                        การเป็นสัด
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>

                    <v-stepper-step :complete="form.status_id > 3" step="3">
                        การผสมพันธุ์
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>

                    <v-stepper-step :complete="form.status_id > 4" step="4">
                        ตรวจการกลับสัด
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>
                    <v-stepper-step :complete="form.status_id > 5" step="5">
                        การตรวจท้อง
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>

                    <v-stepper-step :complete="form.status_id > 6" step="6">
                        ผลการคลอด
                        <!--<small>Summarize if needed</small>-->
                    </v-stepper-step>
                </v-stepper-header>


                <v-stepper-content step="1">
                    <v-card class="elevation-0">
                        {{form.options.induction}}
                        <introductionBreeding to="การเหนี่ยวนำการเป็นสัด" :remark="form.options.induction"
                                              v-model="form.induction"
                                              @change="form.options.induction = $event"></introductionBreeding>
                        <date-picker v-if="form.induction == '270100'" label="วัน/เดือน/ปี ที่เหนี่ยวนำ"
                                     :valDate='form.induction_date'
                                     @change="form.induction_date = $event"
                        />

                    </v-card>
                    <v-btn color="primary" @click="changeStep(2)">ต่อไป</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-card class="elevation-0">
                        <date-picker label="วัน/เดือน/ปี ที่แสดงอาการเป็นสัด"
                                     :valDate="form.first_symptoms_date"
                                     @change="form.first_symptoms_date=$event"/>
                    </v-card>
                    <v-btn color="" @click="form.status_id = 1">ย้อนกลับ</v-btn>
                    <v-btn color="primary" @click="changeStep(3)">ต่อไป</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card class="elevation-0">
                        <date-picker label="วัน/เดือน/ปี ที่ผสม" :valDate='form.breeding_date'
                                     @change="babyBirthday($event)"
                        />
                        <!-----------------------วันที่ควรตรวจการกลับสัด-------------------------------->
                        <v-text-field label="วันที่ควรตรวจการกลับสัด" :value="dateback()"
                                      readonly hide-details
                                      class="pb-1 pr-2"></v-text-field>

                        <choice to="ประเภทการผสมพันธุ์" :remark="form.options.breed_type"
                                v-model="form.breed_type"
                                @change="form.options.breed_type = $event"/>
                        <!--ผสมตามธรรมชาติ-->
                        <template v-if="form.breed_type == '090100'">
                            <!--<date-picker label="วัน/เดือน/ปี ที่แสดงอาการเป็นสัด"-->
                            <!--:valDate="form.first_symptoms_date"-->
                            <!--@change="form.first_symptoms_date=$event" />-->
                            <v-layout>
                                <v-text-field label="หมายเลขพ่อพันธุ์" hide-details
                                              v-model="form.male_number"></v-text-field>
                                <v-text-field label="ชื่อโคพ่อพันธุ์" hint="*กรณีโคพ่อพันธุ์ไม่อยู่ในระบบให้ใส่ชื่อแทน"
                                              persistent-hint
                                              v-model="form.male_name"></v-text-field>
                            </v-layout>
                            <choice to="พันธุ์โค" v-if="form.male_breed" :remark="form.options.male_breed"
                                    v-model="form.male_breed"
                                    @change="form.options.male_breed = $event"/>
                            <v-text-field label="ค่าใช้จ่าย" suffix="บาท" v-model="form.charge"></v-text-field>


                        </template>

                        <template v-if="form.breed_type == '090200'">
                            รายละเอียดน้ำเชื้อพ่อพันธุ์
                            <v-layout>
                                <v-text-field label="ชื่อพ่อพันธุ์" hide-details
                                              v-model="form.male_name"></v-text-field>
                                <v-text-field label="เบอร์หูพ่อพันธุ์" v-model="form.male_number"></v-text-field>
                            </v-layout>
                            ข้อมูลหลอดน้ำเชื้อ
                            <choice to="พันธุ์โค" v-if="form.male_breed" :remark="form.options.male_breed"
                                    v-model="form.male_breed"
                                    @change="form.options.male_breed = $event"/>
                            <v-text-field label="เปอร์เซ็นต์เลือด" v-model="form.blood_percentage" type="number"/>
                            <v-text-field label="ผลิตโดย" v-model="form.sperms_produced_by"></v-text-field>
                            <v-text-field label="ราคา" v-model="form.charge" suffix="บาท"></v-text-field>

                            <choice to="ผู้ให้บริการผสมเทียม" v-if="form.ivf_provider"
                                    :remark="form.options.ivf_provider"
                                    v-model="form.ivf_provider"
                                    @change="form.options.ivf_provider = $event"/>
                        </template>
                    </v-card>
                    <v-btn color="" @click="form.status_id = 2">ย้อนกลับ</v-btn>
                    <v-btn color="primary" @click="changeStep(4)">ต่อไป</v-btn>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card class="elevation-0">
                        <date-picker label="วัน/เดือน/ปี ที่ตรวจการกลับสัด" :valDate='form.reversal_date'
                                     @change="form.reversal_date = $event"
                        />
                        <choice to="ผลการตรวจการกลับสัด" :remark="form.reversal"
                                v-model="form.reversal"
                                @change="form.options.reversal = $event"></choice>
                        <!-----------------------วันที่ควรตรวจท้อง-------------------------------->
                        <v-text-field v-if="form.reversal == '280100'" label="วันที่ควรตรวจท้อง"
                                      :value="checkBellyDay()" readonly hide-details
                                      class="pb-1 pr-2"></v-text-field>

                    </v-card>
                    <div v-if="form.reversal == '280200'">กรุณาบันทึก เเละผสมพันธุ์ใหม่</div>
                    <div v-if="form.reversal == '280200'">กรุณาบันทึก เเละผสมพันธุ์ใหม่</div>

                    <v-btn color="" @click="form.status_id = 3">ย้อนกลับ</v-btn>
                    <v-btn v-if="form.reversal == '280100'" color="primary" @click="changeStep(5)">ต่อไป</v-btn>

                </v-stepper-content>
                <v-stepper-content step="5">
                    <v-card class="elevation-0">
                        <date-picker label="วัน/เดือน/ปี ที่ตรวจท้อง" :valDate="form.check_date"
                                     v-model="form.check_date"
                                     @change="form.check_date = $event"/>
                        <choice to="ผลการตรวจการผสมพันธุ์" :remark="form.options.breeding_result"
                                v-model="form.breeding_result"
                                @change="form.options.breeding_result = $event"/>

                        <!-----------------------วันที่ควาดว่าจะคลอด   v-model="form.options.baby_date_birth"-------------------------------->
                        <v-text-field v-if="form.breeding_result == '120100'" label="วันที่ควาดว่าจะคลอด"
                                      :value="baby()" readonly hide-details
                                      class="pb-1 pr-2"></v-text-field>

                    </v-card>
                    <div v-if="form.breeding_result == '120200'">กรุณาบันทึก เเละผสมพันธุ์ใหม่</div>
                    <v-btn color="" @click="form.status_id = 4">ย้อนกลับ</v-btn>
                    <v-btn v-if="form.breeding_result == '120100'" color="primary" @click="changeStep(6)">ต่อไป</v-btn>
                </v-stepper-content>
                <v-stepper-content step="6">
                    <v-card class="elevation-0">
                        <!--ผลการคลอด-->
                        <div class="pt-3">
                            <!--<v-card-text class="pa-0 font-weight-bold">ผลการคลอด</v-card-text>-->
                            <date-picker label="วัน/เดือน/ปี ที่คลอดจริง" :valDate="form.real_birth_date"
                                         v-model="form.real_birth_date"
                                         @change="form.real_birth_date = $event"/>
                            <choice to="ผลการคลอด" :remark="form.birth_outcomes"
                                    v-model="form.birth_outcomes"
                                    @change="form.options.birth_outcomes = $event"/>
                        </div>
                    </v-card>
                    <v-btn color="" @click="form.status_id = 5">ย้อนกลับ</v-btn>
                    <v-btn color="primary" @click="changeStep(7)">ต่อไป</v-btn>
                </v-stepper-content>
            </v-stepper>


        </v-container>

    </v-content>

</template>


<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import ActionBar from "@/components/Menu/ActionBar";
    import DatePicker from "@/components/Share/DatePicker";
    import Choice from "@/components/Share/Choice";
    import introductionBreeding from "@/components/Share/introductionBreeding";

    import moment from "moment"

    export default {
        name: 'App',
        components: {
            ActionBar, DatePicker, Choice, introductionBreeding

        },
        data() {
            return {
                debug: true,
                dateBack: '',
                dateOut: '',
                responseFrom: false,
                form: {

                    "options": {
                        "check_reversal_date": '',
                        "options.check_reversal_date": '',
                    },
                }
                /* form: {
                     "cattle_id": null,
                     "status_id": 1,
                     "time_at": null,
                     "breed_type": null,
                     "first_symptoms_date": null,
                     "breeding_date": null,
                     "male_number": null,
                     "male_name": null,
                     "male_breed": null,
                     "charge": null,
                     "sperms_produced_by": null,
                     "blood_percentage": null,
                     "reversal": null,
                     "reversal_date": null,
                     "induction": null,
                     "induction_date": null,
                     "check_date": null,
                     "ivf_provider": null,
                     "breeding_result": null,
                     "real_birth_date": null,
                     "birth_outcomes": '',
                     "options": {
                         "check_reversal_date":'',
                         "options.check_reversal_date":'',
                     }*/

            }
        },
        props: {
            cattle: {},
            forms: {},
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch("mobile/defaultActionBar", 'การผสมพันธุ์ (แม่พันธุ์)')
            next()
        },
        computed: {
            cattleChoose: get("cattle/cattleChoose"),
            getThaiFormatDate: get('choice/getThaiFormatDate'),
            dateTH: get('core/dateTH')
        },
        async mounted() {
            await this.load();
        },

        methods: {

            baby() {
                let date = this.form.breeding_date;
                if (date) {
                    let day1 = 282 - 4
                    let day2 = 282 + 4

                    let breedDate = moment(date);
                    let bd1 = moment(date).add(day1, 'days')
                    let bd2 = moment(date).add(day2, 'days')

                    bd1 = this.dateTH(bd1.toDate())
                    bd2 = this.dateTH(bd2.toDate())

                    return `${bd1} ถึง ${bd2}`
                }
            },


            checkBellyDay() {
                let date = this.form.breeding_date;
                if (date) {
                    let day1 = 42
                    let day2 = 45

                    let breedDate = moment(date);
                    let bd1 = moment(date).add(day1, 'days')
                    let bd2 = moment(date).add(day2, 'days')

                    bd1 = this.dateTH(bd1.toDate())
                    bd2 = this.dateTH(bd2.toDate())

                    //this.form.options.check_belly_date = `${bd1} ถึง ${bd2}`
                    return `${bd1} ถึง ${bd2}`
                }
            },
            getDefaultForm: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed/create',
                }
                try {
                    this.form = await store.dispatch("manageDef/getForm", params);
                } catch (error) {

                }

            },

            //วันที่คาดว่ากลับสัด
            dateback() {
                let date = this.form.breeding_date;
                let day1 = 21;

                let breedDate = moment(date);
                let bd1 = moment(date).add(day1, 'days')
                bd1 = this.dateTH(bd1);
                if (bd1 != 'Invalid date') {

                    // this.form.options.check_reversal_date = bd1;
                    return bd1;
                } else {
                    return '';
                }

            },
            load: async function () {
                this.form.cattle_id = this.cattleChoose.id;
                if (this.forms) {
                    await this.getDefaultForm();
                    await this.setForm(this.forms);

                } else {
                    await this.getDefaultForm();
                }

                await this.displaySteper()

            },

            async displaySteper() {
                this.responseFrom = true;
            },
            async setForm(form) {
                this.form = form;
                this.form.status_id = 1
            },
            changechange(step) {
                this.form.status_id = step;
            },
            changeStep: async function (step) {
                let params = {
                    api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed',
                    form: this.form
                }
                if (typeof (params.form.options) === typeof ("")) {
                    params.form.options = JSON.parse(params.form.options)
                } else {

                    console.log("in View else ", params)
                }
                console.log("jooj", params)

                let create = await store.dispatch("manageDef/createData", params);
                this.form = create;
                this.form.cattle_id = this.cattleChoose.id;
                this.form.status_id = step;
                if (this.form.status_id == '7') {
                    this.$router.go(-1);
                }
            },
            babyBirthday: async function (date) {

                this.checkReversalDate(date)
                //this.checkBellyDay(date)
                this.form.breeding_date = date;
                if (date) {
                    let day1 = 282 - 4
                    let day2 = 282 + 4

                    let breedDate = moment(date);
                    let bd1 = moment(date).add(day1, 'days')
                    let bd2 = moment(date).add(day2, 'days')

                    bd1 = this.getThaiFormatDate(bd1.toDate())
                    bd2 = this.getThaiFormatDate(bd2.toDate())

                    this.form.options.baby_date_birth = `${bd1} ถึง ${bd2}`
                }
            },
            /*  checkBellyDay: async function (date) {
                // this.form.breeding_date = date;
                if (date) {
                  let day1 = 42
                  let day2 = 45

                  let breedDate = moment(date);
                  let bd1 = moment(date).add(day1, 'days')
                  let bd2 = moment(date).add(day2, 'days')

                  bd1 = this.getThaiFormatDate(bd1.toDate())
                  bd2 = this.getThaiFormatDate(bd2.toDate())

                  this.form.options.check_belly_date = `${bd1} ถึง ${bd2}`
                }
              },*/
            checkReversalDate: async function (date) {
                //this.form.options.check_reversal_date = date;
                if (date) {
                    let day1 = 21
                    // let day2 = 282 + 4

                    let breedDate = moment(date);
                    let bd1 = moment(date).add(day1, 'days')
                    // let bd2 = moment(date).add(day2, 'days')

                    bd1 = this.getThaiFormatDate(bd1.toDate())
                    // bd2 = this.getThaiFormatDate(bd2.toDate())

                    this.form.options.check_reversal_date = `${bd1}`
                }
            },
        }


    }
</script>