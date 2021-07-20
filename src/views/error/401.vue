<template>
  <v-container class="main-font">
    <main>
      <div class="d-flex flex-row justify-center">
        <div class="col-md-6 align-self-center">
          <div class="text-h1 ma-4">401</div>
          <div class="text-h4">UH OH! Access denied.</div>
          <p class="pa-4">
            this response means "unauthenticated". That is, the client must
            authenticate itself to get the requested response. But you can click
            the button below to go back to the homepage.
          </p>
          <v-btn class="ma-4 px-4" color="redcross" dark to="/redcross/login"
            >Back to Login</v-btn
          >
        </div>
      </div>
    </main>
  </v-container>
</template>
