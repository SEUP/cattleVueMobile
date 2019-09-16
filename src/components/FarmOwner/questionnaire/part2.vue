<template>
  <div v-if="form">
    <v-layout column wrap>
      <v-flex xs12>
        <v-card-text class="pa-2 title">2.1 การเลี้ยงโคเนื้อของท่านมีวัตถุประสงค์เพื่ออะไร (เลือกได้มากกว่า 1 ข้อ)
        </v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="farm_purposes" :value="form.farm_purposes"
                            @change="form.farm_purposes=$event"
          >
          </choice-check-box>
        </div>

        <v-card-text class="pa-2 title">2.2 ท่านมีการจดบันทึกข้อมูลหรือทำประวัติโคเนื้อหรือไม่</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="farm_record" :value="form.farm_record"
                         @change="form.farm_record=$event"
          >
          </choice-select>
        </div>

        <v-card-text class="pa-2 title">2.3 จำนวนโคเนื้อที่เกษตกรเลี้ยงทั้งหมด (ตัว)</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="จำนวน" v-model="totalCattle" readonly/>
        </div>

        <v-card-text class="pa-2 title">2.4 พ่อพันธุ์โคเนื้อที่เลี้ยง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="male_breeding_types"  @change="updateTotalMaster"></cattle-data>
        </div>

        <v-card-text class="pa-2 title">2.5 แม่พันธุ์โคเนื้อที่เลี้ยง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="female_breeding_types" @change="updateTotalMaster"></cattle-data>
        </div>
        <v-card-text class="pa-2 title">2.6 โคเพศผู้อายุมากกว่า 6 เดือนขึ้นไปแต่ไม่ใช่พ่อพันธุ์คุมฝูง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="male_over_six_breeding_types" @change="updateTotalMaster"></cattle-data>
        </div>

        <v-card-text class="pa-2 title">2.7 โคเพศเมียอายุมากกว่า 6 เดือนขึ้นไปแต่ยังไม่ตั้งท้อง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="female_over_six_breeding_types" @change="updateTotalMaster"></cattle-data>
        </div>

        <v-card-text class="pa-2 title">2.8 ลูกโคเพศผู้อายุน้อยกว่า 6 เดือน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="male_under_six_breeding_types" @change="updateTotalMaster"></cattle-data>
        </div>

        <v-card-text class="pa-2 title">2.9 ลูกโคเพศเมียอายุน้อยกว่า 6 เดือน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <cattle-data type="female_under_six_breeding_types" @change="updateTotalMaster"></cattle-data>
        </div>

        <v-card-text class="pa-2 title">2.10 ค่าใช้จ่ายในการเลี้ยงโคเนื้อ</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <v-text-field label="ค่าใช้จ่ายโดยประมาณ (บาท/เดือน)" v-model="form.total_expense_amount" type="number" @blur="updateForm" hide-details/>
          <v-text-field label="ค่ายา (บาท/เดือน)" v-model="form.drug_price" type="number" @blur="updateForm" hide-details/>
          <v-text-field label="ค่าอาหารและแร่ธาตุ (บาท/เดือน)" v-model="form.food_price" type="number" @blur="updateForm" hide-details/>
          <v-text-field label="อื่นๆ" v-model="form.expense_price" type="number" @blur="updateForm" hide-details/>
        </div>

        <v-card-text class="pa-2 title">2.11 ท่านมีประสบการณ์การเลี้ยงโคเนื้อมานานแค่ไหน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="farm_exp" :value="form.farm_exp" @change="form.farm_exp=$event"/>
        </div>

        <v-card-text class="pa-2 title">2.12 ท่านมีเป้าหมายในการเลี้ยงในอนาคตอย่างไร</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="farm_future" :value="form.farm_future" @change="form.farm_future=$event"/>
        </div>

        <v-card-text class="pa-2 title">2.13 การขึ้นทะเบียนฟาร์มกับภาครัฐ</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="farm_register_status" :value="form.farm_register_status" @change="form.farm_register_status=$event"/>
        </div>

        <v-card-text class="pa-2 title">2.14 ประวัติการตรวจโรคสัตว์ในฟาร์มของท่าน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select type="farm_disease_check" :value="form.farm_disease_check" @change="form.farm_disease_check=$event"/>
        </div>

        <v-card-text class="pa-2 title">2.15 สถานภาพการระบาดของโรคในฟาร์มของท่านเป็นอย่างไร</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-select label="โรคแท้งติดต่อ" type="abortion" :value="form.abortion" @change="form.abortion=$event"/>
          <choice-select label="โรควัณโรค" type="tuberculosis" :value="form.tuberculosis" @change="form.tuberculosis=$event"/>
          <choice-select label="โรคปากและเท้าเปื่อย" type="foot_mouth_disease"
                         :value="form.foot_mouth_disease"
                         @change="form.foot_mouth_disease=$event"
          ></choice-select>
          <div class="mt-3">
            <v-card-text class="pa-0">โรคอื่นๆ</v-card-text>
            <choice-check-box type="disease_other" :value="form.disease_other" singleLine @change="form.disease_other=$event"/>
          </div>

        </div>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import ChoiceSelect from "../share/choiceSelect";
  import ChoiceCheckBox from "../share/choiceCheckBox";
  import cattleData from "../share/cattleData";

  export default {
    name: "part2",
    components: {
      ChoiceSelect, ChoiceCheckBox, cattleData
    },
    data: () => ({
      totalCattle : 0,
      form: undefined
    }),
    async created() {
      localStorage.removeItem("cattle")
      this.form = await this.$store.state.admin.farmOwners.farmOwner
    },
    methods : {
      updateForm : async function () {
        await this.$store.dispatch("admin/farmOwners/updateState",this.form)
        let data = await this.$store.state.admin.farmOwners.farmOwner
      },
      updateTotalMaster : async function (type,val) {
        let totalCattle = 0;
        let cattle = {
          male_breeding_types: this.form.total_male_breeding_types ? this.form.total_male_breeding_types :0,
          female_breeding_types: this.form.total_female_breeding_types ? this.form.total_female_breeding_types :0,
          male_over_six_breeding_types: this.form.total_male_over_six_breeding_types ? this.form.total_male_over_six_breeding_types :0,
          female_over_six_breeding_types: this.form.total_female_over_six_breeding_types ? this.form.total_female_over_six_breeding_types :0,
          male_under_six_breeding_types: this.form.total_male_under_six_breeding_types ? this.form.total_male_under_six_breeding_types :0,
          female_under_six_breeding_types: this.form.total_female_under_six_breeding_types ? this.form.total_female_under_six_breeding_types :0,
        };

        let localCattle = await localStorage.getItem('cattle')
        localCattle = localCattle != null && JSON.parse(localCattle) != cattle ? JSON.parse(localCattle) : cattle;
         localCattle[type] -= parseInt(localCattle[type])
         localCattle[type] += parseInt(val)

        for (let key in localCattle) {
          totalCattle += parseInt(localCattle[key]);
        }
        this.totalCattle = totalCattle
      }
    }
  }
</script>

<style scoped>

</style>
