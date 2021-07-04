<template>
  <div>
    <v-row justify="center" no-gutters v-for="guide in guides" :key="guide._id">
      <v-card width="800px" class="mb-4" @click="viewGuide(guide)">
        <div class="d-flex">
          <v-img
            class="white--text align-end"
            aspect-ratio="16/9"
            min-height="168px"
            max-width="300px"
            :src="guide.cover"
          >
          </v-img>
          <div class="ml-6 pa-4">
            <p style="width: 400px" class="text-h5 text-justify">
              {{ guide.title }}
            </p>
          </div>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('guide', ['guides'])
  },
  methods: {
    ...mapMutations('guide', ['setCurrGuide']),
    viewGuide(item) {
      let id = item._id
      this.setCurrGuide(item)
      if (item) {
        return this.$router.push({
          path: `/guides/${id}`
        })
      }
    }
  }
}
</script>
