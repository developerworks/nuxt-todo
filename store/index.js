import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      authenticatedUser: null,
      todos: []
    },
    mutations: {
      populateTodos (state, payload) {
        state.todos = payload;
      }
    }
  });
};

export default createStore;
