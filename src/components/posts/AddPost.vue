<template>
  <v-card class="mt-12 py-6">
    <div class="d-flex flex-row justify-center">
      <v-icon left>fa fa-plus-square-o</v-icon>
      <h3>ເພີ່ມຂ່າວ</h3>
    </div>
    <v-form>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="7" sm="12">
          <v-text-field
            v-model="title"
            prepend-icon="fa-header"
            label="Tile"
            color="redcross"
            required
          ></v-text-field>
          <v-file-input
            v-model="image"
            prepend-icon="fa-file-photo-o"
            label="File image"
            color="redcross"
            outlined
            dense
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <h3>Show Image</h3>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <v-chip class="ma-2" disabled label
            ><v-icon left>fa-file-text-o</v-icon> Content</v-chip
          >
          <froala
            id="edit"
            :tag="'textarea'"
            :config="config"
            v-model="content"
          ></froala>
          <div class="text-center">
            <v-btn outlined color="green darken-3" class="my-6 mr-4"
              >ບັນທຶກ</v-btn
            >
            <v-btn dark depressed color="redcross" class="my-6" @click="goBack"
              >ຍົກເລີກ</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'AddPost',
  data() {
    return {
      config: {
        events: {}
      },
      title: null,
      image: null,
      content: 'Add Your Content Here!'
    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    }
  }
}
</script>
