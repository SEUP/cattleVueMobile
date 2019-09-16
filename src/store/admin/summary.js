// const api = "http://localhost:3333/api/v1/admin/farm-owners"

const api = "/api/v1/admin/farm-owners"

import axios from '@/axios';
export default {
  namespaced: true,
  actions: {
    countFarmOwner: () => {
      let count = axios.get('/api/v1/admin/summary/count-farm-owner').then((r) => {
        return r.data
      })
      return count;
    },
    countFarmer: () => {
      let count = axios.get('/api/v1/admin/summary/count-farmer').then((r) => {
        return r.data
      })
      return count;
    },

    summaryCattleByType : () => {
      let data = axios.get('/api/v1/admin/summary/cattle-by-type').then((r) => {
        return r.data
      })
      return data;
    },

    summaryCattleByTypeByProvince : () => {
      let data = axios.get('/api/v1/admin/summary/cattle-by-type-province').then((r) => {
        return r.data
      })
      return data;
    }


  }

}
