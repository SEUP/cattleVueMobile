<template>
  <v-container>
    <h1 class="display-1 pa-0 mb-3">
      <v-icon x-large color="primary">mdi-magnify</v-icon>&ensp;ค้นหาข้อมูลเกษตรกร
    </h1>
    <v-divider class="mb-3"></v-divider>
    <div>
      <!--Search Input -->
      <v-layout>
        <v-flex>
          <v-divider class="pt-1 orange"></v-divider>
          <v-card>
            <v-layout wrap px-3 py-1>
              <v-flex xs12 md6>
                <v-text-field label="ค้นหา : ชื่อ นามสกุล รหัสประจำตัวประชาชน" v-model="form.keyword"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>

              <v-flex xs12 md5>
                <select-search type="master_breeding_types" label="ประเภทโคที่เลี้ยง"
                               v-model="form.breeding" @change="form.breeding = $event.id"
                >
                </select-search>
              </v-flex>
              <v-flex xs12>
                <district-select-single-line
                  :valProvince="form.province"
                  :valAmphur="form.amphur"
                  :valDistrict="form.district"
                  singleLine
                  @change="updateDistrictSelect">
                </district-select-single-line>
              </v-flex>
              <v-flex xs12 class="text-xs-center mt-2">
                <v-btn color="primary" @click="search()" depressed>ค้นหา</v-btn>
                <v-btn outline @click="resetSearch()">ล้างข้อมูล</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>


      <!--Search result Display -->
      <v-layout row class="my-2">
        <v-flex xs12>
          <v-card>
            <v-data-table
              class="" hide-actions :headers="headsTable" :items="paginate.data">
              <template slot="items" slot-scope="props">
                <td class="text-xs-lef">{{ props.item.firstname +" "+ props.item.lastname }}</td>
                <td class="text-xs-left">{{ props.item.mobile_no }}</td>
                <td class="text-xs-left">{{ getProvinceAmphurDistrictString(props.item) }}</td>
                <td class="text-xs-left">{{  props.item.updated_at }}</td>

                <td class="text-xs-center">
                  <v-tooltip top>
                    <v-btn class="ma-0" icon @click="downloadPdf(props.item)" slot="activator">
                      <v-icon color="success">mdi-download</v-icon>
                    </v-btn>
                    <span>ส่งออก</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <v-btn class="ma-0" icon :to="{name:'admin-farmOwner-edit',params : {id : props.item.id}}"
                           slot="activator">
                      <v-icon color="primary">create</v-icon>
                    </v-btn>
                    <span>แก้ไข</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <v-btn class="ma-0" icon @click="" slot="activator" @click.native="deleteFarmOwner(props.item.id)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                    <span>ลบ</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
            <v-divider></v-divider>
            <v-flex xs12 py-2 class="text-xs-center">
              <v-pagination @input="changePage" :length="paginate.lastPage"
                            v-model="paginate.page"></v-pagination>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>

  import ChoiceSelect from "./share/choiceSelect";
  import selectSearch from "./share/selectSearch";
  import DistrictSelectSingleLine from "../Share/districtSelectSingleLine";

  import {mapState} from 'vuex';

  export default {
    name: "admin-farmOwner-index",
    components: {DistrictSelectSingleLine, ChoiceSelect, selectSearch},

    computed: {
      ...mapState({
        admin: state => state.admin.adminData
      })
    },

    data: () => ({
      paginate: {},
      form: {
        keyword: "",
        breeding: null,
        province: null,
        amphur: null,
        district: null,
        admin_province: "",
        admin_amphur: "",
        admin_district: ""

      },
      farmOwners: [],
      headsTable: [
        {text: "ชื่อ-นามสกุล", align: "left", value: "full_name", sortable: false},
        {text: "เบอร์โทร", align: "left", value: "mobile_no", sortable: false},
        {text: "จังหวัด อำเภอ ตำบล", align: "left", value: "address_name", sortable: false},
        {text: "ข้อมูลเมื่อ", align: "left", value: "updated_at", sortable: false},
        {text: "การจัดการ", align: "center", value: "action", sortable: false},
      ]
    }),
    async mounted() {
      await this.loadData()
    },
    methods: {
      exportAll: function(){
        axios({
          url: `/api/v1/admin/farm-owners/exportAll`,
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `exportall.xlsx`);
          document.body.appendChild(link);
          link.click();
        });
      },
      downloadPdf: function (item) {
        axios({
          url: `/api/v1/admin/farm-owners/${item.id}/export`,
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `export_${item.id}.pdf`);
          document.body.appendChild(link);
          link.click();
        });

      },
      getProvinceAmphurDistrictString: function (item) {
        let pvString = item.province_name ? item.province_name : "-";
        let amString = item.amphur_name ? item.amphur_name : "-";
        let diString = item.district_name ? item.district_name : "-";


        let outputStr = "";
        outputStr += pvString == "-" ? "" : pvString;
        outputStr += amString == "-" ? "" : " " + amString;
        outputStr += diString == "-" ? "" : " " + diString;
        return outputStr;
      },
      loadData: async function () {
        if (!this.admin) {
          this.admin = this.$store.state.admin.adminData;
          this.admin = JSON.parse(this.admin)
        }
        this.form.admin_role = this.admin.roles ? this.admin.roles : null;
        this.form.admin_province = this.admin.province;
        this.form.admin_amphur = this.admin.amphur;
        this.form.admin_district = this.admin.district;
        let paginate = await this.$store.dispatch("admin/farmOwners/getFarmOwners",this.form)
        this.paginate = paginate;
        this.paginate.page = parseInt(paginate.page)
        this.farmOwners = paginate.data;
      },
      search: async function () {
        this.form.page = 1 ;
        let paginate = await this.$store.dispatch("admin/farmOwners/getFarmOwners", this.form)
        this.paginate = paginate;
        this.paginate.page = parseInt(paginate.page)
        this.farmOwners = paginate.data;
      },
      resetSearch: function () {
        this.form = Object.assign({})
        this.$router.go(0)

      },
      changePage: async function (page) {
        this.form.page = page;
        let paginate = await  this.$store.dispatch("admin/farmOwners/getFarmOwners", this.form)
        this.paginate = paginate;
        this.paginate.page = parseInt(paginate.page)
        this.farmOwners = paginate.data;

      }, updateDistrictSelect: function (value) {
        if (value[0]) {
          this.form.province = value[0].province_id;
          this.form.amphur = 0;
          this.form.district = 0;
        }
        if (value[1]) {
          this.form.amphur = value[1].amphur_id;
          this.form.district = 0;
        }
        if (value[2]) {
          this.form.district = value[2].district_id;
        }
      },
      deleteFarmOwner: async function (id) {

        if (confirm("Do you want to delete this item?")) {
          let result = await  this.$store.dispatch("admin/farmOwners/deleteFarmOwner", id)
          await alert("ลบเรียบร้อยเเล้ว")
          await this.loadData();
        }

      }
    }
  }
</script>

