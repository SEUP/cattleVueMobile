<template>
  <v-container v-if="form">
    <v-layout row wrap>
      <v-flex xs12>
        <p class="title">5.1 เงินทุนที่ท่านใช้เลี้ยงโคเนื้อ</p>

        <v-divider class="my-3"></v-divider>
        <choice-select type="budget_source" class="ml-5" :value="form.budget_source"
                       @change="form.budget_source = $event"
        ></choice-select>

      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title" >5.2 แหล่งเงินทุนกู้ยืม</p>
        <v-divider class="my-3"></v-divider>
        <checkbox-budgetsource v-bind:value="form.loan_types" type="loan_types"
                               @change="form.loan_types = $event"></checkbox-budgetsource>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12>
        <p class="title" >5.3 เงินทุนในการเลี้ยงโคเนื้อรวมทั้งหมด (บาท) (รวมจาก 5.1 และ 5.2)</p>
        <v-divider class="my-3"></v-divider>
        <v-text-field
          class="mt-3"
          label="จำนวนเงิน"
          disabled
          v-model="totalBudget"

        >
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import ChoiceSelect from "../share/choiceSelect";
  import checkboxBudgetsource from "../share/checkboxBudgetsource";

  export default {
    name: "Part5",
    components: {checkboxBudgetsource, ChoiceSelect},
    data: () => ({
      form: undefined
    }),
    async mounted() {
      this.form = await this.$store.state.admin.farmOwners.farmOwner;
      //console.log("DATA", this.form)
    },
    computed: {
      totalBudget: function () {
        let total = 0;
        total +=  this.form.budget_source ? parseInt(this.form.budget_source.pivot.amount ? this.form.budget_source.pivot.amount : 0) : 0 ;
        let loneTypes = this.form.loan_types ? this.form.loan_types : [];
        loneTypes.forEach((t) => {  // v-for='t in loneTypes'
          if (t.pivot && t.pivot.amount) {
             total += parseInt(t.pivot.amount ? t.pivot.amount : 0)
          }
        });
        this.form.total_budget = total;
        return total;
      },
    },
    methods: {
      updateForm: async function () {
        await this.$store.dispatch("admin/farmOwners/updateState", this.form);
        let data = await this.$store.state.admin.farmOwners.farmOwner
      }
    },
  }
</script>

<style scoped>

</style>
