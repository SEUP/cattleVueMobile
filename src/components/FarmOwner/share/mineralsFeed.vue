<template>
  <v-layout v-if="farmOwner">
    <v-flex xs12 >
      <v-layout row>
        <v-flex xs>
         <choice-select type="minerals_feed" :value="farmOwner.minerals_feed"
                        v-model="farmOwner.minerals_feed" @change="updateSelect">
         </choice-select>
        </v-flex>
        <v-flex  mx-3 v-if="showSub">
          <choice-select type="sub_minerals_feed" label="ความถี่การให้เเร่ธาตุก้อน" :value="farmOwner.sub_minerals_feed"
                         v-model="farmOwner.sub_minerals_feed" @change="updateSubSelect">
          </choice-select>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

  import ChoiceSelect from "./choiceSelect";
  export default {
    components: {ChoiceSelect},
    data :  () => ({
      showSub : false,
      farmOwner : null,
    }),
    async created() {
     this.farmOwner = await this.$store.state.admin.farmOwners.farmOwner
    },
    methods: {
      updateSelect : function (ev) {
        this.farmOwner.minerals_feed = ev
        if(ev.choice == 'เคยให้'){
          this.showSub = true
        }else {
          this.showSub = false
        }
        this.updateState()
      },updateSubSelect : function (ev) {
        this.farmOwner.sub_minerals_feed = ev
        this.updateState()
      },
      updateState : function () {
        this.$store.dispatch('admin/farmOwners/updateState',this.farmOwner)
      }
    },

  }
</script>
