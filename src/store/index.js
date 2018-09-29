import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';

import loading from './loading';
import login from "./login"
import farmer from "./farmer"
import error from "./error"
import choice from "./choice/"

Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
    farmer : farmer,
    error : error,
    choice : choice,
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
