<template>
  <v-card>
    <v-card-title>
      <h2 class="font">สมัครสมาชิก</h2>
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="register()">
        <v-text-field required v-model="form.personal_id" label="รหัสบัตรประจำตัวประชาชน" />
        <v-text-field v-model="form.username" label="ชื่อผู้ใช้" required />
        <v-text-field v-model="form.email" label="อีเมล์" type="email" />
        <v-text-field type="password" v-model="form.password" label="รหัสผ่าน" required />
        <v-text-field
          type="password"
          v-model="form.password_confirmation"
          label="ยืนยันรหัสผ่าน"
          required
        />
        <v-text-field required  v-model="form.phone_number" label="เบอร์โทร" />
        <v-text-field v-model="form.firstname" label="ชื่อ" required />
        <v-text-field v-model="form.lastname" label="นามสกุล" required />

        <district-select
          v-if="form"
          @change="updateDistrictSelect"
          :valProvince="form.house_province"
          :valAmphur="form.house_amphur"
          :valDistrict="44"
        ></district-select>

        <v-text-field label="รหัสไปรษณีย์" v-model="form.house_zipcode" hide-details />
        <br />
        <v-btn replace block round color="primary" type="submit">
          <v-icon></v-icon>สมัครสมาชิก
        </v-btn>
      </form>

      <v-btn to="/" replace block round color="success">
        <v-icon></v-icon>กลับไปหน้าเข้าสู่ระบบ
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style>
.border {
  border-radius: 5%;
  background: rgba(255, 255, 255, 0.5) !important;
}

.circle {
  border-radius: 6%;
}
</style>

<script>
import { sync, call } from "vuex-pathify";
import DistrictSelect from "../Share/DistrictSelect";
export default {
  name: "Register",
  components: {
    DistrictSelect
  },
  computed: {},
  data: () => ({
    dialog: false,
    form: {}
   
  }),
  created() {},
  mounted() {},
  methods: {
    formValidate: async function() {
      let province = this.form.house_province != 0;
      let amphur = this.form.house_amphur != 0;
      let district = this.form.house_district != null;
      return province && amphur && district;
    },
    register: async function() {
      let validateForm = await this.formValidate();
      if (validateForm) {
        let result = await this.$store.dispatch("login/register", this.form);
         
        if (!result.error) {
          alert("สร้างผู้ใช้สำเสร็จ");
          this.$router.replace({
            name: "main"
          });
        } else {
          alert( result.error.message);
        }
      } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } 
    },
    updateDistrictSelect: function(value) {
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
    }
  },
  watch: {}
};
</script>
