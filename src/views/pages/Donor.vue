<template>
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
      @onComplete="handleOnComplete"
    />
    <v-alert
      v-model="notice.alert"
      class="mt-6"
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
      {{ notice.message }}
    </v-alert>
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
    ...mapGetters('authSocial', ['isSignIn'])
  },
  methods: {
    ...mapActions('donation', ['record']),
    handleOnComplete(value) {
      let val = value.join('')
      // console.log(val)
      this.record(val)
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
