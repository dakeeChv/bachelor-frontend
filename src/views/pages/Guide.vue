<template>
  <div>
    <v-card>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5" v-text="dfddf"></v-card-title>

          <v-card-subtitle v-text="dsfdf"></v-card-subtitle>

          <v-card-actions>
            <v-btn class="ml-2 mt-3" fab icon height="40px" right width="40px">
              <v-icon>mdi-play</v-icon>
            </v-btn>

            <v-btn class="ml-2 mt-5" outlined rounded small>
              START RADIO
            </v-btn>
          </v-card-actions>
        </div>

        <v-avatar class="ma-3" size="125" tile>
          <v-img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdocs.servicestack.net%2Ftemplates-vuetify&psig=AOvVaw0XVJuMaPlx0pS0ZPjkqdyF&ust=1624615269988000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPDMr9OBsPECFQAAAAAdAAAAABAD"
          ></v-img>
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
