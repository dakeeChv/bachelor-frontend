<template>
  <div>
    <div class="text-center">
      <v-alert
        ref="alert"
        class="mx-auto"
        v-model="notice.alert"
        border="left"
        close-text="Close Alert"
        color="success"
        width="50%"
        dark
        dismissible
      >
        {{ notice.message }}
      </v-alert>
    </div>
    <v-data-table
      :headers="headers"
      :items="activities"
      :items-per-page="5"
      item-key="activityId"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-h5">ກິດຈະກຳ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red accent-4" outlined rounded to="/address/add">
            <v-icon left>fa-plus</v-icon>
            ເພີ່ມກິດຈະກຳ
          </v-btn>
        </v-toolbar>
        <v-toolbar flat>
          <v-row>
            <v-dialog v-model="dialog" persistent max-width="450">
              <template v-slot:activator="{ on, attrs }">
                <v-toolbar-title class="ml-4" v-bind="attrs" v-on="on">
                  <v-icon left>fa-filter</v-icon>Filter</v-toolbar-title
                >
              </template>
              <v-card>
                <v-card-title class="text-h6">
                  ກອງຕົວເລືອກທີ່ຕ້ອງການ
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          color="teal accent-4"
                          label="Picker in Date range"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          flat
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" range>
                        <v-spacer></v-spacer>
                        <v-btn text color="red darken-3" @click="menu = false">
                          ຍົກເລີກ
                        </v-btn>
                        <v-btn
                          text
                          color="teal accent-4"
                          @click="$refs.menu.save(date)"
                        >
                          ເລືອກ
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-row justify="center">
                      <v-col>
                        <v-checkbox
                          v-model="filterStatus"
                          color="red darken-3"
                          label="ສະຖານະເປີດ"
                          value="open"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="filterStatus"
                          color="red darken-3"
                          label="ສະຖານະປິດ"
                          value="close"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-3" text @click="dialog = false">
                    ຍົກເລີກ
                  </v-btn>
                  <v-btn color="green darken-2" text @click="dialog = false">
                    ກອງຂໍ້ມູນ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-toolbar>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <div class="body-2 text-justify">{{ item.title }}</div>
      </template>
      <template v-slot:[`item.dateAt`]="{ item }">
        <div class="body-2 text-justify">{{ dataRangText(item.dateAt) }}</div>
      </template>
      <!-- <template v-slot:[`item.image`]="{ item }">
        <v-avatar class="ma-2">
          <v-img :src="item.image"></v-img>
        </v-avatar>
      </template> -->
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          :class="[
            item.status ? 'green darken-2' : 'red darken-3',
            'white--text'
          ]"
        >
          {{ getStatus(item.status) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          small
          :class="[
            !!item.status ? 'teal darken-3' : 'red darken-3',
            'white--text'
          ]"
          icon
        >
          <v-icon small>fa-power-off</v-icon>
        </v-btn>
        <span class="ma-2"> | </span>
        <v-btn color="teal darken-3" icon @click="editActivity(item)">
          <v-icon small>fa-pencil-alt</v-icon>
        </v-btn>
        <v-btn color="red accent-3" icon @click="removeActivity(item)">
          <v-icon small>fa-trash</v-icon>
        </v-btn>
        <v-btn color="light-blue darken-1" icon @click="viewActivity(item)">
          <v-icon small>fa-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    date: '',
    menu: null,
    dialog: false,
    filterStatus: [],
    headers: [
      {
        text: 'ຫົວຂໍ້ກິດຈະກຳ',
        value: 'title',
        width: '50%'
      },
      {
        text: 'ວັນທີ',
        value: 'dateAt',
        width: '150px'
      },
      {
        text: 'ເວລາເລີ່ມງານ',
        value: 'timeStart',
        width: '150px'
      },
      {
        text: 'ເວລາສິ້ນສຸດງານ',
        value: 'timeEnd',
        width: '150px'
      },
      {
        text: 'ສະຖານະ',
        value: 'status',
        align: 'center',
        width: '100px'
      },
      {
        text: 'ຈັດການ',
        value: 'action',
        align: 'center',
        width: '100%'
      }
    ]
  }),
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/redcross/login' })
    }
    this.fetchActivity()
    this.notice['alert'] = false
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('activity', ['activities', 'notice'])
  },
  methods: {
    ...mapActions('activity', ['fetchActivity', 'deleteActivity']),
    ...mapMutations('activity', ['setCurrActivity']),
    getStatus(status) {
      return status ? 'ເປີດກິດຈະກຳ' : 'ປິດກິດຈະກຳ'
    },
    dataRangText(dateAt) {
      // return dateAt.join(' ຫາ ')
      if (dateAt.length > 1) {
        return dateAt[0] + ' ຫາ ' + dateAt[dateAt.length - 1]
      }
      return dateAt[0]
    },
    editActivity(item) {
      let id = item._id
      this.setCurrActivity(item)
      if (item) {
        return this.$router.push({
          path: `/activity/edit/${id}`
        })
      }
    },
    removeActivity(item) {
      this.deleteActivity(item)
      let alertEle = this.$refs['alert']
      var top = alertEle.offsetTop
      window.scrollTo(0, top)
    },
    viewActivity(item) {
      let id = item._id
      this.setCurrActivity(item)
      //  console.log(item)
      if (item) {
        return this.$router.push({
          path: `/activity/view/${id}`
        })
      }
    }
  }
}
</script>
