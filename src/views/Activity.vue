<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="activities"
      :items-per-page="5"
      item-key="activityId"
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
          <v-toolbar-title class="text-h5">ກິດຈະກຳ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red accent-4" outlined rounded>
            <v-icon left>fa-plus</v-icon>
            ເພີ່ມກິດຈະກຳ
          </v-btn>
        </v-toolbar>
        <v-toolbar flat>
          <v-row>
            <v-dialog v-model="dialog" persistent max-width="450">
              <template v-slot:activator="{ on, attrs }">
                <v-toolbar-title class="ml-4" v-bind="attrs" v-on="on">
                  <v-icon left>fa-filter</v-icon>Filter</v-toolbar-title
                >
              </template>
              <v-card>
                <v-card-title class="text-h6">
                  ກອງຕົວເລືອກທີ່ຕ້ອງການ
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          color="teal accent-4"
                          label="Picker in Date range"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          flat
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" range>
                        <v-spacer></v-spacer>
                        <v-btn text color="red darken-3" @click="menu = false">
                          ຍົກເລີກ
                        </v-btn>
                        <v-btn
                          text
                          color="teal accent-4"
                          @click="$refs.menu.save(date)"
                        >
                          ເລືອກ
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-row justify="center">
                      <v-col>
                        <v-checkbox
                          v-model="filterStatus"
                          color="red darken-3"
                          label="ສະຖານະເປີດ"
                          value="open"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="filterStatus"
                          color="red darken-3"
                          label="ສະຖານະປິດ"
                          value="close"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-3" text @click="dialog = false">
                    ຍົກເລີກ
                  </v-btn>
                  <v-btn color="green darken-2" text @click="dialog = false">
                    ກອງຂໍ້ມູນ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-toolbar>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <div class="body-2 text-justify">{{ item.title }}</div>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <v-avatar class="ma-2">
          <v-img :src="item.image"></v-img>
        </v-avatar>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          :class="[
            item.status ? 'green darken-2' : 'red darken-3',
            'white--text'
          ]"
        >
          {{ getStatus(item.status) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          small
          :class="[
            !!item.status ? 'teal darken-3' : 'red darken-3',
            'white--text'
          ]"
          icon
        >
          <v-icon small>fa-power-off</v-icon>
        </v-btn>
        <span class="ma-2"> | </span>
        <v-btn color="teal darken-3" icon @click="editActivity(item)">
          <v-icon small>fa-pencil-alt</v-icon>
        </v-btn>
        <v-btn color="red accent-3" icon>
          <v-icon small>fa-trash</v-icon>
        </v-btn>
        <v-btn color="light-blue darken-1" icon>
          <v-icon small>fa-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    date: '',
    menu: null,
    dialog: false,
    filterStatus: [],
    headers: [
      {
        text: 'ພາບຫົວຂໍ້ກິດຈະກຳ',
        value: 'image',
        align: 'start',
        width: '150px'
      },
      {
        text: 'ຫົວຂໍ້ກິດຈະກຳ',
        value: 'title',
        width: '50%'
      },
      {
        text: 'ວັນ/ເວລາ ເລີ່ມງານ',
        value: 'timeStart',
        width: '150px'
      },
      {
        text: 'ວັນ/ເວລາ ສິ້ນສຸດງານ',
        value: 'timeEnd',
        width: '150px'
      },
      {
        text: 'ສະຖານະ',
        value: 'status',
        align: 'center',
        width: '100px'
      },
      {
        text: 'ຈັດການ',
        value: 'action',
        align: 'center',
        width: '100%'
      }
    ],
    activities: [
      {
        activityId: 1,
        title: 'ເພາະການໃຫ້ ໄດ້ຫຼາຍກວ່າທີ່ທ່ານຄິດ',
        latitude: '',
        longtitude: '',
        content:
          'ຂໍເຊີນທຸກໆທ່ານຮ່ວມບໍລິຈາກເລືອດເພື່ອຊ່ວຍເຫຼືອຄົນເຈັບທີ່ນອນປີ່ນປົວຢູ່ຕາມໂຮງໝໍຕ່າງໆທົ່ວປະເທດ🅰️🅱️🅾️🆎',
        image:
          'https://scontent.fvte2-1.fna.fbcdn.net/v/t1.6435-9/188482567_4016023235151891_195435522285531011_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=973b4a&_nc_ohc=umuL-TuHqHwAX-e9_0H&_nc_ht=scontent.fvte2-1.fna&oh=cdcbd2be4819f8350a104f2516c3cbfe&oe=60DB69EB',
        status: true,
        timeStart: new Date(),
        timeEnd: ''
      },
      {
        activityId: 2,
        title: 'COVID-19 ກໍ່ຢ້ານ ແຕ່ການຕອບສະໜອງເລືອດໃຫ້ຄົນເຈັບກໍ່ຈຳເປັນ',
        latitude: '',
        longtitude: '',
        content: `ເລືອດຂອງທ່ານນັ້ນມີຄ່າ ການບໍລິຈາກເລືອດໜື່ງຄັ້ງສາມາດຊ່ວຍເຫຼືອຄົນເຈັບໄດ້ ເຖິງ3ຊີວິດ...
ຂໍເຊີນທຸກໆທ່ານຮ່ວມບໍລິຈາກເລືອດເພື່ອຊ່ວຍເຫຼືອຄົນເຈັບທີ່ນອນປີ່ນປົວຢູ່ຕາມໂຮງໝໍຕ່າງໆທົ່ວປະເທດ🅰️🅱️🅾️🆎

ທ່ານສາມາດບໍລິຈາກເລືອດ🩸ໄດ້ທີ່ :
📍ສູນເລືອດແຫ່ງຊາດ
ຕັ້ງຢູ່ທີ່ ບ້ານຊຽງຍືນ ມ.ຈັນທະບູລີ ນະຄອນຫຼວງວຽງຈັນ
📍ສູນເລືອດແຂວງ ທົ່ວປະເທດ
ສອບຖາມຂໍ້ມູນໂທຣ: 030 548 7539`,
        image:
          'https://scontent.fvte2-2.fna.fbcdn.net/v/t1.6435-9/187391205_4013230398764508_8275543212726410992_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=973b4a&_nc_ohc=FvLY6Dtk4XcAX-vOHqf&_nc_ht=scontent.fvte2-2.fna&oh=e01b91dbf0ec8707115fe37bc57ab073&oe=60D91DED',
        status: true,
        timeStart: '',
        timeEnd: ''
      },
      {
        activityId: 3,
        title:
          'ຂໍເຊີນທຸກທ່ານຮ່ວມໃຈກັນມາ“ບໍລິຈາກເລືອດແບບປອດໄພ ອຸ່ນໃຈທັງຜູ້ໃຫ້ ສຸກໃຈທັງຜູ້ຮັບ',
        latitude: '',
        longtitude: '',
        content: `ເນື່ອງຈາກການລະບາດຂອງເຊື້ອພະຍາດ Covid-19 ຮອບ 2 👿
ສູນເລືອດແຫ່ງຊາດ ແລະ ສູນເລືອດແຂວງທົ່ວປະເທດ
ຂາດເລືອດໜັກ ຂໍເຊີນຊວນຄົນລາວທີ່ມີສຸຂະພາບແຂງແຮງດີບໍລິຈາກເລືອດເພື່ອຊ່ວຍເຫຼືອຄົນເຈັບທີ່ຢູ່ຕາມໂຮງໝໍແຫ່ງຕ່າງໆທົ່ວປະເທດ🅰️🅱️🅾️🆎`,
        image:
          'https://scontent.fvte2-2.fna.fbcdn.net/v/t1.6435-9/186532577_4004733436280871_5491220868238557294_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=973b4a&_nc_ohc=t-Y630SVN68AX_iKPa8&_nc_ht=scontent.fvte2-2.fna&oh=1aa1fec787b703991a69325f0c4eddb2&oe=60D8B140',
        status: false,
        timeStart: '',
        timeEnd: ''
      }
    ]
  }),
  methods: {
    getStatus(status) {
      return status ? 'ເປີດກິດຈະກຳ' : 'ປິດກິດຈະກຳ'
    },
    editAcitivity(item) {
      console.log(item)
    }
  }
}
</script>
