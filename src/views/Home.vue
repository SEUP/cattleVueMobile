<template>
   <v-content class="box-blue font">
      <v-container fluid fill-height>
        <v-layout align-center justify-center> 
          <v-flex xs12 sm8 md4  >
            <v-layout  justify-center   >
              <img  style="height:250px;" src="@/assets/logob.png"/> 
            </v-layout>
          <login-form/>
          </v-flex>
        </v-layout>
      </v-container>
   </v-content>

</template>

 

<script>
// @ is an alias to /src
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  name: "home",
  components: {
    LoginForm
  }
};
</script>
