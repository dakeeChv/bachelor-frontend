<template>
  <div v-if="isLoggedIn">
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
    <v-data-table
      :headers="headers"
      :items="posts"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-h5">ຂ່າວທັງໝົດ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red accent-4" outlined rounded to="/posts/add">
            <v-icon left>fa-plus</v-icon>
            ເພີ່ມຂ່າວ
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.statusPost`]="{ item }">
        <v-chip
          :class="[item.statusPost ? 'green darken-2' : 'red darken-3']"
          dark
        >
          {{ getStatus(item.statusPost) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn color="teal darken-3" icon @click="editPost(item)"
          ><v-icon small>fa-pencil-alt</v-icon></v-btn
        >
        <v-btn color="red accent-3" icon @click="dialogRemove = true"
          ><v-icon small>fa-trash</v-icon></v-btn
        >
        <v-dialog v-model="dialogRemove" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >ທ່ານແນ່ໃຈ ທີ່ຈະລົບໂພສນີ້ບໍ່?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialogRemove = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="red darken-1" text @click="removePost(item)"
                >ລົບໂພສນີ້</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="light-blue darken-1" icon @click="viewPost(item)"
          ><v-icon small>fa-eye</v-icon></v-btn
        >
      </template>
    </v-data-table>
    <!-- <h1>{{ posts }}</h1>
    <h1>Hello</h1> -->
  </div>
</template>
<script>
import firebase from '@/functions/upload'
// import firebase from 'firebase/app'
// import firebaseConfig from '@/functions/upload'
// import 'firebase/storage'
// firebase.initializeApp(firebaseConfig)

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'ຊື່ຫົວຂໍ້ຂ່າວ',
          align: 'start',
          value: 'title',
          width: '50%'
        },
        { text: 'ເວລາທີ່ຟໂພສ', value: 'datePost' },
        { text: 'ສະຖານະ', value: 'statusPost' },
        { text: 'ຈັດການ', value: 'action' }
      ],
      dialogRemove: false
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/redcross/login' })
    }
    this.notice['alert'] = false
    this.fetchPost()
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('posts', ['posts', 'notice'])
  },
  methods: {
    ...mapActions('posts', ['fetchPost', 'deletePost']),
    ...mapMutations('posts', ['setCurrPost']),
    getStatus(status) {
      if (!status) return 'ປິດໂພສ'
      else if (status) return 'ເປີດໂພສ'
    },
    editPost(item) {
      let id = item._id
      this.setCurrPost(item)
      if (item) {
        return this.$router.push({
          path: `/posts/edit/${id}`
        })
      }
    },
    viewPost(item) {
      let id = item._id
      this.setCurrPost(item)
      if (item) {
        return this.$router.push({
          path: `/posts/view/${id}`
        })
      }
    },
    removePost(item) {
      this.dialogRemove = false
      const storageRef = firebase.storage().refFromURL(item.image)

      // Delete the file
      storageRef
        .delete()
        .then(() => {
          // File deleted successfully
          this.deletePost(item)
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        })
    }
  }
}
</script>
