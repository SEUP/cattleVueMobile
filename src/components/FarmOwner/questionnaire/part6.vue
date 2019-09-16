<template>
    <v-container v-if="form != null">
      <v-form>
        <v-flex xs12>
          <p class="title">6.1 ท่านจำหน่ายโคเนื้อให้กับใคร</p>
          <v-divider class="my-3"></v-divider>
          <v-flex xs10 offset-xs1>
           <choice-check-box :value="form.seller_types" @change="form.seller_types=$event" type="seller_types"></choice-check-box>
          </v-flex>
        </v-flex>
        <v-flex xs12>
          <p class="title">6.2 อายุของโคเนื้อที่ท่านจำหน่าย(ปี)</p>
          <v-divider class="my-3"></v-divider>
          <choiceSelect :value="form.age_sale" @change="form.age_sale=$event" type="age_sale"></choiceSelect>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.3 น้ำหนักของโคเนื้อที่ท่านจำหน่าย(กิโลกรัม)</p>
          <v-divider class="my-3"></v-divider>
          <choiceSelect :value="form.weight_range_sale" @change="form.weight_range_sale=$event" type="weight_range_sale"></choiceSelect>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.4 ลักษณะการจำหน่าย</p>
          <v-divider class="my-3"></v-divider>
          <choice-check-box :value="form.cattle_sale_methods" @change="form.cattle_sale_methods=$event"   type="cattle_sale_methods"></choice-check-box>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.5 ถ้าท่านรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อเมื่อใด</p>
          <v-divider class="my-3"></v-divider>
          <group-joins   :value="form.group_joins" @change="form.group_joins=$event"  type="group_joins" placeholder="ชื่อ"></group-joins>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.6 ถ้ายังไม่เข้ารวมกลุ่มท่านมีความประสงค์ในการรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อหรือไม่</p>
          <v-divider class="my-3"></v-divider>
          <choiceSelect   :value="form.group_join_future" @change="form.group_join_future=$event"   type="group_join_future"></choiceSelect>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.7 ท่านต้องการให้สหกรณ์ช่วยเหลือในด้านใด</p>
          <v-divider class="my-3"></v-divider>
          <choice-check-box  :value="form.cooperative_help_types" @change="form.cooperative_help_types=$event"  type="cooperative_help_types"></choice-check-box>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.8 ท่านต้องการซื้ออาหารข้นในนามสหกรณ์หรือไม่</p>
          <v-divider class="my-3"></v-divider>
          <choice-select :value="form.feed_purchase_cooperative" @change="form.feed_purchase_cooperative=$event" type="feed_purchase_cooperative" ></choice-select>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.9 ท่านขายโคเนื้อได้ราคาเท่าไหร่และใช้เวลาในการเลี้ยงนานเท่าใด</p>
          <v-divider class="my-3"></v-divider>
          <cattle-sales  @change="form.cattle_sales=$event"></cattle-sales>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <p class="title">6.10 ท่านพอใจกับราคาที่ขายได้หรือไม่</p>
          <v-divider class="my-3"></v-divider>
          <choiceSelect   :value="form.sale_satisfaction" @change="form.sale_satisfaction=$event" type="sale_satisfaction"></choiceSelect>
        </v-flex>
      </v-form>
    </v-container>
</template>

<script>
  import ChoiceSelect from "../share/choiceSelect";
  import ChoiceCheckBox from "../share/choiceCheckBox";
  import cattleSales from "../share/cattleSales";
  import groupJoins from "../share/groupJoins";
  export default {
    components: {ChoiceSelect,ChoiceCheckBox,cattleSales,groupJoins},
    name: "part6",
    data (){
      return{
        form:null
      }

    },async created (){
      this.form = await this.$store.state.admin.farmOwners.farmOwner;
    },methods : {
      updateForm : async function () {
        await this.$store.dispatch("admin/farmOwners/updateState",this.form)
        let data = await this.$store.state.admin.farmOwners.farmOwner
      }
    }
  }
</script>

<style scoped>

</style>
