<template>
  <div>
    <v-card class="mb-12 px-12 mx-12" color="#e5e5e5" flat outlined>
      <v-row>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ເປົ້າໝາຍຍອດບໍລິຈາກ</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon left color="redcross">fa-hand-holding-water</v-icon>
                64,000
              </p></v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ຈຳນວນກິດຈະກຳ</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon color="redcross" left>fa-calendar-day</v-icon> 49
              </p></v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center">
            <v-card-title>ລວມຍອດບໍລິຈາກ</v-card-title>
            <v-card-text
              ><p class="text-h4 text--primary">
                <v-icon left color="redcross">fa-restroom</v-icon> 2,812
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
        <div class="title font-weight-light mb-2">ຍອດຜູ້ບໍລິຈາກແຕ່ລະເດືອນ</div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small> mdi-clock </v-icon>
        <span class="caption grey--text font-weight-light">{{
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
        }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BarChart from '../components/dashboard/BarChart'

export default {
  name: 'Dashboard',

  components: {
    BarChart
  }
}
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
