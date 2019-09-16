import axios from '@/axios';
export default {
  namespaced : true,
  state : {},
  mutations : {},
  actions : {
    getChart : async function (context,type){
      let result  = axios.get("api/v1/admin/charts/"+type)
        .then ((response)=>{
          return response.data
        })
        .catch( (err) => {
          return null
        })
      return result
    },
    getRangeFarmOwnerChart : async function (context,{type,params}){
      let result  = axios.get("api/v1/admin/charts/"+type,{params : params})
        .then ((response)=>{
          return response.data
        })
        .catch( (error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        })
      return result
    },
    getSuggestion : async function (context,params){
      let result  = axios.get("api/v1/admin/farm-owners/suggestion",{params : params})
        .then ((response)=>{
          return response.data
        })
        .catch( (error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
})
return result
}
}
}
