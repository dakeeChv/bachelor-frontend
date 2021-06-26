<template>
  <v-card class="py-6">
    <div class="text-center">
      <v-alert
        ref="alert"
        class="mx-auto"
        v-model="notice.alert"
        border="left"
        close-text="Close Alert"
        color="success"
        width="50%"
        dark
        dismissible
      >
        {{ notice.message }}
      </v-alert>
    </div>
    <v-toolbar flat class="mx-6 mb-6">
      <v-toolbar-title class="text-h5"> ເພີ່ມຄູ່ມື</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-form>
      <v-row class="px-12" align="center" justify="space-around">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="currGuide.title"
            label="Title"
            prepend-icon="fa-header"
            color="redcross"
            required
          ></v-text-field>
          <div class="d-flex flex-row justify-center">
            <v-btn class="mr-6" color="redcross" outlined rounded
              ><clipper-upload v-model="orgCover">
                <v-icon left>fa-file-upload</v-icon
                >ອັບໂຫຼດຮູບພາບ</clipper-upload
              ></v-btn
            >
            <v-btn
              icon
              class="mr-4"
              color="amber darken-4"
              small
              @click="getResultCover"
            >
              <v-icon small>fa-crop-alt</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex flex-row justify-space-around">
            <clipper-fixed
              v-if="!!orgCover"
              class="my-clipper"
              ref="clipper"
              :src="orgCover"
              preview="my-preview"
              :ratio="16 / 9"
            >
              <div class="placeholder" slot="placeholder"></div>
            </clipper-fixed>
            <div class="d-flex flex-row justify-center">
              <v-img
                v-if="cropCover"
                class="result"
                :src="cropCover"
                max-width="500"
                style="border-style: dashed"
              ></v-img>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <ceditor
            :content.sync="currGuide.content"
            @onInput="(c) => (this.currGuide['content'] = c)"
          />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callEditGuide"
          >ບັນທຶກ</v-btn
        >
        <v-btn dark depressed color="redcross" class="my-6" @click="goBack"
          >ຍົກເລີກ</v-btn
        >
      </v-row>
    </v-form>
    <v-overlay :value="notice.pending">
      <v-progress-circular
        indeterminate
        :rotate="180"
        :size="64"
        :width="8"
        color="redcross"
      ></v-progress-circular>
    </v-overlay>
  </v-card>
</template>
<script>
import firebase from '@/functions/upload'
import ceditor from '@/components/editor'

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    ceditor
  },
  data: () => {
    return {
      // cover
      orgCover: null,
      cropCover: null,
      // progress: null,
      canavCover: null
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
    this.cropCover = this.currGuide['cover']
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('guide', ['currGuide', 'notice'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResultCover: function () {
      this.canavCover = this.$refs.clipper.clip() //call component's clip method
      this.cropCover = this.canavCover.toDataURL('image/png', 1) //canvas->image
    },
    ...mapActions('guide', ['editGuide']),
    callEditGuide() {
      if (this.canavCover) {
        this.notice['pending'] = true
        this.canavCover.toBlob(async (blob) => {
          let storageRef = firebase.storage().refFromURL(this.currGuide.cover)
          // .ref()
          // .child('images/' + this.currPost.image)
          await storageRef.put(blob, blob.type)
          this.currGuide['cover'] = await storageRef.getDownloadURL()
        })
      }
      this.editGuide()
      this.notice['pending'] = false
      // go to alert
      let alertEle = this.$refs['alert']
      var top = alertEle.offsetTop
      window.scrollTo(0, top)
      this.notice['pending'] = false
    }
  }
}
</script>
