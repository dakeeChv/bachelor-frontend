<template>
  <div>
    <v-card class="mb-12 px-12 mx-12" color="#e5e5e5" flat outlined>
      <v-row>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ຍອດບໍລິຈາກໃນປີ {{ pickYear }}</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon left color="redcross">fa-hand-holding-water</v-icon>
                {{ AllDonate }}
              </p></v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ຈຳນວນກິດຈະກຳ</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon color="redcross" left>fa-calendar-day</v-icon>
                {{ countActivity }}
              </p></v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ລວມຍອດບໍລິຈາກໃນເດືອນ</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon left color="redcross">fa-restroom</v-icon>
                {{ DonorOfMonth }}
              </p></v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4 mx-auto" max-width="1000">
      <v-sheet
        class="v-sheet--offset mx-auto"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <BarChart />
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="d-flex flex-row" style="max-width: 200px">
          <v-text-field
            v-model="pickYear"
            label="Year"
            color="redcross"
            dense
          ></v-text-field>
          <div class="ml-2 text-center">
            <v-btn class="redcross" depressed icon dark @click="pickerYear"
              ><v-icon small>fa-sync</v-icon></v-btn
            >
          </div>
        </div>
        <div class="title font-weight-light mb-2">ຍອດຜູ້ບໍລິຈາກແຕ່ລະເດືອນ</div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small> mdi-clock </v-icon>
        <span class="caption grey--text font-weight-light">{{
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
        }}</span>
      </v-card-text>
    </v-card>
    <v-card class="mt-4 pa-md-10 pa-sm-4 mx-auto" max-width="1000">
      <v-row justify="center">
        <v-col align-self="center" cols="6">
          <div class="text-center text-md-h5 text-sm-h6">
            <v-icon left color="redcross">fa-hand-holding-water</v-icon
            >ຍອດບໍລິຈາກໃນງານກິດຈະກຳ
          </div>
        </v-col>
        <v-col cols="6">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="ປີເດືອນວັນ"
                prepend-icon="mdi-calendar"
                color="redcross"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" color="red accent-4" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                ຍົກເລີກ
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                ຕົກລົງ
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row class="mb-10" align="center" justify="space-around">
        <v-col cols="12" md="4">
          <v-card
            height="350px"
            max-height="400px"
            class="mx-auto pa-md-4 pa-sm-2"
            max-width="420"
            outlined
          >
            <div class="text-overline mb-4">
              <v-icon color="red" left>fa-map-marker-alt</v-icon
              >{{ bloodbank['bloodbank']['addressId']['addressName'] }}
            </div>
            <!-- <v-list-item-title style="width: 100%" class="text-h6 mb-1">
                  <span class="text-justify">{{ info.title }}</span>
                </v-list-item-title> -->
            <div style="max-width: 400px" class="text-h6 text-justify">
              {{ bloodbank['bloodbank']['title'] }}
            </div>
            <v-card-title class="title mb-1">
              <v-icon color="redcross" left x-small>fa-calendar-day</v-icon
              >{{ bloodbank['bloodbank']['verifyCode'] }}
            </v-card-title>
            <v-card-subtitle
              ><v-icon class="mr-2" x-small left> mdi-clock </v-icon
              >{{ bloodbank['bloodbank']['timeStart'] }} -
              {{ bloodbank['bloodbank']['timeEnd'] }}</v-card-subtitle
            >
            <p
              style="border: #de1b23 solid 2px; border-radius: 10px"
              class="text-center pa-2"
            >
              <v-icon left color="redcross">fa-restroom</v-icon>ຜູ້ບໍລິຈາກ:
              <span class="text-h5 redcross--text">{{ bloodbank.count }}</span>
            </p>
            <div class="ml-2 text-center">
              <v-btn
                class="redcross"
                depressed
                icon
                dark
                @click="reloadBloodBank()"
                ><v-icon small>fa-sync</v-icon></v-btn
              >
              <v-btn
                class="ml-2"
                color="redcross"
                icon
                outlined
                @click="toListDonor(bloodbank['bloodbank'])"
                ><v-icon small>fa-eye</v-icon></v-btn
              >
            </div>
          </v-card>
        </v-col>
        <v-col v-for="info in infoActivity" :key="info._id" cols="12" md="4">
          <v-card
            class="mx-auto pa-md-4 pa-sm-2"
            max-width="420"
            height="350px"
            max-height="400px"
            @click="toListDonor(info)"
            outlined
          >
            <div class="text-overline mb-4">
              <v-icon color="red" left>fa-map-marker-alt</v-icon
              >{{ info['address']['addressName'] }}
            </div>
            <!-- <v-list-item-title style="width: 100%" class="text-h6 mb-1">
                  <span class="text-justify">{{ info.title }}</span>
                </v-list-item-title> -->
            <div style="max-width: 400px" class="text-h6 text-justify">
              {{ info.title }}
            </div>
            <v-card-title class="title mb-1">
              <v-icon color="redcross" left x-small>fa-calendar-day</v-icon
              >{{ info.verifyCode }}
            </v-card-title>
            <v-card-subtitle
              ><v-icon class="mr-2" x-small left> mdi-clock </v-icon
              >{{ info.timeStart }} - {{ info.timeEnd }}</v-card-subtitle
            >
            <p
              style="border: #de1b23 solid 2px; border-radius: 10px"
              class="text-center pa-2"
            >
              <v-icon left color="redcross">fa-restroom</v-icon>ຜູ້ບໍລິຈາກ:
              <span class="text-h5 redcross--text">{{ info.count }}</span>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-overlay :value="notice.pending">
      <v-progress-circular
        indeterminate
        color="red"
        :size="100"
        :width="10"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import BarChart from '../components/dashboard/BarChart'

export default {
  name: 'Dashboard',

  components: {
    BarChart
  },
  data() {
    return {
      pickYear: new Date().getFullYear(),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false
    }
  },
  mounted() {
    this.fetchChart(this.pickYear)
    this.fetchInfoActivity(this.date)
    this.fetchBloodBank()
  },
  computed: {
    ...mapState('dashboard', [
      'countActivity',
      'AllDonate',
      'infoActivity',
      'notice',
      'bloodbank'
    ]),
    ...mapGetters('dashboard', ['DonorOfMonth'])
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchChart',
      'fetchInfoActivity',
      'ListDonor',
      'fetchBloodBank'
    ]),
    async pickerYear() {
      this.notice['pending'] = true
      await this.fetchChart(this.pickYear)
    },
    async toListDonor(item) {
      let id = item._id
      await this.ListDonor(id)
      return this.$router.push({ path: `/donor/list/${id}` })
    },
    async reloadBloodBank() {
      this.notice['pending'] = true
      await this.fetchBloodBank()
    }
  },
  watch: {
    date: async function (val) {
      // console.log(val)
      if (val) {
        this.notice['pending'] = true
        return await this.fetchInfoActivity(val)
      }
    }
  }
}
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
