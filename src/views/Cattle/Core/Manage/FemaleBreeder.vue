<template>
    <v-content class="font">
        <ActionBar />
        <pre v-if="debug">{{cattleChoose}}</pre>
       <center> <v-btn @click="AddBreeder()" round class="box-green wh">เพิ่มข้อมูล</v-btn></center>
        <v-container>
            <v-layout v-for="female in FemaleBreeder.data">
                <v-card>
                    <pre>
                        {{female}}
                    </pre>
            <v-btn @click="editBreeder(female)">แก้ไข</v-btn>
             <v-btn @click="removeBreeder(female.id)">ลบ</v-btn>
                </v-card>
   
            </v-layout> 
           
        </v-container>
      

    </v-content>

</template>



<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import ActionBar from "@/components/Menu/ActionBar";
    import BreederForm from "@/components/Cattle/Manage/breeder/breederFemaleForm";

    export default {
        name: 'App',
        components: {
            ActionBar,
            BreederForm
        },
        data() {
            return {
                debug: false,
      
            }
        },
        props: {
            cattle: {}
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch("mobile/defaultActionBar", 'การผสมพันธุ์ (แม่พันธุ์)')
            next()
        },
        computed: {
            cattleChoose: get("cattle/cattleChoose"),
            FemaleBreeder:get('manageDef/femaleBreeder'),
            getFemaleBreeder:get('manageDef/setFemaleBreeder')
        },
        async mounted() {
            this.load();
        },
        methods: {
            AddBreeder(){
                 this.$router.push({name:'Female-Breeder-create'});
            },
            editBreeder(formss){
                 this.$router.push({
                            name: 'Female-Breeder-create',
                            params: {
                                forms: formss, 
                            }
                        });
            },
            removeBreeder: async function (id){
                    let params = {
                    api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed/'+id,
                }
                let data = await store.dispatch("manageDef/removeData", params);
                this.load();
            },
            load: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed',
                }
                let data = await store.dispatch("manageDef/getData", params);
            
                this.getFemaleBreeder(data);
            }
        }


    }
</script>