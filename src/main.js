import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import BaseView from '@/views/Layouts/BaseView'
import XModal from '@/components/Shared/XModal'
import globalMixin from '@/mixins/globalMixin'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

/***************************************
 | SB ADMIN PRO
 ***************************************/
import '@/assets/css/global.scss'
import '@/assets/css/sbAdminPro.css'
import '@/assets/js/scriptsSbAdmin'

/***************************************
 | GLOBAL MIXINS
 ***************************************/
Vue.mixin(globalMixin)

/***************************************
 | GLOBAL COMPONENTS
 ***************************************/
Vue.component('base-view', BaseView)
Vue.component('XModal', XModal)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
