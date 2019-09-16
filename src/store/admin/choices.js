let loadingState = ['None', 'OnGoing', 'Done'];
import axios from '@/axios';
export default {
  namespaced: true,

  state: {
    loadingState: loadingState,
    isLoad: loadingState[0],
    choices: []
  },
  mutations: {
    setChoices: function (state, c) {
      state.choices = _.groupBy(c, (o) => {
        return o.type
      });
    }
  },
  actions: {
    load: async function (context) {
      context.state.isLoad = context.state.loadingState[1];
      let result = await axios.get("/api/v1/admin/choices",
        {params: {all: true}})
        .then((response) => {
          let choices = response.data

          choices.forEach((choice) => {
            if (!choice.pivot) {
              choice.pivot = {}
            }
          });

          return choices;
        })
        .catch( (error) => {
          context.dispatch("admin/error/setError",error.response.data, {root: true});
          return null
        })

      context.state.isLoad = context.state.loadingState[2];
      context.commit("setChoices", result);
    },
    getChoices: async function (context) {
      if (context.state.isLoad == context.state.loadingState[0]) {
        await context.dispatch("load")
      }
      return context.state.choices;
    }
    , getChoicesByType: async function (context, type) {
      if (context.state.isLoad == context.state.loadingState[0]) {
        await context.dispatch("load")
      }
      return context.state.choices[type];
    }
  }
}
