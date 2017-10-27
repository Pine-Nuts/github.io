import Vue from "vue";
import Vuex from "vuex";
import app from "./moduels/app";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    appName: 'MiniBar'
  },
  modules: {
    app
  }
})
