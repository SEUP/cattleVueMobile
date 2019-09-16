<template>
  <div>
    <v-layout class="pa-0 ma-0">
      <v-flex xs12 md4 mr-2>
        <v-select
          hide-details
          :items="provinces"
          return-object
          v-model="selProvince"
          label="จังหวัด" item-text="province_name" @change="provinceChange"
        ></v-select>
      </v-flex>

      <v-flex xs12 md4 mx-2>
        <v-select v-if="amphures"
                  hide-details
                  :items="amphures"
                  return-object
                  v-model="selAmphure"
                  label="อำเภอ" item-text="amphur_name" @change="amphureChange"
        ></v-select>
      </v-flex>

      <v-flex xs12 md4 ml-2>
        <v-select v-if="districts"
                  hide-details
                  :items="districts"
                  return-object
                  v-model="selDistrict"
                  label="ตำบล" item-text="district_name" @change="districtChange"
        ></v-select>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
    export default {
        name: "districtSelectSingleLine",
        props: {
            valProvince: {
                type: [Number, Boolean],
                default: 0
            },
            valAmphur: {
                type: [Number, Boolean],
                default: 0
            },
            valDistrict: {
                type: [Number, Boolean],
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
            // await console.log(this.valProvince);
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
                    this.districts = [this.defaultDistrict];
                } else {
                    this.amphures = [this.defaultAmphur];
                    this.districts = [this.defaultDistrict];

                }
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
