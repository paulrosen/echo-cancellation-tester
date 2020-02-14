import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    echoStyle: "False",
    streamCancellation: true,
  },
  getters: {
    echoStyle: state => {
      return state.echoStyle;
    },
    streamCancellation: state => {
      return state.streamCancellation;
    },
  },
  mutations: {
    echoStyle(state, payload) {
      state.echoStyle = payload;
    },
    streamCancellation(state, payload) {
      state.streamCancellation = payload;
    },
  },
  actions: {
    setEchoStyle: (context, payload) => {
      context.commit("echoStyle", payload);
    },
    setStreamCancellation: (context, payload) => {
      context.commit("streamCancellation", payload);
    },
  },
  modules: {
  }
})
