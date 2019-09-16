<template>
  <div>
   <v-layout column>
     <v-flex xs12 lg6>
       <v-select  label="พันธุ์" v-model="A"  :items="items"></v-select>
     </v-flex>
     <div class="px-3">
       <v-flex v-if=" A == 'พันธุ์พื้นเมือง' " xs12 lg6>
         <v-select  label="กรุณาเลือก"v-model="B" :items="subA"></v-select>
       </v-flex>
       <v-flex v-if=" A == 'พันธุ์แท้จากต่างประเทศ' " xs12 lg6>
         <v-select v-model="B"  label="กรุณาเลือก" :items="subB"></v-select>
       </v-flex>
       <v-flex v-if=" A == 'พันธุ์ลูกผสมจากต่างประเทศ' " xs12 lg6>
         <v-select   label="กรุณาเลือก" v-model="B"  :items="subC"></v-select>
       </v-flex>
       <v-flex xs12 lg6>
         <v-text-field label="กรุณากรอก" v-if="B == 'อื่นๆ'"></v-text-field>
       </v-flex>
     </div>
   </v-layout>
  </div>
</template>

<script>

    export default {

      name: "Breed",

      data :()=>({
        items:["พันธุ์พื้นเมือง","พันธุ์แท้จากต่างประเทศ","พันธุ์ลูกผสมจากต่างประเทศ"],
        A : null,
        B : null,
        subA :["พันธุ์พิ้นเมืองภาคเหนือ(ขาวลำพูน)","พันธุ์พิ้นเมืองภาคอีสาน","พันธุ์พิ้นเมืองภาคกลาง(โคลาน)","พันธุ์พิ้นเมืองภาคใต้(โคชน)","อื่นๆ"],
        subB: ["พันธุ์ชาโรเลส์","อเมริกันบราห์มัน","แองกัส","ซิมแมนทอล","บลอนด์ดาคิแตน","อื่นๆ"],
        subC:["บีฟมาสเตอร์","กำแพงแสน","ตาก","กบินทร์บุรี","อื่นๆ"]
      })
    }
</script>

<style scoped>

</style>
