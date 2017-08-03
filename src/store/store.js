import Vue from 'vue'
import Vuex from 'vuex'

import getterStore from './modules/getterStore'
import redListStore from './modules/redListStore'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        getterStore,
        redListStore
    },
});
export default store