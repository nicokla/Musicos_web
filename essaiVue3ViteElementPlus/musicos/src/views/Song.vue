<template> 
  <div class="Song paddedContainer">
    <section>
      <div style="text-align: center;">
        <Defilement ref="defilement" 
          :zoomTime="zoomTime" 
          :hauteurPresent="hauteurPresent"
          :root="object.rootNote"></Defilement>
      </div>
      <!-- 
        touchstart touchend
        mousedown mouseup
      -->
      <div v-if="isTouchDevice()" class="flex flex-col flex-start" 
        style="margin-top:10px;">
        <div class="myContainer">
          <div v-for="note in scaleIntegers" class="myElement" @touchstart="actionButtonDown(note + object.rootNote + 24)" @touchend="actionButtonUp(note + object.rootNote + 24)"
          :style="getStyle(note + object.rootNote + 24)">
            {{$options.noteNames[note]}}
          </div>
        </div>
        <div class="myContainer">
          <div v-for="note in scaleIntegers" class="myElement" @touchstart="actionButtonDown(note + object.rootNote + 12)" @touchend="actionButtonUp(note + object.rootNote + 12)"
          :style="getStyle(note + object.rootNote + 12)">
            {{$options.noteNames[note]}}
          </div>
        </div>
        <div class="myContainer">
          <div v-for="note in scaleIntegers" class="myElement" @touchstart="actionButtonDown(note + object.rootNote)" @touchend="actionButtonUp(note + object.rootNote)"
          :style="getStyle(note + object.rootNote)">
            {{$options.noteNames[note]}}
          </div>
        </div>
      </div>
      

      

      <!-- <div style="margin-top: 30px; margin-bottom: 10px;"> -->
        <!-- <h2>
          - Play and record music
        </h2> -->
        <!--  class="ml-0 mr-0 flex flex-col justify-start content-center items-stretch mt-4" -->
      <div class="mt-2">
        <div class="flex flex-row justify-center">
          <svg @click="playPauseFunction()" class="play-button " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="true" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="#626262"><path :d="playPauseSvg"/></g></svg>
        </div>
        <div class="mt-2 flex flex-row justify-center" style>
          <input type="range" id="slider" v-model="timeValue" :min="0" :max="object2.duration" :step="1" @change="sliderChange" @input="sliderInput" style="width:70%;"> 
          <span class="ml-2"><b id="currentTime">{{ fixedTimeValue }}</b>s / </span>
          <span><b id="totalTime">{{ object2.duration }}</b>s</span>
        </div>
      </div>
      <div class="flex flex-row" style="margin-top: 10px;">
        <!-- <button class=button id="play" :disabled="playBtnDisabled" @click="playBtnClick">Play</button>
        <button class=button id="stop" :disabled="stopBtnDisabled" @click="stopBtnClick">Stop</button>
        <button class=button id="pause" :disabled="pauseBtnDisabled" @click="pauseBtnClick">Pause</button>
        <button class=button id="resume" :disabled="resumeBtnDisabled" @click="resumeBtnClick">Resume</button> -->
        
        
      </div>
      
      <div style="margin-top: 10px;">Zoom : 
        <input type="range" v-model="zoomTime" :min="1" :max="20" :step="0.5">
        {{zoomTime}} seconds
      </div>
      
      <div>
        Present (0=low, 1=high) : 
        <input type="range" v-model="hauteurPresent" :min="0" :max="1" :step="0.05" @input="updateDefilement">
        {{hauteurPresent}}
      </div>

      <div style="margin-top: 12px;">
        <input type="checkbox" v-model="isRecording" id="recording"/>
        <label for="recording" style="ml-2">{{ recordingText }}</label>
      </div>

      <div style="margin-top: 10px;">
        <!-- - The note from the playback :
        <span id=playBackNote>{{currentNotePlayback}}</span>
        <br> -->
        - The note you play now :
        <span id=myNote>{{currentNote}}</span>
        <br>
        - Notes display mode :
        <input type="checkbox" v-model="currentNoteAbsolute" id="currentNoteAbs"/>
        <label for="currentNoteAbs" style="ml-2">{{ currentNoteAbsoluteText }}</label>
      </div>
      <!-- </div> -->

      <div style="margin-top: 25px; margin-bottom: 10px;">
        <h2>
          - Scale parameters
        </h2>

        <div class="flex-row">          
            <!--  :checked="b" v-model="listeBool[index]"" -->
            <span v-for="(b, index) in object.scale" class="mr-2">
              <input type="checkbox" v-model="object.scale[index]" :id="`checkbox-${index}`" @change="scaleText = 'Choose scale'; updateScale()" :disabled="index == 0" />
              <label 
              :for="`checkbox-${index}`" >{{$options.noteNames[index]}}</label>
            </span>
        </div>

        <PlusMinus  ref="plusMinus"
                    :initialIndex="object.rootNote" 
                    @eventRootChanged="theRootChanged($event)"></PlusMinus>
        
        <div>
          <select @keypress.prevent v-model="scaleText">
            <option v-for="scale in Object.keys($options.scalesContent)" v-bind:value="scale">
              {{ scale }}
            </option>
          </select>
        </div>
      </div>

      <div style="margin-top: 25px; margin-bottom: 10px;">
        <h2>
          - Delete notes
        </h2>

        <DoubleRangeSlider class="mb-1" ref="childComponent" :min="min" :max="max" @update:min="value => min = value" @update:max="value => max = value" :minThreshold="0" :maxThreshold="object2.duration"></DoubleRangeSlider>
        
        <button class="button mt-0" @click="deleteNotesInRange">Clear notes (from {{min}} seconds to {{max}} seconds).</button>
      </div>

      <div style="margin-top: 25px; margin-bottom: 10px;">
        <h2>
          - Like or dislike this song
        </h2>
        <button v-if="!isLiked" class="button" @click="like">like</button>
        <button v-else class="button" @click="dislike">dislike</button>
      </div>
    </section>
  </div>
</template>


<script>
// import * as mm from '@magenta/music';
// import * as core from '@magenta/music/node/core'
import {db, firebase, getCurrentUser, getMyId} from '../firebase/db'
import axios from 'axios';
import DoubleRangeSlider from '../components/DoubleRangeSlider.vue'
import {player} from '../magenta/magenta'
import {synth, keyDownFunction, mergeByStartTime, midiDictionnary, 
        startTimes, fired, Tone, midiDictionnaryNameRelative,
        prepare_midiDictionnary, midiDictionnaryName,
        scaleIntegersToBooleans, scaleBooleansToInteger,
        getColor} from '../tone/tone'
import PlusMinus from '../components/PlusMinus.vue';
import Defilement from '../components/Defilement.vue';

export default {
  data() {
    return {
      hauteurPresent: 0.5,
      zoomTime: 6,
      wasPlaying: false,
      currentNoteAbsolute: true,
      currentNote: '',
      min: 0,
      max: 10,
      isRecording: true,
      // listeBool: [true, false, true, true, false, true, false, true, true, false, true, false],
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
        "scale":[true,false,true,false,true,true,false,true,false,true,false,true],
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
      // playBtnDisabled: false,
      // stopBtnDisabled: true,
      // resumeBtnDisabled: true,
      // pauseBtnDisabled: true,
      player: {},
      likeStatus: '',
      unsubscribe: {},
      playState: '',
      scaleText: 'Choose scale',
    }
  },
  songForMagenta: {
    notes: [
      // {pitch: 60, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 8
  },
  recordedNotes: [], // {pitch: 60, startTime: 0.0, endTime: 0.5}
  noteNames:['1','2b','2','3b','3','4','5b','5','6b','6','7b','7'],
  lastTimeRel:0,
  lastTimeAbs:0,
  scalesContent:{
    'Choose scale': [],
    'Major': [0,2,4,5,7,9,11],
    'Mixolydian (Major 7♭)': [0,2,4,5,7,9,10],
    'Lydian (Major 4♯)': [0,2,4,6,7,9,11],
    'Minor': [0,2,3,5,7,8,10],
    'Minor harmonic (Minor 7♮)': [0,2,3,5,7,8,11],
    'Dorian (Minor 6♮)': [0,2,3,5,7,9,10],
    'Phrygian (Minor 2♭)': [0,1,3,5,7,8,10],
    'Whole tone': [0,2,4,6,8,10],
    'Chromatic': [0,1,2,3,4,5,6,7,8,9,10,11],

    'Spanish (Phrygian major)': [0,1,4,5,7,8,10],
    'Pentatonic': [0,2,4,7,9],
    'Blues (Pentatonic minor)': [0,3,5,7,10],
    'Jazz': [0,3,5,6,7,10],
    'Bebop':[0,2,4,5,7,9,10,11],
    'Half-whole diminished':[0,1,3,4,6,7,9,10],
    'Whole-half diminished':[0,2,3,5,6,8,9,11],
    'Half diminished':[0,2,3,5,6,8,10],
    'Augmented' : [0,3,4,7,8,11],

    'Japanese mode':[0,2,3,7,8],
    'Insen': [0,1,5,7,10],
    'Hirajoshi': [0,1,5,6,10],

    'Marwa':[0,1,4,6,7,9,11],
    'Purvi':[0,1,4,6,7,8,11],
    'Todi':[0,1,3,6,7,8,11],
  },
  mounted: async function (){
    this.listenToChanges()
    player.stop()
    this.$options.lastTimeRel = 0
    this.timeValue = 0
    // document.addEventListener("keydown", keyDownFunction)
    document.addEventListener("keydown", this.keyDownFunctionShow)
    document.addEventListener("keyup", this.keyUpFunctionRecord)
    await this.getObject()
    await this.getObject2()
    this.updateScale() // !!!
    this.$refs.childComponent.setValue(this.object2.duration);
    this.$refs.plusMinus.updateRootNote(this.object.rootNote)
    try {
      this.playState = player.getPlayState()
    } catch (err) {
      console.error(err);
    }
    this.$interval = setInterval(()=>{
			this.refreshTime()
		}, 700)
    this.$refs.defilement.setTime(0)
	},
  unmounted: async function() {
    player.stop()
    this.unsubscribe()
    console.log('bye bye')
    clearInterval(this.$interval)
    document.removeEventListener("keydown", this.keyDownFunctionShow)
    document.removeEventListener("keyup", this.keyUpFunctionRecord)
    if(this.object2.ownerID === getMyId()){
      this.object.notes = this.$options.songForMagenta.notes.map((o) => {
        return {
          midiNote: o.pitch,
          start: o.startTime,
          duration: o.endTime - o.startTime,
          velocity: 80
        }
      })
      try{
        await this.saveNotes()
      }catch(error){
        console.log(error)
      }
    }
  },
  components:{
    'child-component':DoubleRangeSlider,
    PlusMinus,
    Defilement
  },
  methods:{
    // updatePlayState(){
    //   try {
    //     this.playState = player.getPlayState()
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    getSize(){
      const a = this.scaleIntegers.length
      const num = 5 * (7 / a)
      return num
    },
    getStyle(note){
      return `background-color:${getColor(note, this.object.rootNote)};`
      // font-size: ${this.getSize()}vw;
    },
    actionButtonDown(note){
      // synth.triggerAttack(Tone.Midi('C4'))
      this.attackNote(note)
    },
    actionButtonUp(note){
      // synth.triggerRelease(Tone.Midi('C4'))
      this.releaseNote(note)
    },
    isTouchDevice(){
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    },
    updateDefilement(){
      this.$refs.defilement.setTime(this.timeValue)
    },
    async theRootChanged(newRoot){
      // console.log(newRoot)
      this.object.rootNote = newRoot
      this.updateScale()
      // don't need those two lines (props are reactive):
      // this.$refs.defilement.root = newRoot
      // this.$refs.defilement.$forceUpdate()
    },
    async deleteNotesInRange(){
      let result = confirm(`Want to delete all notes from  ${this.min}s to ${this.max}s?`);
      if (result) {
        this.deleteNotesInRange_doIt()
      }
    },
    async deleteNotesInRange_doIt(){
      // console.log('coucou heho')
      const playing = (player.getPlayState() === 'started')
      if (playing) {
        player.pause()
      }
      player.stop()

      // we take into account recorded notes
      this.mergeRecordedAndReset() // ??? TODO (debug) : negative times.

      // we delete the notes :
      // console.log('before',this.$options.songForMagenta.notes)
      this.$options.songForMagenta.notes = this.$options.songForMagenta.notes.filter(note=>!this.isInRange(note))
      this.$refs.defilement.notes = Array.from(this.$options.songForMagenta.notes)

      // console.log('after',this.$options.songForMagenta.notes)

      // we restart the player so that the deletions are taken into account
      player.start(this.$options.songForMagenta)
      player.pause()
      player.seekTo(this.timeValue)

      // we notice the ui that player is in pause state
      // this.playState = player.getPlayState()
      // this.playBtnDisabled = true
      // this.stopBtnDisabled = false
      // this.pauseBtnDisabled = true
      // this.resumeBtnDisabled = false
    },
    isInRange(note){
      console.log(this.min, note.startTime, this.max)
      return (this.min <= note.startTime && note.startTime <= this.max)
    },
    async updateScale(){
      console.log('root note : ',this.object.rootNote)
      console.log('scale : ', this.object.scale)
      prepare_midiDictionnary(scaleBooleansToInteger(this.object.scale), this.object.rootNote)
    },
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
      // const decalage = this.$options.lastTimeRel - this.$options.lastTimeAbs
      this.$options.recordedNotes = this.$options.recordedNotes.map((e)=>{
        return {
          pitch: e.pitch,
          startTime: e.startTime, // + decalage,
          endTime: e.endTime //+ decalage
        }
      })
      mergeByStartTime(this.$options.songForMagenta.notes, this.$options.recordedNotes)
      console.log(this.$options.songForMagenta.notes)
      this.$options.recordedNotes = []
      return true
    },
    releaseNote(midiNote){
      this.currentNote = ''
      fired[midiNote] = false
      synth.triggerRelease(Tone.Midi(midiNote))
      const decalage = this.$options.lastTimeRel - this.$options.lastTimeAbs
      if(this.isRecording){
        this.$options.recordedNotes.push({
          pitch: midiNote,
          startTime: startTimes[midiNote] + decalage,
          endTime: Date.now()/1000 + decalage
        })
      }
    },
    keyUpFunctionRecord(e){
      let midiNote = midiDictionnary[e.code]
      this.releaseNote(midiNote)
    },
    attackNote(midiNote){
      if(!fired[midiNote]) {
        fired[midiNote] = true
        const now = Date.now()/1000
        startTimes[midiNote] = now
        // this.currentNote = midiDictionnaryName[midiNote]
        if(this.currentNoteAbsolute){
          this.currentNote = midiDictionnaryName[midiNote]
        } else {
          this.currentNote = midiDictionnaryNameRelative[midiNote]
        }
        // myNoteDom.innerText = midiDictionnaryName[midiNote]
        // console.log('prout prout' + midiDictionnaryName[midiNote])
        synth.triggerAttack(Tone.Midi(midiNote)) // "C4", "8n"
        if(this.isRecording){
          const decalage = this.$options.lastTimeRel - this.$options.lastTimeAbs
          this.$refs.defilement.notes.push({pitch: midiNote, startTime: now + decalage})
        }
      }
    },
    keyDownFunctionShow(e){
      let midiNote = midiDictionnary[e.code]
      this.attackNote(midiNote)
    },
    async playPauseFunction(){
      switch(this.playState){
        case 'stopped':
          this.playBtnClick()
          break;
        case 'paused':
          this.resumeBtnClick()
          break;
        case 'started':
          this.pauseBtnClick()
          break;
        default:
          break;
      }
    },
    async playBtnClick(){
      this.$options.lastTimeAbs = Date.now()/1000
      player.start(this.$options.songForMagenta)
      // console.log(player)
      // this.totalTime = this.$options.songForMagenta.totalTime
      this.playState = player.getPlayState()
      // this.playBtnDisabled = true
      // this.stopBtnDisabled = false
      // this.pauseBtnDisabled = false
      // this.resumeBtnDisabled = true
      await this.$refs.defilement.moveToTime(this.object2.duration)
    },
    stopBtnClick(){
      this.mergeRecordedAndReset()
      player.stop()
      this.$options.lastTimeRel = 0
      this.timeValue = 0
      this.playState = player.getPlayState()
      // this.playBtnDisabled = false
      // this.stopBtnDisabled = true
      // this.pauseBtnDisabled = true
      // this.resumeBtnDisabled = true
      this.$refs.defilement.killCurrentAnimation()
      this.$refs.defilement.setTime(0)
    },
    pauseBtnClick(show=true, updateTimeRelAndCo=true){
      let smthgHappened = this.mergeRecordedAndReset()
      let lastTimeAbsNew = Date.now()/1000
      if(smthgHappened)
        player.stop()
      else
        player.pause()
      if(updateTimeRelAndCo){
        this.$options.lastTimeRel += lastTimeAbsNew - this.$options.lastTimeAbs
        this.$options.lastTimeAbs = lastTimeAbsNew
        this.timeValue = this.$options.lastTimeRel
      }
      if (smthgHappened){ // we reload the songForMagenta
        player.start(this.$options.songForMagenta)
        player.pause()
        player.seekTo(this.timeValue)
      }
      this.playState = player.getPlayState()
      if(show){
        // this.playBtnDisabled = true
        // this.stopBtnDisabled = false
        // this.pauseBtnDisabled = true
        // this.resumeBtnDisabled = false
      }
      this.$refs.defilement.killCurrentAnimation()
      this.$refs.defilement.setTime(this.timeValue)
    },
    async resumeBtnClick(show=true, updateTimeRelAndCo=true){
      if(updateTimeRelAndCo){
        this.$options.lastTimeAbs = Date.now()/1000
      }
      player.resume()
      this.playState = player.getPlayState()
      if(show){
        // this.playBtnDisabled = true
        // this.stopBtnDisabled = false
        // this.pauseBtnDisabled = false
        // this.resumeBtnDisabled = true
      }
      await this.$refs.defilement.moveToTime(this.object2.duration)
    },
    sliderInput(e){
      const playing = (player.getPlayState() === 'started')
      console.log(player.getPlayState())
      // this.$options.lastTimeRel = parseFloat(this.timeValue)
      if (playing) {
        this.wasPlaying = playing
        player.pause()
      }
      // }
      this.$refs.defilement.setTime(parseFloat(this.timeValue))
    },
    sliderChange(e){
      this.pauseBtnClick(false, false) // recording is done here

      this.$options.lastTimeRel = parseFloat(this.timeValue)
      this.$options.lastTimeAbs = Date.now() / 1000
      player.seekTo(this.$options.lastTimeRel)
      this.$refs.defilement.setTime(this.$options.lastTimeRel)

      if (this.wasPlaying) {
        this.resumeBtnClick(false, false)
      }
      this.wasPlaying = false
    },
    refreshTime(){
      console.log('refresh', player.getPlayState())
      if(player.getPlayState() !== 'started') // "started", "stopped", or "paused"
        return;
      else{
        this.timeValue = (parseFloat(this.$options.lastTimeRel)
                         + Date.now()/1000 - 
                         parseFloat(this.$options.lastTimeAbs))
      }
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
      this.$refs.defilement.notes = Array.from(this.$options.songForMagenta.notes)
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
          // this.totalTime = this.object2.duration
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
  watch:{
    scaleText: async function(val){
      let newScale = this.$options.scalesContent[val]
      console.log(newScale)
      if(newScale.length > 0){
        this.object.scale = scaleIntegersToBooleans(newScale)
        this.updateScale()
        // prepare_midiDictionnary(newScale, this.object.rootNote)
      }
    }
  },
  computed: {
    playPauseSvg(){
      if(this.playState == 'started')
        return "M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
      else
        return 'M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'
    },
    scaleIntegers() {
      return scaleBooleansToInteger(this.object.scale)
    },
    fixedTimeValue(){
      return parseFloat(this.timeValue).toFixed(1)
    },
    isLiked(){
      return this.likeStatus !== undefined
    },
    recordingText(){
      if(this.isRecording)
        return "Recording"
      else
        return "Not recording"
    },
    currentNoteAbsoluteText(){
      if(this.currentNoteAbsolute)
        return "Absolute"
      else
        return "Relative"
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

.Song{
  background-color: #FEF3C7;
}

input {
  vertical-align:middle;
  margin-bottom:.2em;
}

label{
  display: inline-block;
  margin-left:3px;
}

.plusminus{
  margin-top: 5px;
}
h2{
  margin-bottom:10px;
}

/* Small screens */
@media only screen and (max-width: 600px) {
  .Song{
    padding-bottom: 5rem;
  }
}



.myContainer{
  /* height: 100%;
  width: 100%; */
  /* padding-left: 1rem;
  padding-right: 1rem; */
  flex-flow: column;
  flex: 1 1 auto;
  /* overflow-y: auto; */
  /* margin: 0.2cm; */
	display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
	/* flex-flow: row wrap; */
	justify-content:stretch;
  align-items:stretch;
  align-content:stretch;
  margin-top: 2px;
  margin-bottom: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.myElement{
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-touch-callout : none;

  /* flex-grow: 1;
  flex-shrink: 1; */
  flex: 1 1 0px;
  /* flex-basis: 0.333; */
  /* flex: 0 0 0.333; */
  /* width: 80%; */
  /* height: 1cm; */
  line-height: 1cm;

  /* margin-top: 4px;
  margin-bottom: 4px; */
  /* margin-right: 2mm;
  margin-left: 2mm; */
	padding-bottom: 16px;
  padding-top: 16px;

	opacity: 1;
	/* cursor: pointer; */
	background-color: #ffd6a7;
	border: 1px solid #000000;
	border-radius: 5px;
	color: rgb(0, 0, 0);
	text-align: center;
  /* vertical-align: center; */

	display: flex;
  flex-direction:column;
	justify-content:center;

  font-size: 24px;
  /* font-size: 4vw; */
}

.play-button{
  border-radius: 100%;
  border-width: 2px;
  background-color: greenyellow;
  border-color: black;
  width: 20vmin;
  height: 20vmin;
  cursor: pointer;
}
</style>