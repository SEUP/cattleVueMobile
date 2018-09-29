<template>
    <v-card class="card--flex-toolbar" style="">
        <v-toolbar card dense class="grey lighten-4">
            ข้อมูลส่วนตัว
            <v-spacer></v-spacer>
            <v-btn depressed>
                <v-icon>mdi-pencil</v-icon>
                แก้ไข
            </v-btn>
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
                    <v-list-tile-title>ที่อยู่</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <span style="font-weight: bold;">เลขที่ </span>
                        {{farmer.house_address ? farmer.house_address : "-" }}
                        <span style="font-weight: bold;">ตำบล </span>
                        {{farmer.houseDistrict.district_name ? farmer.houseDistrict.district_name : "-" }}
                        <span style="font-weight: bold;">อำเภอ </span>
                        {{farmer.houseAmphur.amphur_name ? farmer.houseAmphur.amphur_name : "-" }}<br/>
                        <span style="font-weight: bold;">จังหวัด </span>
                        {{farmer.houseProvince.province_name ? farmer.houseProvince.province_name : "-" }}
                        <span style="font-weight: bold;">รหัสไปรษณีย์ </span>
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
    import {get} from "vuex-pathify"

    export default {
        name: "FarmerProfileCard",
        components: {},
        computed: {
            farmer: get("farmer/farmer"),
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

    }
</script>
