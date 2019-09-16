<template>
  <v-layout class="pa-0 py-1" >
    <v-flex xs12 >
      <v-select hide-details
                dense
                :items="items"
                v-model="selectedValue"
                return-object
                :label="label" item-text="choice"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  let defaultChoice = {
    id : 0,
    has_text :0,
    choice : "กรุณาเลือก",
    children : []
  };
  export default {
    name: "choiceSearch",
    props: {
      type: {
        type: String,
      },
      label: {
        type: String,
        default: "ตัวเลือก"
      },
    },
    data() {
      return {
        HasText : false,
        selectedValue: defaultChoice,
        items: [],
      }
    },
    async created() {
      this.items = await [defaultChoice].concat(await this.$store.dispatch("admin/choices/getChoicesByType", this.type));
      await this.checkChildren()
      // await console.log(this.items)
    },
    watch :{
      selectedValue : {
        deep : true,
        handler :  function (newVal,oldVal) {
          this.updateValue()
        }
      }
    },
    methods: {
      checkChildren :  function () {
        let newItems = []
        this.items.forEach( (i) => {

          newItems.push(i)
          if (i.children.length > 0){
            i.children.forEach( (j) => {
              j.choice = i.choice+"-"+j.choice
              newItems.push(j)

              if(j.children && j.children.length > 0) {
                j.children.forEach( (k)=> {
                  k.choice = j.choice+"-"+k.choice
                  newItems.push(k)
                })
              }
            })
          }
        })
        this.items = newItems
      },
      updateValue: async function () {
        // console.log("UPDATE select",this.selectedValue)
        await this.$emit('change', this.selectedValue)

      }
    }
  }
</script>
