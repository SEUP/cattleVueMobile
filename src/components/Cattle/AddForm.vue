<template>
    <v-content> 
        <v-card>
            <v-container>
                <v-text-field v-model="form.name" label="ชื่อโค"></v-text-field>
                <v-text-field v-model="form.ear_number" label="เบอร์หู"></v-text-field>
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
                   <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="date2" persistent lazy full-width width="290px">
                    <v-text-field slot="activator" v-model="form.birth_date" label="วัน/เดือน/ปี เกิด" readonly></v-text-field>
                    <v-date-picker locale="th-th" date-format="dd-mm-yyyy" v-model="date2" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary"    @click="(modal2 = false)">ยกเลิก</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog2.save(date2)">ตกลง</v-btn>
                    </v-date-picker>
                </v-dialog>

                <v-text-field type="number" label="อายุ (ปี)"></v-text-field>
                <v-text-field type="number"  label="อายุ (เดือน)"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                    <v-text-field slot="activator" v-model="form.buy_date" label="วัน/เดือน/ปี ที่ซื้อ" 
                        readonly></v-text-field>
                    <v-date-picker v-model="form.buy_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary"@click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>

                <v-select v-model="form.cattle_source" :hint="`${notNull(cattle.type.choice)}, ${notNull(cattle.type.id)}`" :items="notNull(cattle_type)"
                    item-text="choice" item-value="id" label="แหล่งที่มา" persistent-hint return-object single-line></v-select>
                <v-text-field type="number" v-model="form.buy_price" label="ราคา (บาท)"></v-text-field>
            </v-container>
        </v-card>

        <v-card class="mrt-20">
            <v-container>
                <v-text-field type="number" v-model="form.weight"  label="น้ำหนัก (กิโลกรัม)"></v-text-field>
                <v-text-field type="number" v-model="form.chest"  label="รอบอก (เซนติเมตร)"></v-text-field>
                <v-text-field type="number" v-model="form.height"  label="ความสูง (เซนติเมตร)"></v-text-field>
                <v-text-field type="number" v-model="form.body_length"  label="ความยาวลำตัว (เซนติเมตร)"></v-text-field>
            </v-container>
        </v-card>

        <v-btn @click="create()" large round class="mrt-20 box-green" style="width:100%;"><v-icon>mdi-content-save</v-icon><h3>บันทึก</h3></v-btn> 
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    export default {
        name: "AddForm",
        data() {
            return {
                form: {
                    name:'',
                    type: {}
                },
                cattle_type: [],
                cattle:{
                    type:{}
                },
                date2:null,
                modal2:null,
                gd:'asdsd', 
                date:null,
                modal:null,
                
                
            }
        },
        computed: {
            getAge: get("cattle/getAge"),
        },
        props: {
             addData:{}
        },
        async mounted() {
            await this.initial();
        },
        methods: {
            setData(){
                this.form = this.addData; 
            },
            create:async function(){
                 this.form.cattle_source = this.form.cattle_source.id;
                 let c = await store.dispatch("cattle/createCattle", this.form); 
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
                let c = await store.dispatch("choice/getChoicesByType", 'แหล่งที่มา'); 
                this.cattle_type = c; 
                this.setData();  
            }

        }
    }
</script>

<style scoped>

</style>