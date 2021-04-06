
<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 700 700"     xml:space="preserve" style="background-color: black; display: inline-block;">
      <svg  x="0" y="0" width="100%" height="100%" id="theSVG">
        <ellipse v-for="note in notes" :cx="getColonne(note.pitch) * 100 + 50" :cy="getHauteurFromTime(note.startTime)" rx="50" ry="25" :style="getEllipseStyle(note.pitch, note.selected)" @click="select(note)"/>
      </svg>                                                  
      <svg x="0" y="0" width="100%" height="100%">
        <line id="line" x1="0" x2="700" :y1="hauteurSVGPresent" :y2="hauteurSVGPresent" stroke="white" fill="transparent" stroke-width="3"/>
      </svg>

  </svg>  
</template>

<script> 

// https://greensock.com/docs/v3/GSAP/gsap.timeline()
// https://greensock.com/docs/v3/GSAP/Timeline/kill()
import {gsap} from 'gsap'
import {getColor} from '../tone/tone.js'

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
      // svg: document.querySelector('#theSVG'),
      notes: [
        // {pitch:0, startTime:0.5, endTime:1},
      ],
      currentTime: 0,
    }
  },
  tl: gsap.timeline({repeat: 0}),
  created: async function(){
    // this.mysvg = document.querySelector("#theSVG")
  },
  mounted: async function (){
  },
  computed:{
    hauteurSVGPresent(){
      return 700*(1-this.hauteurPresent)
    }
  },
  methods:{
    deleteSelectedNotes(){
      const notesToDelete = this.notes.filter((note)=>note.selected)
      this.$emit('deleteEvent', notesToDelete)
      this.notes = this.notes.filter((note)=>!note.selected)
    },
    select(note){
      note.selected = !note.selected;
    },
    getEllipseStyle(pitch, selected){
      const stroke = selected ? 'red' : 'purple';
      const strokeWidth = selected ? '8' : '2';
      return `fill:${getColor(pitch, this.root)};stroke:${stroke};stroke-width:${strokeWidth};`
    },
    getColonne(pitch){
      let liste = [0,1,1,2,2,3,4,4,5,5,6,6]
      return liste[(pitch - this.root + 1200) % 12]
    },
    getTimeFromHauteur(hauteur){
      return (- (hauteur / 700)) * this.zoomTime
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
    getHauteurCameraFromHauteurPresent(hauteurPresent, time) {
      return 700 * (- time/this.zoomTime - (1 - hauteurPresent))
    },
    setTime(time){
      this.killCurrentAnimation()
      // this.$options.tl = gsap.timeline({repeat: 0})
      gsap.set('#theSVG',{
        attr:{
          viewBox:`0 ${this.getHauteurCameraFromHauteurPresent(this.hauteurPresent, time)} 700 700`
        }
      })
      this.currentTime = time
    },
    async moveToTime(time){
      this.killCurrentAnimation()
      this.$options.tl = gsap.timeline({repeat: 0})
      await this.$options.tl.to('#theSVG',{
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
  },
  watch:{
    zoomTime: function (val){
      this.setTime(this.currentTime)
    }
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>