<template>
    <v-content>
        <v-layout class="pd-30">
             
            <v-flex xs4>
                <CattleAvatar :url="cattle.image_url" />
            </v-flex>
            <v-flex xs8>
                <h2>{{cattle.name}}</h2>
                <h3>ประเภทคโค : {{typeCattle(cattle.cattle_type)}}</h3>
            </v-flex>

        </v-layout>
        <v-divider></v-divider>
        <v-layout class="pd-30">

            <h3>เลือกประเภทโคที่ต้องการเปลี่ยน</h3>
        </v-layout>
        <center>

            <v-btn @click="change('020100')" large round class="full-width box-purple wh ">
                <h3>พ่อพันธุ์</h3>
            </v-btn><br>
            <v-btn @click="change('020200')" large round class="full-width box-pink wh">
                <h3>แม่พันธุ์</h3>
            </v-btn><br>
            <v-btn @click="change('020300')" large round class="full-width box-brown wh">
                <h3>โคขุน</h3>
            </v-btn><br>
            <v-btn @click="change('020400')" large round class="full-width box-greenLNB wh">
                <h3>โคแรกเกิด</h3>
            </v-btn><br>

        </center>

    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "ChangeType",
        components: {
            CattleAvatar
        },
        data() {
            return {}
        },
        computed: {
            typeCattle: get('cattle/getCattleType')
        },
        props: {
            cattle: {}
        },
        async mounted() {
        
        },
        methods: {
            change: async function (type) {
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/type',
                        form: {
                            cattle_type: type,
                            cattle_id: this.cattle.id
                        } }
                     let c = await store.dispatch("manageDef/updateData",params);
                      this.$router.push('/main');
                },

        }
    }
</script>

<style scoped>

</style>