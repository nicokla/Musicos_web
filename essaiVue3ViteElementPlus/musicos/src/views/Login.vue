<template>
<!-- Source :
  https://github.com/davidgrzyb/tailwind-auth-template -->
  <div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
      <!-- Login Section -->
      <div class="w-full md:w-1/2 flex flex-col">
        <!-- <div
          class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24 rounded-md">
          <a href="#" class="bg-black text-white font-bold text-xl p-4">Musicos</a>
        </div> -->

        <div
          class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p class="text-center text-3xl">Log in</p>
          <form
            class="flex flex-col pt-3 md:pt-8"
            onsubmit="event.preventDefault();">
            <div class="flex flex-col pt-4">
              <label for="email" class="text-lg">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                v-model="user.email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Password</label>
              <input
                type="password"
                id="password"
                v-model="user.password"
                placeholder="Password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex p-2 pl-0 mt-2 items-center">
              <input type="checkbox" v-model="options.shouldStayLoggedIn">
              <label for="checkbox" class="ml-1.5">Stay logged in?</label>
            </div>
            <input
              type="submit"
              value="Log in"
              class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-4"
              style="cursor: pointer;"
              @click="login()"/>
          </form>
          <div class="text-center pt-12 pb-12">
            <p>
              Don't have an account?
              <router-link class="underline font-semibold" :to="{name:'Register'}">Register here.</router-link>
            </p>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"/>
      </div>
    </div>
  </div>
</template>

<script>

import {firebase, logOut, isLoggedIn, setupShouldStayLoggedIn} from '../firebase/db'

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
        shouldStayLoggedIn: JSON.parse(localStorage.getItem("shouldStayLoggedIn")),
      },
    }
  },
  async mounted(){
    this.detectIfConnected()
    setupShouldStayLoggedIn()
	},
  methods:{
    detectIfConnected(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user && isLoggedIn()) {
          console.log('user!!', user)
          localStorage.setItem("shouldLogIn", "true")
          this.$router.push({name:'MySongs'})
        } else {
          localStorage.removeItem("shouldLogIn")
          // this.$router.push('signIn')
        }
      });
    },
    goToSignUp(){
      console.log('signup')
      this.$router.push({name:'Register'})
    },
    enterWebSite(){
      this.$router.push({name:'MySongs'})
    },
    async login(){
      localStorage.setItem("shouldStayLoggedIn", JSON.stringify(this.options.shouldStayLoggedIn))

      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
        this.enterWebSite()
      }).catch((error) => {
        alert(error.message);
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
