<template>
  <div>
    <v-card flat color="#f7f7f7">
      <div class="d-flex justify-space-around pa-6">
        <div>
          <v-icon left>far fa-calendar-alt</v-icon>
          <span class="font-weight-bold">ວັນທີ</span>
          <div class="pl-7">{{ dateRangeText(currActivity.dateAt) }}</div>
        </div>
        <div>
          <v-icon left>far fa-clock</v-icon>
          <span class="font-weight-bold">ເວລາ</span>
          <div class="pl-7">
            {{ currActivity.timeStart }} - {{ currActivity.timeEnd }}
          </div>
        </div>
      </div>
    </v-card>
    <div class="text-h4 font-weight-bold text-center pa-4">
      {{ currActivity.title }}
    </div>
    <v-card flat class="pa-6" color="#f7f7f7">
      <div class="ck-content" v-html="currActivity.content"></div>
    </v-card>
    <!-- <div>{{ currActivity }}</div> -->
    <v-card flat class="pa-6 mt-4" color="#f7f7f7">
      <div class="text-h5 font-weight-bold mt-4 pa-4">ແຜນທີ່</div>
      <l-map id="map" style="height: 400px" :zoom="zoom" :center="centerMap">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="markerMap" :icon="icon"></l-marker>
      </l-map>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { icon, latLng } from 'leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      icon: icon({
        iconUrl: require('@/assets/pin.png'),
        iconSize: [37, 39],
        iconAnchor: [16, 37]
      })
    }
  },
  mounted() {
    this.fetchCurrActivity()
  },
  computed: {
    ...mapState('activity', ['currActivity']),
    centerMap() {
      // console.log(this.currActivity)
      // console.log(typeof this.currActivity)
      let point = latLng(
        this.currActivity['addressId']['latitude'],
        this.currActivity['addressId']['longtitude']
      )
      return point
    },
    markerMap() {
      let point = latLng(
        this.currActivity['addressId']['latitude'],
        this.currActivity['addressId']['longtitude']
      )
      // console.log(point)
      return point
    }
  },
  methods: {
    dateRangeText(dateAt) {
      //   console.log(this.currActivity['addressId']['latitude'] + ' - ' +  this.currActivity['addressId']['longtitude'])
      if (dateAt.length > 1) {
        return dateAt[0] + ' ຫາ ' + dateAt[dateAt.length - 1]
      }
      return dateAt[0]
    },
    ...mapActions('activity', ['fetchCurrActivity'])
  }
}
</script>
