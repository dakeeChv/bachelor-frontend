<template>
  <v-card flat>
    <v-row justify="center">
      <v-img
        class="result"
        :aspect-ratio="16 / 9"
        :src="currGuide.cover"
        contain
      ></v-img>
    </v-row>
    <v-card-title>
      {{ currGuide.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ formatTime(currGuide.createdAt) }}
    </v-card-subtitle>
    <div class="ck-content mx-8" v-html="currGuide.content"></div>
  </v-card>
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
