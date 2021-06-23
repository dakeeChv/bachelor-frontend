<template>
  <v-container class="main-font">
    <main>
      <div class="d-flex flex-row justify-center">
        <div class="col-md-6 align-self-center">
          <div class="text-h1 ma-4">400</div>
          <div class="text-h4">UH OH! Bad Request.</div>
          <p class="pa-4">
            The server could not understand the request due to invalid syntax.
            But you can click the button below to go back to the homepage.
          </p>
          <v-btn class="ma-4 px-4" color="redcross" dark to="/home">Home</v-btn>
        </div>
      </div>
    </main>
  </v-container>
</template>
