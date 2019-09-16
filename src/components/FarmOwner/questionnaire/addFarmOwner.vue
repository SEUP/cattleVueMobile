<template>
  <v-container v-if="isReady">
    <v-layout row >
      <v-flex xs12>
        <v-card-text class="display-1  pa-0 mb-3 text-xs-center text-md-left">
          <v-icon color="primary" x-large>mdi-plus</v-icon>บันทึกข้อมูลเกษตรกรใหม่
        </v-card-text>

        <v-divider></v-divider>
        <v-container fluid grid-list-lg>
          <v-layout row wrap v-if="farmOwner" >
            <v-flex lg9>
              <v-card>
                <v-divider class="pt-1 indigo"></v-divider>
                <v-stepper v-model="steper" vertical non-linear>

                  <template>
                    <v-stepper-step :complete="steper > 1" :step="1" editable>ส่วนที่ 1
                      <small>ข้อมูลพื้นฐานของเกษตรกร</small>
                    </v-stepper-step>
                    <v-stepper-content :step="1">

                      <part1></part1>

                      <v-btn color="primary" @click.native="steper = 2">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>
                  <template>
                    <v-stepper-step :complete="steper > 2" :step="2" editable>ส่วนที่ 2
                      <small>ข้อมูลการเลี้ยงเเละสถานภาพฟาร์ม</small>
                    </v-stepper-step>
                    <v-stepper-content :step="2">
                      <Part2></Part2>
                      <v-btn color="primary" @click.native="steper = 3">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>
                  <template id="f3">
                    <v-stepper-step :complete="steper > 3" :step="3" editable>ส่วนที่ 3
                      <small>ข้อมูลแรงงาน พื้นที่ในการเลี้ยง และการจัดการอาหาร</small>
                    </v-stepper-step>
                    <v-stepper-content :step="3">

                      <Part3></Part3>

                      <v-btn color="primary" @click.native="steper = 4">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>

                  <template id="f4">
                    <v-stepper-step :complete="steper > 4" :step="4" editable>ส่วนที่ 4
                      <small>การผสมพันธ์ุ ประสิทธิภาพการผลิต และการรักษาโรค</small>
                    </v-stepper-step>
                    <v-stepper-content :step="4">
                      <part4></part4>
                      <v-btn color="primary" @click.native="steper = 5">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>

                  <template id="f5">
                    <v-stepper-step :complete="steper > 5" :step="5" editable>ส่วนที่ 5
                      <small>ข้อมูลแหล่งเงินทุนที่ใช้ในการเลี้ยงโคเนื้อ</small>
                    </v-stepper-step>
                    <v-stepper-content :step="5">

                      <part5></part5>

                      <v-btn color="primary" @click.native="steper = 6">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>

                  <template id="f6">
                    <v-stepper-step :complete="steper > 6" :step="6" editable>ส่วนที่ 6
                      <small>ข้อมูลการตลาด การรวมกลุ่มของสมาชิก(วิสาหกิจชุมชนและสหกรณ์)</small>
                    </v-stepper-step>
                    <v-stepper-content :step="6">

                      <part6></part6>

                      <v-btn color="primary" @click.native="steper = 7">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>

                  <template id="f7">
                    <v-stepper-step :complete="steper > 7" :step="7" editable>ส่วนที่ 7
                      <small>การได้รับบริการ การส่งเสริมและสนับสนุนจากหน่วยงานต่างๆ</small>
                    </v-stepper-step>
                    <v-stepper-content :step="7">

                      <!---->
                      <part7></part7>

                      <v-btn color="primary" @click.native="steper = 8">Continue</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>

                  <template id="f8">
                    <v-stepper-step :complete="steper > 8" :step="8" editable>ส่วนที่ 8
                      <small>ปัญหา อุปสรรค และข้อเสนอแนะ</small>
                    </v-stepper-step>
                    <v-stepper-content :step="8">

                      <part8></part8>

                      <v-btn color="success">save</v-btn>
                      <v-btn flat @click.native="steper=0" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>
                </v-stepper>
              </v-card>
            </v-flex>

            <v-flex lg3 >
              <div style="position: sticky; top:72px ">
                <v-divider class="pt-1 success"></v-divider>
              <v-list class="elevation-1">
                <v-list-tile class="text-xs-center">
                  <v-btn color="success" depressed block @click.native="createFarmOwner">Save</v-btn>
                  <v-btn depressed block @click="$router.go(-1)">Cancel</v-btn>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile @click="elFocus(1)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 1</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(2)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 2</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(3)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 3</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(4)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 4</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(5)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 5</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(6)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 6</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(7)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 7</v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="elFocus(8)">
                  <v-icon>extension</v-icon>
                  <v-spacer></v-spacer>
                  <v-list-tile-content>ส่วนที่ 8</v-list-tile-content>
                </v-list-tile>
              </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-container>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import Part1 from "./part1";
  import Part2 from "./part2";
  import Part3 from "./part3";
  import Part4 from "./part4";
  import Part5 from "./part5";
  import Part6 from "./part6";
  import Part7 from "./part7";
  import Part8 from "./part8";

    export default {
      components: {
        Part1,
        Part2,
        Part3,
        Part4,
        Part5,
        Part6,
        Part7,
        Part8,
      },
      name: "addFarmOwner",
      data :()=>({
        steper :1,
        farmOwner : null
      }),
      computed : {
        isReady : function(){
          let choicesLoaded =  this.$store.state.admin.choices.isLoad == 'Done';
          let districtLoaded = this.$store.state.admin.districtSelect.isLoad == 'Done';
          return choicesLoaded && districtLoaded && this.farmOwner;
        }
      },
      async created() {
        await this.$store.dispatch('admin/farmOwners/getForm');
        await this.$store.dispatch('admin/choices/load');
        await this.$store.dispatch('admin/districtSelect/load');
        this.farmOwner = await this.$store.state.admin.farmOwners.farmOwner;


        if(this.$route.params.farmer){
          let farmer = this.$route.params.farmer
          console.log(farmer);

          this.farmOwner.first_name = farmer.firstname
          this.farmOwner.last_name = farmer.lastname
          this.farmOwner.person_id = farmer.personal_id

        }
      },
      methods:{
        elFocus : function (el) {
          this.steper = el;
        },
        createFarmOwner: async function () {
          let data = await this.$store.dispatch("admin/farmOwners/createFarmOwner");
          await console.log("SAVE")
          if(data){
            alert("บันทึกข้อมูลเเล้ว")
            this.$router.push({name:'admin-farmOwner-edit',params:{id:data.id}})}
        },
      }
    }
</script>

<style scoped>

</style>
