<template>
    <v-container v-if="isReady">
      <v-layout row wrap>
        <v-flex xs12>
          <p class="title">8.1 ปัญหาและอุปสรรคในการเลี้ยงโคเนื้อของท่านคือ</p>
          <v-divider class="my-3"></v-divider>
          <v-textarea
            label="ปัญหาและอุปสรรคในการเลี้ยงโคเนื้อของท่านคือ"
            class="mt-3 ml-3"
            multi-line
            v-model="form.problem "
            @blur="updateForm"
          >
          </v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <p class="title">8.2 ท่านมีข้อเสนอแนะในการพัฒนาระบบการผลิตและการตลาดโคเนื้อในเขตพื้นที่ เชียงราย พะเยา แพร่ น่าน อย่างไร</p>
          <v-divider class="my-3"></v-divider>
          <v-textarea
            label="ข้อเสนอแนะในการพัฒนาระบบการผลิตและการตลาดโคเนื้อในเขตพื้นที่ เชียงราย พะเยา แพร่ น่าน อย่างไร"
            class="mt-3 ml-3"
            v-model="form.suggestion"
            @blur="updateForm"
          >
          </v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "part8",
      data (){
        return{
          form:null,
          isReady : false
        }
      },
      async created (){
        this.form = await this.$store.state.admin.farmOwners.farmOwner;
        this.form.problem = await this.form.problem ? this.form.problem : "";
        this.form.suggestion = await this.form.suggestion ? this.form.suggestion : "";
        this.isReady = true

       },methods : {
        updateForm : async function () {
          await this.$store.dispatch("admin/farmOwners/updateState",this.form);
          let data = await this.$store.state.admin.farmOwners.farmOwner
        }
      }
    }
</script>

<style scoped>

</style>
