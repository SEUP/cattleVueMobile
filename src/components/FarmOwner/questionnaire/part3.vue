<template>
  <div v-if="form">
    <v-layout column wrap>
      <v-flex xs12>

        <v-card-text class="pa-2 title">3.1 จำนวนแรงงานที่ใช้เลี้ยงโค (คน)</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">

          <v-text-field label="จำนวนแรงงานทั้งหมด" readonly v-model="totalWorks" ></v-text-field>

          <v-text-field label="3.1.1 จำนวนแรงงานภายในครอบครัว"  type = "number" placeholder="จำนวนแรงงานภายในครอบครัว" v-model="form.family_workers_amount" @blur="updateWorkers"></v-text-field>
          <v-text-field label="3.1.2 จำนวนแรงงานภายนอก"  type = "number" placeholder="จำนวนแรงงานภายนอก" v-model="form.external_workers_amount" @blur="updateWorkers" ></v-text-field>

        </div>

        <v-card-text class="pa-2 title">3.2 แหล่งน้ำที่ใช้ในการเลี้ยง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="water_source_types"
                            :value="form.water_source_types"
                            @change="form.water_source_types = $event"
                            @blur="updateForm"
          >

          </choice-check-box>
        </div>

        <v-card-text class="pa-2 title">3.3 ลักษณะการเลี้ยงโคเนื้อของท่าน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="take_care_types"
                            :value="form.take_care_types"
                            @change="form.take_care_types = $event"
                            @blur="updateForm"
          >

          </choice-check-box>
        </div>

        <v-card-text class="pa-2 title">3.4 พื้นที่ถือครองทางการเกษตร</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <own-land></own-land>
        </div>

        <v-card-text class="pa-2 title">3.5 การเช่าที่ดินเพื่อใช้ในการเลี้ยง</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <rent-land label=" " type="rent_land" :value="form.rent_land"
                         @change="form.rent_land = $event">

          </rent-land>
        </div>

        <v-card-text class="pa-2 title">3.6 พื้นที่ที่ใช้ในการเลี้ยงโคเนื้อ</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <use-land></use-land>
        </div>

        <v-card-text class="pa-2 title">3.7 อาหารที่ท่านใช้เลี้ยงโคเนื้อเป็นอาหารประเภทใด (ตอบได้มากกว่า 1 ข้อ)
        </v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="feed_types"
                            :value="form.feed_types"
                            @change="form.feed_types = $event"
                            @blur="updateForm"
          >

          </choice-check-box>
        </div>

        <v-card-text class="pa-2 title">3.8 แหล่งที่มาของอาหารข้นหรืออาหารผสมครบส่วน</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="feed_sources"
                            :value="form.feed_sources"
                            @change="form.feed_sources = $event"
                            @blur="updateForm"
          >

          </choice-check-box>
        </div>

        <v-card-text class="pa-2 title">3.9 ท่านเคยให้แร่ธาตุก้อนหรือไม่</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <minerals-feed></minerals-feed>
        </div>

        <v-card-text class="pa-2 title">3.10 ท่านมีการสำรองฟางข้าว หรือเปลือกข้าวโพดไว้ใช้เลี้ยงโคหรือไม่</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <feed-stock></feed-stock>
        </div>

        <v-card-text class="pa-2 title">3.11 ท่านใช้แหล่งอาหารหยาบในฤดูแล้งจาก</v-card-text>
        <v-divider></v-divider>
        <div class="ma-2 mx-4">
          <choice-check-box type="feed_summer_sources"
                            :value="form.feed_summer_sources"
                            @change="form.feed_summer_sources = $event"
                            @blur="updateForm"
          >
          </choice-check-box>
        </div>

      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  import ChoiceSelect from "../share/choiceSelect";
  import ChoiceCheckBox from "../share/choiceCheckBox";
  import DistrictSelect from "../share/districtSelect";
  import mineralsFeed from "../share/mineralsFeed";
  import RentLand from "../share/rentLand";
  import FeedStock from "../share/feedstock";
  import OwnLand from "../share/ownLand";
  import UseLand from "../share/useLand";

  export default {
    components: {UseLand, OwnLand, FeedStock, RentLand, ChoiceSelect, ChoiceCheckBox, DistrictSelect,mineralsFeed},
    name: "past3",
    data : () =>({
      form : undefined
    }),
    async created  () {
      this.form = await this.$store.state.admin.farmOwners.farmOwner
    },
    computed : {
      totalWorks : function () {
        return this.updateWorkers()
      }
    },
    methods :{
      updateWorkers : function ()  {
        this.updateForm()
        this.form.total_workers_amount = parseInt(this.form.external_workers_amount ? this.form.external_workers_amount : 0) + parseInt(this.form.family_workers_amount ? this.form.family_workers_amount : 0)
        this.updateForm()
        return this.form.total_workers_amount

      },
      updateForm : async function () {
        await this.$store.dispatch("admin/farmOwners/updateState",this.form)
        let data = await this.$store.state.admin.farmOwners.farmOwner
      }
    }
  }
</script>
