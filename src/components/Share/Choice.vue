<template>
<v-layout row wrap>
    <v-flex>
 
        <v-select :items="(disableFemale)?choices:choices2" item-text="choice" item-value="id" :label="to" @change="onChange" v-model="select"></v-select>
    </v-flex>
    <v-flex xs6 v-if="selectObj && selectObj.options && selectObj.options.has_text == true">
        <v-text-field @change="remarkChange" v-model="remarkText" label="อื่นๆ (ระบุ)"></v-text-field>
    </v-flex>
</v-layout>
</template>

<script>
import _ from "lodash"

export default {
    name: "Choice",
    props: {
        to: String,
        value: String,
        remark: String,
        disableFemale: {
            default: false
        },
    },
    data() {
        return {
            choices: [],
            choices2:[],
            choiceDefault: {
                id: null,
                choice: "ตัวเลือก"
            },
            remarkText: "",
            select: null,
            selectObj: null,
        }
    },
    async created() {},
    async mounted() {
        await this.load();
    },
    watch: { 
        value(newval) {
            if (!newval) {
                this.select = null
                this.remarkText = null
            }
        },
        selectObj(newval, ) {
            if (newval) {
                if (newval.options && newval.options.has_text == true) {
                    //do nothing
                } else {
                    this.remarkText = null
                    this.remarkChange(null);
                }
            }
        }
    },
    methods: {

        async load() {
            let choices = await this.$store.dispatch('choice/getChoicesByType', this.to)
            let choices2  =   choices;
            choices2 = _.filter(choices2, function(currentObject) {
                    return currentObject.id != '060301';
                });
            console.log(choices2);

            this.choices = _.concat(this.choiceDefault, choices)
            this.choices2 = _.concat(this.choiceDefault, choices2)
            this.select = this.value;
            this.setSelectObj(this.select);
            this.remarkText = this.remark;
        },
        // compare: function (a, b) {
        //   console.log(a, b);
        //   return true
        // },
        setSelectObj: function (ev) {
            let key = _.findKey(this.choices, {
                id: ev
            })
            this.selectObj = this.choices[key]
        },
        onChange(ev) {
            this.setSelectObj(ev);
            this.$emit('input', ev);
            if (!(this.selectObj && this.selectObj.options && this.selectObj.options.has_text == true)) {
                this.remarkText = ""
                this.$emit('change', "")
            }
        },
        remarkChange(ev) {
            window.console.log(ev)
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
