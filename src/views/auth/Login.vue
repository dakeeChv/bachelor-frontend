<template>
  <v-container>
    <v-row>
      <v-col class="col-md-6 col-sm-12 mx-auto mt-16">
        <v-card flat>
          <v-toolbar color="red darken-3" dark dense flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-form class="my-4 pa-6">
            <v-text-field
              type="text"
              color="red darken-2"
              label="Username Or Email Address"
              placeholder="Username or Email"
              prepend-icon="mdi-account"
              hint="We'll never share your username or email with anyone else."
              persistent-hint
              light
              outlined
            ></v-text-field>
            <v-text-field
              class="mt-2"
              type="password"
              color="red darken-2"
              label="Password"
              placeholder="Password"
              prepend-icon="mdi-lock"
              light
              outlined
            ></v-text-field>
            <div class="text-center">
              <v-btn color="red accent-4" class="px-8 py-4 white--text">
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
