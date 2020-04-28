<template>
    <div>
        <div @click.stop="dialog = true">
            <slot>
                <v-btn flat icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </slot>
        </div>

        <v-dialog v-if="form"
                  persistent
                  fullscreen
                  v-model="dialog"
                  transition="dialog-bottom-transition"
                  scrollable>
            <v-card>
                <v-toolbar class="elevation-3" dense>
                    <v-btn icon flat @click="dialog=false">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        แก้ไขข้อมูล
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn icon flat @click="save()">
                            <v-icon>
                                mdi-check
                            </v-icon>
                        </v-btn>

                    </v-layout>
                </v-toolbar>
                <v-card-text>
                    <v-flex ma-3>
                        <v-text-field label="ชื่อฟาร์ม" v-model="form.name" hide-details/>
                        <choice class="mt-3" to="การขึ้นทะเบียนฟาร์ม" v-model="form.farm_issue_status" @change="CheckFarmStatus()"/>
                        <template v-if="form.farm_issue_status == '230100'">
                            <v-text-field label="หมายเลขทะเบียนฟาร์ม" v-model="form.farm_issue_id" hide-details/>
                            <date-picker label="วัน/เดือน/ปี ที่ลงทะเบียน"
                                         :valDate="form.farm_issue_date"
                                         @change="form.farm_issue_date = $event"
                            ></date-picker>
                        </template>

                        <v-text-field label="ละติจูด" v-model="form.farm_lat" hide-details/>
                        <v-text-field label="ลองจิจูด" v-model="form.farm_lng" hide-details/>
                    </v-flex>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>

</template>
<script>
    import {get,sync} from "vuex-pathify"
    import _ from "lodash"

    import Base from "@/components/Base"
    import DistrictSelect from "@/components/Share/DistrictSelect";
    import Choice from "@/components/Share/Choice";
    import DatePicker from "@/components/Share/DatePicker";

    export default {
        name: "FarmerFarmEditDialog",
        extends : Base,
        components: {DatePicker, Choice, DistrictSelect},
        data: () => ({
            dialog: false,
            form : null,
            formSync:{},
        }),
        watch : {
            dialog : function() {
                this.form = _.cloneDeep(this.farm)
                this.$store.dispatch('error/resetError')
            }
        },
        computed: {
             ...sync('farmer/*'),
            farm: get("farmer/farm"),
        },
        async mounted(){
            await this.load();
        },
        methods: {
            
            CheckFarmStatus : async function(){
                let farmStatus = this.form.farm_issue_status
                if(farmStatus == "230200"){
                    this.form.farm_issue_date = null
                    this.form.farm_issue_id = null
                } 
            },
            save: async function () {
                let data = await this.$store.dispatch("farmer/updateFarm", this.form)
                await this.syncToQuestion();
                if (data) {
                    this.dialog = false
                }
            },
            async syncToQuestion(){
                this.formSync.farm_lat = this.form.farm_lat
                this.formSync.farm_long = this.form.farm_lng
                await this.$store.dispatch("admin/farmOwners/updateState", this.formSync)
                let data = await this.$store.state.admin.farmOwners.farmOwner
            },
            async load(){ 
                let farmOwnerId = this.farmer.id
                this.formSync = await this.$store.dispatch("admin/farmOwners/getFarmOwnerById", {
                    id: farmOwnerId,
                    isAdmin: true
                });  
            },
        }
    }
</script>
