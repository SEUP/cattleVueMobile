<template>
    <v-content>
        <v-layout row v-for="cattle in cattles">
            <v-flex xs12 class="mrt-20">
                <v-card>
                    <v-layout>
                        <v-flex xs5 class="pd-20">
                            <CattleAvatar :url="cattle.image_url" /> 
                        </v-flex>
                        <v-flex xs7>
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">{{cattle.name}}</div>
                                    <v-divider light></v-divider>
                                    <div class="mrt-6"><b>เบอร์หู : </b> {{notNull(cattle.ear_number)}}</div>
                                    <div><b>อายุ : </b> {{getAge(cattle.birth_date)}} </div>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row>
                        <v-flex xs12 class="box-blueLN pd-10" @click="close()">
                            <center>
                                <h3 class="nm" @click="goProfile(cattle)">
                                    <v-icon class="light">mdi-eye</v-icon> ดูข้อมูล
                                </h3>
                            </center>
                        </v-flex>
                        <v-flex xs12 class="box-greenFX pd-10">
                            <center>
                                <h3 class="nm" @click="manage(cattle)">
                                    <v-icon class="light">mdi mdi-settings</v-icon>จัดการ
                                </h3>
                            </center>
                        </v-flex>
                        <v-flex xs12 class="box-red pd-10">
                            <center>
                                <h3 class="nm" @click="removeCattle(cattle)">
                                    <v-icon class="light">mdi-delete</v-icon>ลบ
                                </h3>
                            </center>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>



    </v-content>
</template>

<script>
    import store from "@/store/"
    import { get} from "vuex-pathify"
   import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "CattleListView",
        components:{
            CattleAvatar
        },
        data() {
            return { 
                cattlesData: {},
            }
        },
        computed: {
            getAge: get("cattle/getAge"),
            cattles: get("cattle/cattles"), 
            getCattleChoose: get("cattle/getCattleChoose"),
              setId: get('manageDef/setId'),
        },
        props: {
            params: {}
        },
        async mounted() {
            this.initial();
        },
        methods: {
            initial: async function () {
                    this.getCattle();
                },
                goProfile(data) {
                    this.setId(data.id);
                    this.$router.push({
                        name: 'cattle-profile',
                        params: {
                            cattle: data
                        }
                    });
                },
                getCattle: async function () {
                        await store.dispatch("cattle/getCattle", this.params)
                    },
                    notNull(data) {
                        if (data == null) {
                            return 'ยังไม่มีข้อมูล';
                        } else {
                            return data;
                        }
                    },

                    manage(data) {
                        this.$router.push({
                            name: 'cattle-manage',
                            params: {
                                cattle: data
                            }
                        });
                        this.getCattleChoose(data);
                    },

                    removeCattle: async function (params) {
                        let check = confirm("คุณแน่ใจใช่ไหมที่จะลบข้อมูล");
                        if (check) {
                            await store.dispatch("cattle/removeCattle", params)
                        }
                        this.initial();
                    },
        }
    }
</script>

<style scoped>

</style>