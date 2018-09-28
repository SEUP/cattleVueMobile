import axios from "@/axios"

const state = {
    loginForm : {}
}

const getters = {}

const mutations = {
    resetLoginForm : function(state){
        state.loginForm = {}
    }
}

const actions = {

    login: async ({commit,state}) => {
        console.log("user/login")
        let result = await axios.post('/api/v1/farmer/login', state.loginForm)
            .then((r) => {
                console.log("login/login", r.data)
                let storage = window.localStorage;
                storage.setItem("token", r.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('token')}`;
                console.log('login/login', 'finish')
                return r.data;
            }).catch((error) => {
                console.error(error.stack)
            })
        commit("resetLoginForm")
        return result
    },
    logout : async ({commit,state}) =>{
        localStorage.removeItem("token")
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
