<template>
    <v-card>
        <v-card-title>
            <h5 class="headline">ลงชื่อเข้าสู่ระบบ</h5>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="form.username" label="ชื่อผู้ใช้"/>
                <v-text-field type="password" v-model="form.password" label="รหัสผ่าน"/>
            </v-form>
            <v-btn @click="login()" replace block color="primary">เข้าสู่ระบบ</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
    import {sync,call} from 'vuex-pathify'
export default {
    name : "LoginForm",
    computed : {
        form : sync('login/loginForm'),
    },
    created() {},
    mounted() {},
    methods : {
        login : async function(){
            let result = await this.$store.dispatch("login/login")
            if(result) {
                this.$router.replace({name : 'main'})
            }else {
                alert("ข้อมูลไม่ถูกต้อง ไม่สามารถเข้าสู่ระบบได้")
            }
        }
    },
    watch : {},

}
</script>

