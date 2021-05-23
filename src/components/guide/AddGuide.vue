<template>
  <v-card class="mt-12 py-6">
    <!-- <div class="ma-2">
      <v-btn color="redcross" tile text>
        <v-icon left>fa-chevron-left</v-icon>
        Go Back</v-btn>
    </div> -->
    <div class="d-flex flex-row justify-center">
      <v-icon left>fa fa-plus-square-o</v-icon>
      <h3>ເພີ່ມຄູ່ມື</h3>
    </div>
    <v-form>
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
          >
          </v-file-input>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="text-center">Show Image</h3>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="12" sm="12">
          <v-chip class="ma-2" disabled label
            ><v-icon left>fa-file-text-o</v-icon> Content</v-chip
          >
          <froala id="edit" v-model="content"></froala>
          <div class="text-center">
            <v-btn outlined color="green darken-3" class="my-6 mr-4"
              >ບັນທຶກ</v-btn
            >
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
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    title: null,
    image: null,
    content: 'Add conteny of guide so you need in here'
  })
}
</script>
