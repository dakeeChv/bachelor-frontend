<template>
  <div>
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
      <v-btn v-if="notice.donorExist" text color="redcross" to="/signin"
        ><v-icon left>fa-arrow-circle-right</v-icon> ໄປທີ່ໜ້າ Sign In</v-btn
      >
    </div>
    <v-row>
      <v-col class="col-md-6 col-sm-12 mx-auto mt-16">
        <v-card flat class="text-center pa-4 rounded-xl">
          <v-toolbar flat>
            <v-toolbar-title class="mx-auto"
              >ສະໝັກ ຫຼື ລົງທະບຽນຜ່ານ</v-toolbar-title
            >
          </v-toolbar>
          <div class="login-choice"><span>Sign Up With</span></div>
          <v-stepper v-model="e1" class="elevation-0">
            <v-stepper-header class="elevation-0">
              <v-stepper-step color="redcross" :complete="e1 > 1" step="1">
                Sign up with Social
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step color="redcross" :complete="e1 > 2" step="2">
                ຂໍ້ມູນສ່ວນບຸກຄົນ
              </v-stepper-step>

              <!-- <v-divider></v-divider>

              <v-stepper-step step="3"> Name of step 3 </v-stepper-step> -->
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form class="my-4">
                  <v-btn outlined rounded @click="signUpWithGoogle"
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
                    ><span class="ml-4">Sign Un with Google</span></v-btn
                  >
                </v-form>

                <!-- <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

                <v-btn text> Cancel </v-btn> -->
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form ref="formSignUp" class="my-4">
                  <v-text-field
                    label="ຊື່"
                    v-model="donorAcc.name"
                    prepend-icon="mdi-pen"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-text-field
                    label="ນາມສະກຸນ"
                    v-model="donorAcc.surname"
                    prepend-icon="mdi-pen"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <div>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="donorAcc.dob"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="donorAcc.dob"
                          label="ປີ-ເດືອນ-ວັນ ເກີດ"
                          prepend-icon="mdi-calendar"
                          readonly
                          filled
                          rounded
                          required
                          color="redcross"
                          :rules="rulesField"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="donorAcc.dob" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(donorAcc.dob)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <v-select
                    v-model="donorAcc.gender"
                    :items="gender"
                    label="ເລືອກເພດ"
                    prepend-icon="fa-genderless"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-select>
                  <v-text-field
                    label="ອາຊີບ"
                    v-model="donorAcc.job"
                    prepend-icon="fa-id-card-alt"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <!-- <v-text-field
                    label="ພາບໂປຣໄຟລ"
                    v-model="donorAcc.image"
                    prepend-icon="fa-image"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field> -->
                  <v-text-field
                    label="ບ້ານຢູ່ ປັດຈຸບັນ"
                    v-model="donorAcc.village"
                    prepend-icon="fa-home"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-text-field
                    label="ເມືອງຢູ່ ປັດຈຸບັນ"
                    v-model="donorAcc.district"
                    prepend-icon="fa-city"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-text-field
                    label="ແຂວງ ຢູ່ປັດຈຸບັນ"
                    v-model="donorAcc.province"
                    prepend-icon="fa-globe-asia"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-text-field
                    label="ເບີໂທຕິດຕໍ່"
                    v-model="donorAcc.tel"
                    prepend-icon="fa-phone"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-text-field
                    label="WhatsApp"
                    v-model="donorAcc.whatsapp"
                    prepend-icon="fab fa-whatsapp"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  ></v-text-field>
                  <v-select
                    v-model="donorAcc.bloodGroup"
                    :items="bloodGroup"
                    item-text="ABO"
                    item-value="_id"
                    label="ເລືອກກຼຸບເລືອດ"
                    chips
                    prepend-icon="fa-tint"
                    filled
                    rounded
                    required
                    color="redcross"
                    :rules="rulesField"
                  >
                    <template v-slot:selection="{ item }">
                      <v-chip>
                        <span>{{ item.ABO }}</span>
                      </v-chip>
                    </template></v-select
                  >
                </v-form>

                <v-btn
                  dark
                  depressed
                  rounded
                  color="redcross"
                  @click="SignUpNewDonor"
                >
                  Sign Up
                </v-btn>

                <v-btn text @click="e1 = 1"> Cancel </v-btn>
              </v-stepper-content>

              <!-- <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

                <v-btn text> Cancel </v-btn>
              </v-stepper-content> -->
            </v-stepper-items>
          </v-stepper>
          <v-divider class="mt-4 mb-4"></v-divider>
          <div class="text--primary">
            ຖ້າຫາກທ່ານມີ ການລົງທະບຽນຢູ່ແລ້ວ <br />
            ສາມາດເຂົ້າສູ່ລະບົບທີ່ໜ້າ
            <router-link class="ml-2 redcross--text" to="/signin"
              ><v-icon color="redcross" small left>fa-arrow-right</v-icon>Sign
              In</router-link
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
// donorId: String,
//     name: String,
//     surname: String,
//     dob: String,
//     gender: String,
//     job: String,
//     image: String,
//     village: String,
//     district: String,
//     province: String,
//     tel: Number,
//     whatsapp: Number,
//     bloodGroup: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'bloodgroup'
//     },
export default {
  data: () => ({
    e1: 1,
    rulesField: [(v) => !!v || 'ກະລຸນາໃສ່ຂໍ້ມູນ'],
    dob: '',
    menu: false,
    gender: ['ເພດຊາຍ', 'ເພດຍິງ', 'ອື່ນໆ']
    // selectBlood: {}
    // bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  }),
  mounted() {
    this.fetchBloodGroup()
    this.notice['alert'] = false
    this.notice['donorExist'] = false
    this.notice['message'] = ''
  },
  computed: {
    ...mapState('authSocial', ['donorAcc', 'notice']),
    ...mapState('bloodGroup', ['bloodGroup'])
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    ...mapActions('authSocial', ['signUpDonor']),
    ...mapActions('bloodGroup', ['fetchBloodGroup']),
    ...mapMutations('authSocial', ['setIdToken']),
    signUpWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          // on success do something
          // console.log('GoogleUser', GoogleUser)
          // let donorAcc = {
          //   loginType: 'google',
          //   google: GoogleUser
          // }
          let id_token = GoogleUser.getAuthResponse().id_token
          // console.log(id_token)
          // console.log(GoogleUser.getAuthResponse())
          this.setIdToken(id_token)
          this.e1 = 2
          // this.signInGoogle()
          // router.push('/home')
          // console.log(this.donorAcc)
        })
        .catch((error) => {
          console.log('error', error)
        })
      // console.log(this.$gAuth.isAuthorized)
      // this.setIsAuthorized(this.$gAuth.isAuthorized)
      // console.log(this.isSignIn)
    },
    SignUpNewDonor() {
      // console.log(this.donorAcc)
      let valid = this.$refs.formSignUp.validate()
      if (valid) {
        this.signUpDonor()
        // this.setdonorAcc({})
        let alertEle = this.$refs['alert']
        let top = alertEle.offsetTop
        window.scrollTo(0, top)
        this.$refs.formSignUp.resetValidation()
        return (this.e1 = 1)
      }
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
