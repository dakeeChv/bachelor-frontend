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
      <v-toolbar-title class="text-h5"> ແກ້ໄຂຂ່າວ</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- ຫົວຂໍ້ end -->
    <!-- ຟອມເພີ່ມຂ່າວ start -->
    <v-form>
      <v-row align="center" justify="space-around" class="px-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="currPost.title"
            prepend-inner-icon="fa-newspaper"
            label="ຫົວຂໍ້ຂ່າວ"
            color="redcross"
            prefix=" "
            required
          ></v-text-field>
          <v-radio-group v-model="currPost.statusPost">
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
          </div>
        </v-col>
        <v-col class="mt-6" cols="12" md="12">
          <div class="d-flex flex-row justify-space-around">
            <clipper-fixed
              v-if="orgImg"
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
            <div style="border-style: dashed">
              <v-img :src="cropImg" width="100%" max-width="500" alt="" />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <!-- <ckeditor
            :editor="editor"
            v-model="currPost.content"
            :config="editorConfig"
          ></ckeditor> -->
          <ceditor
            :content.sync="currPost.content"
            @onInput="(c) => (this.currPost['content'] = c)"
          />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callEditPost"
          >ບັນທຶກການແກ້ໄຂ</v-btn
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
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ceditor from '@/components/editor'
import firebase from '@/functions/upload'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'EditPost',
  components: {
    ceditor
  },
  data() {
    return {
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
    this.cropImg = this.currPost['image']
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('posts', ['currPost', 'notice'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResultImg: function () {
      this.canavImg = this.$refs.clipper.clip() //call component's clip method
      this.cropImg = this.canavImg.toDataURL('image/png', 1) //canvas->image
    },
    ...mapActions('posts', ['editPost']),
    callEditPost() {
      if (this.canavImg) {
        this.notice['pending'] = !this.notice['pending']
        this.canavImg.toBlob(async (blob) => {
          let storageRef = firebase.storage().refFromURL(this.currPost.image)
          // .ref()
          // .child('images/' + this.currPost.image)
          await storageRef.put(blob, blob.type)
          this.currPost['image'] = await storageRef.getDownloadURL()
        })
      }
      this.currPost['statusPost'] =
        this.currPost['statusPost'] === true ? true : false
      this.currPost['penname'] = 'Admin-VTE'
      this.editPost()
      // this.editPost()

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
