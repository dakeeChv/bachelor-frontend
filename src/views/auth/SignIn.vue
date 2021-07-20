<template>
  <v-container>
    <div class="text-center">
      <v-alert
        ref="alert"
        class="mx-auto"
        v-model="notice.alert"
        border="left"
        close-text="Close Alert"
        type="warning"
        width="50%"
        dark
        dismissible
      >
        {{ notice.message }}
      </v-alert>
      <v-btn v-if="notice.alert" text color="redcross" to="/signup"
        ><v-icon left>fa-arrow-circle-right</v-icon> ໄປທີ່ໜ້າ Sign Up</v-btn
      >
    </div>
    <v-row>
      <v-col class="col-md-6 col-sm-12 mx-auto mt-16">
        <v-card flat class="text-center pa-4 rounded-xl">
          <v-toolbar flat>
            <v-toolbar-title class="mx-auto">ເຂົ້າສູ່ລະບົບດ້ວຍ</v-toolbar-title>
          </v-toolbar>
          <div class="login-choice"><span>Sign In With</span></div>
          <v-form class="mt-6">
            <v-btn depressed rounded @click="signInWithGoogle"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
              >
                <title>Google</title>
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
                  ></path>
                  <path
                    fill="#EA4335"
                    d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
                  ></path>
                </g></svg
              ><span class="ml-4">Sign In with Google</span></v-btn
            >
          </v-form>
          <v-divider class="mt-12 mb-4"></v-divider>
          <div class="text--primary">
            ຖ້າຫາກທ່ານບໍ່ມີ ຫຼື ບໍ່ໄດ້ລົງທະບຽນ <br />
            ສາມາດເຂົ້າລົງທະບຽນທີ່ໜ້າ
            <router-link class="ml-2 redcross--text" to="/signup"
              ><v-icon color="redcross" small left>fa-arrow-right</v-icon>Sign
              Up</router-link
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data: () => ({}),
  mounted() {
    this.notice['alert'] = false
    this.notice['donorExist'] = false
    this.notice['message'] = ''
  },
  computed: {
    ...mapState('authSocial', ['notice'])
  },
  methods: {
    ...mapActions('authSocial', ['signInDonor']),
    ...mapMutations('authSocial', ['setIdToken', 'setExpires']),
    signInWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          // on success do something
          // console.log('GoogleUser', GoogleUser)
          // var userInfo = {
          //   loginType: 'google',
          //   google: GoogleUser
          // }
          let id_token = GoogleUser.getAuthResponse().id_token
          let expires_at = GoogleUser.getAuthResponse().expires_at
          this.setExpires(expires_at)
          // console.log(id_token)
          // console.log(GoogleUser.getAuthResponse())
          this.setIdToken(id_token)

          // router.push('/home')
          this.signInDonor()
          let alertEle = this.$refs['alert']
          let top = alertEle.offsetTop
          window.scrollTo(0, top)
        })
        .catch((error) => {
          console.log('error', error)
        })
      // console.log(this.$gAuth.isAuthorized)
      // this.setIsAuthorized(this.$gAuth.isAuthorized)
      // console.log(this.isSignIn)
    }
  }
}
</script>
<style scoped>
.login-choice span {
  color: #5b6987;
  /* color: #B71C1C; */
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
  content: '';
  border-top: 1px solid #b71c1c;
}
</style>
