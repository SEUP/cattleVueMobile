<template>
  <div v-if="form">
    <v-layout class="column">
      <v-flex class="lg12">
        <v-select hide-details
                  :items="items"
                  return-object
                  v-model="selectedMain"
                  :label="label" item-text="choice"
                  @change="updateMainsel"
                  color="success">
        </v-select>
      </v-flex>
      <v-flex v-if="selectedMain.id == 202">
        <div v-for="(item,index) in items_checkBox" :key="items_checkBox.id">
          <v-layout row v-if="index == 0 ||index == 1||index == 2">
            <v-flex class="xs6 mt-0">
              <v-checkbox :label="item.choice" hide-details
                          :value="item"
                          v-model="select_Box"
                          color="success"
                          class="pa-0 ma-0"
                          @change="updateCheckbox">
              </v-checkbox>
              <v-text-field hide-details class="pa-0 px-3 ma-0"
                            placeholder="จำนวนครั้งต่อปี" :value="item.pivot.remark"
                            v-model="item.pivot.amount"
                            type="NUMBER"
                            @change="updateValue">

              </v-text-field>
            </v-flex>
            <v-flex class="xs6 mt-3">
              <v-select hide-details
                        :items="items_Sub"
                        class="ma-0 my-2"
                        item-value="choice"
                        v-model="item.pivot.remark"
                        :label="label_Sub" item-text="choice"
                        @change="updateValue()"
                        color="success">
              </v-select>
            </v-flex>
          </v-layout>

          <v-layout row v-if="index == 3">
            <v-flex class="xs6 mt-0">
              <v-checkbox :label="item.choice" hide-details
                          :value="item"
                          v-model="select_Box"
                          color="success"
                          class="pa-0 ma-0"
                          @change="updateCheckbox">
              </v-checkbox>
              <v-text-field hide-details class="pa-0 px-3 ma-0 "
                            placeholder="ชื่อวัคซีนที่ใช้" :value="item.pivot.remark"
                            type="string"
                            v-model="item.pivot.source"
                            @change="updateValue">

              </v-text-field>
            </v-flex>
            <v-flex class="xs6 mt-3">
              <v-text-field hide-details class="pa-0 px-3 ma-0 my-2"
                            placeholder="จำนวนครั้งต่อปี" :value="item.pivot.remark"
                            v-model="item.pivot.amount"
                            type="NUMBER"
                            @change="updateValue">

              </v-text-field>
            </v-flex>
            <v-flex class="xs6 mt-3">
              <v-select hide-details
                        :items="items_Sub"
                        class="ma-0 my-2"
                        item-value="choice"
                        v-model="item.pivot.remark"
                        :label="label_Sub" item-text="choice"
                        @change="updateValue()"
                        color="success">
              </v-select>
            </v-flex>

          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  import {mapState} from 'vuex';


  let ChoiceMain = {
    id: 0,
    choice: "กรุณาเลือก",

  };
  let ChoiceSub = {
    id: 0,
    choice: "กรุณาเลือก",

  };
  export default {
    name: "vaccineEver",
    props: {
      type: {
        type: String,
      },
      label: {
        type: String,
        default: "ตัวเลือก"
      },
      label_Sub: {
        type: String,
        default: "ผู้ทำ"
      },
      value: {
        type: Object,
        default: () => (ChoiceMain)
      },
      valueBox: {
        type: [Array],
        default: () => []
      },
    },
    data: () => ({
      selectedMain: ChoiceMain,
      select_Sub: ChoiceSub,
      select_Box: [],
      items: [],
      items_Sub: [],
      items_checkBox: []
    }),
    computed: {
      ...mapState({
        form: state => state.admin.farmOwners.farmOwner
      })
    },
    async created() {
      this.items_checkBox = await [].concat(await this.$store.dispatch("admin/choices/getChoicesByType", "vaccine_types"));
      this.items_Sub = await [ChoiceSub].concat(await this.$store.dispatch("admin/choices/getChoicesByType", "vaccined_by"));
      this.items = await [ChoiceMain].concat(await this.$store.dispatch("admin/choices/getChoicesByType", this.type));
      await  this.sync();
      await this.syncCheckbox();


    },
    mounted() {
    },
    methods: {
      updateValue: function () {
        this.$store.dispatch("admin/farmOwners/updateState", this.form)
      },
      updateMainsel: function (items) {
        this.form.vaccine_ever = items;
        if (items.id == 203) {
          this.form.vaccine_types = [];
        }
        this.updateValue()
      },
      updateCheckbox: function (item) {
        this.form.vaccine_types = item;
        this.updateValue()

      },
      sync: function () {
        let value = this.form[this.type]
        if (value) {
          this.items.forEach((i) => {
            if (i.id == this.form[this.type].id) {
              this.selectedMain = i;
            }
          })
        }
      },
      syncCheckbox: function () {
        let selectedchoice = this.select_Box;
        let choices = this.items_checkBox;
        let selChoice = this.form.vaccine_types;
        let choicesLangth = this.items_checkBox ? this.items_checkBox.length : 0;
        let selChoiceLangth = this.form.vaccine_types ? this.form.vaccine_types.length : 0;

        for (let i = 0; i < choicesLangth; i++) {
          for (let a = 0; a < selChoiceLangth; a++) {
            if (choices[i].id == selChoice[a].id) {
              choices[i] = selChoice[a];
              selectedchoice.push(selChoice[a]);
            }
          }
        }

      }
    }
  }
</script>

<style scoped>

</style>
