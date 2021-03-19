
<template>
  <svg version="1.1" id="theSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 700 700"     xml:space="preserve" style="background-color: black;">
      <!-- <rect y="0" fill="#534741" stroke="#000000" stroke-miterlimit="10" width="250" height="250"/>
      <text transform="matrix(1 0 0 1 101.5219 140.1159)" font-family="'MyriadPro-Regular'" font-size="72px">1</text> -->
      <ellipse v-for="note in notes" :cx="getColonne(note.pitch) * 100 + 50" :cy="getHauteurFromTime(note.startTime)" rx="50" ry="25" style="fill:yellow;stroke:purple;stroke-width:2" />
  </svg>  
  <!-- <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>







<script> 

//script setup
// import { defineProps, onMounted, reactive, ref, useContext, watch } from "vue";

// defineProps({
//   notes: Object
// })

// const state = reactive({ count: 0 })

// onMounted(async () => {
//   // ...
// })

// ---------------------

// https://greensock.com/docs/v3/GSAP/gsap.timeline()
// https://greensock.com/docs/v3/GSAP/Timeline/kill()
import {gsap} from 'gsap'

export default {
  props:{
    zoomTime: {
      type: Number,
      default: 6
    },
    hauteurPresent: {
      type: Number,
      default: 0
    },
    root: {
      type: Number,
      default: 48
    }
  },
  data() {
    return {
      svg: document.querySelector('svg'),
      // zoomTime: 6,
      // hauteurPresent: 0, // 0 => modeLecture / 1 => modeEcriture
      notes: [
        // {pitch:0,startTime:0.5},
        // {pitch:5,startTime:1},
        // {pitch:10,startTime:2},
        // {pitch:0,startTime:3},
        // {pitch:5,startTime:4},
        // {pitch:10,startTime:5},
        // {pitch:0,startTime:6},
        // {pitch:5,startTime:7},
        // {pitch:10,startTime:8},
      ],
      // root: 48,
      currentTime: 0,
    }
  },
  tl: gsap.timeline({repeat: 0}),
  mounted: async function (){
  },
  methods:{
    getColonne(pitch){
      let liste = [0,1,1,2,2,3,4,4,5,5,6,6]
      return liste[(pitch - this.root + 1200) % 12]
    },
    getTimeFromHauteur(hauteur){
      return -(hauteur / 700) * this.zoomTime
    },
    getHauteurFromTime(time) {
      return 700 * (-(time/this.zoomTime))
    },
    // ellipse(time, colonne){
    //   return `<ellipse cx="${colonne * 100 + 50}" cy="${this.getHauteurFromTime(time)}" rx="50" ry="25" style="fill:yellow;stroke:purple;stroke-width:2" />`
    // },
    // addNote(time, colonne){
    //   // afterbegin beforeend etc.
    //   this.svg.insertAdjacentHTML("beforeend", this.ellipse(time, colonne)); 
    // },
    getHauteurCameraFromHauteurPresent(hauteurNow, time) {
      return (-700 + 700*hauteurNow - 700/this.zoomTime*time)
    },
    setTime(time){
      this.killCurrentAnimation()
      // this.$options.tl = gsap.timeline({repeat: 0})
      gsap.set("#theSVG",{
        attr:{
          viewBox:`0 ${this.getHauteurCameraFromHauteurPresent(this.hauteurPresent, time)} 700 700`
        }
      })
      this.currentTime = time
    },
    async moveToTime(time){
      this.killCurrentAnimation()
      this.$options.tl = gsap.timeline({repeat: 0})
      await this.$options.tl.to("#theSVG",{
        attr:{
          viewBox:`0 ${this.getHauteurCameraFromHauteurPresent(this.hauteurPresent, time)} 700 700`
        },
        duration: Math.abs(time - this.currentTime),
        ease: "none"
      })
      this.currentTime = time
    },
    // async moveCamera(){
    //   this.setTime(0)
    //   await this.moveToTime(1)
    //   await this.moveToTime(0)
    //   await this.moveToTime(6)
    //   await this.moveToTime(2)
    //   this.setTime(0)
    // },
    killCurrentAnimation(){
      if(this.$options.tl){
        this.$options.tl.kill()
      }
    },
    // pauseCurrentAnimation(){
    //   if(this.$options.tl){
    //     this.$options.tl.pause()
    //   }
    // }
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>