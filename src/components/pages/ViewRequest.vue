<template>
  <div>
    <v-row style="background: #f7f7f7" justify="center">
      <v-img
        class="result"
        :aspect-ratio="16 / 9"
        :src="currRequest.image"
        max-width="1000px"
        min-height="562px"
      ></v-img>
    </v-row>
    <v-card class="mt-6 pa-8" flat color="#f7f7f7">
      <v-card-title>
        {{ currRequest.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ formatTime(currRequest.createdAt) }}
      </v-card-subtitle>
      <div class="ck-content pa-8" v-html="currRequest.content"></div>
    </v-card>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'viewRequest',
  data: () => {
    return {}
  },
  mounted() {
    this.fetchCurrRequest(this.currRequest['_id'])
  },
  computed: {
    ...mapState('request', ['currRequest'])
  },
  methods: {
    ...mapActions('request', ['fetchCurrRequest']),
    formatTime(createdAt) {
      const thisMoment = moment.utc(createdAt).format('MMMM Do YYYY')
      return thisMoment
    }
  }
}
</script>
