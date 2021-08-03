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
                <div class="d-inline-flex">
                  <!-- <div> -->
                  <v-avatar size="100" color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      :src="account.image"
                    ></v-img>
                  </v-avatar>
                  <!-- </div> -->
                  <div class="d-flex align-end ml-n5">
                    <v-btn
                      to="/redcross/profile"
                      dark
                      icon
                      x-small
                      class="redcross"
                      ><v-icon x-small>fa-pencil-alt</v-icon></v-btn
                    >
                  </div>
                </div>
                <br />
                <!-- <h3>{{ account.firstName }}</h3>
                <p class="caption mt-1">
                  {{ account.lastName }}
                </p> -->
                <v-btn
                  small
                  rounded
                  class="text-subtitle-2 font-weight-bold white--text mt-2"
                  color="red darken-1"
                  @click="logout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
                <v-divider class="my-3"></v-divider>
              </div>
              <div class="px-12">
                <h3>{{ account.firstName }}</h3>
                <p class="caption mt-1">
                  {{ account.lastName }}
                </p>
                <!-- <v-btn
                  class="d-flex justify-start"
                  active-class="lighter-1 white--text"
                  depressed
                  rounded
                  text
                >
                  <v-icon left>mdi-badge-account-horizontal</v-icon>
                  ອັບເດດຂໍ້ມູນບັນຊີ
                </v-btn> -->
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
    <v-footer app absolute inset padless>
      <v-card flat tile width="100%" class="text-center">
        <v-card-text>
          <v-btn
            color="redcross"
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4 white--text"
            icon
          >
            <a style="color: #de1b23" :href="icon.path" target="_blank"
              ><v-icon size="24px">
                {{ icon.icon }}
              </v-icon></a
            >
          </v-btn>
        </v-card-text>

        <!-- <v-card-text class="pt-0">
          <v-row class="mx-auto">
            <v-col cols="12" md="4">
              <div class="d-flex flex-column text-left px-12">
                <div class="title">
                  <v-icon left color="#C62828">fa-map-marker-alt</v-icon>
                  ສະຖານທີ່
                </div>
                <div>ສູນເລືອດແຫ່ງຊາດ</div>
                <div>ບ້ານຊຽງຍືນ ມ.ຈັນທະບູລີ ນະຄອນຫຼວງວຽງຈັນ</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex flex-column text-left px-12">
                <div class="title">
                  <v-icon left color="#C62828">fa-headset</v-icon> ຕິດຕໍ່ພົວພັນ
                </div>
                <div class="ml-8">
                  <div>030 548 7539</div>
                  <div>021 214 763</div>
                  <div>020 5741 6381</div>
                  <div>020 5741 6382</div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex flex-column text-left px-12">
                <div class="title">ລິຂະສິດ</div>
                <div class="body-1">
                  Copyright © {{ new Date().getFullYear() }} BLOODDONATIONLAO.
                  All Rights Reserved.
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text> -->

        <v-divider></v-divider>

        <v-card-text class="redcross--text">
          <div class="body-1 redcross--text">
            Copyright © {{ new Date().getFullYear() }} BLOODDONATIONLAO. All
            Rights Reserved.
          </div>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data: () => ({
    icons: [
      {
        icon: 'mdi-facebook',
        path:
          'https://www.facebook.com/pages/category/Local-Business/Lao-Red-Cross-National-Blood-Transfusion-Centre-475164072571176/'
      },
      { icon: 'mdi-twitter', path: '' },
      { icon: 'mdi-instagram', path: 'https://www.instagram.com/laoredcross/' }
    ],
    drawer: true,
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
        text: 'ລາຍງານການຮ້ອງຂໍ',
        icon: 'fa-file-medical-alt',
        path: '/allrequest'
      },
      { text: 'ຄູ່ມື', icon: 'fa-book', path: '/guide' }
    ]
  }),
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/redcross/login' })
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
