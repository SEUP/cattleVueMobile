<template>
    <v-btn @click="logout()" block color="red" dark>ออกจากระบบ</v-btn>
</template>

<script>
    export default {
        name: "FarmerLogout",
        methods : {
            logout : async function(){
                await this.$store.dispatch("login/logout")
                this.$store.dispatch('loading/showLoad')
                let vm = this
                setTimeout( () => {
                    vm.$store.dispatch('loading/dismissLoad')
                    vm.$router.replace({name : 'home'})
                },1000)
            }

        }
    }
</script>

<style scoped>

</style>
