export default {
  namespaced: true,

  state: () => ({
    users: [],
  }),
  mutations: {
    setUserListData(state, payload) {
      state.users = payload;
    },
  },
};
