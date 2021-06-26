<template>
  <v-card tile flat class="mx-auto" width="800px" max-height="800px">
    <v-tabs
      v-model="tab"
      background-color="red accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-login">
        ເຂົ້າສູ່ລະບົບ
        <v-icon>fa-sign-in-alt</v-icon>
      </v-tab>

      <v-tab href="#tab-register">
        ສ້າງບັນຊີ
        <v-icon>fa-user-circle</v-icon>
      </v-tab>
    </v-tabs>
    <!-- <div class="d-flex flex-row">
      <div class="d-flex align-center mx-6">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2F36235389_1765790556841848_1634414186329014272_n.jpg?alt=media&token=268291c6-0f7f-4b70-9c99-8ac104a067d6"
          width="200px"
        ></v-img>
      </div> -->

    <!-- <v-card flat tile width="500px"> -->
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-register">
        <v-row class="ma-6">
          <v-col>
            <v-form ref="formRegister">
              <v-text-field
                v-model="account.username"
                :rules="usernameRules"
                label="ຊື່ບັນຊີຜູ້ໃຊ້"
                dense
                filled
                rounded
              ></v-text-field>
              <v-text-field
                v-model="account.email"
                :rules="emailRules"
                label="ອີເມວ"
                dense
                filled
                rounded
              ></v-text-field>
              <v-text-field
                v-model="account.firstName"
                :rules="firstNameRules"
                label="ຊື່"
                dense
                filled
                rounded
              ></v-text-field>
              <v-text-field
                v-model="account.lastName"
                :rules="lastNameRules"
                label="ນາມສະກຸນ"
                dense
                filled
                rounded
              ></v-text-field>
              <v-text-field
                v-model="account.password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="ລະຫັດຜ່ານ"
                dense
                filled
                rounded
              ></v-text-field>
              <div class="d-flex justify-center">
                <v-btn
                  class="px-8 py-6"
                  color="redcross"
                  depressed
                  rounded
                  dark
                >
                  ສ້າງບັນຊີ
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="tab-login">
        <v-row class="ma-6">
          <v-col cols="6">
            <v-img
              class="mx-auto"
              contain
              src="https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2F36235389_1765790556841848_1634414186329014272_n.jpg?alt=media&token=268291c6-0f7f-4b70-9c99-8ac104a067d6"
              width="250px"
            ></v-img>
          </v-col>
          <v-col cols="6">
            <v-form ref="formLogin">
              <v-text-field
                label="ຊື່ບັນຊີຜູ້ໃຊ້"
                v-model="loginAcc.username"
                :rules="usernameRules"
                color="redcross"
                filled
                rounded
              ></v-text-field>
              <v-text-field
                v-model="loginAcc.password"
                :rules="passwordRules"
                color="redcross"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="ລະຫັດຜ່ານ"
                filled
                rounded
                required
              ></v-text-field>
              <div class="d-flex justify-center">
                <v-btn
                  class="px-8 py-6"
                  color="redcross"
                  depressed
                  rounded
                  dark
                  @click="callLogin"
                >
                  ເຂົ້າສູ່ລະບົບ
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
    <!-- </v-card> -->
    <!-- </div> -->
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      usernameRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຊື່ບັນຊີ',
        (v) => (v && v.length <= 20) || 'ຊື່ບໍ່ຄວນຍາວເກີນໄປ'
      ],
      emailRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ອີເມວ',
        (v) => /.+@.+/.test(v) || 'ກະລຸນາກວດສອບຄວາມຖືກຕ້ອງ'
      ],
      firstNameRules: [(v) => !!v || 'ກະລຸນາໃສ່ຊື່'],
      lastNameRules: [(v) => !!v || 'ກະລຸນາໃສ່ນາມສະກຸນ'],
      passwordRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ລະຫັດຜ່ານ',
        (v) => {
          if (v != null && v.length >= 6) {
            return true
          } else {
            return 'ລະຫັດຜ່ານຄວນ 6 ຕົວຂື້ນໄປ'
          }
        }
      ],
      showPassword: false,
      tab: null
    }
  },
  computed: {
    ...mapState('auth', ['account', 'loginAcc', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    callLogin() {
      let valid = this.$refs.formLogin.validate()
      // console.log(valid)
      if (valid) {
        // return true
        this.login()
      }
      // this.login()
      // console.log(this.account)
    }
  }
}
</script>
