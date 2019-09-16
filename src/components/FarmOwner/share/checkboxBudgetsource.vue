<template>
  <div>
    <v-layout column v-if="!singleLine">
      <v-flex v-for="item in items" :key="item.id">
        <v-checkbox :label="item.choice" hide-details
                    :value="item"
                    v-model="selected"
                    @change="updateChoice"
                    :input-value="value"
                    color="success"
        >
        </v-checkbox>

        <template v-if="type == 'loan_types'">
          <v-text-field v-if="item.has_text,item.choice=='เงินกู้จากธนาคารพาณิชย์'"
                        hide-details class="pa-0 px-3"
                        placeholder="ชื่อธนาคาร" :value="item.pivot.remark"
                        v-model="item.pivot.remark"
                        @change="updateChoice"
          >
          </v-text-field>
          <v-text-field v-if="item.has_text"
                        hide-details class="pa-0 px-3"
                        placeholder="จำนวนเงิน(บาท)" :value="item.pivot.remark"
                        v-model="item.pivot.amount"
                        @change="updateChoice"
          ></v-text-field>
          <v-text-field v-if="item.has_text"
                        hide-details class="pa-0 px-3"
                        placeholder="อัตราดอกเบี้ย(%)" :value="item.pivot.remark"
                        v-model="item.pivot.rate"
                        @change="updateChoice"
          ></v-text-field>

        </template>

      </v-flex>
    </v-layout>

  </div>


</template>
<script>

  export default {
    props: {
      singleLine: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array],
        default: () => []
      },
      type: {
        type: String,
      }
    },
    data: () => ({
      items: [],
      selected: [],
    }),
    methods: {
      sync: function () {
        let items = this.items
        let sel = this.value
        let items_length = this.items.length;
        let sel_length = this.value.length;
        for (let i = 0; i < items_length; i++) {
          items[i] = Object.assign(items[i], {pivot: {remark: null}});
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              items[i] = sel[j]
              this.selected.push(items[i])
            }
          }
        }

        this.updateChoice();
      },
      load: async function () {
        this.items = await this.$store.dispatch("admin/choices/getChoicesByType", this.type)
        this.sync()
      },
      updateChoice: function () {
        this.$emit("change",this.selected)
        // console.log("emit",this.selected)
      }
    },
    created: function () {
      this.load()
    },

  }

</script>

