<template>
    <v-content>
             <date-picker label="วัน/เดือน/ปี ที่ถ่ายพยาธิ" :valDate="form.worming_date" v-model="form.worming_date"
                        @change="form.worming_date = $event" />
                 
                    <choice to="ผู้ทำ" :remark="form.options.maker" v-model="form.maker" @change="form.options.maker = $event" />

                                   <choice to="ชนิดพยาธิ" :remark="form.options.worming_type"
                                   v-model="form.worming_type"
                                   @change="form.options.worming_type = $event"/>
    </v-content>
</template>

<script>
  import DatePicker from "@/components/Share/DatePicker";
    import Choice from "@/components/Share/Choice";
  import multiSelectChoice from "@/components/Share/multiSelectChoice";
export default {
    name:'',
    components:{
        DatePicker,Choice,multiSelectChoice
    },
    props:{
        form:{}
    }
}
</script>
