<template>
  <v-card class="py-6">
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
    <!-- ຫົວຂໍ້ start -->
    <v-toolbar flat class="mx-6 mb-6">
      <v-toolbar-title class="text-h5"> ແກ້ໄຂກິດຈະກຳ</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- ຫົວຂໍ້ end -->
    <!-- ຟອມ start -->
    <v-form ref="formActivity">
      <v-row justify="center">
        <v-col md="5" sm="12">
          <v-text-field
            v-model="currActivity.title"
            prepend-icon="fa-calendar-day"
            label="ຫົວຂໍ້ກິດຈະກຳ"
            color="redcross"
            prefix=" "
            :rules="titleRules"
            counter="150"
            required
          ></v-text-field>
          <v-radio-group v-model="currActivity.status">
            <template v-slot:label>
              <div><strong>ກຳນົດສະຖານະຂອງກິດຈະກຳ</strong></div>
            </template>
            <v-radio color="redcross" :value="true">
              <template v-slot:label>
                <div>ສະແດງສາທາລະນະທັນທີ</div>
              </template>
            </v-radio>
            <v-radio color="redcross" :value="false">
              <template v-slot:label>
                <div>ເຊື່ອງໄວ້</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col md="5" sm="12">
          <v-date-picker
            v-model="currActivity.dateAt"
            color="red accent-4"
            multiple
            full-width
          ></v-date-picker>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col md="4">
          <v-dialog
            ref="dialogOfStart"
            v-model="dialogOfStart"
            :return-value.sync="currActivity.timeStart"
            persistent
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="currActivity.timeStart"
                label="ເລືອກເວລາເລີ່ມງານ"
                color="redcross"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="timeStartRules"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="dialogOfStart"
              v-model="currActivity.timeStart"
              landscape
            >
              <v-spacer></v-spacer>
              <v-btn text color="redcross" @click="dialogOfStart = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                text
                color="redcross"
                @click="$refs.dialogOfStart.save(currActivity.timeStart)"
                >ຕົກລົງ</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col md="4">
          <v-dialog
            ref="dialogOfEnd"
            v-model="dialogOfEnd"
            :return-value.sync="currActivity.timeEnd"
            persistent
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="currActivity.timeEnd"
                label="ເລືອກເວລາສິ້ນສຸດງານ"
                color="redcross"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="timeEndRules"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="dialogOfEnd"
              v-model="currActivity.timeEnd"
              landscape
            >
              <v-spacer></v-spacer>
              <v-btn text color="redcross" @click="dialogOfEnd = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                text
                color="redcross"
                @click="$refs.dialogOfEnd.save(currActivity.timeEnd)"
                >ຕົກລົງ</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around" class="px-4">
        <v-col cols="12" md="11" sm="12">
          <!-- <ckeditor
            :editor="editor"
            v-model="newPost.content"
            :config="editorConfig"
          ></ckeditor> -->
          <v-btn v-if="contentRules" text class="mr-4" color="redcross" small>
            ກະລຸນາໃສ່ເນື້ອຫາຂ່າວ
          </v-btn>
          <ceditor
            :content.sync="currActivity.content"
            @onInput="(c) => (this.currActivity['content'] = c)"
          />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          dark
          color="green darken-3"
          class="my-6 mr-4"
          @click="callEditActivity"
          >ບັນທຶກ</v-btn
        >
        <v-btn dark depressed color="redcross" class="my-6" @click="goBack"
          >ຍົກເລີກ</v-btn
        >
      </v-row>
    </v-form>
    <v-overlay :value="notice.pending">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>
<script>
import ceditor from '@/components/editor'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  components: {
    ceditor
  },
  data() {
    return {
      //   dateAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //     .toISOString()
      //     .substr(0, 10),
      dialogOfStart: false,
      //   timeStart: null,
      dialogOfEnd: false,
      //   timeEnd: null,
      //   status: false,

      //validate
      titleRules: [
        (v) => !!v || 'ກະລຸນາໃສ່ຫົວຂໍ້ງານກິດຈະກຳ',
        (v) => (v && v.length <= 150) || 'ຫົວຂໍ້ງານກິດຈະກຳທີ່ບໍ່ຄວນຍາວເກີນໄປ'
      ],
      dateAtRules: [(v) => !!v || 'ກະລຸນາໃສ່ວັນທີ່ເລີ່ມກິດຈະກຳ'],
      timeStartRules: [(v) => !!v || 'ກະລຸນາໃສ່ເວລາເລີ່ມກິດຈະກຳ'],
      timeEndRules: [(v) => !!v || 'ກະລຸນາໃສ່ເວລາສີ້ນສຸດກິດຈະກຳ'],
      contentRules: false
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push({ path: '/login' })
    }
  },
  computed: {
    // ...mapState('address', ['currAddress']),
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('activity', ['currActivity', 'notice'])
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    ...mapActions('activity', ['editActivity']),
    callEditActivity() {
      let valid = this.$refs.formActivity.validate()
      if (!valid || !this.currActivity['content']) {
        this.contentRules = true
        return
      }
      this.editActivity()
      //   console.log(this.currActivity)
      let alertEle = this.$refs['alert']
      var top = alertEle.offsetTop
      window.scrollTo(0, top)
    }
  }
}
</script>
