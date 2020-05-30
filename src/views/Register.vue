<template>
   <v-content class="box-blue font">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4  >
            <v-layout  justify-center   >
              <img  style="height:250px;" src="@/assets/logob.png"/>
            </v-layout>
          <register-form v-if="!ios" />
          <RegisterFormIOS v-else />
          </v-flex>
        </v-layout>
      </v-container>
   </v-content>

</template>



<script>
// @ is an alias to /src
import RegisterForm from "@/components/Login/RegisterForm.vue";
import RegisterFormIOS from "@/components/Login/RegisterFormIOS.vue";
export default {
  name: "Register",
  components: {
      RegisterForm,
      RegisterFormIOS
  },
  data: () => ({
     
   ios:false,
  }),
};
</script>
