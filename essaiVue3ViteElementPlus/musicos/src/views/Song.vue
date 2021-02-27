<template>
  <div class="Song paddedContainer">
    <section>
      <p>You can start, stop, pause and unpause a Player: </p>
      <button class=button id="play" :disabled="playBtnDisabled" @click="playBtnClick">Play</button>
      <button class=button id="stop" :disabled="stopBtnDisabled" @click="stopBtnClick">Stop</button>
      <button class=button id="pause" :disabled="pauseBtnDisabled" @click="pauseBtnClick">Pause</button>
      <button class=button id="resume" :disabled="resumeBtnDisabled" @click="resumeBtnClick">Resume</button>
      <br>
      <b>Play state: </b><span id="playState">{{ playState }}</span>

      <p>You can also seek to a point in the NoteSequence:</p>
      <b id="currentTime">{{ timeValue }}</b>s
      <input type="range" id="slider" min="0" :max="totalTime" step="0.5" v-model="timeValue" @change="sliderChange">
      <b id="totalTime">{{ totalTime }}</b>s
    </section>
    <p>
      
    </p>
  </div>
</template>


<script>
import {db, firebase} from '../firebase/db'
import axios from 'axios';
import * as mm from '@magenta/music';
// import * as core from '@magenta/music/node/core'
// import * as Tone from 'tone'

export default {
  data() {
    return {
      songId: this.$route.params.id,
      object: {
        "chordNames":["+","","-","","-","+","","+","","-","","dim","Δ","","m7","","m7","Δ","","7","","m7","","ø","Δ","","m7","","m7","Δ","","7","","m7","","ø"],
        "chordsNotes":[[0,4,7],[],[2,5,9],[],[4,7,11],[5,9,12],[],[7,11,14],[],[9,12,16],[],[11,14,17],[0,4,7,11],[],[5,12,9,2],[],[7,4,11,14],[12,5,16,9],[],[17,7,11,14],[],[19,16,9,12],[],[14,21,17,11],[0,4,7,11],[],[5,12,9,2],[],[7,4,11,14],[12,5,16,9],[],[17,7,11,14],[],[19,16,9,12],[],[14,21,17,11]],
        "chordsRoots":[true,false,true,false,true,true,false,true,false,true,false,true],
        "instru1_n":0,
        "instru2_n":0,
        "noteNames":0,
        "notes":[
          // {"duration":0.08333331,"midiNote":50,"start":0.9166667,"velocity":100},
          // {"duration":0.07500005,"midiNote":51,"start":1.2083334,"velocity":100},
          // {"duration":0.09166658,"midiNote":52,"start":1.4583334,"velocity":100}
        ],
        "notesAccompagnement":[],
        "rootNote":48,
        "scale":[true,true,true,true,true,true,true,true,true,true,true,true],
        "showChords":0,
        "volumePlayer":100,
        "volumeRecording":90,
        "volumeYoutube":0.9
      },
      object2:{
        datetime: 0,
        duration: 60,
        imageUrl: '',
        objectID: '',
        originalID: '',
        ownerID: '',
        ownerName: '',
        title: '',
        videoID: ''
      },
      timeValue: 0,
      playBtnDisabled: false,
      stopBtnDisabled: true,
      resumeBtnDisabled: true,
      pauseBtnDisabled: true,
      player: {},
      playState: "stopped",
      totalTime: 60
    }
  },
  songForMagenta: {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 8
  },
  lastTimeRel:0,
  lastTimeAbs:0,
  mounted: async function (){
    await this.getObject()
    await this.getObject2()
    try {
      this.player = new mm.Player(false, {
        run: (note) => {
          // slider.value = currentTime.textContent = note.startTime.toFixed(1)
        },
        stop: () => {}
      })
      this.playState = this.player.getPlayState()
    } catch (err) {
      console.error(err);
    }
    this.$interval = setInterval(()=>{
			this.refreshTime()
		}, 700)
	},
  unmounted: async function() {
    console.log('bye bye')
    clearInterval(this.$interval)
  },
  methods:{
    playBtnClick(){
      this.$options.lastTimeAbs = Date.now()/1000
      this.player.start(this.$options.songForMagenta)
      this.totalTime = this.$options.songForMagenta.totalTime
      this.timeValue = 0
      this.playState = this.player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = false
      this.resumeBtnDisabled = true
    },
    stopBtnClick(){
      this.$options.lastTimeRel = 0
      this.player.stop()
      this.timeValue = 0
      this.playState = this.player.getPlayState()
      this.playBtnDisabled = false
      this.stopBtnDisabled = true
      this.pauseBtnDisabled = true
      this.resumeBtnDisabled = true
    },
    pauseBtnClick(){
      let lastTimeAbsNew = Date.now()/1000
      this.player.pause()
      this.$options.lastTimeRel += lastTimeAbsNew - this.$options.lastTimeAbs
      this.$options.lastTimeAbs = lastTimeAbsNew
      this.timeValue = this.$options.lastTimeRel
      this.playState = this.player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = true
      this.resumeBtnDisabled = false
    },
    resumeBtnClick(){
      this.$options.lastTimeAbs = Date.now()/1000
      this.player.resume()
      this.playState = this.player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = false
      this.resumeBtnDisabled = true
    },
    sliderChange(){
      // const t = parseFloat(slider.value)
      // this.timeValue = t
      this.$options.lastTimeRel = this.timeValue
      this.$options.lastTimeAbs = Date.now() / 1000
      // currentTime.textContent = t.toFixed(1)

      // You don't _have_ to pause and resume the context, but it makes
      // the UI jump around less.
      const playing = (this.player.getPlayState() === 'started')
      if (playing) {
        this.player.pause()
      }
      this.player.seekTo(this.timeValue)
      if (playing) {
        this.player.resume()
      }
    },
    refreshTime(){
      if(this.playState !== 'started') // "started", "stopped", or "paused"
        return;
      this.timeValue = (this.$options.lastTimeRel + Date.now()/1000 - this.$options.lastTimeAbs)
    },
    // setupPlayerControlsDemo() {
    //   this.player = new mm.Player(false, {
    //     run: (note) => {
    //       // slider.value = currentTime.textContent = note.startTime.toFixed(1)
    //     },
    //     stop: () => {}
    //   })
    //   this.playState = player.getPlayState()
    // },
    async getObject(){
      var storage = firebase.storage();
      var ref = storage.ref('songs/' + this.songId);
      
      let url = ''
      try{
        url = await ref.getDownloadURL()
      } catch(error) {
        console.log(error.code)
        return ;
      }

      let response = ''
      try{
        response = await axios.get(url, { responseType: 'json' })
      }catch(error){
        console.log(error)
        return ;
      }

      // console.log(response)
      this.object = response.data
      // console.log(JSON.stringify(this.object, null, 2))
      // console.log('%cobject' + '%c' + , 'color:red', 'color:green')

      // debugger
      console.log(this.$options.songForMagenta)
      this.$options.songForMagenta.notes = this.object.notes.map((o)=>{
        return {
          pitch: o.midiNote,
          startTime: o.start,
          endTime: o.start + o.duration
        }
      })
      // debugger
      console.log(this.$options.songForMagenta)
    },
    async getObject2(){
      try{
        let doc = await db.collection("songs").doc(this.songId).get();
        if(doc.exists){
          this.object2 = doc.data()
          // console.log('object2',this.object2)
          this.$options.songForMagenta.totalTime = this.object2.duration
          // debugger
          console.log(this.$options.songForMagenta)
        }
        else
          console.log('error 1234')
      }catch(error){
        console.log(error)
        return ;
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>