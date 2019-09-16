<template >
  <v-container v-if="form">
    <v-layout row wrap>
      <v-flex xs12>

        <p class="title">4.1 ผสมพันธุ์โคเนื้อในฟาร์มของท่าน</p>
        <v-divider class="my-3"></v-divider>
        <choice-select :value="form.farm_breeding_type" type="farm_breeding_type"
                       @change="form.farm_breeding_type=$event" class="ml-3"></choice-select>

      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title" >4.2 การผสมเทียมใช้น้ำเชื้อจากแหล่งใด</p>
        <v-divider class="my-3"></v-divider>
        <inseminate-sources type="inseminate_sources" :value="form.inseminate_sources"
                          @change="form.inseminate_sources=$event"></inseminate-sources>
      </v-flex>

      <v-flex mt-3>
        <p class="title" >4.2.1 ผู้ให้บริการผสมเทียมคือใคร</p>
        <v-divider class="my-3"></v-divider>
        <choice-check-box type="breeders" :value="form.breeders"
                          @change="form.breeders=$event"></choice-check-box>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.3 การใช้พ่อพันธุ์คุมฟูง</p>
        <v-divider class="my-3"></v-divider>
        <v-text-field
          class="mt-3 ml-3"
          label="อัตราส่วนพ่อพันธุ์คุมฟูง 1 ตัวต่อแม่พันธุ์(ตัว)"
          v-model="form.breeding_rate"
          @blur="updateForm">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.4 การตายของโคในรอบปี</p>
        <v-divider class="my-3"></v-divider>
        <choice-select type="cattle_death" class="ml-3" :value="form.cattle_death"
                       @change="form.cattle_death=$event"></choice-select>
      </v-flex>

      <v-flex mt-3>
        <p class="title">4.4.1 สาเหตุการตาย</p>
        <v-divider class="my-3"></v-divider>
        <choice-check-box type="cattle_death_causes" :value="form.cattle_death_causes"
                          @change="form.cattle_death_causes=$event"></choice-check-box>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.5 เมื่อโคเจ็บป่วยบุคคลที่ทำการรักษาให้(ตอบได้มากกว่า1ข้อ)</p>
        <v-divider class="my-3"></v-divider>
        <choice-check-box type="disease_cured_by" :value="form.disease_cured_by"
                          @change="form.disease_cured_by=$event"></choice-check-box>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.6 การถ่ายพยาธิ(ครั้ง/ปี)</p>
        <v-divider class="my-3"></v-divider>
        <ChoiceSelect type="dewormed_amount"   :value="form.dewormed_amount" @change="form.dewormed_amount=$event"></ChoiceSelect>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.7 ท่านได้ทำวัคซีนป้องกันโรคให้กับโคเนื้อที่เลี้ยงหรือไม่</p>
        <v-divider class="my-1"></v-divider>
        <vaccine-ever type="vaccine_ever"></vaccine-ever>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title">4.8 ท่านมีการจัดการมูลโคในฟาร์มของท่านอย่างไร (เลือกได้มากกว่า 1 ข้อ)</p>
        <v-divider class="my-3"></v-divider>
        <cattle-dung-uses></cattle-dung-uses>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
    import ChoiceSelect from "../share/choiceSelect";
    import cattleDungUses from "../share/cattleDungUses";
    import ChoiceCheckBox from "../share/choiceCheckBox";
    import inseminateSources from "../share/inseminateSources";
    import vaccineEver from "../share/vaccineEver";

    export default {
        name: "part4",
      components: {vaccineEver, ChoiceCheckBox, ChoiceSelect ,cattleDungUses,inseminateSources},
      data : () =>({
        form : undefined
      }),
      async created  () {
        this.form = await this.$store.state.admin.farmOwners.farmOwner
      },
      methods:{
        updateForm : async function () {
          // console.log("P1",this.form)
          await this.$store.dispatch("admin/farmOwners/updateState",this.form);
          let data = await this.$store.state.admin.farmOwners.farmOwner


        }
    }
    }
</script>

<style scoped>

</style>
