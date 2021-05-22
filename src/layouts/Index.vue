<template>
  <div id="main-app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item-group color="redcross accent-4">
          <v-subheader>Overview</v-subheader>
          <v-list-item
            v-for="(item, i) in Overview"
            :key="i"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>ຈັດການ</v-subheader>
          <v-list-item
            v-for="(item, i) in Management"
            :key="i.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed color="red darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blood Donation</v-toolbar-title>
    </v-app-bar>
    <v-main>
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
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    drawer: false,
    Overview: [
      {
        text: 'Dashbaord',
        icon: 'mdi-view-dashboard-outline',
        path: '/dashboard'
      }
    ],
    Management: [
      { text: 'Posts', icon: 'mdi-post-outline', path: '/posts' },
      { text: 'Activity', icon: 'mdi-calendar-edit', path: '/activity' },
      {
        text: 'Record of Donation',
        icon: 'mdi-file-document-multiple-outline',
        path: '/record'
      },
      { text: 'Guide', icon: 'mdi-book-open', path: '/guide' }
    ]
  })
}
</script>
<style scoped>
.redcross {
  color: #de1b23;
}
</style>
