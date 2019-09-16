import axios from '@/axios';
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getFarmers (context, params = null) {
      let result = await  axios.get("/api/v1/admin/farmers", {params: params})
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null;
        });
      return result
    },
    getFarmerById: async function(context,params = null){
      let result =  await axios.get("/api/v1/admin/farmers/"+params.id,{params:params})
        .then ( (response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        })
      return result
    },
    createFarmer: async function (context, form) {
      context.dispatch("admin/error/resetError",null, {root: true});


      let result = await axios.post("/api/v1/admin/farmers",  form)
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        });
      return result
    },

    updateFarmer: async function (context, form) {
      context.dispatch("admin/error/resetError",null, {root: true});

      let result = await axios.put("/api/v1/admin/farmers/" + form.id, form)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        });
      return result
    },
    deleteFarmerById: async function (context, id) {
      let result = await axios.delete("/api/v1/admin/farmers/" + id) //return True or False
        .then((response) => {
          return response.data
        })
        .catch( (error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        });
      return result
    }


  }
//
}

