import axios from '@/axios';
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getUsers(context, params = null) {
      let result = await  axios.get("/api/v1/admin/users", {params: params})
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null;
        });
      return result
    },
    getUserById: async function(context,params = null){
      let result =  await axios.get("/api/v1/admin/users/"+params.id,{params:params})
          .then ( (response) => {
            return response.data
          })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        })
      return result
    },
    createUser: async function (context, form) {
      let result = await axios.post("/api/v1/admin/users",  form)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        });
      return result
    },
    updateUser: async function (context, form) {
      let result = await axios.put("/api/v1/admin/users/" + form.id, form)
            .then((response) => {
              return response.data
            })
            .catch((error) => {
              context.dispatch("admin/error/setError",error.response.data, {root: true});
              return null
        });
      return result
    },
    deleteUserById: async function (context, id) {
      let result = await axios.delete("/api/v1/admin/users/" + id) //return True or False
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

