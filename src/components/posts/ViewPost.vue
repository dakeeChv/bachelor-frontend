<template>
  <v-card flat>
    <v-row justify="center">
      <v-img
        class="result"
        :aspect-ratio="16 / 9"
        :src="currPost.image"
        contain
      ></v-img>
    </v-row>
    <v-card-title>
      {{ currPost.title }}
    </v-card-title>
    <!-- <v-card-subtitle>
      {{ currPost.penname }}
    </v-card-subtitle> -->
    <v-card-subtitle>
      {{ formatTime(currPost.createdAt) }}
    </v-card-subtitle>
    <!-- <v-card-text class="ck-content" v-html="currPost.content"> </v-card-text> -->
    <div class="ck-content mx-8" v-html="currPost.content"></div>
  </v-card>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'viewPost',
  data: () => {
    return {}
  },
  mounted() {
    this.fetchCurrPost(this.currPost['_id'])
  },
  computed: {
    ...mapState('posts', ['currPost'])
  },
  methods: {
    ...mapActions('posts', ['fetchCurrPost']),
    formatTime(createdAt) {
      const thisMoment = moment.utc(createdAt).format('MMMM Do YYYY')
      return thisMoment
    }
  }
}
</script>
