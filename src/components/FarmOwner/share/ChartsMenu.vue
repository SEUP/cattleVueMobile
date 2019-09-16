<template>
  <v-layout class="column">
    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 1 ข้อมูลพื้นฐานของเกษตรกร</v-card-title>
        <v-divider ></v-divider>
        <v-card-text class="pl-3">
          <ul class="pl-3">
            <li><router-link  :to="{name:'admin-chart-pie',params : {label:'เพศ',type:'sex'}}"  @click.native="toTop">เพศ</router-link></li>
            <li><router-link  :to="{name:'admin-chart-range-farmowner',params : {label:'อายุ',type:'age',min: 15,max: 70,step: 8,withNull : false,nullText : '0'}}"
                              @click.native="toTop">อายุ</router-link></li>
            <li><router-link :to="{name:'admin-chart-normal',params : {label:'การศึกษา',type:'education'}}"  @click.native="toTop">การศึกษา</router-link></li>
            <li><router-link :to="{name:'admin-admin-chart-sold',params : {label:'ที่ตั้งฟาร์มของเกษตรกร'}}"  @click.native="toTop">ที่ตั้งฟาร์มของเกษตรกร</router-link></li>
            <li> <router-link :to="{name:'admin-chart-pie',params : {label:'อาชีพการเลี้ยงโคเนื้อ (อาชีพหลัก-เสริม)',type:'cattle_job'}}"  @click.native="toTop">อาชีพการเลี้ยงโคเนื้อ (อาชีพหลัก-เสริม)</router-link></li>
            <li><router-link  :to="{name:'admin-chart-normal',params : {label:'เฉลี่ยรายได้รวมของครอบครัว',type:'income_range'}}"  @click.native="toTop">เฉลี่ยรายได้รวมของครอบครัว</router-link></li>
            <li><router-link   :to="{name:'admin-chart-normal',params : {label:'รายได้จากการประกอบอาชีพของเกษตรกร',type:'jobtypes'}}"  @click.native="toTop">รายได้จากการประกอบอาชีพของเกษตรกร</router-link></li>
            <li> <router-link  :to="{name:'admin-chart-range-farmowner',
          params : {label:'รายได้เฉลี่ยต่อปีของการขายโคเนื้อ',type:'avg_cattle_income',min: 50000,max: 200000,step: 3,withNull : true,nullText : 'ยังไม่ได้ขาย'}}"  @click.native="toTop"
          >รายได้เฉลี่ยต่อปีของการขายโคเนื้อ</router-link></li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex>
      <v-card>
        <v-card-title class="title">ส่วนที่ 2 ข้อมูลการเลี้ยงและสถานภาพฟาร์ม</v-card-title>
        <v-divider ></v-divider>
        <v-card-text class="pl-3">
          <ul class="pl-3">
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'วัตถุประสงค์ของการเลี้ยงโคเนื้อ',type:'farm_purposes'}}">วัตถุประสงค์ของการเลี้ยงโคเนื้อ</router-link ></li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การทำประวัติโคเนื้อ',type:'farm_record'}}">การทำประวัติโคเนื้อ</router-link ></li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-cattle',params : {label:'จำนวนโคเนื้อที่เลี้ยง'}}">จำนวนโคที่เลี้ยง</router-link ></li>
            <li><router-link   @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'ประสบการณ์การเลี้ยงโคเนื้อ',type:'farm_exp'}}">ประสบการณ์การเลี้ยงโคเนื้อ</router-link ></li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'เป้าหมายการเลี้ยงในอนาคต',type:'farm_future'}}">เป้าหมายการเลี้ยงในอนาคต</router-link ></li>
            <li> <router-link  @click.native="toTop" block  :to="{name:'admin-chart-double',params : {label:'การขึ้นทะเบียนฟาร์มกับภาครัฐ',type:'farm_register_status'}}">การขึ้นทะเบียนฟาร์มกับภาครัฐ</router-link ></li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-multiChoice',params : {label:'การเกิดโรคในฟาร์ม',type:'abortion,tuberculosis,foot_mouth_disease,disease_other'}}">การเกิดโรคในฟาร์ม</router-link ></li>
            <li><router-link  @click.native="toTop"  block :to="{name:'admin-chart-range-farmowner',params : {label:'ค่าใช้จ่ายในการเลี้ยงโคเนื้อ (บาท ต่อ เดือน)',type:'total_expense_amount',min: 1000,max: 10000,step: 3,withNull : false,nullText : '0'}}">ค่าใช้จ่ายในการเลี้ยงโคเนื้อ</router-link ></li>
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'ประวัติการตรวจโรคสัตว์',type:'farm_disease_check'}}">ประวัติการตรวจโรคสัตว์</router-link ></li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'แหล่งน้ำที่ใช้',type:'water_source_types'}}">แหล่งน้ำที่ใช้</router-link ></li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 3 ข้อมูลแรงงาน พื้นที่ในการเลี้ยง และการจัดการอาหาร</v-card-title>
        <v-divider ></v-divider>
        <v-card-text class="pl-3">
          <ul class="pl-3">
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-range-farmowner',params : {label:'จำนวนแรงงานภายในครอบครัว',type:'family_workers_amount',min: 1,max: 5,step: 4,withNull : false,nullText : '0'}}">จำนวนแรงงานภายในครอบครัว</router-link></li>
            <li><router-link  block :to="{name:'admin-chart-range-farmowner',params : {label:'จำนวนแรงงานภายนอก',type:'external_workers_amount',min: 1,max: 5,step: 4,withNull : false,nullText : '0'}}">จำนวนแรงงานภายนอก</router-link></li>
            <li> <router-link @click.native="toTop"  block :to="{name:'admin-chart-pie',params : {label:'ลักษณะการเลี้ยงโคเนื้อ',type:'take_care_types'}}">ลักษณะการเลี้ยงโคเนื้อ</router-link></li>
            <li> <router-link  @click.native="toTop"  block  :to="{name:'admin-chart-double',params : {label:'พื้นที่ที่ใช้ในการเลี้ยงโคเนื้อ',type:'use_land'}}">พื้นที่ที่ใช้ในการเลี้ยงโคเนื้อ</router-link></li>
            <li> <router-link  @click.native="toTop"  block :to="{name:'admin-chart-pie',params : {label:'อาหารที่ใช้เลี้ยงโคเนื้อ',type:'feed_types'}}">อาหารที่ใช้เลี้ยงโคเนื้อ</router-link></li>
            <li> <router-link  @click.native="toTop"  block :to="{name:'admin-chart-pie',params : {label:'การให้แร่ธาตุก้อน',type:'minerals_feed'}}">การให้แร่ธาตุก้อน</router-link></li>
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'แหล่งอาหารหยาบในฤดูแล้ง',type:'feed_summer_sources'}}">แหล่งอาหารหยาบในฤดูแล้ง</router-link></li>
            <li> <router-link   @click.native="toTop" block :to="{name:'admin-chart-range-farmowner',params : {label:'พื้นที่ถือครองทางการเกษตร',type:'total_own_lands',min: 0,max: 50,step: 4,withNull : false,nullText : '0'}}">พื้นที่ถือครองทางการเกษตร</router-link></li>
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'การเช่าที่ดินเพื่อใช้ในการเลี้ยง',type:'rent_land'}}">การเช่าที่ดินเพื่อใช้ในการเลี้ยง</router-link></li>
            </ul>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 4 การผสมพันธ์ุ ประสิทธิภาพการผลิต และการรักษาโรค</v-card-title>
        <v-divider ></v-divider>
        <v-card-text class="pl-3">
          <ul class="pl-3">
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การผสมพันธุ์โคเนื้อในฟาร์ม',type:'farm_breeding_type'}}">การผสมพันธุ์โคเนื้อในฟาร์ม</router-link></li>
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'แหล่งน้ำเชื้อการผสมเทียม',type:'inseminate_sources'}}">แหล่งน้ำเชื้อการผสมเทียม</router-link></li>
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'ผู้ให้บริการผสมเทียม',type:'breeders'}}">ผู้ให้บริการผสมเทียม</router-link></li>
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'การตายของโคในรอบปี',type:'cattle_death'}}">การตายของโคในรอบปี</router-link></li>
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'บุคคลที่ทำการรักษาให้เมื่อโคเจ็บป่วย',type:'disease_cured_by'}}">บุคคลที่ทำการรักษาให้เมื่อโคเจ็บป่วย</router-link></li>
          <li><router-link  @click.native="toTop"  block :to="{name:'admin-chart-range-farmowner',params : {label:'อัตราส่วนพ่อพันธุ์คุมฝูง',type:'breeding_rate',min: 1,max: 20,step: 3,withNull : false,nullText : '0'}}">อัตราส่วนพ่อพันธุ์คุมฝูง</router-link></li>
          <li><router-link  @click.native="toTop"  block :to="{name:'admin-chart-doublePivot',params : {label:'การถ่ายพยาธิ',type:'dewormed_amount'}}">การถ่ายพยาธิ</router-link></li>
          <li><router-link  @click.native="toTop" block  :to="{name:'admin-chart-double',params : {label:'วัคซีนป้องกันโรค',type:'vaccine_ever'}}">วัคซีนป้องกันโรค</router-link></li>
          <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'การจัดการมูลโคในฟาร์ม',type:'cattle_dung_uses'}}">การจัดการมูลโคในฟาร์ม</router-link></li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title class="title">ส่วนที่ 5 ข้อมูลแหล่งเงินทุนที่ใช้ในการเลี้ยงโคเนื้อ</v-card-title>
        <v-divider ></v-divider>
        <v-card-text >
          <ul class="pl-3">
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-budget',params : {label:'เงินทุนที่ท่านใช้เลี้ยงโคเนื้อ',type:'budget'}}">เงินทุนที่ท่านใช้เลี้ยงโคเนื้อ</router-link></li>
            </ul>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 6 ข้อมูลการตลาด การรวมกลุ่มของสมาชิก(วิสาหกิจชุมชนและสหกรณ์)</v-card-title>
        <v-divider ></v-divider>
        <v-card-text>
          <ul class="pl-3">
            <li> <router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'การจำหน่ายโค',type:'seller_types'}}">การจำหน่ายโค</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'อายุของโคเนื้อที่จำหน่าย',type:'age_sale'}}">อายุของโคเนื้อที่จำหน่าย</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'น้ำหนักของโคเนื้อที่ท่านจำหน่าย',type:'weight_range_sale'}}">น้ำหนักของโคเนื้อที่ท่านจำหน่าย</router-link></li>
            <li> <router-link  @click.native="toTop"  :to="{name:'admin-chart-pie',params : {label:'ลักษณะการจำหน่าย',type:'cattle_sale_methods'}}">ลักษณะการจำหน่าย</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-groupJoin',params : {label:'การรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อ',type:'group_joins'}}">การรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อ</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'chart-sold'}">ราคาของโคเนื้อที่จำหน่ายและระยะเวลาในการเลี้ยง</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-pie',params : {label:'ความประสงค์ในการรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อ',type:'group_join_future'}}">ความประสงค์ในการรวมกลุ่มวิสาหกิจชุมชนและสหกรณ์โคเนื้อ</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'ความต้องการความช่วยเหลือจากสหกรณ์',type:'cooperative_help_types'}}">ความต้องการความช่วยเหลือจากสหกรณ์</router-link></li>
            <li> <router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'ความต้องการซื้ออาหารข้นในนามสหกรณ์',type:'feed_purchase_cooperative'}}">ความต้องการซื้ออาหารข้นในนามสหกรณ์</router-link></li>
            <li><router-link  @click.native="toTop"  :to="{name:'admin-chart-normal',params : {label:'ระดับความพอใจต่อราคาที่จำหน่าย',type:'sale_satisfaction'}}">ระดับความพอใจต่อราคาที่จำหน่าย</router-link></li>
            </ul>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 7 การได้รับบริการ การส่งเสริมและสนับสนุนจากหน่วยงานต่างๆ</v-card-title>
        <v-divider ></v-divider>
        <v-card-text >
          <ul class="pl-3">
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-normal',params : {label:'หน่วยงานที่ให้บริการส่งเสริมการเลี้ยงโคเนื้อ',type:'support_sources'}}">หน่วยงานที่ให้บริการส่งเสริมการเลี้ยงโคเนื้อ</router-link> </li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การเยี่ยมเยือนฟาร์มจากหน่วยงาน',type:'support_visit'}}">การเยี่ยมเยือนฟาร์มจากหน่วยงาน</router-link> </li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การได้รับการสนับสนุนปัจจัยการผลิต',type:'production_support'}}">การได้รับการสนับสนุนปัจจัยการผลิต</router-link> </li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การใช้บริการด้านสุขภาพโคจากหน่วยงานของกรมปศุสัตว์',type:'cattle_heath_support'}}">การใช้บริการด้านสุขภาพโคจากหน่วยงานของกรมปศุสัตว์</router-link> </li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การเข้ารับการฝึกอบรมเกี่ยวกับการเลี้ยงโคเนื้อ',type:'training_support'}}">การเข้ารับการฝึกอบรมเกี่ยวกับการเลี้ยงโคเนื้อ</router-link> </li>
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การไปดูงานเกี่ยวกับการเลี้ยงโคเนื้อ',type:'observe_support'}}">การไปดูงานเกี่ยวกับการเลี้ยงโคเนื้อ</router-link> </li>
            <li> <router-link  @click.native="toTop" block :to="{name:'admin-chart-pie',params : {label:'การสนับสนุนให้แม่พันธุ์โคเนื้อมาเลี้ยงเพื่อผลิตลูก',type:'female_breeder_support'}}">การสนับสนุนให้แม่พันธุ์โคเนื้อมาเลี้ยงเพื่อผลิตลูก</router-link> </li>
            </ul>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="title">ส่วนที่ 8 ปัญหา อุปสรรค และข้อเสนอแนะ</v-card-title>
        <v-divider ></v-divider>
        <v-card-text >
          <ul class="pl-3">
            <li><router-link  @click.native="toTop" block :to="{name:'admin-chart-suggestion'}" >รายงาน ปัญหา อุปสรรค และข้อเสนอแนะ</router-link> </li>
            </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "charts-menu",
      methods : {
          toTop : function () {
            document.documentElement.scrollTop = 0
          }
      }
    }
</script>

<style scoped>

</style>
