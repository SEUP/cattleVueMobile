import axios from "@/axios"
const state = {
    isLoad : false,
}

const getters = {}

const mutations = {
    setLoad : (state,value) => {
        state.isLoad = value
    }
}

const actions = {

    login: async ({commit}, form) => {
        console.log("user/login")
        let result = await axios.post('/api/v1/farmer/login', form)
            .then((r) => {
                // console.log("user/login", r.data)
                applicationSettings.setString("token", r.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
                console.log('user/login', 'finish')

                return r.data;
            })   .catch((error) => {

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
