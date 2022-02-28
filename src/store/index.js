import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import SecureLs from 'secure-ls'

import UIModule from '@/store/modules/UIModule'
import productModule from '@/store/modules/ProductModule'

const ls = new SecureLs({ isCompression: false })

Vue.use(Vuex)

const persistedstate = createPersistedstate({
  //
  // Pertiste en local storage los siguientes estados
  paths: ['productModule.productCart']
})

//
// El almacenamiento de información por razones de seguridad
// es encriptado, esto se hace automáticamente para los estados
// que se han establecido en el path perseverar.
if (process.env.NODE_ENV === 'production') {
  persistedstate.storage = {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.remove(key)
  }
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    UIModule,
    productModule
  },
  plugins: [persistedstate]
})
