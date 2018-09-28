<template>
   <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-layout justify-center class="mb-5">
              <img src="@/assets/logo.png"/>
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
