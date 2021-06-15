<template>
  <v-card class="mt-12 py-6">
    <div class="d-flex flex-row justify-center">
      <v-icon left>fa-plus-square-o</v-icon>
      <div class="text-h6">ເພີ່ມກິດຈະກຳ</div>
    </div>
    <form>
      <v-row class="px-4">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="title"
            label="Title"
            prepend-icon="fa-header"
            color="redcross"
            required
          ></v-text-field>
          <v-file-input
            v-model="image"
            label="File image"
            prepend-icon="fa-file-photo-o"
            color="redcross"
            outlined
            dense
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-h6">Show Image</div>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="12" sm="12">
          <v-chip class="ma-2" disabled label>
            <v-icon left>fa-file-text-o</v-icon>
            Content
          </v-chip>
          <froala id="edit" :config="config" v-model="content"></froala>
          <div class="text-center">
            <v-btn outlined color="green darken-3" class="my-6 mr-4">
              ບັນທຶກ
            </v-btn>
            <v-btn
              dark
              depressed
              color="redcross"
              class="my-6"
              @click="$router.go(-1)"
              >ຍົກເລີກ</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    title: '',
    image: '',
    content: 'Add content of Acitivity so you need in here !',
    lat: '',
    lng: '',
    config: {
      events: {
        initialized: function () {
          console.log('initialized')
        }
      },
      'image.beforeUpload': function (files) {
        let editor = this
        if (files.length) {
          let reader = new FileReader()
          reader.onload = function (e) {
            let result = e.target.result
            editor.image.insert(result, null, null, editor.image.get())
          }
          reader.popups.hideAll()
          return false
        }
      }
    }
  })
}
</script>
