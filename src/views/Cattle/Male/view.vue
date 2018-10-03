<template>
  <v-content>
       <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
      <v-container> 
             <CattleListView :cattles="cattle.data" />
      </v-container>
  </v-content>
</template>

<script>
    import store from "@/store/"
    import {get} from "vuex-pathify"

    import FarmerAvatar from "@/components/Farmer/Avatar/FarmerAvatar"; 
     import CattleListView from "@/components/Cattle/CattleListView"; 
    export default {
        name: 'App',
        components: {
            FarmerAvatar,
            CattleListView,
        },
        data() {
            return {
     
            }
        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            await store.dispatch("farmer/getFarmer")
            await store.dispatch("farmer/downloadAvatar") 
       
          
            next()
        },
        computed: {
            farmer: get("farmer/farmer"),
            avatar: get("farmer/avatar"),
            cattle: get("cattle/cattles"),
         
        },
        async mounted() {
            await this.initial(); 
        },
        methods: {
    
            getCattle: async function(){
            let params = {
                farmerId :this.farmer.id,
                cattle_type :'020100',
            }
               await store.dispatch("cattle/getCattle",params)
                alert(this.farmer.id);
            },
            initial: async function () {
                this.getCattle();
            },
         
        }


    }
</script>
 