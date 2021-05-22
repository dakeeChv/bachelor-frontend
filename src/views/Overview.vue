<template>
  <v-card class="mt-4 mx-auto" max-width="1000">
    <v-sheet
      class="v-sheet--offset mx-auto"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <BarChart />
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Donor Registrations</div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="caption grey--text font-weight-light"
        >last 26 minutes ago</span
      >
    </v-card-text>
  </v-card>
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
