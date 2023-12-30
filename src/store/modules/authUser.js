import { objUtils } from '@/utils';

export default {
  namespaced: true,

  state: () => ({
    user: {
      id: null,
      email: '',
      profile: {
        name: '',
        surname: '',
        phone: '',
        avatar: '',
      },
    },
  }),
  getters: {
    isAuthorized(state) {
      return !!state.user.id;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserEmail(state) {
      return state.user.id ? state.user.email : '';
    },
    getUserName(state) {
      return state.user.id ? state.user.profile.name : '';
    },
  },
  mutations: {
    removeUserData(state) {
      state.user = objUtils.createEmptyObjectWithNullId(state.user);
    },
    setUserData(state, payload) {
      state.user = objUtils.mergeObjects(state.user, payload);
    },
  },
};
