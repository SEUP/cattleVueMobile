<template>
    <v-card class="card--flex-toolbar" style="">
        <v-toolbar card dense class="grey lighten-4">
            ข้อมูลฟาร์ม
            <v-spacer></v-spacer>

            <farmer-farm-edit-dialog>
                <v-btn depressed>
                    <v-icon>mdi-pencil</v-icon>
                    แก้ไข
                </v-btn>
            </farmer-farm-edit-dialog>

        </v-toolbar>
        <!--content-->

        <v-list two-line>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>ชื่อฟาร์ม</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.name ? farm.name : "ไม่ระบุ"}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>สถานะการขึ้นทะเบียนฟาร์ม</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.farm_issue_status ? getChoiceName(farm.farm_issue_status) : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>หมายเลขทะเบียนฟาร์ม</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.farm_issue_id ? farm.farm_issue_id : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>วัน/เดือน/ปี ที่ลงทะเบียน</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.farm_issue_date ? getDate(farm.farm_issue_date) : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>ละติจูด</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.farm_lat ? farm.farm_lat : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>ลองจิจูด</v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{farm.farm_lng ? farm.farm_lng : "-" }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
        </v-list>
    </v-card>
</template>

<script>
    import {get} from "vuex-pathify"
    import {mapGetters} from 'vuex';
    import FarmerFarmEditDialog from "@/components/Farmer/Farm/FarmerFarmEditDialog";

    export default {
        name: "FarmerFarmCard",
        components: {FarmerFarmEditDialog},
        computed: {
            farmer: get("farmer/farmer"),
            farm: get("farmer/farm"),

            ...mapGetters({
                getChoiceName: 'choice/getChoiceByCode',
                getDate: 'choice/getThaiFormatDate',
            }),
        },
        data: () => ({}),

    }
</script>
