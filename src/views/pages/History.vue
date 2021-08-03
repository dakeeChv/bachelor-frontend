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
            >{{ diffDays }} ມື້ ໃນວັນທີ {{ toTime }}</v-card-title
          >
        </div>
        <v-progress-linear
          dark
          height="15px"
          background-color="pink accent-1"
          color="red accent-4"
          :value="diffAsPercent"
          ><div>{{ diffAsPercent }} %</div></v-progress-linear
        >
      </v-card>
    </v-card>
    <v-tabs color="redcross" right>
      <v-tab>ປະຫວັດຮ່ວມກິດຈະກຳ</v-tab>
      <v-tab>ປະຫວັດຊ່ວຍບໍລິຈາກສຸກເສີນ</v-tab>
      <v-tab>ປະຫວັດຜູ້ຊ່ວຍເຫຼືອ</v-tab>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="histories"
          :items-per-page="5"
          item-key="title"
          class="elevation-1 mt-4"
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
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headersOfEmer"
          :items="historyOfEmer"
          :items-per-page="5"
          item-key="title"
          class="elevation-1 mt-4"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        >
          <template v-slot:[`item.title`]="{ item }">
            {{ item['requestId']['title'] }}
          </template>
          <template v-slot:[`item.view`]="{ item }">
            <v-btn
              color="light-blue darken-1"
              icon
              @click="viewRequest(item.requestId)"
              ><v-icon small>fa-eye</v-icon></v-btn
            > </template
          >>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <!-- <div>ປະຫວັດຜູ້ຊ່ວຍເຫຼືອ {{ helper }}</div> -->
        <v-data-table
          :headers="headersOfHelper"
          :items="helper"
          :items-per-page="5"
          item-key="title"
          class="elevation-1 mt-4"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        >
          <template v-slot:[`item.title`]="{ item }">
            {{ item['requestId']['title'] }}
          </template>
          <template v-slot:[`item.donor`]="{ item }">
            <div>
              {{ item['donorId']['name'] }} {{ item['donorId']['surname'] }}
            </div>
          </template>
          <template v-slot:[`item.bloodGroup`]="{ item }">
            <v-chip dark color="redcross">{{
              getBloodGroup(item['donorId']['bloodGroup'])
            }}</v-chip>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
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
      headersOfEmer: [
        {
          text: 'ຫົວຂໍ້ການຮ້ອງຂໍ',
          align: 'start',
          value: 'title',
          with: '40%'
        },
        {
          text: 'ວັນທີ່ບໍລິຈາກ',
          value: 'dateDonor'
        },
        {
          text: 'ລາຍລະອຽດ',
          value: 'view'
        }
      ],
      headersOfHelper: [
        {
          text: 'ຫົວຂໍ້ການຮ້ອງຂໍ້',
          value: 'title',
          align: 'start'
        },
        {
          text: 'ວັນທີ່ບໍລິຈາກໃຫ້',
          value: 'dateDonor',
          align: 'center'
        },
        {
          text: 'ຜູ້ຊ່ວຍເຫຼືອ',
          value: 'donor',
          align: 'center'
        },
        {
          text: 'ເລືອດທີ່ບໍລິຈາກ',
          value: 'bloodGroup',
          align: 'center'
        }
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
      this.fetchRecord(this.donorInfo['_id'])
      this.fetchEmergencyRecord(this.donorInfo['_id'])
      this.fetchHelper(this.donorInfo['_id'])
      this.getDayDonate()
    }
  },
  computed: {
    ...mapState('donation', ['histories', 'historyOfEmer']),
    ...mapState('authSocial', ['donorInfo']),
    ...mapGetters('authSocial', ['isSignIn']),
    ...mapState('request', ['helper'])
  },
  methods: {
    ...mapActions('donation', ['fetchRecord', 'fetchEmergencyRecord']),
    ...mapActions('activity', ['fetchCurrActivity']),
    ...mapActions('request', ['fetchCurrRequest', 'fetchHelper']),
    ...mapMutations('activity', ['setCurrActivity']),
    ...mapMutations('request', ['setCurrRequest']),
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
    async viewRequest(item) {
      let id = item['_id']
      this.setCurrRequest(item)
      await this.fetchCurrRequest()
      if (item) {
        return this.$router.push({
          path: `/view/request/${id}`
        })
      }
    },
    getDayDonate() {
      // console.log(d.toLocaleDateString())
      // console.log(!this.historyOfEmer.length)
      // console.log(!this.histories.length)
      let d
      let setDayDonor
      if (!this.histories && !this.historyOfEmer) {
        return
      }
      if (!this.histories.length) {
        d = new Date(this.historyOfEmer[0].dateDonor)
        setDayDonor = new Date(this.historyOfEmer[0].dateDonor)
      } else if (!this.historyOfEmer.length) {
        d = new Date(this.histories[0].dateDonor)
        setDayDonor = new Date(this.histories[0].dateDonor)
      } else if (
        new Date(this.historyOfEmer[0].dateDonor) >
        new Date(this.histories[0].dateDonor)
      ) {
        d = new Date(this.historyOfEmer[0].dateDonor)
        setDayDonor = new Date(this.historyOfEmer[0].dateDonor)
      } else if (
        new Date(this.historyOfEmer[0].dateDonor) <
        new Date(this.histories[0].dateDonor)
      ) {
        d = new Date(this.histories[0].dateDonor)
        setDayDonor = new Date(this.histories[0].dateDonor)
      }
      // console.log(d.toLocaleDateString())
      d.setMonth(d.getMonth() + 3)
      let toTime = d.toISOString().substr(0, 10)
      this.toTime = toTime
      // console.log(d.toLocaleDateString())

      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      const firstDate = new Date(toTime)
      const secondDate = new Date()
      console.log(firstDate + ' and ' + secondDate)

      if (firstDate < secondDate) {
        this.diffDays = 0
        this.diffAsPercent = 100
        return
      }
      // console.log('HHH' + setDayDonor)
      let set = Math.round(
        // Math.abs((firstDate - new Date(this.histories[0].dateDonor)) / oneDay)
        Math.abs((firstDate - setDayDonor) / oneDay)
      )
      // console.log(set)

      let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
      if (this.diffAsPercent <= 100) {
        this.diffDays = diffDays
        this.diffAsPercent = 100 - Math.round((diffDays * 100) / set)
      }
    },
    getBloodGroup(item) {
      switch (item) {
        case '60e92a8a45a30c2d84878c4c':
          return 'A-'
        case '60e92a3545a30c2d84878c4b':
          return 'A+'
        case '60e92a9545a30c2d84878c4e':
          return 'B-'
        case '60e92a9145a30c2d84878c4d':
          return 'B+'
        case '60e92aa145a30c2d84878c50':
          return 'O-'
        case '60e92a9c45a30c2d84878c4f':
          return 'O+'
        case '60e92aac45a30c2d84878c52':
          return 'AB-'
        case '60e92aa745a30c2d84878c51':
          return 'AB+'
        default:
          return '---'
      }
    }
  }
}
</script>
