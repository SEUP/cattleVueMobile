<template>
  <v-container v-if="isLoaded">
    <v-toolbar color="primary" fixed>
           <v-btn class="white--text" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title class="white--text">แบบสอบถาม 8 ส่วน</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn @click.native="updateFarmOwner" flat color="white"><v-icon>save</v-icon>แก้ไข</v-btn>
    </v-toolbar>
    
     <v-tabs 
      class="shadow mrt-60 round"
       color="white"
       dark
       slider-color="primary"
     >
       <v-tab  v-for="i in 8" :key="i">
         <v-btn @click="elFocus(i)"  round flat color="primary">ส่วนที่ {{i}}</v-btn>
          
       </v-tab> 
     </v-tabs>
    <v-layout row>
    
      <v-flex xs12> 
        <v-container fluid grid-list-lg>
          <v-layout row wrap v-if="form">
        
            <v-flex xs12>
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

                      <v-btn color="success" @click.native="updateFarmOwner">save</v-btn>
                      <v-btn flat @click="$router.go(-1)" outline>Cancel</v-btn>
                    </v-stepper-content>
                  </template>
                </v-stepper>
              </v-card>
            </v-flex>

            <v-flex lg3>
              
            </v-flex>
          </v-layout>
        </v-container>

      </v-flex>
    </v-layout>

  </v-container>

</template>

<script>
    import Part1 from "./part1"
    import Part2 from "./part2"
    import Part3 from "./part3"
    import Part4 from "./part4"
    import Part5 from "./part5"
    import Part6 from "./part6"
    import Part7 from "./part7"
    import Part8 from "./part8"
        import {get,sync} from "vuex-pathify"

    export default {
        name: "edit",
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
        props: {
            isAdmin: {
                type : Boolean ,
                default: true
            },
        },
        data: () => ({
            form: null,
            steper: 1,
            farmOwner: null,
            isLoaded: false,
        }),
        computed: {
             ...sync('farmer/*'),
            isReady: function () {
                /* despricated */
                let choicesLoaded = this.$store.state.admin.choices.isLoad == 'Done';
                let districtLoaded = this.$store.state.admin.districtSelect.isLoad == 'Done';
                return choicesLoaded && districtLoaded && this.form;
            }
        }
        , async created() {
            let farmOwnerId = this.farmer.id
            this.form = await this.$store.dispatch("admin/farmOwners/getFarmOwnerById", {
                id: farmOwnerId,
                isAdmin: this.isAdmin
            });
            await this.$store.dispatch('admin/choices/load');
            await this.$store.dispatch('admin/districtSelect/load');
            this.isLoaded = true
        }
        , methods: {
            elFocus: function (el) {
                this.steper = el
            },
            updateFarmOwner: async function () {
                let data = await this.$store.dispatch("admin/farmOwners/updateFarmOwner", {isAdmin: this.isAdmin});
                console.log("SAVE", data);
                if (data) {
                    alert("บันทึกข้อมูลเเล้ว")
                }
            }
            ,

        }

    }
</script>
