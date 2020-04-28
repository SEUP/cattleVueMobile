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
            <v-btn to="/register" block round color="success">
                <v-icon>mdi-account</v-icon>สมัครสมาชิก
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
        get,
        sync,
        call
    } from 'vuex-pathify'
    import store from "@/store/"
    export default {
        name: "LoginForm",
        computed: {
            form: sync('login/loginForm'),
            farmer: get("farmer/farmer"),
        },
        data: () => ({ 
            formSync:{},
        }),
        created() {},
        mounted() {},
        methods: {
            login: async function () {
                let result = await this.$store.dispatch("login/login")
                if (result) {
                    await store.dispatch("farmer/getFarmer")
                    await store.dispatch("farmer/downloadAvatar")
                    await this.loadQuestion(); 
                    await this.syncToQuestion();

                    await this.$router.replace({
                        name: 'main'
                    })
                } else {
                    alert("ข้อมูลไม่ถูกต้อง ไม่สามารถเข้าสู่ระบบได้")
                }
            },
            async syncToQuestion(){
                let form = _.cloneDeep(this.farmer)
                console.log('[sss]',form);
                console.log('[sss2]',this.formSync);
                this.formSync.firstname = form.firstname
                this.formSync.lastname = form.lastname
                this.formSync.personal_id = form.personal_id

                this.formSync.house_province = form.house_province
                this.formSync.house_amphur = form.house_amphur
                this.formSync.farm_district = form.farm_district

                this.formSync.mobile_no = form.phone_number
                this.formSync.house_postcode = form.house_zipcode
                
                let put = {
                    'id' : this.farmer.id,
                    'data':this.formSync
                }
                await store.dispatch("admin/farmOwners/syncQuestion", put)
                let data = await store.state.admin.farmOwners.farmOwner
            },
            async loadQuestion(){
                let farmOwnerId = this.farmer.id
                this.formSync = await this.$store.dispatch("admin/farmOwners/getFarmOwnerById", {
                    id: farmOwnerId,
                    isAdmin: true
                }); 
            }, 

            
        },
        watch: {},

    }
</script>
