
<template>
  <div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
      <!-- Register Section -->
      <div class="w-full md:w-1/2 flex flex-col">
        <!-- <div
          class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
          <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
        </div> -->

        <div
          class="flex flex-col justify-center md:justify-start my-auto pt-3 md:pt-0 px-8 md:px-24 lg:px-32">
          <p class="text-center text-3xl mt-6">Register</p>
          <form
            class="flex flex-col pt-3 md:pt-8"
            onsubmit="event.preventDefault();">
            <div class="flex flex-col pt-4">
              <label for="name" class="text-lg">Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Smith"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                v-model="name"/>
            </div>

            <div class="flex flex-col pt-4">
              <label for="email" class="text-lg">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                v-model="email"/>
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                v-model="password"/>
            </div>

            <div class="flex flex-col pt-4">
              <label for="confirm-password" class="text-lg"
                >Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                v-model="confirmation"/>
            </div>

            <input
              type="submit"
              value="Register"
              style="cursor: pointer;"
              class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              @click="register()"/>
          </form>
          <div class="text-center pt-12 pb-12">
            <p>
              Already have an account?
              <router-link class="underline font-semibold" :to="{name:'Login'}">Log in here.</router-link>
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
import {firebase, db} from '../firebase/db'

// Will be a modal later
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmation: ''
    }
  },
  methods:{
    goToSignIn(){
      this.$router.push({name: 'Login'})
    },
    enterWebSite(){
      this.$router.push({name: 'MySongs'})
    },
    async register(){
      if(this.password != this.confirmation){
        window.alert("The two passwords do not match.")
        return ;
      }

      let data = {}

      try {
        data = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        console.log('heyho', data.user)
      } catch(err) {
        window.alert(`Error ${err.code}: ${err.message}`)
        return ;
      }

      try {
        let id = data.user.uid
        await db.collection("users").doc(id).set({
          name: this.name,
          objectID: id,
        })
      } catch(err) {
        window.alert(`Error ${err.code}: ${err.message}`)
        return ;
      }

      window.alert("User created successfully. You can now log in.");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
