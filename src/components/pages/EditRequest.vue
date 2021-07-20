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
      <v-toolbar-title class="text-h5"> ແກ້ໄຂການຮ້ອງຂໍ</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- ຫົວຂໍ້ end -->
    <!-- ຟອມເພີ່ມຂ່າວ start -->
    <v-form ref="form">
      <v-row align="center" justify="space-around" class="px-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="currRequest.title"
            prepend-inner-icon="fa-scroll"
            label="ຫົວຂໍ້ການຮ້ອງຂໍ"
            color="redcross"
            prefix=" "
            :rules="titleRules"
            required
          ></v-text-field>
          <v-select
            v-model="currRequest.bloodReq"
            :items="bloodGroup"
            item-text="ABO"
            item-value="_id"
            label="ເລືອກກຼຸບເລືອດ"
            chips
            prepend-icon="fa-tint"
            filled
            rounded
            required
            color="redcross"
            :rules="rulesField"
          >
            <template v-slot:selection="{ item }">
              <v-chip color="redcross" dark>
                <span>{{ item.ABO }}</span>
              </v-chip>
            </template></v-select
          >
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
            <div class="text-center">
              <v-img
                v-if="cropImg"
                class="result"
                :src="cropImg"
                width="100%"
                max-width="500px"
                style="border-style: dashed"
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
            :content.sync="currRequest.content"
            @onInput="(c) => (this.currRequest['content'] = c)"
          />
        </v-col>
        <v-btn v-if="contentRules" text class="mr-4" color="redcross" small>
          ກະລຸນາໃສ່ເນື້ອຫາຂອງການຮ້ອງຂໍ
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callEditRequest"
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

// import { v4 as uuidv4 } from 'uuid'
// import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditRequest',
  components: {
    ceditor
  },
  data() {
    return {
      titleRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຫົວຂໍ້ການຮ້ອງຂໍ',
        (v) => (v && v.length <= 150) || 'ຫົວຂໍ້ບໍ່ຄວນຍາວເກີນໄປ'
      ],
      imageRules: false,
      contentRules: false,
      rulesField: [(v) => !!v || 'ກະລຸນາໃສ່ຂໍ້ມູນ'],
      // image
      orgImg: null,
      // cropped: false,
      cropImg: null,
      progressImage: null,
      canavImg: null
    }
  },
  mounted() {
    if (!this.isSignIn) {
      return this.$router.push({ path: '/signin' })
    }
    this.cropImg = this.currRequest['image']
    this.notice['pending'] = false
    this.notice['alert'] = false
  },
  computed: {
    ...mapState('request', ['currRequest', 'notice']),
    ...mapState('bloodGroup', ['bloodGroup']),
    ...mapGetters('authSocial', ['isSignIn'])
    // ...mapState('authSocial', ['donorInfo'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResultImg: function () {
      this.canavImg = this.$refs.clipper.clip() //call component's clip method
      this.cropImg = this.canavImg.toDataURL('image/png', 1) //canvas->image
    },
    ...mapActions('request', ['editRequest']),
    callEditRequest() {
      if (this.canavImg) {
        this.notice['pending'] = true
        this.canavImg.toBlob(async (blob) => {
          let storageRef = firebase
            .storage()
            .refFromURL(this.currRequest['image'])
          // .ref()
          // .child('images/' + this.currPost.image)
          await storageRef.put(blob, blob.type)
          this.currRequest['image'] = await storageRef.getDownloadURL()
        })
      }
      this.editRequest()
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
