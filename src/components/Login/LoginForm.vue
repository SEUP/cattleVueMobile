<template>
    <v-card>
        <v-card-title>
            <h5 class="headline">ลงชื่อเข้าสู่ระบบ</h5>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="ชื่อผู้ใช้"/>
                <v-text-field label="รหัสผ่าน"/>
            </v-form>
            <v-btn :to="{name : `main`}" replace block color="primary">เข้าสู่ระบบ</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name : "LoginForm",
    data : ()=>({

    }),
    created() {},
    mounted() {},
    methods : {},
    watch : {},

}
</script>

