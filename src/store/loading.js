
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
    setLoad : async (context,value) => {
        context.commit("setLoad",value)
    },

    showLoad : async (context) => {
        context.commit("setLoad",true)
    },

    dismissLoad : async (context) => {
        setTimeout(
            context.commit("setLoad",false),
            500
        )

    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
