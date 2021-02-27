<template>
  <div class="Song paddedContainer">
    <section>
      <button class=button id="play" :disabled="playBtnDisabled" @click="playBtnClick">Play</button>
      <button class=button id="stop" :disabled="stopBtnDisabled" @click="stopBtnClick">Stop</button>
      <button class=button id="pause" :disabled="pauseBtnDisabled" @click="pauseBtnClick">Pause</button>
      <button class=button id="resume" :disabled="resumeBtnDisabled" @click="resumeBtnClick">Resume</button>
      
      <!-- 
        <br><br>
        <b>Play state: </b><span id="playState">{{ playState }}</span>
      -->

      <br><br>
      <span><b id="currentTime">{{ fixedTimeValue }}</b>s</span>
      <input type="range" id="slider" v-model="timeValue" :min="0" :max="totalTime" :step="1" @change="sliderChange"> 
      <!-- :value="0"
      @input="updateTimeValue"
        v-model="timeValue"  -->
      <span><b id="totalTime">{{ totalTime }}</b>s</span>
      
      <!-- <br><br>
      <p>note:
        <span id=myNote></span>
      </p> -->
      <br><br>
      <button v-if="!isLiked" class="button" @click="like">like</button>
      <button v-else class="button" @click="dislike">dislike</button>
      <br>
      <!-- {{ isLiked }} -->
    </section>
  </div>
</template>


<script>
import {db, firebase, getCurrentUser} from '../firebase/db'
import axios from 'axios';
// import * as mm from '@magenta/music';
// import * as core from '@magenta/music/node/core'
import {player} from '../magenta/magenta'
import {synth, keyDownFunction, mergeByStartTime, midiDictionnary, 
        startTimes, fired, Tone} from '../tone/tone'

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
      totalTime: 60,
      likeStatus: '',
      unsubscribe: {}
    }
  },
  songForMagenta: {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 8
  },
  recordedNotes: [], // {pitch: 60, startTime: 0.0, endTime: 0.5}
  lastTimeRel:0,
  lastTimeAbs:0,
  mounted: async function (){
    this.listenToChanges()
    player.stop()
    this.$options.lastTimeRel = 0
    this.timeValue = 0
    document.addEventListener("keydown", keyDownFunction)
    document.addEventListener("keyup", this.keyUpFunctionRecord)
    await this.getObject()
    await this.getObject2()
    // try {
    //   // player = 
    //   this.playState = player.getPlayState()
    // } catch (err) {
    //   console.error(err);
    // }
    this.$interval = setInterval(()=>{
			this.refreshTime()
		}, 700)
	},
  unmounted: async function() {
    player.stop()
    this.unsubscribe()
    console.log('bye bye')
    clearInterval(this.$interval)
    document.removeEventListener("keydown", keyDownFunction)
    document.removeEventListener("keyup", this.keyUpFunctionRecord)
    this.object.notes = this.$options.songForMagenta.notes.map((o) => {
      return {
        midiNote: o.pitch,
        start: o.startTime,
        duration: o.endTime - o.startTime
      }
    })
    try{
      await this.saveNotes()
    }catch(error){
      console.log(error)
    }
  },
  methods:{
    async like(){
      let myId = getCurrentUser().uid
      await db.collection("users").doc(myId).collection('likedSongs').doc(this.songId).set(this.object2)
    },
    async dislike(){
      let myId = getCurrentUser().uid
      await db.collection("users").doc(myId).collection('likedSongs').doc(this.songId).delete()
    },
    listenToChanges(e){
      let myId = getCurrentUser().uid
      this.unsubscribe = db.collection("users")
        .doc(myId).collection('likedSongs').doc(this.songId)
        .onSnapshot((doc) => {
          // console.log("Current data: ", doc.data());
          this.likeStatus = doc.data()
        });
    },
    mergeRecordedAndReset(){
      if (this.$options.recordedNotes.length === 0)
        return false // nothing happened
      var decalage = this.$options.lastTimeRel - this.$options.lastTimeAbs
      this.$options.recordedNotes = this.$options.recordedNotes.map((e)=>{
        return {
          pitch: e.pitch,
          startTime: e.startTime + decalage,
          endTime: e.endTime + decalage
        }
      })
      mergeByStartTime(this.$options.songForMagenta.notes, this.$options.recordedNotes)
      console.log(this.$options.songForMagenta.notes)
      this.$options.recordedNotes = []
      return true
    },
    keyUpFunctionRecord(e){
      console.log('heho')
      let midiNote = midiDictionnary[e.code]
      fired[midiNote] = false
      synth.triggerRelease(Tone.Midi(midiNote))
      this.$options.recordedNotes.push({
        pitch: midiNote,
        startTime: startTimes[midiNote],
        endTime: Date.now()/1000
      })
    },
    playBtnClick(){
      this.$options.lastTimeAbs = Date.now()/1000
      player.start(this.$options.songForMagenta)
      // console.log(player)
      this.totalTime = this.$options.songForMagenta.totalTime
      this.playState = player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = false
      this.resumeBtnDisabled = true
    },
    stopBtnClick(){
      this.mergeRecordedAndReset()
      player.stop()
      this.$options.lastTimeRel = 0
      this.timeValue = 0
      this.playState = player.getPlayState()
      this.playBtnDisabled = false
      this.stopBtnDisabled = true
      this.pauseBtnDisabled = true
      this.resumeBtnDisabled = true
    },
    pauseBtnClick(){
      let smthgHappened = this.mergeRecordedAndReset()
      let lastTimeAbsNew = Date.now()/1000
      if(smthgHappened)
        player.stop()
      else
        player.pause()
      this.$options.lastTimeRel += lastTimeAbsNew - this.$options.lastTimeAbs
      this.$options.lastTimeAbs = lastTimeAbsNew
      this.timeValue = this.$options.lastTimeRel
      if (smthgHappened){ // we reload the songForMagenta
        player.start(this.$options.songForMagenta)
        player.pause()
        player.seekTo(this.timeValue)
      }
      this.playState = player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = true
      this.resumeBtnDisabled = false
    },
    resumeBtnClick(){
      this.$options.lastTimeAbs = Date.now()/1000
      player.resume()
      this.playState = player.getPlayState()
      this.playBtnDisabled = true
      this.stopBtnDisabled = false
      this.pauseBtnDisabled = false
      this.resumeBtnDisabled = true
    },
    sliderChange(e){
      // const t = parseFloat(e.target.value)
      // this.timeValue = t
      this.$options.lastTimeRel = parseFloat(this.timeValue)
      this.$options.lastTimeAbs = Date.now() / 1000
      // currentTime.textContent = t.toFixed(1)

      // You don't _have_ to pause and resume the context, but it makes
      // the UI jump around less.
      const playing = (player.getPlayState() === 'started')
      if (playing) {
        player.pause()
      }
      player.seekTo(this.timeValue)
      if (playing) {
        player.resume()
      }
    },
    // updateTimeValue(e){
    //   // const t = parseFloat(e.target.value)
    //   // this.timeValue = t
    //   // console.log(this.timeValue)
    // },
    refreshTime(){
      if(this.playState !== 'started') // "started", "stopped", or "paused"
        return;
      this.timeValue = (parseFloat(this.$options.lastTimeRel)
                         + Date.now()/1000 - 
                         parseFloat(this.$options.lastTimeAbs))
    },
    async saveNotes(){
      var storage = firebase.storage();
      var ref = storage.ref('songs/' + this.songId);
      try{
        await ref.putString(JSON.stringify(this.object))
      }catch(error){
        console.log(error)
      }
    },
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
    fixedTimeValue(){
      return parseFloat(this.timeValue).toFixed(1)
    },
    isLiked(){
      return this.likeStatus !== undefined
    }
  }
}
</script>

<style scoped>
/* span
{
   width:45px;
   max-width:70px;
   display: inline-block;
} */
</style>