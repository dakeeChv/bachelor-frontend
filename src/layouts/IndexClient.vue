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
      <v-toolbar-title>Client</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.width >= 600" v-slot:extension>
        <v-tabs color="redcross" class="white--text" centered>
          <v-tab to="/home">ໜ້າຫຼັກ</v-tab>
          <v-tab>ປະຕິທິນກິດຈະກຳ</v-tab>
          <v-tab to="/guides">ຄູ່ມື ແລະ ແຫຼ່ງຮູ້ຂໍ້ມູນ</v-tab>
          <v-tab>ກ່ຽວກັບພວກເຮົາ</v-tab>
        </v-tabs>
      </template>
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
  })
}
</script>
<style scoped>
.redcross {
  color: #de1b23;
}
</style>
