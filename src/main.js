import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueOtp2 from 'vue-otp-2'
Vue.use(VueOtp2)

import '@/assets/sass/index.sass'
import '@fortawesome/fontawesome-free/css/all.css'
// import 'font-awesome/css/font-awesome.min.css' // Old fontawesome 4.7

import 'leaflet/dist/leaflet.css'
import VueGeolocation from 'vue-browser-geolocation'

import { Icon } from 'leaflet'
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

// Import and use Vue Ckeditor.
import CKEditor from '@ckeditor/ckeditor5-vue2'

// Use build files
import VueRx from 'vue-rx'
import VuejsClipper from 'vuejs-clipper/dist/vuejs-clipper.umd'
import 'vuejs-clipper/dist/vuejs-clipper.css'

Vue.use(VueRx)
Vue.use(VuejsClipper, {
  components: {
    clipperBasic: true,
    clipperFixed: true,
    clipperPreview: true,
    clipperUpload: true
  }
})

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId:
    '845169977174-3a8unht42bh4a16siifqaae3d637unau.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(CKEditor)
Vue.use(VueGeolocation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
