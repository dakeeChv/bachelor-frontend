<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="ListDonor.DonorList"
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
      <template v-slot:[`item.bloodGroup`]="{ item }">
        <v-chip dark color="redcross">{{
          getBloodGroup(item['bloodGroup'])
        }}</v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="red accent-3" icon @click="viewDonor(item)"
          ><v-icon small>fa-eye</v-icon></v-btn
        >
        <v-dialog
          v-model="dialogDetail"
          max-width="500px"
          :retain-focus="false"
        >
          <v-card class="pa-4">
            <v-card-title class="text-h5">ລາຍລະອຽດ</v-card-title>
            <v-card-text>
              <div>
                ຊື່ ແລະ ນາມສະກຸນ: {{ selected.name }} {{ selected.surname }}
              </div>
              <div>
                ອາຍຸ: {{ getAge(selected.dob) }} | ເພດ: {{ selected.gender }} |
                ອາຊີບ: {{ selected.job }}
              </div>
              <div>
                ທີ່ຢູ່: {{ selected.village }}, {{ selected.district }},
                {{ selected.province }}
              </div>
              <div>
                WhatsApp: {{ selected.whatsapp }}, Tel: {{ selected.tel }}
              </div>
              <div>
                ກຸບເລືອດ:
                <v-chip dark color="redcross">{{
                  getBloodGroup(item['bloodGroup'])
                }}</v-chip>
              </div>
            </v-card-text>
            <div class="text-center">
              <v-btn dark color="red lighten-1" @click="dialogDetail = false"
                >ຕົກລົງ</v-btn
              >
            </div>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:top>
        <v-toolbar class="mb-4" flat>
          <v-toolbar-title class="text-h5">ຜູ້ບໍລິຈາກທັງໝົດ</v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="d-flex flex-column mt-6 pa-md-6 pa-sm-4">
            <div>
              <span class="text--secondary"
                ><v-icon color="redcross" x-small left>fa-calendar-day</v-icon
                >ກິດຈະກຳ:</span
              >
              {{ ListDonor.activity }}
            </div>
            <div>
              <span class="text--secondary"
                ><v-icon color="red" left x-small>fa-map-marker-alt</v-icon
                >ສະຖານທີ່:</span
              >
              {{ ListDonor.address }}
            </div>
            <div>
              <span class="text--secondary"
                ><v-icon left color="redcross" x-small>fa-restroom</v-icon
                >ຜູ້ບໍລິຈາກ:</span
              >
              {{ ListDonor.countDonor }}
            </div>
          </div>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'ຊື່',
          align: 'start',
          value: 'name'
        },
        {
          text: 'ນາມສະກຸນ',
          value: 'surname'
        },
        {
          text: 'ກຸບເລືອດ',
          value: 'bloodGroup'
        },
        {
          text: 'ທີ່ຢູ່',
          value: 'village'
        },
        {
          text: 'WhatApp',
          value: 'whatsapp'
        },
        {
          text: 'ລາຍລະອຽດ',
          value: 'actions'
        }
      ],
      dialogDetail: false,
      selected: {}
    }
  },
  computed: {
    ...mapState('dashboard', ['ListDonor'])
  },
  methods: {
    viewDonor(donor) {
      this.dialogDetail = true
      this.selected = donor
    },
    getBloodGroup(item) {
      switch (item) {
        case '60e92a8a45a30c2d84878c4c':
          return 'A-'
        case '60e92a3545a30c2d84878c4b':
          return 'A+'
        case '60e92a9545a30c2d84878c4e':
          return 'B-'
        case '60e92a9145a30c2d84878c4d':
          return 'B+'
        case '60e92aa145a30c2d84878c50':
          return 'O-'
        case '60e92a9c45a30c2d84878c4f':
          return 'O+'
        case '60e92aac45a30c2d84878c52':
          return 'AB-'
        case '60e92aa745a30c2d84878c51':
          return 'AB+'
        default:
          return '---'
      }
    },
    getAge(dob) {
      let ageDifMs = new Date() - new Date(dob)
      let ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
  }
}
</script>
