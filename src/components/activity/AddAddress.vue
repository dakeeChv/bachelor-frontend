<template>
  <v-card class="pb-6">
    <v-toolbar flat>
      <v-toolbar-title class="text-h5">ກີດຈະກຳ</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!addAddress"
        color="red accent-4"
        outlined
        rounded
        @click="addAddress = !addAddress"
      >
        <v-icon left>fa-plus</v-icon>
        ເພີ່ມສະຖານທີ່
      </v-btn>
      <div v-if="addAddress">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callCreateAddress"
          >ບັນທຶກ</v-btn
        >
        <v-btn
          dark
          depressed
          color="redcross"
          class="my-6"
          @click="addAddress = !addAddress"
          >ຍົກເລີກ</v-btn
        >
      </div>
    </v-toolbar>
    <v-form v-if="addAddress" ref="formAddress" class="ma-12 pt-12 px-12">
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ສະຖານທີ່"
            v-model="newAddress.addressName"
            :rules="addressNameRules"
            prepend-icon="mdi-map-marker"
            counter="150"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Latitude"
            v-model="markPoint.lat"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Longtitude"
            v-model="markPoint.lng"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div class="mx-auto my-6" style="height: 500px; width: 80%">
      <!-- <div style="height: 200px; overflow: auto">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">Toggle long popup</button>
      <button @click="showMap = !showMap">Toggle map</button>
    </div> -->
      <l-map
        v-if="showMap"
        id="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 100%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :visible="addAddress" :lat-lng.sync="markPoint" draggable>
        </l-marker>
        <!-- <l-marker :lat-lng.sync="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker> -->
        <l-marker
          v-for="(address, i) in addresses"
          :key="i._id"
          :lat-lng="{ lat: address.latitude, lng: address.longtitude }"
          :visible="!addAddress"
          @click="toCreateAddress(address)"
        >
          <l-tooltip :options="{ interactive: true }">
            <div class="caption">
              {{ address.addressName }}
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </v-card>
</template>

<script>
import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      zoom: 13,
      center: latLng(17.959986866085966, 102.61199623346329),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // withPopup: latLng(47.41322, -1.219482),
      // withTooltip: latLng(47.41422, -1.250482),
      markPoint: latLng(17.959986866085966, 102.61199623346329),
      currentZoom: 11.5,
      currentCenter: latLng(17.959986866085966, 102.61199623346329),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      addAddress: false,

      //validate
      addressNameRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຊື່ສະຖານທີ່',
        (v) => (v && v.length <= 150) || 'ຊື່ສະຖານທີ່ບໍ່ຄວນຍາວເກີນໄປ'
      ]
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
    this.fetchAddress()
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('address', ['newAddress', 'addresses', 'currAddress'])
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markPoint = latLng(coordinates.lat, coordinates.lng)
      })
      .catch((error) => alert(error))
  },
  methods: {
    ...mapActions('address', ['createAddress', 'fetchAddress']),
    ...mapMutations('address', ['setCurrAddress']),
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    // innerClick() {
    //   alert('Click!')
    // },
    callCreateAddress() {
      let valid = this.$refs.formAddress.validate()
      if (!valid) {
        return
      }
      this.addAddress = false
      this.newAddress['latitude'] = this.markPoint['lat']
      this.newAddress['longtitude'] = this.markPoint['lng']
      this.createAddress()
      // this.setCurrAddress(currAddress)
      // console.log(this.markPoint)
      this.$router.push({ path: '/activity/add/' })
    },
    toCreateAddress(address) {
      this.setCurrAddress(address)
      this.$router.push({ path: '/activity/add/' })
    }
  }
}
</script>
<style scoped>
#map {
  z-index: 0;
}
</style>
