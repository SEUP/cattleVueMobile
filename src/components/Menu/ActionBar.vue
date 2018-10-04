<template>
    <v-content>
        <v-toolbar dark :class="menu.bg">
            <v-btn icon @click="$router.go(-1)">
                <v-icon>{{menu.iconLeft}}</v-icon>
            </v-btn>

            <v-toolbar-title class="white--text">{{menu.title}}</v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-btn v-if="menu.btnFirst" icon @click="$router.push(menu.pathFirst)">
                <v-icon>{{menu.iconFirst}}</v-icon>
            </v-btn>
         
           
            <v-btn v-if="menu.btnSecond"  icon @click="$router.push(menu.pathSecond)">
                <v-icon>{{menu.iconSecond}}</v-icon>
            </v-btn>
        </v-toolbar>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    export default {
        name: "ActionBar",
        data() {
            return {
             
            }
        },
        computed: {
          menu: get("mobile/ActionBar"),
        },
        props: {
            
        },
        methods: {
             
             checkNull(data){
                 if(data == null){
                     return '';
                 }else{
                     return data;
                 }
             }

        }
    }
</script>

<style scoped>

</style>