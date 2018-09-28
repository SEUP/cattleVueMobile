import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';

import loading from './loading';


Vue.use(Vuex)

const modules = {
    loading : loading,
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
