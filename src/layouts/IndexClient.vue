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
          <!-- <v-list-item
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
          </v-list-item> -->
          <v-list-item to="/home" link>
            <v-list-item-icon>
              <v-icon dense>fa-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >ໜ້າຫຼັກ</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/activity/calendar" link>
            <v-list-item-icon>
              <v-icon dense>fa-calendar-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >ປະຕິທິນກິດຈະກຳ</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/guides" link>
            <v-list-item-icon>
              <v-icon dense>fa-book</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >ຄູ່ມືແລະແຫຼ່ງຮູ້ຂໍ້ມູນ</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isSignIn" to="/request/list" link>
            <v-list-item-icon>
              <v-icon dense>fa-hand-holding-water</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >ຄຳຮ້ອງຂໍ</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/aboutus" link>
            <v-list-item-icon>
              <v-icon dense>fa-info</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >ກ່ຽວກັບພວກເຮົາ</v-list-item-title
              >
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
          <v-tab v-if="isSignIn" to="/request/list">ຄຳຮ້ອງຂໍ</v-tab>
          <v-tab to="/aboutus">ກ່ຽວກັບພວກເຮົາ</v-tab>
        </v-tabs>
      </template>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isSignIn"
        depressed
        outlined
        rounded
        color="redcross"
        class="font-weight-bold"
        to="/signin"
        >ເຂົ້າສູ່ລະບົບ</v-btn
      >
      <div v-if="isSignIn">
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
                <v-chip class="text-center" color="redcross" dark>
                  {{ donorInfo.bloodGroup.ABO }}
                </v-chip>
                <!-- <v-btn
                  class="d-flex justify-start"
                  active-class="lighter-1 white--text"
                  depressed
                  rounded
                  text
                >
                  <v-icon left color="redcross"
                    >mdi-badge-account-horizontal</v-icon
                  >
                  ອັບເດດຂໍ້ມູນບັນຊີ
                </v-btn> -->
                <v-btn to="/donor" depressed rounded text>
                  <v-icon left color="redcross">fa-sign-in-alt</v-icon>
                  ເຂົ້າຮ່ວມບໍລິຈາກ</v-btn
                >
                <v-btn to="/history" depressed rounded text>
                  <v-icon left color="redcross">fa-book</v-icon>
                  ບັນທຶກຂອງຂ້ອຍ</v-btn
                >
                <v-btn to="/myrequest" depressed rounded text>
                  <v-icon left color="redcross">fa-hand-holding-water</v-icon>
                  ການຮ້ອງຂໍ</v-btn
                >
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
        <v-divider></v-divider>
        <!-- <v-card-text class="pt-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          molestias omnis ab culpa maiores amet beatae eum incidunt nulla rem
        </v-card-text> -->
        <v-card-text class="pt-0 mt-4">
          <v-row class="mx-auto">
            <v-col cols="12" md="4">
              <div class="d-flex flex-column text-left px-12">
                <div class="title">
                  <v-icon left color="#C62828">fa-map-marker-alt</v-icon>
                  ສະຖານທີ່
                </div>
                <div>ມະຫາວິທະຍາໄລແຫ່ງຊາດ ຄະນະວິສະວະກຳສາດ</div>
                <div>ວິທະຍາເຂດ ໂສກປ່າຫຼວງ, ສາຂາວິຊາ ຄອມພິວເຕີ້</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex flex-column text-left px-12">
                <div class="title">
                  <v-icon left color="#C62828">fa-headset</v-icon> ຕິດຕໍ່ພົວພັນ
                </div>
                <div class="ml-8">
                  <div>20 56 716 234</div>
                  <div>20 52 997 955</div>
                  <div>20 56 222 326</div>
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
        </v-card-text>

        <v-divider></v-divider>

        <!-- <v-card-text>
          {{ new Date().getFullYear() }} — <strong>blooddonationlao</strong>
        </v-card-text> -->
      </v-card>
    </v-footer>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    drawer: false
    // Overview: [
    //   {
    //     text: 'ໜ້າຫຼັກ',
    //     icon: 'fa-chart-line',
    //     path: '/home'
    //   },
    //   {
    //     text: 'ປະຕິທິນກິດຈະກຳ',
    //     icon: 'fa-calendar-alt',
    //     path: '/activity/calendar'
    //   },
    //   {
    //     text: 'ຄູ່ມື ແລະ ແຫຼ່ງຮູ້ຂໍ້ມູນ',
    //     icon: 'fa-book',
    //     path: '/guides'
    //   },
    //   {
    //     text: 'ກ່ຽວກັບພວກເຮົາ',
    //     icon: 'fa-info',
    //     path: '/aboutus'
    //   }
    // ]
  }),
  mounted() {
    // console.log(this.expires_at <= new Date())
    if (this.expires_at <= new Date()) {
      this.setIdToken(null)
      this.setDonorInfo({})
    }
  },
  computed: {
    ...mapState('authSocial', ['donorInfo', 'expires_at']),
    ...mapGetters('authSocial', ['isSignIn'])
  },
  methods: {
    ...mapActions('authSocial', ['signout']),
    ...mapMutations('authSocial', ['setIdToken', 'setDonorInfo'])
  }
}
</script>
<style scoped>
.redcross {
  color: #de1b23;
}
</style>
