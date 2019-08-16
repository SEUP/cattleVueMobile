<template>
    <v-card class="card--flex-toolbar" style="">
        <v-toolbar card dense class="grey lighten-4">
            ข้อมูลส่วนตัว
            <v-spacer></v-spacer>

            <farmer-edit-profile-dialog>
                <v-btn depressed>
                    <v-icon>mdi-pencil</v-icon>
                    แก้ไข
                </v-btn>
            </farmer-edit-profile-dialog>

        </v-toolbar>
        <!--content--> 
        <v-list two-line>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>ชื่อ - นามสกุล</v-list-tile-title>
                    <v-list-tile-sub-title>{{farmer.firstname ? farmer.firstname : "ไม่ระบุ"}} {{farmer.lastname ?
                        farmer.lastname : "ไม่ระบุ"}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>รหัสประจำตัวประชาชน</v-list-tile-title>
                    <v-list-tile-sub-title>{{farmer.personal_id ? hiddenPersonalID : "ไม่ระบุ" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>เลขที่</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farmer.house_address ? farmer.house_address : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content >
                    <v-list-tile-title>ตำบล</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{farmer.houseDistrict.district_name ? farmer.houseDistrict.district_name : "-" }} 
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>อำเภอ</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farmer.houseAmphur.amphur_name ? farmer.houseAmphur.amphur_name : "-" }}<br/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>จังหวัด</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farmer.houseProvince.province_name ? farmer.houseProvince.province_name : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>รหัสไปรษณีย์</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farmer.house_zipcode ? farmer.house_zipcode : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>เบอร์โทรศัพท์</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farmer.phone_number ? farmer.phone_number : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    import {get,sync} from "vuex-pathify"

    import FarmerEditProfileDialog from "./FarmerEditProfileDialog";

    export default {
        name: "Farm",
        components: {FarmerEditProfileDialog},
        computed: {
            ...sync('farmer/*'),
            hiddenPersonalID: function () {
                let personalId = this.farmer.personal_id
                if (personalId) {
                    let lenP = personalId.length;
                    return personalId.substr(0, lenP - 3) + "XXX"
                }
                return null;
            }
        },
        data: () => ({}),
        async mounted() { 
            
          if(!this.farmer.houseAmphur == null ){
              alert('s')
          }
       
       } 

    }
</script>
