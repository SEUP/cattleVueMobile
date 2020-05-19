<template>
<v-content class="font">

    <pre v-if="debug">{{cattleChoose}}</pre>
    <center>
        <v-btn @click="AddBreeder()" round class="box-green wh">เพิ่มข้อมูล</v-btn>
    </center>
    <v-container v-if="response">   
        <v-layout row v-for="female,index in FemaleBreeder.data" :key="index">

            <v-flex xs12>
                <v-card class="box-green  pd-10 wh" style="width:100%;">
                    <h3>วันที่: {{dateTH(female.breeding_date)}}</h3>
                    <v-card class=" mrt-6 pd-6">
                        <!--  <pre>{{female}}</pre> ---->
                        <h4><b>ชนิด:</b> {{getType(female.breed_type)}}</h4>
                        <h4 v-if="female.breed_type == '240200'"><b>ผู้ทำ:</b> {{notNull(getType(female.maker))}}</h4>
                        <h4><b>ผลการผสมพันธุ์:</b>{{getType(female.breeding_result)}} &nbsp;<span v-if="female.birth_outcomes == '250200'">(แท้ง)</span></h4>

                    </v-card>
                    <center class="mrt-10">

                        <v-btn @click="editBreeder(female)" class="box-yellow">
                            <h4>
                                <v-icon>mdi-pencil</v-icon>แก้ไขข้อมูล
                            </h4>
                        </v-btn>
                        <v-btn @click="removeBreeder(female.id)" class="box-red">
                            <h4>
                                <v-icon>mdi-delete</v-icon>ลบข้อมูล
                            </h4>
                        </v-btn>
                    </center>

                </v-card><br>
            </v-flex>

        </v-layout>

    </v-container>

    <v-dialog>

    </v-dialog>

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
            response:false,

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
        FemaleBreeder: get('manageDef/femaleBreeder'),
        getFemaleBreeder: get('manageDef/setFemaleBreeder'),
        getAge: get("cattle/getAge"),
        dateTH: get('core/dateTH'),
        getType: get('choice/getChoiceByCode'),
        setBreeder: get('manageDef/setBreeder'),
        loadBreeder: get('manageDef/breeder'),

    },
    async mounted() {
        this.load();
    },
    methods: {
        AddBreeder() {
            this.$router.push({
                name: 'Female-Breeder-create'
            });
        },
        editBreeder(formss) {
            this.$router.push({
                name: 'Female-Breeder-create',
                params: {
                    forms: formss,
                }
            });
        },
        removeBreeder: async function (id) {
            let params = {
                api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed/' + id,
            }
            let data = await store.dispatch("manageDef/removeData", params);
            this.load();
        },
        load: async function () {
            let params = {
                api: 'farmer/cattles/' + this.cattleChoose.id + '/femalebreed',
            }
            let data = await store.dispatch("manageDef/getData", params);
            await store.dispatch("choice/getChoices");
            this.getFemaleBreeder(data);
            this.response = true;
        }
    }

}
</script>
