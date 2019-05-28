<template>
    <v-card class="border font">
        <v-card-title>
            <h2 class=" font">สมัครสมาชิก</h2>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="form.username" label="ชื่อผู้ใช้" />
                <v-text-field v-model="form.email" label="อีเมล์" type="email" />
                <v-text-field type="password" v-model="form.password" label="รหัสผ่าน" />
                <v-text-field type="password" v-model="form.password_confirmation" label="ยืนยันรหัสผ่าน" />

                <v-text-field v-model="form.firstname" label="ชื่อ" />
                <v-text-field v-model="form.lastname" label="นามสกุล" />
                <v-text-field v-model="form.personal_id" label="รหัสบัตรประจำตัวประชาชน" />

            </v-form>
            <v-btn @click="register()" replace block round color="primary">
                <v-icon></v-icon>สมัครสมาชิก
            </v-btn>
            <v-btn to="/" replace  block round color="success">
                <v-icon></v-icon>กลับไปหน้าเข้าสู่ระบบ
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
        name: "Register",
        computed: {
            form: sync('login/registerForm'),
        },
        created() {},
        mounted() {},
        methods: {
            register: async function () {
                let result = await this.$store.dispatch("login/register")
                if (result) {
                    this.$router.replace({
                        name: 'main'
                    })
                } else {
                    alert("Cannot create user")
                }
            }
        },
        watch: {},

    }
</script>
