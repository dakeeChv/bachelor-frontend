<template>
  <v-card flat>
    <v-row justify="center">
      <v-img
        :aspect-ratio="16 / 9"
        max-height="350px"
        :src="currPost.image"
        contain
      ></v-img>
    </v-row>
    <v-card-title>
      {{ currPost.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ currPost.penname }}
    </v-card-subtitle>
    <v-card-text class="ck-content" v-html="currPost.content"> </v-card-text>
  </v-card>
</template>
<script>
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
  }
}
</script>
