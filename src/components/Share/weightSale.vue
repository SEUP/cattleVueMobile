<template>
  <v-layout row wrap>
    <v-flex>
      <v-select
        :items="choices"
        item-text="choice"
        item-value="id"
        :label="to"
        @change="onChange"
        v-model="select"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "Choice",
    props: {
      to: String,
      value: String,
      remark: String,
    },
    data() {
      return {
        choices: [],
        choiceDefault : {
          id : null,
          choice : "ตัวเลือก"
        },
        remarkText: "",
        select: null,
        selectObj: null,
      }
    },
    async created() {



    },
    async mounted() {
      let choices = await this.$store.dispatch('choices/getChoicesByType', this.to)
      this.choices = _.concat(this.choiceDefault,choices)
      this.select = this.value;
      this.setSelectObj(this.select);
      this.remarkText = this.remarkValue;


    },
    methods: {
      compare : function(a,b){
        console.log(a,b);
        return true
      },
      setSelectObj : function(ev){
        let key = _.findKey(this.choices, {id: ev})
        this.selectObj = this.choices[key]
      },
      onChange(ev) {
        this.setSelectObj(ev);
        this.$emit('input', ev);
        if (this.selectObj && this.selectObj.options && this.selectObj.options.has_text == true) {

        } else {
          this.remarkText = ""
          this.$emit('change', "")

        }
      },
      remarkChange(ev) {
        console.log(ev)
        if (this.selectObj && this.selectObj.options && this.selectObj.options.has_text == true) {
          this.$emit('change', ev)
        } else {
          this.$emit('change', "")
        }
      }
    }
  }
</script>

<style scoped>

</style>
