<template>
  <div id="main-app">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.width < 600"
      v-model="drawer"
      app
      clipped
    >
      <v-list nav dense>
        <v-list-item-group color="redcross accent-4">
          <v-subheader></v-subheader>
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed clipped-left>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.width < 600"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <template>
        <v-tabs
          v-if="$vuetify.breakpoint.width >= 600"
          color="redcross"
          class="white--text"
          centered
        >
          <v-tab to="/home">ໜ້າຫຼັກ</v-tab>
          <v-tab to="/activity/calendar">ປະຕິທິນກິດຈະກຳ</v-tab>
          <v-tab to="/guides">ຄູ່ມື ແລະ ແຫຼ່ງຮູ້ຂໍ້ມູນ</v-tab>
          <v-tab>ກ່ຽວກັບພວກເຮົາ</v-tab>
        </v-tabs>
      </template>
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
                    :src="donorInfo.image"
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
                    :src="donorInfo.image"
                  ></v-img>
                </v-avatar>
                <h3 class="mt-4">{{ donorInfo.name }}</h3>
                <p class="caption mt-1">
                  {{ donorInfo.surname }}
                </p>
                <v-btn
                  small
                  rounded
                  class="text-subtitle-2 font-weight-bold white--text"
                  color="red darken-1"
                  @click="signout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Signout
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
    <v-footer app absolute inset padless>
      <v-card width="100%" tile class="text-center">
        <v-card-text>
          <v-btn
            color="redcross"
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

        <v-card-text class="pt-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          molestias omnis ab culpa maiores amet beatae eum incidunt nulla rem
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>blooddonationlao</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    drawer: false,
    Overview: [
      {
        text: 'ໜ້າຫຼັກ',
        icon: 'fa-chart-line',
        path: '/home'
      },
      {
        text: 'ປະຕິທິນກິດຈະກຳ',
        icon: 'fa-calendar-alt',
        path: ''
      },
      {
        text: 'ຄູ່ມື ແລະ ແຫຼ່ງຮູ້ຂໍ້ມູນ',
        icon: 'fa-book',
        path: '/guides'
      },
      {
        text: 'ກ່ຽວກັບພວກເຮົາ',
        icon: 'fa-info',
        path: ''
      }
    ]
  }),
  computed: {
    ...mapState('authSocial', ['donorInfo'])
  },
  methods: {
    ...mapActions('authSocial', ['signout'])
  }
}
</script>
<style scoped>
.redcross {
  color: #de1b23;
}
</style>
