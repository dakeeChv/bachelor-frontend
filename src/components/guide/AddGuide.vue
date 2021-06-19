<template>
  <v-card class="py-6">
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
    <v-toolbar flat class="mx-6 mb-6">
      <v-toolbar-title class="text-h5"> ເພີ່ມຄູ່ມື</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-form>
      <v-row class="px-12" align="center" justify="space-around">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="newGuide.title"
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
              class="my-clipper"
              ref="clipper"
              :src="orgCover"
              preview="my-preview"
              :ratio="16 / 9"
            >
              <div class="placeholder" slot="placeholder"></div>
            </clipper-fixed>
            <div class="d-flex flex-row justify-center">
              <v-img :src="cropCover" width="100%" max-width="500" alt="" />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <ckeditor
            :editor="editor"
            v-model="newGuide.content"
            :config="editorConfig"
          ></ckeditor>
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
  </v-card>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapActions, mapState } from 'vuex'

export default {
  data: () => {
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

      // cover
      orgCover: null,
      progressImage: null,
      canavCover: null
    }
  },
  computed: {
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
    callCreateGuide() {}
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
