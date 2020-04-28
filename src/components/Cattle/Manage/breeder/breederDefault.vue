<template>
    <v-content>
      <!-----  <pre>{{loadBreeder}}</pre> ---->

        <v-divider class="mrt-20" light></v-divider>
        <center>
            <h1>การผสมพันธุ์
                <BreederForms :cattle="cattle" :forms="{}" />
            </h1>
        </center>
        <v-divider light></v-divider>

        <v-layout row v-for="breeders in loadBreeder.data">
            <v-flex xs12 class="pd-20">
                <v-card class="box-green  pd-10 wh">
                    <h3>วันที่: {{dateTH(breeders.breeding_date)}}</h3>
                    <v-card class=" mrt-6 pd-6">
                        <h4><b>ชนิด:</b> {{getType(breeders.breed_type)}}</h4>
                        <h4 v-if="breeders.breed_type == '240200'" ><b>ผู้ทำ:</b> {{notNull(getType(breeders.maker))}}</h4>
                        <h4><b>หมายเหตุ:</b></h4> 
                        <p>{{breeders.breed_detail}}</p>
                    </v-card>
                    <center class="mrt-10">
                         <BreederForms :cattle="cattle" :forms="breeders" :update="'asd'" />
                    
                    </center>
                </v-card>
            </v-flex>

        </v-layout>

   
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
     import BreederForms from "@/components/Cattle/Manage/breeder/forms";
    export default {
        name: "ChangeType",
        data() {
            return {
                breeder: {},
          

            }
        },
        components:{
            BreederForms
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            setBreeder:get('manageDef/setBreeder'),
            loadBreeder:get('manageDef/breeder'),
        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {

         
            notNull(data) {
                if (data == null) {
                    return 'ไม่มีข้อมูล';
                } else {
                    return data;
                }
            },
            initial: async function () {
                let params = {
                    api: 'farmer/cattles/' + this.cattle.id + '/malebreed',
                }
               let data = await store.dispatch("manageDef/getData", params);
               this.setBreeder(data);
               
            }

        }
    }
</script>

<style scoped>

</style>