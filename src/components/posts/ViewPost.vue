<template>
  <v-card flat>
    <v-card-title>
      {{ currPost.title }}
    </v-card-title>
    <!-- <v-card-subtitle>
      {{ currPost.penname }}
    </v-card-subtitle> -->
    <v-card-subtitle>
      {{ currPost.datePost }}
    </v-card-subtitle>
    <v-row style="background: #f7f7f7" justify="center">
      <v-img
        class="result"
        height="500px"
        :aspect-ratio="16 / 9"
        :src="currPost.image"
        contain
      ></v-img>
    </v-row>
    <!-- <v-card-text class="ck-content" v-html="currPost.content"> </v-card-text> -->
    <div class="ck-content mt-8 pa-8 mx-8 my-6" v-html="currPost.content"></div>
  </v-card>
</template>
<script>
// import moment from 'moment'
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
    ...mapActions('posts', ['fetchCurrPost'])
    // formatTime(createdAt) {
    //   const thisMoment = moment.utc(createdAt).format('MMMM Do YYYY')
    //   return thisMoment
    // }
  }
}
</script>
