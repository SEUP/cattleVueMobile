import axios from "@/axios"

const state = {
    farmer: null,
    farm: null,
    avatar: null,
}

const getters = {}

const mutations = {
    clearState: function (state) {
        state.farmer = null
        state.farm = null
        state.avatar = null
    },

    setFarmer: function (state, data) {
        state.farmer = data
    },

    setFarm: function (state, data) {
        state.farm = data
        try {
            let lat = parseFloat((state.farm.farm_lat))
            let lng = parseFloat((state.farm.farm_lng))
            state.farm.farm_lat = isNaN(lat) ? null : lat
            state.farm.farm_lng = isNaN(lng) ? null : lng
        } catch (e) {
        }

    },

    setAvatar: function (state, data) {
        state.avatar = data;
    }
}

const actions = {

    async getFarmer(context) {
        let result = await axios.get('/api/v1/farmer/user')
            .then(async (response) => {
                let farmer = response.data
                let farm;
                if (farmer.farm == null) {
                    farm = await context.dispatch("getFarmForm", {id: farmer.id})
                    farmer.farm = farm
                    farmer.farm.farmer_id = farmer.id
                } else {
                    farm = farmer.farm
                    context.commit("setFarm", farm)
                }
                context.commit("setFarmer", farmer)
                return farmer;
            }).catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null;
            });
        return result
    },

    async downloadAvatar(context, params) {
        let result = await axios.get(`/api/v1/farmer/farmers/${context.state.farmer.id}/avatar`,
            {
                responseType: 'arraybuffer'
            })
            .then((response) => {

                if (response.status != 204) {
                    let image = Buffer.from(response.data, 'binary').toString('base64')
                    context.commit('setAvatar', `data:image/*;base64,${image}`)
                } else {
                    context.commit('setAvatar', null)

                }
            })
            .catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })

        return result
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
