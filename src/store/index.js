import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';

import loading from './loading';
import login from "./login"

Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
