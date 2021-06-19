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
      <v-alert
        class="text-center"
        v-model="notice.error"
        border="left"
        close-text="Close Alert"
        color="success"
        width="50%"
        dark
        dismissible
      >
        ເກີດຂໍ້ຜິດພາດ
      </v-alert>
    </div>
    <!-- ຫົວຂໍ້ start -->
    <v-toolbar flat class="mx-6 mb-6">
      <v-toolbar-title class="text-h5"> ເພີ່ມຂ່າວໃໝ່</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- ຫົວຂໍ້ end -->
    <!-- ຟອມເພີ່ມຂ່າວ start -->
    <v-form>
      <v-row align="center" justify="space-around" class="px-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="newPost.title"
            prepend-inner-icon="fa-newspaper"
            label="ຫົວຂໍ້ຂ່າວ"
            color="redcross"
            prefix=" "
            required
          ></v-text-field>
          <v-radio-group v-model="newPost.statusPost">
            <template v-slot:label>
              <div><strong>ກຳນົດສະຖານະຂອງຂ່າວ</strong></div>
            </template>
            <v-radio color="redcross" value="true">
              <template v-slot:label>
                <div>ສະແດງສາທາລະນະທັນທີ</div>
              </template>
            </v-radio>
            <v-radio color="redcross" value="false">
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
          </div>
        </v-col>
        <v-col cols="12" md="12">
          <div class="d-flex flex-row justify-space-around">
            <clipper-fixed
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
            <div
              class="d-flex flex-row justify-center"
              style="border-style: dashed"
            >
              <v-img :src="cropImg" width="100%" max-width="500" alt="" />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <ckeditor
            :editor="editor"
            v-model="newPost.content"
            :config="editorConfig"
          ></ckeditor>
        </v-col>
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
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <v-btn :to="#alert"></v-btn> -->
    <!-- <p>{{ posts }}</p> -->
    <!-- ຟອມເພີ່ມຂ່າວ end -->
    <!-- <v-snackbar
      v-if="!!progressImage"
      :timeout="3000"
      color="blue-grey"
      rounded="pill"
      top
    >
      <v-progress-linear
        :value="progressImage"
        height="10"
        striped
        color="deep-orange"
        >{{ progressImage }}</v-progress-linear
      >
    </v-snackbar> -->
  </v-card>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import firebase from '@/functions/upload'

import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddPost',
  data() {
    return {
      // editor
      editor: ClassicEditor,
      editorConfig: {
        mediaEmbed: {
          previewsInData: true
        },
        toolbar: {
          items: [
            'heading',
            '|',
            'alignment:left',
            'alignment:right',
            'alignment:center',
            'alignment:justify',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ]
        },
        image: {
          // Configure the available styles.
          styles: ['alignLeft', 'alignCenter', 'alignRight'],

          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative'
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        // This value must be kept in sync with the language defined in webpack.config.js.
        language: 'en'
      },

      // image
      orgImg: null,
      // cropped: false,
      cropImg: null,
      progressImage: null,
      canavImg: null
    }
  },
  computed: {
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
      this.notice['pending'] = !this.notice['pending']
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
            console.log('Upload is ' + progress + '% done')
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
              this.newPost['datePost'] = moment().format(
                'MMMM Do YYYY, h:mm:ss a'
              )
              this.newPost['statusPost'] =
                this.newPost['statusPost'] === 'true' ? true : false
              this.newPost['penname'] = 'Admin-VTE'
              this.createPost(this.newPost)
            })
          }
        )
      })
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
<style scoped>
.my-clipper {
  width: 100%;
  max-width: 500px;
}

.placeholder {
  text-align: center;
  /* padding: 20px;
  background-color: whitesmoke; */
  border-radius: 15px;
  color: #36405a;
}
</style>
