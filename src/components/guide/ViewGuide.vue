<template>
  <div>
    <v-row style="background: #f7f7f7" justify="center">
      <v-img
        class="result"
        :aspect-ratio="16 / 9"
        :src="currGuide.cover"
        max-width="1000px"
        min-height="562px"
      ></v-img>
    </v-row>
    <v-card class="mt-6 pa-8" flat color="#f7f7f7">
      <v-card-title>
        {{ currGuide.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ formatTime(currGuide.createdAt) }}
      </v-card-subtitle>
      <div class="ck-content pa-8" v-html="currGuide.content"></div>
    </v-card>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'viewGuide',
  data: () => {
    return {}
  },
  mounted() {
    this.fetchCurrGuide(this.currGuide['_id'])
  },
  computed: {
    ...mapState('guide', ['currGuide'])
  },
  methods: {
    ...mapActions('guide', ['fetchCurrGuide']),
    formatTime(createdAt) {
      const thisMoment = moment.utc(createdAt).format('MMMM Do YYYY')
      return thisMoment
    }
  }
}
</script>
