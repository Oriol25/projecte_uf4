import Vuex from "vuex";
import vars2 from "./vars";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      vars: vars2
    },
  });
};

export default createStore;