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
import core from "./core"
import manage_default from "./cattle/manage/default"
import femaleBreeder from "./cattle/manage/femaleBreeder"
Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
    farmer : farmer,
    error : error,
    choice : choice,
    cattle:cattle,
    mobile:mobile,
    core:core,
    manageDef:manage_default,
    femaleBreeder:femaleBreeder,
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
