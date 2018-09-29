import axios from "@/axios"

export default {
  namespaced: true,
  state: {
    provinces: []
  },
  mutations: {
    setProvinces: function (state,provinces) {
      state.provinces = provinces;
    }
  },
  actions: {
    getProvinces: async function (context) {
      let result = await axios.get("/api/v1/provinces", {params: {all: true}})
        .then((response) => {
          context.commit("setProvinces", result);
          return response.data;
        })
        .catch((error) => {
          window.console.error(error.stack)
          return null
        })
      return result
    }
  }
}
