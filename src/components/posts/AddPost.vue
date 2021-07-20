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
    <!-- ຫົວຂໍ້ start -->
    <v-toolbar flat class="mx-6 mb-6">
      <v-toolbar-title class="text-h5"> ເພີ່ມຂ່າວໃໝ່</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- ຫົວຂໍ້ end -->
    <!-- ຟອມເພີ່ມຂ່າວ start -->
    <v-form ref="form">
      <v-row align="center" justify="space-around" class="px-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="newPost.title"
            prepend-inner-icon="fa-newspaper"
            label="ຫົວຂໍ້ຂ່າວ"
            color="redcross"
            prefix=" "
            :rules="titleRules"
            required
          ></v-text-field>
          <v-radio-group v-model="statusPost">
            <template v-slot:label>
              <div><strong>ກຳນົດສະຖານະຂອງຂ່າວ</strong></div>
            </template>
            <v-radio color="redcross" :value="true">
              <template v-slot:label>
                <div>ສະແດງສາທາລະນະທັນທີ</div>
              </template>
            </v-radio>
            <v-radio color="redcross" :value="false">
              <template v-slot:label>
                <div>ເຊື່ອງໄວ້</div>
              </template>
            </v-radio>
          </v-radio-group>
          <div class="d-flex flex-row justify-center">
            <v-btn class="mr-6" color="redcross" outlined rounded
              ><clipper-upload v-model="orgImg">
                <v-icon left>fa-file-upload</v-icon
                >ອັບໂຫຼດຮູບພາບ</clipper-upload
              ></v-btn
            >
            <v-btn
              icon
              class="mr-4"
              color="amber darken-4"
              small
              @click="getResultImg"
            >
              <v-icon small>fa-crop-alt</v-icon>
            </v-btn>
            <v-btn v-if="imageRules" text class="mr-4" color="redcross" small>
              ກະລຸນາອັບໂຫຼດຮູບ
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="12">
          <div class="d-flex flex-row justify-space-around">
            <clipper-fixed
              v-if="!!orgImg"
              class="my-clipper"
              ref="clipper"
              :src="orgImg"
              preview="my-preview"
              :ratio="16 / 9"
            >
              <div class="placeholder" slot="placeholder"></div>
            </clipper-fixed>
            <!-- <clipper-preview name="my-preview" class="my-clipper">
              <div class="placeholder" slot="placeholder"></div>
            </clipper-preview> -->
            <div class="d-flex flex-row justify-center">
              <v-img
                v-if="cropImg"
                :src="cropImg"
                width="100%"
                max-width="500"
                style="border-style: dashed"
                alt=""
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <!-- <ckeditor
            :editor="editor"
            v-model="newPost.content"
            :config="editorConfig"
          ></ckeditor> -->
          <ceditor
            :content.sync="newPost.content"
            @onInput="(c) => (this.newPost['content'] = c)"
          />
        </v-col>
        <v-btn v-if="contentRules" text class="mr-4" color="redcross" small>
          ກະລຸນາໃສ່ເນື້ອຫາຂ່າວ
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callCreatePost"
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
        :value="progressImage"
        color="redcross"
        >{{ progressImage }} %</v-progress-circular
      >
    </v-overlay>
  </v-card>
</template>
<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import firebase from '@/functions/upload'
import ceditor from '@/components/editor'

import { v4 as uuidv4 } from 'uuid'
// import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddPost',
  components: {
    ceditor
  },
  data() {
    return {
      titleRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຫົວຂໍ້ຂ່າວ',
        (v) => (v && v.length <= 150) || 'ຫົວຂໍ້ຂ່າວບໍ່ຄວນຍາວເກີນໄປ'
      ],
      imageRules: false,
      contentRules: false,
      statusPost: false,

      // image
      orgImg: null,
      // cropped: false,
      cropImg: null,
      progressImage: null,
      canavImg: null
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('posts', ['newPost', 'notice'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResultImg: function () {
      this.canavImg = this.$refs.clipper.clip() //call component's clip method
      this.cropImg = this.canavImg.toDataURL('image/png', 1) //canvas->image
    },
    ...mapActions('posts', ['createPost']),
    callCreatePost() {
      let vali = this.$refs.form.validate()

      if (this.orgImg == null) {
        this.imageRules = true
        setTimeout(() => {
          this.imageRules = false
        }, 3000)
        return
      }

      if (this.newPost['content'] == null) {
        this.contentRules = true
        setTimeout(() => {
          this.contentRules = false
        }, 3000)
        return
      }

      if (this.canavImg && vali && this.newPost['content']) {
        this.notice['pending'] = true
        this.canavImg.toBlob((blob) => {
          let storageRef = firebase.storage().ref('images/' + uuidv4())
          const uploadTask = storageRef.put(blob, blob.type)
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              this.progressImage = Math.round(progress)
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
                this.newPost['image'] = downloadURL
                // this.newPost['datePost'] = moment().format(
                //   'MMMM Do YYYY, h:mm:ss a'
                // )
                this.newPost['statusPost'] = this.statusPost
                // this.newPost['statusPost'] === true ? true : false
                this.newPost['penname'] = 'Admin-VTE'
                this.createPost(this.newPost)
                this.notice['pending'] = false
              })
            }
          )
        })
      }
      this.orgImg = null
      this.cropImg = null

      // go to alert
      let alertEle = this.$refs['alert']
      var top = alertEle.offsetTop
      window.scrollTo(0, top)
    }
  }
}
</script>
