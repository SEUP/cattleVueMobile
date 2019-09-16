<template>
  <div>
    <v-select
      hide-details
      :items="provinces"
      v-model="selProvince"
      return-object
      label="จังหวัด" item-text="province_name" @change="provinceChange"/>
  </div>
</template>

<script>
  export default {
    name: "provinceSelect",
    props: {
      valProvince: {
        type: Number,
        default: 0
      },
    },
    data() {
      let defaultProvince = {
        province_id: 0,
        province_name: "กรุณาเลือก",
      };

      return {
        defaultProvince: defaultProvince,
        provinces: [
          defaultProvince
        ],
        selProvince: defaultProvince,
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
      },
      provinceChange: function (ev) {
        // console.log(ev)
        this.$emit('change', ev)
      }
    }
  }
</script>

<style scoped>

</style>
