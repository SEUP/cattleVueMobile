import axios from "@/axios"
import _ from 'lodash'
import moment from 'moment';
 

const state = {
    cattles:null,
 
}

const getters = {
    getAge: (state) => (date) => {
        if(date){
          let years = moment().diff(date, 'years');
          let month = moment().diff(date, 'month');
          month = month-(years*12)
          let age =`${years} ปี ${month} เดือน`;
          return age
        }else{
          return "ไม่มีข้อมูล"
        }
      }
}

const mutations = {

    setCattle: function (state, data) {
        state.cattles = data
    },
 
 
}

const actions = { 
    async getCattle(context,params) { 
        let result = await axios.get('/api/v1/farmer/farmer/'+params.farmerId+'/cattles',{params:params})
        .then(async (response) => {
            context.commit('setCattle',response.data); 
            return result;
        })
        .catch((error) => {  
          context.dispatch("error/setError", error.response.data, {root: true});
          return null;
        });
        
      return result   
     },
   
  
  
 

    

    async clearState(context){
        context.commit('clearState')
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
