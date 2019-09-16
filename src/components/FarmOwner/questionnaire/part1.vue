<template>
  <div v-if="form">
    <v-layout column wrap>
      <v-flex xs12>

        <v-card-text class="pa-2 title">1.1 ข้อมูลทั่วไป</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="ชื่อ" placeholder="กรุณากรอกชื่อ"
                        v-model="form.firstname"
                        :error-messages="error.firstname"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="นามสกุล" placeholder="กรุณากรอกนามสกุล"
                        :error-messages="error.lastname"
                        v-model="form.lastname" @blur="updateForm"></v-text-field>
          <v-text-field label="รหัสประจำตัวประชาชน" placeholder="กรุณากรอกรหัสประจำตัวประชาชน"
                        :error-messages="error.personal_id"
                        v-model="form.personal_id" @blur="updateForm"></v-text-field>
        </div>

        <v-card-text class="pa-2 title">1.2 ที่อยู่ตามสำเนาทะเบียนบ้าน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="ที่อยู่" placeholder="บ้านเลขที่" v-model="form.house_address"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="หมู่" placeholder="หมู่" v-model="form.house_moo" @blur="updateForm"></v-text-field>

          <district-select class="mx-0"
                           :val-province="form.house_province"
                           :val-amphur="form.house_amphur"
                           :val-district="form.house_district"
                           @change="updateDistrictSelectHouse"
          >
          </district-select>
          <v-text-field label="รหัสไปรษณีย์" placeholder="รหัสไปรษณีย์" v-model="form.house_postcode"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="โทรศัพท์บ้าน" placeholder="โทรศัพท์บ้าน" v-model="form.house_phone"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="โทรศัพท์มือถือ" placeholder="โทรศัพท์มือถือ" v-model="form.mobile_no"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="Email" placeholder="Email" v-model="form.email" @blur="updateForm"></v-text-field>
        </div>

        <v-card-text class="pa-2 title">1.3 ที่อยู่ฟาร์ม</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="ที่ตั้งฟาร์มเลขที่" placeholder="ที่ตั้งฟาร์มเลขที่" v-model="form.farm_no"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="หมู่" placeholder="หมู่" v-model="form.farm_moo" @blur="updateForm"></v-text-field>
          <district-select class="mx-0"
                           :val-province="form.farm_province"
                           :val-amphur="form.farm_amphur"
                           :val-district="form.farm_district"
                           @change="updateDistrictSelectFarm"
          >
          </district-select>
        </div>

        <v-card-text class="pa-2 title">1.4 ตำแหน่งพิกัด GPS ของฟาร์ม</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="พิกัดฟาร์ม (lat)" placeholder="พิกัดฟาร์ม (lat)" v-model="form.farm_lat"
                        @blur="updateForm"></v-text-field>
          <v-text-field label="พิกัดฟาร์ม (lng)" placeholder="พิกัดฟาร์ม (lng)" v-model="form.farm_long"
                        @blur="updateForm"></v-text-field>
        </div>

        <v-card-text class="pa-2 title">1.5 สถานะทางครอบครัว</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="sex" label="เพศ" :value="form.sex" @change="form.sex = $event"></choice-select>
          <v-text-field label="อายุ" placeholder="อายุ" type="number" v-model="form.age" @blur="updateForm"
                        hide-details></v-text-field>
          <choice-select label="สถานภาพ" type="personal_status"
                         :value="form.personal_status"
                         @change="form.personal_status = $event">

          </choice-select>
          <choice-select label="สถานภาพในครอบครัว" type="family_status"
                         :value="form.family_status"
                         @change="form.family_status = $event">

          </choice-select>
        </div>
        <v-card-text class="pa-2 title">1.6 การศึกษา</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select label="การศึกษา" type="education" :value="form.education"
                         @change="form.education = $event">

          </choice-select>
        </div>

        <v-card-text class="pa-2 title">1.7 สถานภาพทางสังคม</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="social_status" label="สถานภาพทางสังคม"
                         :value="form.social_status"
                         @change="form.social_status = $event">

          </choice-select>
        </div>

        <v-card-text class="pa-2 title">1.8 การเลี้ยงโคเนื้อ</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="cattle_job" label="การเลี้ยงโคเนื้อเป็น"
                         :value="form.cattle_job"
                         @change="form.cattle_job = $event">

          </choice-select>
        </div>

        <v-card-text class="pa-2 title">1.9 ท่านมีรายได้จากการประกอบอาชีพอะไรบ้าง (เลือกได้มากกว่า 1 ข้อ)</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="jobtypes"
                            :value="form.jobtypes"
                            @change="form.jobtypes = $event"
          >
          </choice-check-box>
        </div>

        <v-card-text>1.10 ท่านมีรายได้รวมของครัวเรือนเฉลี่ยเท่าไหร่ (บาท/ปี)</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="income_range" label="ท่านมีรายได้รวมของครัวเรือนเฉลี่ยเท่าไหร่ (บาท/ปี)"
                         :value="form.income_range"
                         @change="form.income_range = $event">

          </choice-select>
        </div>

        <v-card-text class="pa-2 title">1.11 รายได้เฉลี่ยต่อปีของการขายโคเนื้อ (บาท)</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field placeholder="รายได้เฉลี่ยต่อปีของการขายโคเนื้อ (บาท)"
                        label="รายได้เฉลี่ยต่อปีของการขายโคเนื้อ (บาท)"
                        hint="*หากยังไม่มีรายได้จากการขายโคเนื้อ ให้เว้นว่างช่องนี้ไว้"
                        persistent-hint type="number"
                        v-model="form.avg_cattle_income"
                        @blur="updateForm"
          ></v-text-field>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Base from "../base";
  import DistrictSelect from "../share/districtSelect";
  import ChoiceSelect from "../share/choiceSelect";
  import ChoiceCheckBox from "../share/choiceCheckBox";

  export default {
    name: "part1",
    extends: Base,
    components: {ChoiceCheckBox, ChoiceSelect, DistrictSelect},
    data: () => ({
      form: undefined
    }),
    async created() {
      this.form = await this.$store.state.admin.farmOwners.farmOwner
    },
    methods: {
      updateDistrictSelectHouse: function (value) {
        this.form.house_province = value[0];
        this.form.house_amphur = value[1];
        this.form.house_district = value[2];

        if (value[0]) {
          this.form.house_province = value[0].province_id;
        }
        if (value[1]) {
          this.form.house_amphur = value[1].amphur_id;
        }
        if (value[2]) {
          this.form.house_district = value[2].district_id;
        }
        this.updateForm()
      }
      , updateDistrictSelectFarm: function (value) {
        this.form.farm_province = value[0];
        this.form.farm_amphur = value[1];
        this.form.farm_district = value[2];

        if (value[0]) {
          this.form.farm_province = value[0].province_id;
        }
        if (value[1]) {
          this.form.farm_amphur = value[1].amphur_id;
        }
        if (value[2]) {
          this.form.farm_district = value[2].district_id;
        }
        this.updateForm()
      },
      updateForm: async function () {
        await this.$store.dispatch("admin/farmOwners/updateState", this.form)
        let data = await this.$store.state.admin.farmOwners.farmOwner
      }
    }
  }
</script>

<style scoped>

</style>
