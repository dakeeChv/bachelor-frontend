<template>
  <div>
    <v-carousel cycle height="600" show-arrows-on-hover dark max="2">
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.image"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>
    <div class="mt-12">
      <v-card flat color="#f7f7f7">
        <div class="text-h4 font-weight-bold text-center pa-4">
          ຂ່າວປະຊາສຳພັນ
        </div>
      </v-card>
      <v-row class="mt-6">
        <v-col v-for="post in posts" :key="post.id" cols="12" md="4" sm="6">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card flat class="mx-auto" max-width="344" height="320px">
                <v-img :src="post.image"></v-img>
                <v-card-text>
                  <v-subheader>
                    {{ formatTime(post.createdAt) }}
                  </v-subheader>
                  <h2 class="text-h6">{{ post.title }}</h2>
                </v-card-text>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-btn color="red darken-2" dark @click="viewPost(post)">
                      ອ່ານຂ່າວ
                    </v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  mounted() {
    this.fetchPost()
  },
  computed: {
    ...mapState('posts', ['posts']),
    slides: function () {
      let sides = []
      for (let i = 0; i < 2; i++) {
        sides.push(this.posts[i])
      }
      return sides
    }
  },
  methods: {
    ...mapActions('posts', ['fetchPost']),
    ...mapMutations('posts', ['setCurrPost']),
    formatTime(createdAt) {
      const thisMoment = moment.utc(createdAt).format('MMMM Do YYYY')
      return thisMoment
    },
    viewPost(post) {
      let id = post._id
      this.setCurrPost(post)
      if (post) {
        return this.$router.push({
          path: `/news/view/${id}`
        })
      }
    }
  }
}
</script>
