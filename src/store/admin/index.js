// const api = "http://localhost:3333/api/v1/admin/farm-owners"

import summary from "./summary"
import farmOwners from "./farmOwners"
import error from "./error";
import spinner from "./spinner";
import roles from "./roles";
import users from "./users";
import districtSelect from "./districtSelect";
import choices from "./choices";
import login from "./login";
import charts from "./charts";
import farmers from "./farmers";

const state = {
  adminData: null,
  allFarmer: null,
  adminToken: null,
  searchState : null,

};

const mutations = {
  setSearchState : function (state,data) {
    state.searchState = data
  },

  setAllFarmer: function (state, data) {
    data.page = parseInt(data.page)
    state.allFarmer = data
  },
  setAdminToken: function (state, data) {
    state.adminToken = data
  },
  setAdminData: function (state, data) {
    state.adminData = data
  },

};

const actions = {
  test: async () => {
    console.log('test')
    return 12;
  },

  setSearchState : function(context,form){
    context.commit('setSearchState',form)
    console.log('setSearchState',context.state.searchState)

  },

  getToken: async function (context, form) {
    let userform = {
      username: form.username,
      password: form.password,
    }

    let token = await axios.post('api/v1/admin/login', userform)
      .then((r) => {
        context.commit('setAdminToken', r.data.token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.token;

        return r.data.token
      })
      .catch((error) => {
        console.log(error)
        context.dispatch("error/setError", error.response.data, {root: true});
        return null;
      });
    return token;

  },
  getUser: async function (context, token) {
    let user = null;
    if (!token) {
      token = context.state.adminToken
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    if (token) {
      user = await axios.get('/api/v1/admin/user', { headers: { Authorization: 'Bearer ' + token}}).then((r) => {
        context.commit('setAdminData', r.data)
        return r.data;
      }).catch((error) => {
        return null;
      })
      return user
    }
    return null;
  },

  loadUser: async function (context, refresh = false) {
    if (refresh == true) {
      await context.dispatch('getUser')
    }
    let admin = context.state.adminData
    return admin
  },
  logout: async function (context) {
    context.state.adminToken = null
    context.state.adminData = null
    localStorage.access_token = null
    localStorage.admin_token = null
    axios.defaults.headers.common['Authorization'] = null

  },
  async getAllFarmer(context, params) {
    let result = await axios.get('/api/v1/admin/farmers', {params: params})
      .then(async (response) => {
        context.commit("setAllFarmer", response.data)
      }).catch((error) => {
        context.dispatch("error/setError", error.response.data, {root: true});
        return null;
      });
    return result
  },
  async getFarmerTokenById(context, params) {
    let result = await axios.post('api/v1/admin/getFarmerToken', {farmer_id: params})
      .then(async (response) => {
        localStorage.admin_token = localStorage.access_token
        localStorage.access_token = response.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token;
        return response.data
      })
      .catch((error) => {
        console.log(error)
        context.dispatch("error/setError", error.response.data, {root: true});
        return null;
      })
    return result
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    summary: summary,
    farmOwners: farmOwners,
    error: error,
    spinner: spinner,
    roles: roles,
    users: users,
    districtSelect: districtSelect,
    choices: choices,
    // farmOwners: farmOwners,
    login: login,
    charts: charts,
    farmers: farmers,

  }

}
