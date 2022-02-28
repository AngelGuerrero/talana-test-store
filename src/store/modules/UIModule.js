import $ from 'jquery'

export default {
  namespaced: true,

  state: {
    sidebarActive: true
  },

  mutations: {
    toggleSidebar (state) {
      $('body').toggleClass('sidenav-toggled')
      state.sidebarActive = !state.sidebarActive
    },

    setSidebarActive (state, payload) {
      if (!payload && state.sidebarActive) {
        $('body').toggleClass('sidenav-toggled')
      }

      state.sidebarActive = payload
    }
  },

  actions: {}
}
