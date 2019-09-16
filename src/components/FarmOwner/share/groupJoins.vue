<template>
  <div>
    <v-layout row wrap  v-for="item in items" :key="item.id">
      <v-flex xs12 class="pa-0 ma-0">
        <v-checkbox :label="item.choice" hide-details
                    class="pa-0 ma-0"
                    :value="item"
                    v-model="selected"
                    @change="updateChoice"
                    :input-value="value"
                    color="success"
        >
        </v-checkbox>
      </v-flex>
      <v-flex xs12 v-if="item.has_text" class="pa-0 ma-0 pl-3  pb-2">
        <v-text-field
          hide-details class="pa-0 ma-0 pb-1"
          placeholder="ชื่อกลุ่มวิกสหกิจชุมชน/ชื่อสหกรณ์โคเนื้อ" :value="item.pivot.remark"
          v-model="item.pivot.remark"
          @change="updateChoice"
          color="success"
        ></v-text-field>
        <v-text-field
          hide-details class="pa-0 ma-0 mt-3"
          label = "เข้าร่วมเมื่อ"
          :value="item.pivot.source"
          v-model="item.pivot.source"
          @change="updateChoice"
          color="success"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>

  export default {
    props: {
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
    async created () {
      this.items = await this.$store.dispatch("admin/choices/getChoicesByType", this.type)
      await this.sync()
    },
    methods: {
      sync: function () {
        let items = this.items
        let sel = this.value
        let items_length = this.items.length;
        let sel_length = this.value.length;
        for (let i = 0; i < items_length; i++) {
          items[i] = Object.assign(items[i], {pivot: {remark: null}})
          for (let j = 0; j < sel_length; j++) {
            if (items[i].id == sel[j].id) {
              items[i] = sel[j]
              this.selected.push(sel[j])
            }
          }
        }
      },
      updateChoice : function () {
        this.$emit("change",this.selected)
      }
    },

  }

</script>
