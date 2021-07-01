<template>
  <div>
    <v-card flat color="#f7f7f7">
      <div class="text-h4 font-weight-bold text-center pa-4">
        ປະຕິທິນການຮັບບໍລິຈາກເລືອດ
      </div>
    </v-card>

    <v-row class="mt-6" align="center">
      <v-date-picker v-model="pickDate" color="redcross" flat></v-date-picker>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-col v-for="date in calendar" :key="date._id" cols="12" md="4">
        <v-card
          color="red darken-2"
          max-height="300px"
          flat
          outlined
          dark
          @click="callViewActivity(date)"
        >
          <v-card-title class="text-h6 d-flex justify-space-around">
            <!-- <div>
              <v-icon left>far fa-calendar-alt</v-icon>
              <span class="font-weight-bold">ວັນທີ</span>
              <div class="pl-7">2021-07-07</div>
            </div> -->
            <div>
              <v-icon left>far fa-clock</v-icon>
              <span class="font-weight-bold white--text">ເວລາ</span>
              <span class="pl-7 white--text"
                >{{ date.timeStart }} - {{ date.timeEnd }}</span
              >
            </div>
          </v-card-title>
          <v-card-text
            class="white text--primary text-center"
            style="height: 200px"
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
    ...mapState('activity', ['calendar'])
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
          path: `/activity/view/${id}`
        })
      }
    }
    // ...mapMutations('activity', ['setPickDate']),
  },
  watch: {
    pickDate: function (val) {
      // console.log(val)
      if (val) {
        return this.fetchCalendar(val)
        // for (let c in this.calendar) {
        //    console.log(this.calendar[c].title)
        // }
      }
    }
  }
}
</script>
