import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import mobile from "./mobile"
import loading from './loading';
import login from "./login"
import farmer from "./farmer"
import error from "./error"
import choice from "./choice/"
import cattle from "./cattle/cattle"

Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
    farmer : farmer,
    error : error,
    choice : choice,
    cattle:cattle,
    mobile:mobile,
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
