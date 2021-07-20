<template>
  <div>
    <v-card flat color="#f7f7f7">
      <div class="text-h5 font-weight-bold text-center pa-4">
        ປະຕິທິນການຮັບບໍລິຈາກເລືອດ
      </div>
    </v-card>

    <v-row class="mt-6" align="center" justify="center">
      <v-date-picker
        v-model="pickDate"
        color="redcross"
        width="600px"
        flat
      ></v-date-picker>
    </v-row>
    <v-alert
      border="top"
      class="mt-6 text-h6 font-weight-bold text-center mx-auto pa-4"
      color="redcross"
      max-width="600px"
      dark
    >
      ກິດຈະກຳ {{ pickDate || today }}
    </v-alert>
    <div v-if="notice.pending" class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="redcross"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row v-else align="center" justify="space-around">
      <v-col v-for="date in calendar" :key="date._id" cols="12" md="4">
        <v-card max-height="200px" @click="callViewActivity(date)">
          <v-card-title class="text-h6 d-flex justify-space-around">
            <div>
              <v-icon left>far fa-clock</v-icon>
              <span class="font-weight-bold">ເວລາ</span>
              <span class="pl-7"
                >{{ date.timeStart }} - {{ date.timeEnd }}</span
              >
            </div>
          </v-card-title>
          <v-card-text
            class="white text--primary text-center"
            style="max-height: 150px; height: 150px"
          >
            <div class="text-h6 font-weight-black">{{ date.title }}</div>
            <div class="text-h6">
              <v-icon color="red" left>fa-map-marker-alt</v-icon
              >{{ date.addressId.addressName }}
            </div>
            <!-- <v-btn color="red lighten-2" class="mx-0" outlined> Button </v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div
      class="mt-6 text-center text-h6 text--secondary"
      v-if="!calendar.length"
    >
      ບໍ່ມີກິດຈະກຳໃນວັນນີ້
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      pickDate: null,
      counter: 0
    }
  },
  computed: {
    ...mapState('activity', ['calendar', 'notice'])
  },
  mounted() {
    this.fetchCalendar(this.today)
  },
  methods: {
    ...mapActions('activity', ['fetchCalendar']),
    ...mapMutations('activity', ['setCurrActivity']),
    callViewActivity(item) {
      let id = item._id
      this.setCurrActivity(item)
      if (item) {
        return this.$router.push({
          path: `/activity/${id}`
        })
      }
    }
    // ...mapMutations('activity', ['setPickDate']),
  },
  watch: {
    pickDate: function (val) {
      // console.log(val)
      if (val) {
        this.notice['pending'] = true
        return this.fetchCalendar(val)
        // for (let c in this.calendar) {
        //    console.log(this.calendar[c].title)
        // }
      }
    }
  }
}
</script>
