<template>
    <v-card class="border font">
        <v-card-title>
            <h2 class=" font">ลงชื่อเข้าสู่ระบบ</h2>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="form.username" label="ชื่อผู้ใช้" />
                <v-text-field type="password" v-model="form.password" label="รหัสผ่าน" />
            </v-form>
            <v-btn @click="login()" replace block round color="primary">
                <v-icon>mdi-login-variant</v-icon>เข้าสู่ระบบ
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<style>
    .border {
        border-radius: 5%;
        background: rgba(255, 255, 255, 0.5) !important;
    }

    .circle {
        border-radius: 6%;
    }
</style>

<script>
    import {
        sync,
        call
    } from 'vuex-pathify'
    export default {
        name: "LoginForm",
        computed: {
            form: sync('login/loginForm'),
        },
        created() {},
        mounted() {},
        methods: {
            login: async function () {
                let result = await this.$store.dispatch("login/login")
                if (result) {
                    this.$router.replace({
                        name: 'main'
                    })
                } else {
                    alert("ข้อมูลไม่ถูกต้อง ไม่สามารถเข้าสู่ระบบได้")
                }
            }
        },
        watch: {},

    }
</script>