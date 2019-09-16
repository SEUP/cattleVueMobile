import _ from "lodash"

export default {
  namespaced: true,
  state: {
    error: {
      errors: {},
      message: null,
    },
    showError: false,
  },
  mutations: {
    setShowError(state, bool) {
      state.showError = bool;

      if (bool) {

      }
    },
    resetError(state) {

      console.log('resetError')
      state.error = {
        errors: {},
        message: null,
      }
      state.showError = false;

    }
  },
  actions: {
    setError({state, commit}, error) {
      console.log(error, 11111)
      error = _.map(error, (value, key) => {
        let x = {}
        x[value.field] = value.message
        return x
      });
      error = _.assign.apply(_, error)
      console.log(error)
      state.error = error;
      commit('setShowError', true);
      setTimeout(() => {
        commit('setShowError', false)
      }, 6000)
    },

    resetError({state, commit}) {
      commit('resetError', false);

    },
    toggleError({state, commit}, bool) {
      commit('setShowError', bool);
    }
  },
  getters: {
    getError: state => state.error,
  }
};
