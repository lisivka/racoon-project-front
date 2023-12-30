import { Store } from 'vuex';
import authUser from './modules/authUser';
import userList from './modules/userList';
import createPersistedState from 'vuex-persistedstate';

export default new Store({
    modules: {
        authUser,
        userList,
    },
    plugins: [
        createPersistedState({}),
    ],
});
