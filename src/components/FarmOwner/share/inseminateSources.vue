<template>
  <div>
    <v-layout row wrap v-for="item in items" :key="item.id">
      <v-flex  xs12 class="pa-0 py-1 pl-2">
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
      <v-flex xs12 v-if="item.has_text" class="pa-0 ma-0 pl-5">
        <v-text-field
          hide-details class="pa-0 ma-0"
          placeholder="ชื่อหน่วยงาน" :value="item.pivot.remark"
          v-model="item.pivot.remark"
          @change="updateChoice"
          color="success"
        ></v-text-field>
      </v-flex>
      <v-flex xs12  class="pa-0 ma-0 pl-5">
        <v-text-field
          hide-details class="pa-0 ma-0"
          placeholder="ราคาต่อโด๊ส(บาท)" type = 'number' :value="item.pivot.price"
          v-model="item.pivot.price"
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
