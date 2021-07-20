<template>
  <v-container class="main-font">
    <main>
      <div class="d-flex flex-row justify-center">
        <div class="col-md-6 align-self-center">
          <div class="text-h1 ma-4">403</div>
          <div class="text-h4">UH OH! Forbidden.</div>
          <p class="pa-4">
            Maybe you have a typo in the url? Or you meant to go to a different
            location? Like...Hobbiton?. But you can click the button below to go
            back to the homepage.
          </p>
          <v-btn class="ma-4 px-4" color="redcross" dark to="/home">Home</v-btn>
        </div>
      </div>
    </main>
  </v-container>
</template>
