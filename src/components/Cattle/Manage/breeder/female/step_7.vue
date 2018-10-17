<template>
    <v-content class="font">
        <ActionBar />
             <v-container class="bg-white">
            <pre v-if="debug">{{forms}}</pre>
            <div v-if="step=='1'">
                <center>
                    <h2>1. การเหนี่ยวนำ</h2>
                </center>
                <v-card class="pd-20">
                    <center>
                        <introductionBreeding to="การเหนี่ยวนำการเป็นสัด" :remark="form.options.induction" v-model="form.induction"
                            @change="form.options.induction = $event"></introductionBreeding>
                        <date-picker v-if="form.induction == '270100'" label="วัน/เดือน/ปี ที่เหนี่ยวนำ" :valDate='form.induction_date'
                            @change="form.induction_date = $event" />
                        <v-btn @click="save(2)" large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>

            <div v-if="step=='2'">
                <center>
                    <h2>2. การเป็นสัด</h2>
                </center>
                <v-card class="pd-20">
                    <center>
                        <date-picker label="วัน/เดือน/ปี ที่แสดงอาการเป็นสัด" :valDate="form.first_symptoms_date"
                            @change="form.first_symptoms_date=$event" />
                        <v-btn @click="change(1)" large round class="box-red"><b>กลับ</b></v-btn>
                        <v-btn @click="save(3)" large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>

            <div v-if="step=='3'">
                <center>
                    <h2>3. การผสมพันธุ์</h2>
                </center>
                <v-card class="pd-20">
                    <center>
                        <date-picker label='วัน/เดือน/ปี ที่ผสมพันธุ์' :valDate='form.breeding_date' v-model='form.breeding_date'
                            @change='form.breeding_date= $event' />

                        <v-text-field v-if="form.options.check_reversal_date" label="วันที่ควรตรวจการกลับสัด" v-model="form.options.check_reversal_date"
                            readonly hide-details class="pb-1 pr-2"></v-text-field>

                        <choice to="ประเภทการผสมพันธุ์" :remark="form.options.breed_type" v-model="form.breed_type"
                            @change="form.options.breed_type = $event" />
                        <!--ผสมตามธรรมชาติ-->
                        <template v-if="form.breed_type == '090100'">
                            <!--<date-picker label="วัน/เดือน/ปี ที่แสดงอาการเป็นสัด"-->
                            <!--:valDate="form.first_symptoms_date"-->
                            <!--@change="form.first_symptoms_date=$event" />-->
                            <v-layout>
                                <v-text-field label="หมายเลขพ่อพันธุ์" hide-details v-model="form.male_number"></v-text-field>
                                <v-text-field label="ชื่อโคพ่อพันธุ์" hint="*กรณีโคพ่อพันธุ์ไม่อยู่ในระบบให้ใส่ชื่อแทน"
                                    persistent-hint v-model="form.male_name"></v-text-field>
                            </v-layout>
                            <choice to="พันธุ์โค" :remark="form.options.male_breed" v-model="form.male_breed" @change="form.options.male_breed = $event" />
                            <v-text-field label="ค่าใช้จ่าย" suffix="บาท" v-model="form.charge"></v-text-field>


                        </template>

                        <template v-if="form.breed_type == '090200'">
                            รายละเอียดน้ำเชื้อพ่อพันธุ์
                            <v-layout>
                                <v-text-field label="ชื่อพ่อพันธุ์" hide-details v-model="form.male_name"></v-text-field>
                                <v-text-field label="เบอร์หูพ่อพันธุ์" v-model="form.male_number"></v-text-field>
                            </v-layout>
                            ข้อมูลหลอดน้ำเชื้อ
                            <choice to="พันธุ์โค" :remark="form.options.male_breed" v-model="form.male_breed" @change="form.options.male_breed = $event" />
                            <v-text-field label="เปอร์เซ็นต์เลือด" v-model="form.blood_percentage" type="number" />
                            <v-text-field label="ผลิตโดย" v-model="form.sperms_produced_by"></v-text-field>
                            <v-text-field label="ราคา" v-model="form.charge" suffix="บาท"></v-text-field>
     
                            <choice to="ผู้ให้บริการผสมเทียม" :remark="form.options.ivf_provider" v-model="form.ivf_provider"
                                @change="form.options.ivf_provider = $event" />
                        </template>
                        <v-btn @click="change(2)" large round class="box-red"><b>กลับ</b></v-btn>
                        <v-btn @click="save(4)" large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>

            <div v-if="step=='4'">
                <center>
                    <h2>4. ตรวจการกลับสัด</h2>
                </center>
                <v-card class="pd-20">
                    <center>
                      
                        <date-picker label="วัน/เดือน/ปี ที่ตรวจการกลับสัด" :valDate='form.reversal_date' @change="form.reversal_date = $event" />
                   <choice to="ผลการตรวจการกลับสัด" :remark="form.reversal" v-model="form.reversal" @change="form.options.reversal = $event"></choice>

                        <v-text-field v-if="form.reversal == '280100'" label="วันที่ควรตรวจท้อง" v-model="form.options.check_belly_date"
                            readonly hide-details class="pb-1 pr-2"></v-text-field>
                        <v-btn @click="change(3)" large round class="box-red"><b>กลับ</b></v-btn>
                        <v-btn @click="save(5)" large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>

            <div v-if="step=='5'">
                <center>
                    <h2>5. การตรวจท้อง</h2>
                </center>
                <v-card class="pd-20">
                    <center>
                        <date-picker label="วัน/เดือน/ปี ที่ตรวจท้อง" :valDate="form.check_date" v-model="form.check_date"
                            @change="form.check_date = $event" />
                        <choice to="ผลการตรวจการผสมพันธุ์" :remark="form.options.breeding_result" v-model="form.breeding_result"
                            @change="form.options.breeding_result = $event" />

                        <v-text-field v-if="form.breeding_result == '120100'" label="วันที่ควาดว่าจะคลอด" v-model="form.options.baby_date_birth"
                            readonly hide-details class="pb-1 pr-2"></v-text-field>
                        <v-btn @click="change(4)" large round class="box-red"><b>กลับ</b></v-btn>
                        <v-btn @click="save(6)" large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>

            <div v-if="step=='6'">
                <center>
                    <h2>6. ผลการคลอด</h2>
                </center>
                <v-card class="pd-20">  
                    <center>
                        <date-picker label="วัน/เดือน/ปี ที่คลอดจริง" :valDate="form.real_birth_date" v-model="form.real_birth_date"
                            @change="form.real_birth_date = $event" />
                      <choice to="ผลการคลอด" :remark="form.birth_outcomes" v-model="form.birth_outcomes" @change="form.options.birth_outcomes = $event" />
                        <v-btn @click="change(5)" large round class="box-red"><b>กลับ</b></v-btn>
                        <v-btn  @click="save(7)"  large round class="box-green"><b>ถัดไป</b></v-btn>
                    </center>
                </v-card>
            </div>






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

    export default {
        name: 'App',
        components: {
            ActionBar

        },
        data() {
            return {
                debug: true,
                form: {
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
                    "birth_outcomes": null,
                    "options": {
                        "reversal": "",
                        "induction": "",
                        "breed_type": "",
                        "ivf_provider": "",
                        "birth_outcomes": "",
                        "baby_date_birth": "",
                        "breeding_result": "",
                        "real_birth_date": "",
                        "check_belly_date": null,
                        "sperms_produced_by": "",
                        "check_reversal_date": null
                    }
                }
            }
        },
        props: {
            cattle: {}
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch("mobile/defaultActionBar", 'การผสมพันธุ์ (แม่พันธุ์)')
            next()
        },
        computed: {
            cattleChoose: get("cattle/cattleChoose"),
        },
        async mounted() {
            this.load();

        },
        methods: {
            load: async function () {
                this.form.cattle_id = this.cattleChoose.id;
            }
        }


    }
</script>