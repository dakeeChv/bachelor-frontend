<template>
  <v-card>
    <v-tabs color="red accent-4" centered>
      <v-tab>ຮ່ວມບໍລິຈາກໃນງານກີດຈະກຳ</v-tab>
      <v-tab>ຊ່ວຍບໍລິຈາກເລືອດສຸກເສີນ</v-tab>
      <v-tab-item>
        <v-container fluid>
          <v-card flat class="mx-auto pa-md-12 pa-6" max-width="700px">
            <v-row justify="center">
              <v-avatar tile size="100px">
                <v-img
                  src="https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2Fblood-bag.png?alt=media&token=cfb14687-c933-41cb-bd11-679e3b0eb958"
                ></v-img>
              </v-avatar>
            </v-row>
            <v-toolbar flat>
              <v-toolbar-title class="mx-auto"
                >ປ້ອນລະຫັດງານ ເພື່ອບັນທຶກການເຂົ້າຮ່ວມບໍລິຈາກ</v-toolbar-title
              >
            </v-toolbar>
            <v-divider class="mb-4"></v-divider>
            <vue-otp-2
              class="input-code"
              length="6"
              join-character="-"
              @onComplete="handleOnCompleteA"
            />
            <v-alert
              v-model="notice.alert"
              class="mt-6"
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
              dismissible
            >
              {{ notice.message }}
            </v-alert>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-card flat class="mx-auto pa-md-12 pa-6" max-width="700px">
            <v-row justify="center">
              <v-avatar tile size="100px">
                <v-img
                  src="https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2Fblood-bag.png?alt=media&token=cfb14687-c933-41cb-bd11-679e3b0eb958"
                ></v-img>
              </v-avatar>
            </v-row>
            <v-toolbar flat>
              <v-toolbar-title class="mx-auto"
                >ປ້ອນລະຫັດງານ
                ເພື່ອບັນທຶກການເຂົ້າຮ່ວມບໍລິຈາກສຸກເສີນ</v-toolbar-title
              >
            </v-toolbar>
            <v-divider class="mb-4"></v-divider>
            <vue-otp-2
              class="input-code"
              length="6"
              join-character="-"
              @onComplete="handleOnCompleteB"
            />
            <v-alert
              v-model="notice.alert"
              class="mt-6"
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
              dismissible
            >
              {{ notice.message }}
            </v-alert>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  mounted() {
    if (!this.isSignIn) {
      return this.$router.push({ path: '/signin' })
    }
    this.notice['alert'] = false
    this.notice['message'] = ''
  },
  computed: {
    ...mapState('donation', ['notice']),
    ...mapState('authSocial', ['donorInfo']),
    ...mapGetters('authSocial', ['isSignIn'])
  },
  methods: {
    ...mapActions('donation', ['record', 'emergencyRecord']),
    handleOnCompleteA(value) {
      let verifyCode = value.join('')
      let donorId = this.donorInfo['_id']
      // console.log(donorId)
      this.record({ verifyCode, donorId })
    },
    handleOnCompleteB(value) {
      let verifyCode = value.join('')
      let donorId = this.donorInfo['_id']
      this.emergencyRecord({ verifyCode, donorId })
    }
    // handleOnChange(obj) {
    //   if (typeof parseInt(obj['value']) === 'number' ) {
    //     console.log(typeof parseInt(obj['value']))
    //     console.log((obj['value']))
    //   }
    //   // if (typeof value)
    // }
  }
}
</script>
<style scoped>
.vue-otp-2.input-code >>> input {
  max-width: 45px;
}
</style>
