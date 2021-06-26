<template>
  <v-container class="main-font">
    <main>
      <div class="d-flex flex-row justify-center">
        <div class="col-md-6 align-self-center">
          <div class="text-h1 ma-4">404</div>
          <p class="text-center ma-2">{{ $route.query.msg }}</p>
          <div class="text-h4">UH OH! Not Found</div>
          <p class="pa-4">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <v-btn class="ma-4 px-4" color="redcross" dark to="/home">Home</v-btn>
        </div>
      </div>
    </main>
  </v-container>
</template>
