<template>
  <div class="SignIn">
    <!-- <h1 class="subheading grey--text">Sign In</h1> -->

    <v-container fill-height="fill-height">
      <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="login-form text-xs-center"> 
          <div class="display-1 mb-3">
            <v-icon class="mr-2" large="large">mdi-music</v-icon> Musicos
          </div>
          <v-card light="light">
            <v-card-text>
              <div class="subheading">
                <template>Sign in</template>
              </div>
              <v-form>
                <v-text-field v-model="user.email" light="light" prepend-icon="email" label="Email" type="email"></v-text-field>
                <v-text-field v-model="user.password" light="light" prepend-icon="lock" label="Password" type="password"></v-text-field>
                <v-btn block="block" type="submit" @click="enterWebSite()">Sign in</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <div>Don't have an account?
            <v-btn light="light" @click="goToSignUp()">Sign up</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    
  </div>
</template>

<script>
// Will be a modal later
export default {
  data() {
    return  {
      user: {
        // email: 'admin@example.com',
        // password: 'admin',
        // name: 'John Doe',
      },
      options: {
        // isLoggingIn: true,
        // shouldStayLoggedIn: true,
      },
    }
  },
  methods:{
    goToSignUp(){
      console.log('signup')
      this.$router.push('signUp')
    },
    enterWebSite(){
      this.$router.push('mySongs')
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
</style>