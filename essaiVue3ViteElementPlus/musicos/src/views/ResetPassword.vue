<template>
  <div class="font-mono bg-gray-400">
    <!-- Container -->
    <!-- <div class="container mx-auto"> -->
      <!-- <div class="flex justify-center px-6 my-12"> -->
        <!-- Row -->
        <div class="w-full flex">
          <!-- Col -->
          <!-- <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style="
              background-image: url('https://source.unsplash.com/oWTW-jNGl9I/600x800');
            "
          ></div> -->
          <!-- Col -->
          <div
            class="w-full bg-white p-5"
          >
            <div class="pt-8 text-center mb-7">
              <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p class="mb-1 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form class="px-8 pb-8 mb-4 bg-white rounded">
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  v-model="email"
                  placeholder="Enter Email Address..."
                />
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  @click="sendEmail"
                >
                  Reset Password
                </button>
              </div>
              <hr class="mb-6 border-t" />
              <!-- <div class="text-center">
                <a
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./register.html"
                >
                  Create an Account!
                </a>
              </div>
              <div class="text-center">
                <a
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </a>
              </div> -->
            </form>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>


<script>
import {firebase} from '../firebase/db'

export default {
  data() {
    return {
      email: '',
    };
  },
  async mounted() {
    this.email = this.$route.params.email || ''
  },
  methods: {
    async sendEmail(){
      var auth = firebase.auth();
      try{
        await auth.sendPasswordResetEmail(this.email)
        window.alert(
          `We sent you an email at ${this.email} to reset your password.`)
        this.$router.push({name: 'Login'})
      }catch(error){
        window.alert('Error: ' + error);
      }
    }
  },
};
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}
</style>