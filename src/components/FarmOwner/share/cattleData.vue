<template>
  <div v-if="isReady">
    <v-layout column>
      <v-text-field label="จำนวน" v-model="totalMaster" readonly/>
      <v-flex v-for="mainBreed in choices[type]" :key="mainBreed.id" >
        <v-checkbox :label="mainBreed.choice" hide-details class="ma-0 pa-0"
                    :value="mainBreed"
                    v-model="selMainBreeds"
                    @change="updateValue(type,selMainBreeds)"
                    color="success"
        >
        </v-checkbox>
        <v-flex v-if="mainBreed.choice == 'พันธุ์พื้นเมือง' || mainBreed.choice == 'พันธุ์อื่นๆ'" pa-0 ml-1>
          <template >
            <v-text-field placeholder="โปรดระบุ" hide-details class="ma-0 pa-0 py-1"
                          v-model="mainBreed.pivot.remark" @blur="updateValue(type,selMainBreeds)"/>
            <v-layout>
              <v-flex xs12 md4 mx-2 pa-0 >
                <v-text-field placeholder="จำนวน" class="ma-0 pa-0 py-1" type="number" hide-details
                              v-model="mainBreed.pivot.amount" @blur="updateValue(type,selMainBreeds)"/>
              </v-flex>
              <v-flex xs12 md4 mx-1 pa-0>
                <v-select placeholder="เเหล่งที่มา" class=" ma-0 pa-0 py-1" hide-details dense
                          :items="source_opt" v-model="mainBreed.pivot.source_opt"
                          @change="updateValue(type,selMainBreeds)"
                />
              </v-flex>
              <v-flex xs12 md4 mx-1 pa-0>
                <v-text-field placeholder="เเหล่งที่มาอื่นๆ" class=" ma-0 pa-0 py-1" hide-details
                              v-model="mainBreed.pivot.source" @blur="updateValue(type,selMainBreeds)"/>
              </v-flex>
              <v-flex xs12 md4 mx-1 pa-0>
                <v-text-field placeholder="ราคา" class=" ma-0 pa-0 py-1" type="number" hide-details
                              v-model="mainBreed.pivot.price" @blur="updateValue(type,selMainBreeds)"/>
              </v-flex>
            </v-layout>
          </template>
        </v-flex>
        <v-flex class="pa-0 pt-2 pl-3 " v-else >
          <v-flex v-for="subBreed in choices[mainBreed.children[0].type]" :key="subBreed.id" pa-0 pb-3 >
            <v-checkbox :label="subBreed.choice" hide-details class="ma-0 pa-0"
                        :value="subBreed"
                        v-model="selSubBreeds[mainBreed.children[0].type]"
                        color="success"
                        @change="updateValue(mainBreed.children[0].type,selSubBreeds[mainBreed.children[0].type])"
            ></v-checkbox>
            <template>
              <v-layout ml-2>
                <v-flex xs12 md4 mx-1 pa-0>
                  <v-text-field placeholder="จำนวน" class="ma-0 pa-0 py-1" type="number" hide-details
                                v-if="subBreed.pivot" v-model="subBreed.pivot.amount"
                                @blur="updateValue(mainBreed.children[0].type,selSubBreeds[mainBreed.children[0].type])"
                  />
                </v-flex>
                <v-flex xs12 md4 mx-1 pa-0>
                  <v-select placeholder="เเหล่งที่มา" class=" ma-0 pa-0 py-1" hide-details dense
                            v-model="subBreed.pivot.source_opt"
                            :items="source_opt"
                            @change="updateValue(mainBreed.children[0].type,selSubBreeds[mainBreed.children[0].type])"
                  />
                </v-flex>
                <v-flex xs12 md4 mx-1 pa-0>
                  <v-text-field placeholder="เเหล่งที่มาอื่นๆ" class=" ma-0 pa-0 py-1" hide-details v-model="subBreed.pivot.source"
                                @blur="updateValue(mainBreed.children[0].type,selSubBreeds[mainBreed.children[0].type])"
                  />
                </v-flex>
                <v-flex xs12 md4 mx-1 pa-0>
                  <v-text-field placeholder="ราคา" class=" ma-0 pa-0 py-1" type="number" hide-details v-model="subBreed.pivot.price"
                                @blur="updateValue(mainBreed.children[0].type,selSubBreeds[mainBreed.children[0].type])"/>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "cattle-data",
    props: {
      type: {
        type: String,
        default: [],
      },
    },
    data: () => ({
      totalMaster: 0,
      source_opt: ['ตลาดโค', 'พ่อค้าคนกลาง', 'ในหมู่บ้าน', 'โครงการหลวง', 'ผลิตเองในฟาร์ม', 'อื่นๆ'],
      choices: [],
      selMainBreeds2: [],
      selMainBreeds: [],
      selSubBreeds: {
        female_breeding_types: [],
        female_int_breeding_types: [],
        female_mixed_breeding_types: [],
        female_over_six_breeding_types: [],
        female_over_six_int_breeding_types: [],
        female_over_six_mixed_breeding_types: [],
        female_under_six_breeding_types: [],
        female_under_six_int_breeding_types: [],
        female_under_six_mixed_breeding_types: [],

        male_breeding_types: [],
        male_int_breeding_types: [],
        male_mixed_breeding_types: [],
        male_over_six_breeding_types: [],
        male_over_six_int_breeding_types: [],
        male_over_six_mixed_breeding_types: [],
        male_under_six_breeding_types: [],
        male_under_six_int_breeding_types: [],
        male_under_six_mixed_breeding_types: [],
      },
      isReady: false,
    }),
    async created() {
      this.form = await this.$store.state.admin.farmOwners.farmOwner
      this.choices = await this.$store.dispatch("admin/choices/getChoices")
      this.sync();
    },
    methods: {
      updateValue: function (type, value) {
        this.$store.dispatch("admin/farmOwners/updateChoices", {type: type, value: value})
        this.updateTotalCattle()

      },
      sync: function () {
        let main = this.choices[this.type];
        let mainLength = main.length;

        let select =this.form[this.type] ? this.form[this.type] : [] ;
        let selectLength = select.length;

        for (let i = 0; i < mainLength; i++) {
          for (let j = 0; j < selectLength; j++) {
            if (main[i].id == select[j].id) {
              main[i] = select[j]
              this.selMainBreeds.push(main[i]);
              // sync children
              if (main[i].children.length > 0) {
                this.childrenSync(main[i].children[0].type);
              }
            }
          }
        }
        let totalType = 'total_' +this.type
        this.form[totalType] = 0
        this.choices[this.type] = main
        this.updateTotalCattle()
        this.isReady = true;
      },
      childrenSync: function (type, order) {
        let childrenForm = this.form[type];
        let childrenChoice = this.choices[type] ? this.choices[type] : [];

        let mainLength = childrenChoice.length;
        let selectLength = childrenForm ?  childrenForm.length : 0;

        for (let i = 0; i < mainLength; i++) {
          for (let j = 0; j < selectLength; j++) {
            try {
              if (childrenChoice[i].id == childrenForm[j].id) {
                childrenChoice[i] = childrenForm[j];
                if (this.selSubBreeds[type]) {
                  this.selSubBreeds[type].push(childrenChoice[i]);
                } else {
                  this.selSubBreeds[type] = [childrenChoice[i]]
                }
              }
            } catch (e) {
              console.log(childrenChoice[i], childrenForm[j])
            }
          }
        }
      },
      updateMasterCattle : function () {
        let total = 0
        let m = this.form.total_male_breeding_types ?  parseInt(this.form.total_male_breeding_types) : 0
        let f =  this.form.total_female_breeding_types ? parseInt(this.form.total_female_breeding_types) : 0
        let mo6 =  this.form.total_male_over_six_breeding_types ? parseInt(this.form.total_male_over_six_breeding_types) : 0
        let fo6 =  this.form.total_female_over_six_breeding_types ? parseInt(this.form.total_female_over_six_breeding_types) : 0
        let mu6 =  this.form.total_male_under_six_breeding_types ? parseInt(this.form.total_male_under_six_breeding_types) : 0
        let fu6 =  this.form.total_female_under_six_breeding_types ? parseInt(this.form.total_female_under_six_breeding_types) : 0
        total += m+f+mo6+fo6+mu6+fu6
        this.form.total_master_breeding_types = total
      },
      sumChild: function (childrenType) {
        let sumChild = 0 ;
        let children = this.form[childrenType]
        if(children){
          children.forEach( (child) => {
            let childAmount = child.pivot ? child.pivot.amount : 0
            sumChild += parseInt(childAmount) ? parseInt(childAmount) : 0
          })
          let totalChildrenType = 'total_'+childrenType;
          this.form[totalChildrenType] =  sumChild
        }
        return sumChild
      },
      updateTotalCattle : function () {
        let sum_main = 0 ;
        let main = this.form[this.type] ? this.form[this.type] : []
        // console.log("update",this.form[this.type])
        main.forEach( (m) => {
          //----------------------------------------------------------------
          let children = m.children;
          let childLength = m.children.length ? m.children.length : 0;
          if (childLength > 0 ){
            let childrenType = children[0].type
            let sum_child = this.sumChild(childrenType)
            m.pivot.amount = sum_child
            // console.log(this.type,childrenType,sum_child);
          }
          //----------------------------------------------------------------
          let mainAmount = m.pivot ? m.pivot.amount : 0 ;
          sum_main += parseInt(mainAmount) ? parseInt(mainAmount) : 0

        })
        let totalType = 'total_'+this.type;
        this.form[totalType] =  sum_main;
        this.totalMaster = this.form[totalType]
        this.$emit("change",this.type,this.totalMaster)
        // console.log("change",this.type,this.totalMaster)

        this.updateMasterCattle()
        this.$store.dispatch('admin/farmOwners/updateState',this.form)
      }
    }
  }
</script>

<style scoped>

</style>
