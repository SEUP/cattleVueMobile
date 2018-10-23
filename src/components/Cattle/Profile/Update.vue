<template>
    <v-card>
        <v-card-text v-if="form">
            <v-flex ma-3>
                <v-text-field hide-details label="ชื่อโค" v-model="form.name" :error-messages="error.name" required />
                <v-text-field label="เบอร์หู" v-model="form.ear_number" required />
                <v-text-field hide-details label="ชื่อ/เบอร์หู พ่อพันธุ์" v-model="form.male_breed_id" required />
                <v-text-field hide-details label="ชื่อ/เบอร์หู แม่พันธุ์" v-model="form.female_breed_id" required />
                <date-picker label="วัน/เดือน/ปี ที่เกิด" :valDate="form.birth_date" @change="sendDate($event)" />
                <v-layout>
                    <v-text-field label="อายุ" @change="ageChange(ages)" v-model="ages.Year" hide-details class="pb-1 pr-2"
                        suffix="ปี">

                    </v-text-field>
                    <v-text-field v-model="ages.Month" @change="ageChange(ages)" hide-details class="pb-1 pl-2" suffix="เดือน"></v-text-field>
                </v-layout>

                <choice to="พันธุ์โค" :remark="form.options.cattle_breeding" v-model="form.cattle_breeding" @change="form.options.cattle_breeding = $event" />
                <date-picker label="วัน/เดือน/ปี ที่่ซื้อ" :valDate="form.buy_date" v-model="form.buy_date" @change="form.buy_date = $event" />
                <choice to="แหล่งที่มา" :remark="form.options.cattle_source" v-model="form.cattle_source" @change="form.options.cattle_source = $event" />
                <v-text-field type="number" v-model="form.buy_price" required label="ราคาที่ซื้อ" hide-details suffix="บาท"
                    class="pb-1"></v-text-field>
                <v-text-field type="number" v-model="form.number_children" required label="จำนวนการให้ลูก" hide-details
                    suffix="ตัว" class="pb-1"></v-text-field>
                <v-text-field type="number" v-model="form.weight" required label="น้ำหนัก" hide-details suffix="กิโลกรัม"
                    class="pb-1"></v-text-field>
                <v-text-field type="number" v-model="form.chest" required label="รอบอก" hide-details suffix="เซนติเมตร"
                    class="pb-1"></v-text-field>
                <v-text-field type="number" v-model="form.height" required label="ความสูง" hide-details suffix="เซนติเมตร"
                    class="pb-1"></v-text-field>
                <v-text-field type="number" v-model="form.body_length" required label="ความยาวลำตัว" hide-details
                    suffix="เซนติเมตร" class="pb-1"></v-text-field>
            </v-flex>

        </v-card-text>
    </v-card>
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
        name: 'UpdateCattle',
        components: {
            Choice,
            DatePicker
        },
        computed: {
            farmer: get("farmer/farmer"),
            test: get("core/test"),
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
        },
        data() {
            return {
                    getCattle: {
          id: null,
        },
        form: null,
        dialog: false,
        ages: {Month: null, Year: null},
        defaultForm: null,
            }
        },
        props: {
            forms: {},
        },
        mounted() {
            this.load();
        },
        methods: {

            load: async function () {
                    this.form = this.forms

                },
                ageChange: async function (age) {
                    let today = new moment();
                    today.set('date', 1)
                    today.subtract(parseInt(age.Year), 'years');
                    today.subtract(parseInt(age.Month), 'months');

                    this.form.birth_date = today.format("YYYY-MM-DD")

                },
        }

    }
</script>