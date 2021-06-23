<template>
  <v-container class="main-font">
    <main>
      <div class="d-flex flex-row justify-center">
        <div class="col-md-6 align-self-center">
          <div class="text-h1 ma-4">408</div>
          <div class="text-h4">Request Timeout !</div>
          <p class="pa-4">
            The client did not produce a request within the time that the server
            was prepared to wait. The client MAY repeat the request without
            modifications at any later time. But you can click the button below
            to go back to the homepage.
          </p>
          <v-btn class="ma-4 px-4" color="redcross" dark to="/home">Home</v-btn>
        </div>
      </div>
    </main>
  </v-container>
</template>
