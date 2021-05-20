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
              v-model="username"
              type="text"
              :color="username.length ? 'green darken-1' : 'blue darken-1'"
              :rules="[rules.required]"
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
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :color="password.length >= 8 ? 'green darken-1' : 'blue darken-1'"
              :rules="[rules.required, rules.min]"
              label="Password"
              hint="At least 8 characters."
              placeholder="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
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
<script>
export default {
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 Characters',
      notMatck: () => "The username(email) or password you enterd don't match."
    }
  })
}
</script>
