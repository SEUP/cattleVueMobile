// const api = "http://localhost:3333/api/v1/admin/farm-owners"

const api = "/api/v1/admin/farm-owners"
import axios from '@/axios';

export default {
  namespaced: true,
  state: {
    farmOwner: null
  },
  mutations: {
    setFarmOwner: function (state, farmOwner) {
      state.farmOwner = farmOwner;
      state.isLoad = true
    },
    updateChoices: function (state, params) {
      state.farmOwner[params.type] = params.value;
    }
  },
  actions: {
    createFarmOwner: async function (context) {
      let form = context.state.farmOwner;
      context.dispatch("admin/error/resetError",null, {root: true});

      let result = await  axios.post(api, form)
        .then((response) => {
          context.commit("setFarmOwner", response.data);
          return response.data;
        })
        .catch((error) => {
          context.dispatch("admin/error/setError", error.response.data, {root: true});
          return null
        })
      return result
    },
    updateChoices: function (context, params) {
      context.commit("updateChoices", params);
    },
    getFarmOwners: async function (context, params = null) {
      let result = await axios.get(api, {params: params})
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError", error.response.data, {root: true});

          return null
        })
      return result
    },
    getFarmOwnerById: async function (context, {id,isAdmin = true}) {
      // console.log(id)
      let result = await  axios.get(api+"/"+ id)
        .then((response) => {
          // console.log(response.data)
          context.commit("setFarmOwner", response.data)
          return response.data
        })
        .catch((error) => {
          return null
        });
      // console.log("VX",result)
      return result

    },
    updateState: async function (context, form) {
      context.commit("setFarmOwner", form)
    },
    updateFarmOwner: async function (context) {
      let form = context.state.farmOwner;
      context.dispatch("admin/error/resetError",null, {root: true});

      let result = await  axios.put(api+"/" + form.id, form)
        .then((response) => {

          context.commit("setFarmOwner", response.data);
          return response.data;
        })
        .catch((error) => {
          context.dispatch("admin/error/setError", error.response.data, {root: true});
          return null
        })
      return result
    },
    deleteFarmOwner: async function (context, id) {
      let result = await  axios.delete(api+ "/" + id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError", error.response.data, {root: true});
          return null
        });
      return result
    },
    getForm: async function (context) {
      let result = await  axios.get(api+"/create")
        .then((response) => {
          let isObj = ['abortion', 'age_sale', 'budget_source', 'cattle_death', 'cattle_heath_support', 'cattle_job', 'dewormed_amount', 'education', 'family_status', 'farm_breeding_type', 'farm_disease_check', 'farm_exp', 'farm_future', 'farm_record', 'farm_register_status', 'feed_purchase_cooperative', 'feedstock', 'female_breeder_support', 'foot_mouth_disease','group_join_future', 'income_range', 'minerals_feed', 'observe_support', 'own_land', 'personal_status', 'production_support', 'rent_land', 'sale_satisfaction', 'sex', 'social_status', 'sub_minerals_feed', 'support_visit', 'training_support', '', 'tuberculosis', 'use_land', 'vaccine_ever', 'weight_range_sale']

          for (const key of Object.keys(response.data)) {
            if (isObj.includes(key)) {
              response.data[key] = {}
              response.data[key].pivot = {}
            }

          }
          context.commit("setFarmOwner", response.data);
          return response.data
        })
        .catch((error) => {
          context.dispatch("admin/error/setError", error.response.data, {root: true});
          return null
        });
      return result
    },

    async syncQuestion(context,params){
      let data  = await axios.put(`/api/v1/admin/farm-owners/${params.id}`,params.data).then(
        (r)=>{
          console.log(r.data);
          return r.data;
        }
      ).catch(
        (e)=>{ 
          return e.response;
        }
      );
     return data;
    }

  }
/// getByID

  //
}
