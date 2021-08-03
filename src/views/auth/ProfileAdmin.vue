<template>
  <v-card max-width="650px" class="mx-auto pa-12">
    <v-row justify="space-around">
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-avatar v-if="!showEdit" color="grey darken-3" size="180">
            <v-img :src="account.image"></v-img>
          </v-avatar>
          <v-avatar v-if="showEdit" color="grey darken-3" size="180">
            <v-img :src="cropProfile"></v-img>
          </v-avatar>
          <v-btn
            v-if="showEdit"
            class="mt-2 redcross"
            dark
            depressed
            rounded
            small
            @click="showUpload = true"
            >ແກ້ໄຂຮູບ</v-btn
          >
        </div>
        <v-dialog v-model="showUpload" max-width="550px">
          <v-card>
            <v-card-title class="text-h5">ອັບໂຫຼດຮູບຂອງທ່ານ</v-card-title>
            <v-card-text>
              <div class="d-flex flex-row justify-center mt-4 mb-4">
                <v-btn
                  class="mr-6"
                  color="redcross"
                  outlined
                  rounded
                  @click="switchShow = true"
                  ><clipper-upload v-model="orgProfile">
                    <v-icon left>fa-file-upload</v-icon
                    >ອັບໂຫຼດຮູບພາບ</clipper-upload
                  ></v-btn
                >
                <v-btn
                  icon
                  class="mr-4"
                  color="amber darken-4"
                  small
                  @click="getResultProfile"
                >
                  <v-icon small>fa-crop-alt</v-icon>
                </v-btn>
              </div>
              <div class="d-flex flex-row justify-space-around">
                <clipper-fixed
                  v-if="switchShow"
                  class="my-clipper"
                  ref="clipper"
                  :src="orgProfile"
                  preview="my-preview"
                  round
                >
                  <div class="placeholder" slot="placeholder"></div>
                </clipper-fixed>
                <div class="d-flex flex-row justify-center">
                  <v-img
                    v-if="!switchShow"
                    class="result"
                    :src="cropProfile"
                    max-width="500"
                    style="border-style: dashed"
                  ></v-img>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="6">
        <div v-if="!showEdit" class="d-flex flex-column">
          <span class="mb-2"
            ><span class="text--secondary mr-3">ຊື່:</span
            >{{ account.firstName }}</span
          >
          <span class="mb-2"
            ><span class="text--secondary mr-3">ນາມສະກຸນ:</span
            >{{ account.lastName }}</span
          >
          <span class="mb-2"
            ><span class="text--secondary mr-3">ອີເມວ:</span
            >{{ account.email }}</span
          >
          <span
            ><span class="text--secondary mr-3">ບັນຊີຜູ້ໃຊ້:</span
            >{{ account.username }}</span
          >
        </div>
        <v-form v-if="showEdit" ref="formProfile">
          <v-text-field
            label="ຊື່"
            v-model="newInfo.firstName"
            color="redcross"
          ></v-text-field>
          <v-text-field
            label="ນາມສະກຸນ"
            v-model="newInfo.lastName"
            color="redcross"
          ></v-text-field>
          <v-text-field
            label="ຊື່ບັນຊີ"
            v-model="newInfo.username"
            color="redcross"
          ></v-text-field>
          <v-text-field
            label="ອີເມວ"
            v-model="newInfo.email"
            color="redcross"
          ></v-text-field>
        </v-form>
        <div>
          <v-btn
            v-if="!showEdit"
            dark
            depressed
            outlined
            small
            color="redcross"
            class="my-6"
            @click="showEdit = true"
            >ອັບເດດຂໍ້ມູນ</v-btn
          >
          <v-btn
            v-if="showEdit"
            dark
            color="green darken-3"
            class="my-6 mr-4"
            @click="callEditProfile"
            >ບັນທຶກການແກ້ໄຂ</v-btn
          >
          <v-btn
            v-if="showEdit"
            dark
            depressed
            color="redcross"
            class="my-6"
            @click="cancelEdit"
            >ຍົກເລີກ</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      showUpload: false,
      showEdit: false,
      orgProfile: null,
      cropProfile: null,
      canavProfile: null,
      switchShow: false,
      newInfo: {}
    }
  },
  mounted() {
    this.cropProfile = this.account['image']
    this.newInfo['firstName'] = this.account['firstName']
    this.newInfo['lastName'] = this.account['lastName']
    this.newInfo['username'] = this.account['username']
    this.newInfo['email'] = this.account['email']
  },
  computed: {
    ...mapState('auth', ['account'])
  },
  methods: {
    getResultProfile: function () {
      this.switchShow = false
      this.canavProfile = this.$refs.clipper.clip() //call component's clip method
      this.cropProfile = this.canavProfile.toDataURL('image/png', 1) //canvas->image
    },
    cancelEdit() {
      this.showEdit = false
      this.$refs.formProfile.reset()
      this.newInfo['firstName'] = this.account['firstName']
      this.newInfo['lastName'] = this.account['lastName']
      this.newInfo['username'] = this.account['username']
      this.newInfo['email'] = this.account['email']
    },
    callEditProfile() {
      console.log(this.newInfo)
    }
  }
}
</script>
