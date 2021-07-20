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
      :items="allRequestAdm"
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
          <v-toolbar-title class="text-h5">ລາຍງານການຮ້ອງຂໍ</v-toolbar-title>
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
      <template v-slot:[`item.status`]="{ item }">
        <v-dialog
          v-model="dialogStatus"
          max-width="500px"
          :retain-focus="false"
        >
          <v-card>
            <v-card-title class="text-h5"
              >ທ່ານແນ່ໃຈ ທີ່ຈະແກ້ໄຂບໍ່?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialogStatus = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="red darken-1" text @click="comfirmEditAllowed()"
                >ແກ້ໄຂສະຖານະ</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-chip
          @click="editAllowed(item)"
          :class="[
            item.allowed ? 'green darken-2' : 'red darken-3',
            'white--text'
          ]"
        >
          {{ Allowed(item.allowed) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <!-- <v-dialog
          v-model="dialogRemove"
          max-width="500px"
          :retain-focus="false"
        >
          <v-card>
            <v-card-title class="text-h5"
              >ທ່ານແນ່ໃຈ ທີ່ຈະລົບຄູ່ມືນີ້ບໍ່?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialogRemove = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="red darken-1" text @click="comfirmRemoveRquest()"
                >ລົບການຮ້ອງຂໍນີ້</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="red accent-3" icon @click="removeRequest(item)"
          ><v-icon small>fa-trash</v-icon></v-btn
        > -->
        <v-btn color="light-blue darken-1" icon @click="viewRequest(item)"
          ><v-icon small>fa-eye</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
// import firebase from '@/functions/upload'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'MyRequest',
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
        text: 'ລະຫັດ',
        value: 'verifyCode'
      },
      {
        text: 'ສະຖານະ',
        value: 'status',
        align: 'center'
      },
      {
        text: 'ຈັດການ',
        align: 'center',
        value: 'action'
      }
    ],
    dialogRemove: false,
    dialogStatus: false
  }),
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({
        path: '/redcross/login'
      })
    }
    this.fetchAllRequest()
  },
  computed: {
    ...mapState('request', ['allRequestAdm', 'notice', 'currRequest']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('request', [
      'fetchAllRequest',
      'editRequest',
      'deleteRequest'
    ]),
    ...mapMutations('request', ['setCurrRequest']),
    Allowed(status) {
      return status ? 'ອະນຸຍາດເຜີຍແຜ່' : 'ປິດໄວ້'
    },
    editAllowed(item) {
      this.dialogStatus = true
      this.setCurrRequest(item)
    },
    comfirmEditAllowed() {
      this.dialogStatus = false
      this.currRequest['allowed'] = !this.currRequest['allowed']
      this.editRequest()
    },
    // removeRequest(item) {
    //   // console.log(item['title'])
    //   this.dialogRemove = true
    //   this.setCurrRequest(item)
    // },
    // comfirmRemoveRquest() {
    //   this.dialogRemove = false
    //   // console.log(this.currRequest['title'])
    //   const storageRef = firebase
    //     .storage()
    //     .refFromURL(this.currRequest['image'])

    //   // Delete the file
    //   storageRef
    //     .delete()
    //     .then(() => {
    //       // File deleted successfully
    //       this.deleteRequest(this.currRequest)
    //     })
    //     .catch((error) => {
    //       // Uh-oh, an error occurred!
    //       let msg = error._baseMessage
    //       this.$router.push({ path: '/error/404', query: { msg: msg } })
    //     })
    // },
    viewRequest(item) {
      // console.log(item['title'])
      let id = item._id
      this.setCurrRequest(item)
      return this.$router.push({
        path: `/view/request/${id}`
      })
    }
  }
}
</script>
