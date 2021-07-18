<template>
  <div>
    <v-card flat tile class="mb-4">
      <v-toolbar flat>
        <v-toolbar-title class="text-h5"
          >ປະຫວັດການບໍລິຈາກເລືອດຂອງ
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="red accent-4" outlined rounded to="/donor">
          <v-icon left>fa-plus</v-icon>
          ເພີ່ມບັນທຶກການບໍລິຈາກ
        </v-btn>
      </v-toolbar>
      <v-card flat class="mx-auto pa-4" max-width="600px">
        <div class="d-flex justify-space-around">
          <v-card-title class="caption"
            >ໄລຍະເວລາທີ່ທ່ານສາມາດບໍລິຈາກໄດ້ອີກຄັ້ງ</v-card-title
          >
          <v-card-title class="caption font-weight-bold"
            >{{ diffDays }} ມື້</v-card-title
          >
        </div>
        <v-progress-linear
          dark
          height="15px"
          background-color="pink lighten-3"
          color="pink lighten-1"
          :value="diffAsPercent"
          ><div>{{ diffAsPercent }} %</div></v-progress-linear
        >
      </v-card>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="histories"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-slot:[`item.title`]="{ item }">
        {{ item['activityId']['title'] }}
      </template>
      <template v-slot:[`item.view`]="{ item }">
        <v-btn
          color="light-blue darken-1"
          icon
          @click="viewActivity(item.activityId)"
          ><v-icon small>fa-eye</v-icon></v-btn
        > </template
      >>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'ຊື່ກິດຈະກຳທີ່ເຂົ້າຮ່ວມ',
          align: 'start',
          value: 'title',
          width: '50%'
        },
        { text: 'ວັນທີ່ເຂົ້າຮ່ວມ', value: 'dateDonor' },
        { text: 'ລາຍລະອຽດງານ', value: 'view' }
      ],
      toTime: null,
      diffDays: null,
      diffAsPercent: null
    }
  },
  mounted() {
    if (!this.isSignIn) {
      return this.$router.push({ path: '/signin' })
    } else {
      this.fetchRecord()
      this.getDayDonate()
    }
  },
  computed: {
    ...mapState('donation', ['histories']),
    ...mapGetters('authSocial', ['isSignIn'])
  },
  methods: {
    ...mapActions('donation', ['fetchRecord']),
    ...mapActions('activity', ['fetchCurrActivity']),
    ...mapMutations('activity', ['setCurrActivity']),
    async viewActivity(item) {
      // let id = item._id
      this.setCurrActivity(item)
      await this.fetchCurrActivity()
      //  console.log(item)
      if (item) {
        return this.$router.push({
          path: '/donor/history/detail'
        })
      }
    },
    getDayDonate() {
      // console.log(d.toLocaleDateString())
      let d = new Date(this.histories[0].dateDonor)
      // console.log(d.toLocaleDateString())
      d.setMonth(d.getMonth() + 3)
      let toTime = d.toISOString().substr(0, 10)
      this.toTime = toTime
      // console.log(d.toLocaleDateString())

      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      const firstDate = new Date(toTime)
      const secondDate = new Date()

      let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
      // console.log(diffDays)
      this.diffAsPercent = 100 - Math.round((diffDays * 100) / 90)
      if (diffDays <= 90) {
        this.diffDays = diffDays
        this.diffAsPercent = 100 - Math.round((diffDays * 100) / 90)
      } else {
        this.diffDays = 100
        this.diffAsPercent = 100
      }
    }
  }
}
</script>
