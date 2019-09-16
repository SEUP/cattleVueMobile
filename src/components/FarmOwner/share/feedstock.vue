<template>
  <v-layout v-if="form">
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select hide-details
                    :items="items"
                    v-model="selectedValue"
                    item-text="choice"
                    return-object
                    @change="updateChoice"
          ></v-select>
        </v-flex>
        <!--<v-flex  xs12 ml-3 v-if="selectedValue.children.length > 0">-->
        <v-flex xs12 ml-3 v-if="selectedValue.choice == 'สำรอง'">
          <div v-for="subItem in subItems" :key="subItem.id" class="py-1">
            <v-checkbox :label="subItem.choice" hide-details
                        :value="subItem"
                        class="pa-0 ma-0"
                        v-model="selectCheckbox"
                        @change="updateChoiceCheckbox"
                        color="success"

            ></v-checkbox>
            <v-text-field placeholder="เก็บไว้ในโรงเรือนขนาดกว้าง(เมตร)"
                          class="pa-0 ma-0 pl-3"
                          v-model="subItem.pivot.width"
                          hide-details type='number'
                          @change="updateChoiceCheckbox"

            >
            </v-text-field>
            <v-text-field placeholder="เก็บไว้ในโรงเรือนขนาดยาว(เมตร)"
                          class="pa-0 ma-0 pl-3 my-2"
                          v-model="subItem.pivot.height"
                          hide-details type='number'
                          @change="updateChoiceCheckbox"
            >
            </v-text-field>
            <div v-if="subItem.choice=='ฟางข้าวหรือเปลือกข้าวโพดหมักหรือปรุงแต่ง'"
                 class="text-xs-center">
              <b>หรือ</b>
              <v-text-field placeholder="เก็บไว้ในถังหมัก จำนวน(ถัง)"
                            class="pa-0 ma-0 pl-3"
                            hide-details type='number'
                            v-model="subItem.pivot.amount"
                            @change="updateChoiceCheckbox"
              >
              </v-text-field>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  let defaultChoice = {
    id: 0,
    has_text: 0,
    choice: "กรุณาเลือก",
    children: []
  };
  export default {
    name: "feedStock",
    data: () => ({
      items: [],
      subItems: [],
      form: null,
      selectedValue: defaultChoice,
      selectCheckbox: []
    }),
    async created() {
      this.items = await [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType", 'feedstock'));
      this.subItems = await this.$store.dispatch("admin/choices/getChoicesByType", 'feedstock_types');
      this.form = await this.$store.state.admin.farmOwners.farmOwner
      await this.sync()
      await  this.syncCheckBox()
    },
    methods: {
      sync: function () {
        let value = this.form.feedstock
        if (value) {
          this.items.forEach((item) => {
            if (item.id == value.id) {
              item = value
              this.selectedValue = item
            }
          })
        }
      },
      syncCheckBox: function () {
        let items = this.subItems
        let sel = this.form.feedstock_types ? this.form.feedstock_types : []
        let items_length = items.length;
        let sel_length = sel.length;
        for (let i = 0; i < items_length; i++) {
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              items[i] = sel[j]
              this.selectCheckbox.push(sel[j])
            }
          }
        }

      },
      updateChoiceCheckbox: function () {
        this.form.feedstock_types = this.selectCheckbox
        this.$store.dispatch('admin/farmOwners/updateState', this.form)
      },
      updateChoice: async function (choice) {
        this.form.feedstock = this.selectedValue
        this.$store.dispatch('admin/farmOwners/updateState', this.form)
      },
      updateValue: async function () {

      }
    }
  }
</script>
