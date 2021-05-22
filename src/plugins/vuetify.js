import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        redcross: '#de1b23'
      }
    }
  },
  icons: {
    iconfont: 'mdi' || 'fa' || 'fa4'
  }
})
