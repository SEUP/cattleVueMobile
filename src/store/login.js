import axios from "@/axios"

const state = {
    loginForm : {},
    registerForm : {},
}

const getters = {}

const mutations = {
    resetLoginForm : function(state){
        state.loginForm = {}
    },
    resetRegisterForm : function(state){
        state.registerForm = {}
    }
}

const actions = {

    login: async ({commit,state}) => {
        window.console.log("user/login")
        let result = await axios.post('/api/v1/farmer/login', state.loginForm)
            .then((r) => {
                window.console.log("login/login", r.data)
                let storage = window.localStorage;
                storage.setItem("token", r.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('token')}`;
                window.console.log('login/login', 'finish')
                return r.data;
            }).catch((error) => {
                window.console.error(error.stack)
            })
        commit("resetLoginForm")
        return result
    },

    register : async ({commit,state,dispatch}) => {
        window.console.log("user/register")
        let result = await axios.post('/api/v1/farmer/register', state.registerForm)
            .then((r) => {
                window.console.log("login/register", r.data)
                let storage = window.localStorage;
                storage.setItem("token", r.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('token')}`;
                window.console.log('login/register', 'finish')
                commit("resetRegisterForm")

                return r.data;
            }).catch((error) => {
                window.console.error(error.stack)
            })
        //do login

        return result
    },

    logout : async (context) =>{
        localStorage.removeItem("token")
        context.dispatch("farmer/clearState",{},{root:true})
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
