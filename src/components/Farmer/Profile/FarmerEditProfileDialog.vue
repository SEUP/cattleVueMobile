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
                        <v-btn icon flat @click="updateFarmer()">
                            <v-icon>
                                mdi-check
                            </v-icon>
                        </v-btn>

                    </v-layout>
                </v-toolbar>
                <v-card-text>
                    <v-flex ma-3>
                        <v-text-field label="ชื่อ" v-model="form.firstname"
                                      :error-messages="error.firstname"/>
                        <v-text-field label="นามสกุล" v-model="form.lastname"
                                      :error-messages="error.lastname"/>
                        <v-text-field label="รหัสบัตรประจำตัวประชาชน" v-model="form.personal_id"
                                     />
                        <v-text-field label="เบอร์โทรศัพท์" v-model="form.phone_number"
                                      :error-messages="error.phone_number"/>
                        <v-text-field label="ที่อยู่ปัจจุบัน" v-model="form.house_address"/>
                     
                         
                        <district-select  @change="updateDistrictSelect"
                        :valProvince="form.house_province"
                        :valAmphur="form.house_amphur"
                        :valDistrict="form.house_district"></district-select> 
                        <v-text-field label="รหัสไปรษณีย์" v-model="form.house_zipcode" hide-details/>
                        <br>
                        <v-text-field label="Username" v-model="form.username"
                                     :error-messages="error.username"/>
                        <v-text-field label="Email" v-model="form.email"/>
                        <v-text-field type="password" label="Password" v-model="form.password"
                                      :error-messages="error.password"/>
                        <v-text-field type="password" label="Confirmed password" v-model="form.password_confirmation"
                                      :error-messages="error.password_confirmation"/>
                    </v-flex>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>

</template>
<script>
    import {get} from "vuex-pathify"
    import _ from "lodash"
    import DistrictSelect from "../../Share/DistrictSelect";

    export default {
        name: "FarmerEditProfileDialog",
        components: {DistrictSelect},
        data: () => ({
            dialog: false,
            form : null,
            formSync:{},
        }),
        watch : {
            dialog : function() {
                this.form = _.cloneDeep(this.farmer)
                this.$store.dispatch('error/resetError')
            }
        },
        computed: {
            farmer: get("farmer/farmer"),
            error: get("error/error")
        },
        methods: {
            updateDistrictSelect: function (value) {
                this.form.house_province = value[0];
                this.form.house_amphur = value[1];
                this.form.house_district = value[2];

                if (value[0]) {
                    this.form.house_province = value[0].province_id;
                }
                if (value[1]) {
                    this.form.house_amphur = value[1].amphur_id;
                }
                if (value[2]) {
                    this.form.house_district = value[2].district_id;
                }
            },
            updateFarmer: async function () {
                let form = await this.$store.dispatch("farmer/updateFarmer", this.form);
                await this.syncToQuestion();
                if (form) {
                    this.dialog = false
                }
            },
             async syncToQuestion(){

                this.formSync.firstname = this.form.firstname
                this.formSync.lastname = this.form.lastname
                this.formSync.personal_id = this.form.personal_id

                this.formSync.house_province = this.form.house_province
                this.formSync.house_amphur = this.form.house_amphur
                this.formSync.farm_district = this.form.farm_district

                this.formSync.mobile_no = this.form.phone_number
                this.formSync.house_postcode = this.form.house_zipcode

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
<style scoped>
    .btncolor {
        background-color: #56B949 !important;
        color: white;
    }

    .barcolor {
        background-color: #039BE5;

    }
</style>
