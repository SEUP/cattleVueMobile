<template>
    <v-app id="app">
        <loading/>
        <router-view/>
    </v-app>
</template>

<script>
    import axios from "@/axios"
    import Loading from "./components/Share/Loading";
    import {call} from "vuex-pathify"

    export default {
        name: "App",
        components: {Loading},
        methods: {
            showLoad : async function(){
                await this.$store.dispatch("loading/showLoad")
            },
            dismissLoad : async function(){
                await this.$store.dispatch("loading/dismissLoad")
            }
        },
        created() {

            this.$on("before-request", this.showLoad);
            this.$on("request-error", this.dismissLoad);
            this.$on("after-response", this.dismissLoad);
            this.$on("response-error", this.dismissLoad);

            axios.interceptors.request.use(
                conf => {
                    this.$emit("before-request");
                    return conf;
                },
                error => {
                    this.$emit("request-error");
                    return Promise.reject(error);
                }
            );

            axios.interceptors.response.use(
                response => {
                    this.$emit("after-response");
                    return response;
                },
                error => {
                    this.$emit("response-error");
                    console.log(error.response.status);
                    if (error.response.status == 422) {
                        this.$store.dispatch("login/logout")
                        this.$router.push({name : 'home'})
                    }
                    return Promise.reject(error);
                }
            );

        },
        beforeDestroy() {
            this.$off("before-request", this.showSpinner);
            this.$off("request-error", this.hideSpinner);
            this.$off("after-response", this.hideSpinner);
            this.$off("response-error", this.hideSpinner);
        }
    }
</script>
