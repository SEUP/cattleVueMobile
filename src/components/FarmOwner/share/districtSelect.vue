<template>
    <v-layout column wrap>
        <v-select
          :items="provinces"
          v-model="selProvince"
          return-object
          label="จังหวัด" item-text="province_name" @change="provinceChange"
          :error-messages="error.house_province"
        ></v-select>

        <v-select v-if="amphures"
                  :items="amphures"
                  return-object
                  v-model="selAmphure"
                  :error-messages="error.house_amphur"
                  label="อำเภอ" item-text="amphur_name" @change="amphureChange"
        ></v-select>

        <v-select v-if="districts"
                  :items="districts"
                  return-object
                  v-model="selDistrict"
                  :error-messages="error.house_district"
                  label="ตำบล" item-text="district_name" @change="districtChange"
        ></v-select>
    </v-layout>
</template>

<script>
  import Base from '../base'
  export default {
    extends : Base,
    name: "district-select",
    props: {
      valProvince: {
        type: Number,
        default: 0
      },
      valAmphur: {
        type: Number,
        default: 0
      },
      valDistrict: {
        type: Number,
        default: 0
      }
    },
    data() {
      let defaultProvince = {
        province_id: 0,
        province_name: "กรุณาเลือก",
      };

      let defaultAmphur = {
        amphur_id: 0,
        amphur_name: "กรุณาเลือก"
      };

      let defaultDistrict = {
        district_id: 0,
        district_name: "กรุณาเลือก"
      };
      return {
        defaultProvince: defaultProvince,
        defaultAmphur: defaultAmphur,
        defaultDistrict: defaultDistrict,
        provinces: [
          defaultProvince
        ],
        amphures: [
          defaultAmphur
        ],
        districts: [
          defaultDistrict
        ],
        selProvince: defaultProvince,
        selAmphure: defaultAmphur,
        selDistrict: defaultDistrict,
      }
    },
    async created() {
      let provinces = await this.$store.dispatch('admin/districtSelect/getProvinces');
      this.provinces = [this.defaultProvince].concat(provinces);
      await this.sync();

    },
    methods: {
      sync: function () {
        this.provinces.forEach((p) => {
          if (p.province_id == this.valProvince) {
            this.selProvince = p;
            this.provinceChange(p);
          }
        });
        this.amphures.forEach((a) => {
          if (a.amphur_id == this.valAmphur) {

            this.selAmphure = a;
            this.amphureChange(a);
          }
        });

        this.districts.forEach((d) => {
          if (d.district_id == this.valDistrict) {
            this.selDistrict = d;
            this.districtChange(d);
          }
        });
      },
      provinceChange: function (ev) {
        // console.log(ev)
        if (ev.amphurs) {
          this.amphures = [this.defaultAmphur].concat(ev.amphurs)
        } else {
          this.amphures = [this.defaultAmphur];
        }
        // this.selAmphure = this.defaultAmphur;
        // this.selDistrict = this.defaultDistrict;
        this.$emit('change', [ev, null, null])
      }

      , amphureChange: function (ev) {
        // console.log(ev)
        if (ev.districts) {
          this.districts = [this.defaultDistrict].concat(ev.districts)
        } else {
          this.districts = [this.defaultDistrict];
        }
        this.$emit('change', [this.selProvince, ev, null])
      }
      , districtChange: function (ev) {
        this.$emit('change', [this.selProvince, this.selAmphure, ev])
      }

    }
  }
</script>

<style scoped>

</style>
