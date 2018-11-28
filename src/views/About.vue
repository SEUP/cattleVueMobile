<template>
   <v-content >
       <ActionBar />
      <v-container fluid fill-height>     
        <v-layout align-center justify-center> 
             <v-layout  row class="pd-20 ma-3 shadow circle box-white">
            
                <v-flex xs8>
                 <center> <v-icon class="mrl-18 pd-10 box-purple wh circle shadow" style="font-size:40px;">mdi-cow</v-icon>   </center>
          
                    <h2 class="nm">Cattle Application</h2>
                    <h4 class="nm">version 1.03</h4>
                    <v-btn round class="box-greenFX" href="https://github.com/SEUP/cattleVueMobile/issues" >แจ้งปัญหาการใช้งาน</v-btn>
         
                </v-flex>
            </v-layout> 
          
                
            <v-layout>
  
                </v-layout>
        </v-layout>
      </v-container>
   </v-content>

</template>

 

<script>
 import store from "@/store/"
    import {get} from 'vuex-pathify'
  import ActionBar from "@/components/Menu/ActionBar";
export default {
  name: "home",
  components: {
     ActionBar
  },
    async beforeRouteEnter(to, from, next) { 
            await store.dispatch("mobile/defaultActionBar", 'เกี่ยวกับ')
            next()
        },
};
</script>
