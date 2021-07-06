<template>
  <div id="main-app" v-if="isLoggedIn">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group color="redcross accent-4">
          <v-subheader>ຈັດການ</v-subheader>
          <v-list-item
            v-for="(item, i) in Overview"
            :key="i"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon dense v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-medium"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in Management"
            :key="i.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon dense v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-medium"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed clipped-left color="red darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blood Donation</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-menu bottom min-width="100px" offset-y>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="account.image"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </div>
          </template>
          <v-card tile max-width="240">
            <v-list-item-content>
              <div class="text-center">
                <v-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="account.image"
                  ></v-img>
                </v-avatar>
                <h3>{{ account.firstName }}</h3>
                <p class="caption mt-1">
                  {{ account.lastName }}
                </p>
                <v-btn
                  small
                  rounded
                  class="text-subtitle-2 font-weight-bold white--text"
                  color="red darken-1"
                  @click="logout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
                <v-divider class="my-3"></v-divider>
              </div>
              <div class="px-12">
                <v-btn
                  class="d-flex justify-start"
                  active-class="lighter-1 white--text"
                  depressed
                  rounded
                  text
                >
                  <v-icon left>mdi-badge-account-horizontal</v-icon>
                  ອັບເດດຂໍ້ມູນບັນຊີ
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main class="mb-6">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app absolute inset dark padless>
      <v-card flat tile class="red accent-3 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>blooddonationlao</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    drawer: false,
    Overview: [
      {
        text: 'Dashbaord',
        icon: 'fa-chart-line',
        path: '/dashboard'
      }
    ],
    Management: [
      { text: 'ຂ່າວສານ', icon: 'far fa-newspaper', path: '/posts' },
      { text: 'ກິດຈະກຳ', icon: 'fa-calendar-day', path: '/activity' },
      {
        text: 'ປະຫວັດການຮັບບໍລິຈາກ',
        icon: 'fa-file-medical-alt',
        path: '/record'
      },
      { text: 'ຄູ່ມື', icon: 'fa-book', path: '/guide' }
    ]
  }),
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
    // console.log(this.account._id)
  },
  computed: {
    ...mapState('auth', ['account']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
<style scoped>
.redcross {
  color: #de1b23;
}
</style>
