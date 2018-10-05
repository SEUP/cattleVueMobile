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
            let u = response.data;
            console.log(u.data);
            context.commit('setCattle',u.data); 
            return result;
        })
        .catch((error) => {  
          context.dispatch("error/setError", error.response.data, {root: true});
          return null;
        });
        
      return result   
     },

     async createCattle(context,params){
        let result = await axios.post(`/api/v1/farmer/farmer/${params.farmer_id}/cattles`, params)
        .then((response) => {
            alert('บันทึกข้อมูลสำเร็จ');
          return response.data
        })
        .catch((error) => {
          context.dispatch("error/setError", error.response.data, {root: true});
          return null
        });
      return result
     },

     async removeCattle(context,params){ 
 
            let result = await axios.delete(`/api/v1/farmer/farmer/${params.farmer_id}/cattles/` + params.id) //return True or False
              .then((response) => {
                  alert('ลบข้อมูลสำเร็จ');
                return response.data
              })
              .catch((error) => {
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
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
