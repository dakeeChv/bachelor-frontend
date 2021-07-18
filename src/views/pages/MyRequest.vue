<template>
  <div v-if="isSignIn">
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
      :items="myRequest"
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
          <v-toolbar-title class="text-h5">ປະຫວັດການຮ້ອງຂໍ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red accent-4" outlined rounded to="/myrequest/add">
            <v-icon left>fa-plus</v-icon>
            ເພີ່ມການຮ້ອງຂໍ
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <v-avatar tile class="ma-2">
          <v-img contain :src="item.image"></v-img>
        </v-avatar>
      </template>
      <template v-slot:[`item.bloodReq`]="{ item }">
        <v-chip color="redcross" dark>
          <span>{{ item.bloodReq.ABO }}</span>
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn color="teal darken-3" icon @click="editRequest(item)"
          ><v-icon small>fa-pencil-alt</v-icon></v-btn
        >
        <v-dialog v-model="dialogRemove" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >ທ່ານແນ່ໃຈ ທີ່ຈະລົບຄູ່ມືນີ້ບໍ່?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialogRemove = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="red darken-1" text @click="removeRequest(item)"
                >ລົບຄູ່ມືນີ້</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="red accent-3" icon @click="dialogRemove = true"
          ><v-icon small>fa-trash</v-icon></v-btn
        >
        <v-btn color="light-blue darken-1" icon @click="viewRequest(item)"
          ><v-icon small>fa-eye</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import firebase from '@/functions/upload'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'Guide',
  data: () => ({
    headers: [
      {
        text: 'ພາບປົກ',
        value: 'image'
      },
      {
        text: 'ຫົວຂໍ້ການຮ້ອງຂໍ',
        align: 'start',
        value: 'title',
        width: '35%'
      },
      {
        text: 'ກຼຸບເລືອດທີ່ຕ້ອງການ',
        align: 'center',
        value: 'bloodReq'
      },
      {
        text: 'ຈັດການ',
        align: 'center',
        value: 'action'
      }
    ],
    dialogRemove: false
  }),
  mounted() {
    if (!this.isSignIn) {
      return this.$router.push({ path: '/signin' })
    }
    this.notice['alert'] = false
    this.fetchMyRequest(this.donorInfo['_id'])
  },
  computed: {
    ...mapGetters('authSocial', ['isSignIn']),
    ...mapState('request', ['myRequest', 'notice']),
    ...mapState('authSocial', ['donorInfo'])
  },
  methods: {
    ...mapActions('request', ['fetchMyRequest', 'deleteRequest']),
    ...mapMutations('request', ['setCurrRequest']),
    editRequest(item) {
      let id = item._id
      this.setCurrRequest(item)
      if (item) {
        return this.$router.push({
          path: `/edit/request/${id}`
        })
      }
    },
    removeRequest(item) {
      this.dialogRemove = false
      const storageRef = firebase.storage().refFromURL(item.image)

      // Delete the file
      storageRef
        .delete()
        .then(() => {
          // File deleted successfully
          this.deleteRequest(item)
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          let msg = error._baseMessage
          this.$router.push({ path: '/error/404', query: { msg: msg } })
        })
    },
    viewRequest(item) {
      let id = item._id
      this.setCurrRequest(item)
      return this.$router.push({
        path: `/view/request/${id}`
      })
    }
  }
}
</script>
