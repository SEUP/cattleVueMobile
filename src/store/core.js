import axios from "@/axios"
import _ from 'lodash'
import moment from 'moment';
import {
   make
} from "vuex-pathify"
const state = {
    noti:0,
    tabs:0,
}

const getters = {
    notiState: (state) => () => {
        state.noti =  1;
    },
    test: (state) => (a, b) => {
        return a + b;
    },

    dateTH: () => (date) => { 
        let dateConvert = moment();
        if(date != null){
            dateConvert = moment(date);
        } 
        let buddhist = dateConvert
            .locale("th")
            .add(543, "years")
            .format("DD/MM/YYYY");
        return buddhist;
    },
    notNull: (state) => (data)=> {
        if (data == null) {
            return 'ยังไม่มีข้อมูล';
        } else {
            return data;
        }
    },
  


}

const mutations = make.mutations(state)


const actions = {


    getNotification:async function(context,params){
        let result = await axios.get(`/api/v1/farmer/farmers/${params}/notification`)
        .then(async (response) => { 
            return response.data;
        }).catch((error) => {
            context.dispatch("error/setError", error.response.data, {root: true});
            return null
        })
    return result
    }   

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}