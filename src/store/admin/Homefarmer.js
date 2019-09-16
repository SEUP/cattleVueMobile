import axios from '@/axios';
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getUsers(context) {

      let  result = await  axios.get("/api/v1/farmer/farmers")
        let bigdate = result
          console.log(bigdate)
        .then((response) => {
          console.log(544354,response)
          return response.data
        })
        .catch((error) => {
          console.log('fail')
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null;
        });
      return result
    },
    getUserById: async function(context,params = null){
      let result =  await axios.get("/api/users/"+params.id,{params:params})
        .then ( (response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        })
      return result
    }


  }
//
}

