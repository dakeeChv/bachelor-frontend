<template>
  <div>
    <v-card flat color="#f7f7f7">
      <div class="text-h5 font-weight-bold text-center pa-4 mb-6">
        ທ່ານສາມາດຊ່ວຍບໍລິຈາກເລືອດຂອງທ່ານດ້ວຍຄວາມສະໝັກໃຈ
      </div>
    </v-card>
    <v-row class="mx-auto">
      <v-col
        v-for="request in listRequestCli"
        :key="request._id"
        cols="12"
        md="4"
      >
        <v-card max-width="374">
          <v-img height="250" :src="request.image"></v-img>

          <v-card-text class="d-flex flex-row">
            <v-avatar tile size="25" class="mr-2"
              ><v-img :src="request['requestor']['image']"></v-img>
            </v-avatar>
            <div>
              {{ request['requestor']['name'] }}
              {{ request['requestor']['surname'] }}
            </div>
          </v-card-text>

          <v-card-title>{{ request.title }}</v-card-title>

          <v-divider class="mx-4"></v-divider>

          <!-- <v-card-title>ກຼຸບເລືອດທີ່ຕ້ອງການ</v-card-title> -->

          <v-card-text class="d-flex justify-space-between">
            <v-chip color="redcross" dark>{{
              request['bloodReq']['ABO']
            }}</v-chip>
            <v-btn
              color="red lighten-1"
              text
              dark
              @click="viewRequest(request)"
            >
              ລາຍລະອຽດ
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  mounted() {
    let donorId = this.donorInfo._id
    let bloodGroup = this.donorInfo['bloodGroup']['_id']
    this.fetchFromAnother({ donorId, bloodGroup })
  },
  computed: {
    ...mapState('authSocial', ['donorInfo']),
    ...mapState('request', ['listRequestCli'])
  },
  methods: {
    ...mapActions('request', ['fetchFromAnother']),
    ...mapMutations('request', ['setCurrRequest']),
    viewRequest(item) {
      let id = item._id
      this.setCurrRequest(item)
      return this.$router.push({
        path: `/view/request/${id}`
      })
    }
  }
}
</script>
