<template>
    <v-content>
        <ActionBar />
        <v-container>

  
        <v-layout v-for="Noti in noti"  >
            <div  v-if="Noti.title" style="width:100%;" >
            <v-card  class=" mr-10 shadow pd-12 full-width wh"  >
                            <v-layout class="box-blue pd-10" row>
                        <h4>{{Noti.title}}</h4>
                            </v-layout>
 <v-layout class="pd-10" row>
                        <h4 style="color:black;">{{dateTH(Noti.start)}}</h4>
                            </v-layout>
                        </v-card>
            </div>
            

        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
    import store from "@/store/"
    import {
        get
    } from "vuex-pathify"
    import moment from 'moment';
    import Forms from "@/components/Cattle/Manage/vaccine/forms";
    import ActionBar from "@/components/Menu/ActionBar";
    import CattleListView from "@/components/Cattle/CattleListView";
    import CattleAvatar from "@/components/Cattle/Avatar/Image";
    export default {
        name: "ChangeType",
        data() {
            return {
             
            }
        },
        components: {
            Forms,
            ActionBar,
            CattleListView,
            CattleAvatar
        },
        computed: {
            getAge: get("cattle/getAge"),
            dateTH: get('core/dateTH'),
            getType: get('choice/getChoiceByCode'),
            farmer: get("farmer/farmer"),
            setNoti: get('manageDef/setNoti'),
            noti: get('manageDef/noti'),
        },
        props: {
            cattle: {}
        },
        async mounted() {
            await this.initial();
        },
        methods: {


            notNull(data) {
                if (data == null) {
                    return 'ไม่มีข้อมูล';
                } else {
                    return data;
                }
            },
            reCattle: async function (cattle) {
                    let reCattle = store.dispatch('manageDef/backSell', cattle);


                    this.initial();
                    this.$router.go(-1);
                },
                initial: async function () {
                    await store.dispatch("mobile/defaultActionBar", 'การเเจ้งเตือน')
                    let params = {
                        api: 'farmer/farmers/' + this.farmer.id + '/reports/cattleEvents',
                    }
                    let data = await store.dispatch("manageDef/getData", params);
                    this.setNoti(data);
          
                }

        }
    }
</script>

<style scoped>

</style>