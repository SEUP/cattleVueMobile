<template>
  <v-layout>
    <v-flex xs12 >
      <v-layout row>
        <v-flex xs>
          <v-select hide-details
                    :items="items"
                    v-model="selectedValue"
                    :label="label" item-text="choice"
                    return-object
                    @change="updateChoice"
          ></v-select>
        </v-flex>
        <v-flex  mx-3 v-if="selectedValue.has_text">

          <v-text-field placeholder="โปรดระบุจำนวน" class=""  hide-details
                        v-if="selectedValue.type == 'budget_source'||selectedValue.type == 'dewormed_amount'"
                        v-model="selectedValue.pivot.amount"  @blur="updateValue"
                        type="NUMBER">
          </v-text-field>

          <v-text-field placeholder="โปรดระบุ" class=""  hide-details v-else
                        v-model="selectedValue.pivot.remark"  @blur="updateValue">
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
    name: "choiceSelect",
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
            this.selectedValue = i;
            if (this.value.pivot.remark) {
              this.selectedValue.pivot.remark = this.value.pivot.remark
            }else if(this.value.pivot.amount) {
              this.selectedValue.pivot.amount = this.value.pivot.amount
            }
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
