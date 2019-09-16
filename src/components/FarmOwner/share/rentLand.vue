<template>
  <v-layout>
    <v-flex xs12 >
      <v-layout row wrap>
        <v-flex xs12 class="pa-0 ma-0">
          <v-select hide-details
                    :items="items"
                    v-model="selectedValue"
                    :label="label" item-text="choice"
                    return-object
                    @change="updateChoice"
          ></v-select>
        </v-flex>
        <v-flex xs12 mx-3 v-if="selectedValue.has_text" class="pa-0 ma-0">
          <v-layout row>
            <v-flex xs6>
              <v-text-field label="จำนวนไร่(ไร่)" class=""  hide-details type = 'number'
                            v-model="selectedValue.pivot.area"  @blur="updateValue">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="จำนวนงาน(งาน)" class=""  hide-details type = 'number'
                            v-model="selectedValue.pivot.subarea"  @blur="updateValue">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field label="ค่าเช่าที่ดิน บาท/ไร่/ปี" class=""  hide-details type = 'number'
                        v-model="selectedValue.pivot.price"  @blur="updateValue">
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  let defaultChoice = {
    id : 0,
    has_text :0,
    choice : "กรุณาเลือก",
    pivot:{remark: null,amount:null}
  };
  export default {
    name: "rentLand",
    props: {
      type: {
        type: String,
      },
      label: {
        type: String,
        default: "ตัวเลือก"
      },
      value: {
        type: Object,
        default : () =>  (defaultChoice)
      }
    },
    data :  () => ({
      items: [],
      selectedValue : defaultChoice
    }),
    async created() {
      this.items = await [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType", this.type));
      await this.sync()
    },
    methods: {
      sync: function () {
        this.items.forEach((i) => {
          if (i.id == this.value.id) {
            this.selectedValue = this.value;
          }
        })
      },
      updateChoice : async function (choice)  {
        this.selectedValue = choice
        await this.updateValue()
      },
      updateValue: async function () {
        await this.$emit('change', this.selectedValue)

      }
    }
  }
</script>
