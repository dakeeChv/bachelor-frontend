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
    <v-form ref="form">
      <v-row class="px-12" align="center" justify="space-around">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="newGuide.title"
            label="Title"
            prepend-icon="fa-header"
            color="redcross"
            :rules="titleRules"
            counter="150"
            required
          ></v-text-field>
          <div class="d-flex flex-row justify-center">
            <v-btn class="mr-6" color="redcross" outlined rounded
              ><clipper-upload v-model="orgCover" rules="">
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
            <v-btn v-if="imageRules" text class="mr-4" color="redcross" small>
              ກະລຸນາອັບໂຫຼດຮູບ
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
            :content.sync="newGuide.content"
            @onInput="(c) => (this.newGuide['content'] = c)"
          />
          <v-btn v-if="contentRules" text class="mr-4" color="redcross" small>
            ກະລຸນາໃສ່ເນື້ອຫາຄູ່ມື
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callCreateGuide"
          >ບັນທຶກ</v-btn
        >
        <v-btn dark depressed color="redcross" class="my-6" @click="goBack"
          >ຍົກເລີກ</v-btn
        >
      </v-row>
    </v-form>
    <v-overlay :value="notice.pending">
      <v-progress-circular
        :rotate="180"
        :size="64"
        :width="8"
        :value="progress"
        color="redcross"
        >{{ progress }} %</v-progress-circular
      >
    </v-overlay>
  </v-card>
</template>
<script>
import firebase from '@/functions/upload'
import { v4 as uuidv4 } from 'uuid'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ceditor from '@/components/editor'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    ceditor
  },
  data: () => {
    return {
      titleRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຊື່ຄູ່ມື',
        (v) => (v && v.length <= 150) || 'ຊື່ຄູ່ມືບໍ່ຄວນຍາວເກີນໄປ'
      ],
      imageRules: false,
      contentRules: false,
      // cover
      orgCover: null,
      cropCover: null,
      progress: null,
      canavCover: null
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('guide', ['newGuide', 'notice'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResultCover: function () {
      this.canavCover = this.$refs.clipper.clip() //call component's clip method
      this.cropCover = this.canavCover.toDataURL('image/png', 1) //canvas->image
    },
    ...mapActions('guide', ['createGuide']),
    callCreateGuide() {
      let vali = this.$refs.form.validate()

      if (this.orgCover == null) {
        this.imageRules = true
        setTimeout(() => {
          this.imageRules = false
        }, 3000)
        return
      }

      if (this.newGuide['content'] == null) {
        this.contentRules = true
        setTimeout(() => {
          this.contentRules = false
        }, 3000)
        return
      }

      if (this.canavCover && vali && !!this.newGuide['content']) {
        this.notice['pending'] = true
        this.canavCover.toBlob((blob) => {
          let storageRef = firebase.storage().ref('covers/' + uuidv4())
          const uploadTask = storageRef.put(blob, blob.type)
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              this.progress = Math.round(progress)
              // console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused')
                  break
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running')
                  break
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error)
            },
            () => {
              //   // Handle successful uploads on complete
              //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.newGuide['cover'] = downloadURL
                this.createGuide(this.newGuide)
                this.newGuide['pending'] = false
              })
            }
          )
        })
      }
      this.orgCover = null
      this.cropCover = null

      // go to alert
      let alertEle = this.$refs['alert']
      var top = alertEle.offsetTop
      window.scrollTo(0, top)
    }
  }
}
</script>
