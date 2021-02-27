<template>
  <div class="Song paddedContainer">
    <section>
      <p>You can start, stop, pause and unpause a Player: </p>
      <button class=button id="play">Play</button>
      <button class=button id="stop" disabled="">Stop</button>
      <button class=button id="pause" disabled="">Pause</button>
      <button class=button id="resume" disabled="">Resume</button>
      <br>
      <b>Play state: </b><span id="playState">stopped</span>

      <p>You can also seek to a point in the NoteSequence:</p>
      <b id="currentTime">{{ currentTime }}</b>s
      <input type="range" id="slider" min="0" value="0" step="0.5">
      <b id="totalTime">0</b>s
    </section>
  </div>
</template>


<script>
import {db, firebase} from '../firebase/db'
import axios from 'axios';
import * as mm from '@magenta/music';
// import * as core from '@magenta/music/node/core'


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
      currentTime: 0
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
  async mounted(){
    await this.getObject()
    await this.getObject2()
    try {
      this.setupPlayerControlsDemo();
      // setupMIDIPlayerDemo();
    } catch (err) {
      console.error(err);
    }
    this.$interval = setInterval(()=>{
			this.refreshTime()
		}, 700)
	},
  destroyed() {
    clearInterval(this.$interval)
  },
  methods:{
    refreshTime(){
      const playState = document.getElementById('playState') 
      const slider = document.getElementById('slider') 
      const currentTime = document.getElementById('currentTime') 

      if(playState.textContent !== 'started') // "started", "stopped", or "paused"
        return;
      let nowRel = (this.$options.lastTimeRel + Date.now() - this.$options.lastTimeAbs) / 1000
      slider.value = currentTime.textContent = nowRel.toFixed(1)
    },
    setupPlayerControlsDemo() {
      const playBtn = document.getElementById('play') 
      const stopBtn = document.getElementById('stop') 
      const pauseBtn = document.getElementById('pause') 
      const resumeBtn = document.getElementById('resume') 
      const playState = document.getElementById('playState') 
      const slider = document.getElementById('slider') 
      const currentTime = document.getElementById('currentTime') 

      const player = new mm.Player(false, {
        run: (note) => {
          // slider.value = currentTime.textContent = note.startTime.toFixed(1)
        },
        stop: () => {}
      })
      playState.textContent = player.getPlayState()

      playBtn.addEventListener('click', () => {
        // debugger
        console.log('coucou')
        this.$options.lastTimeAbs = Date.now()
        player.start(this.$options.songForMagenta)
        slider.max = document.getElementById('totalTime').textContent =
        this.$options.songForMagenta.totalTime.toFixed(1)
        slider.value = '0'
        playState.textContent = player.getPlayState()
        playBtn.disabled = true
        stopBtn.disabled = false
        pauseBtn.disabled = false
        resumeBtn.disabled = true
      })
      stopBtn.addEventListener('click', () => {
        this.$options.lastTimeRel = 0
        player.stop()
        playState.textContent = player.getPlayState()
        playBtn.disabled = false
        stopBtn.disabled = true
        pauseBtn.disabled = true
        resumeBtn.disabled = true
      })
      pauseBtn.addEventListener('click', () => {
        let lastTimeAbsNew = Date.now()
        player.pause()
        this.$options.lastTimeRel += lastTimeAbsNew - this.$options.lastTimeAbs
        this.$options.lastTimeAbs = lastTimeAbsNew
        playState.textContent = player.getPlayState()
        playBtn.disabled = true
        stopBtn.disabled = false
        pauseBtn.disabled = true
        resumeBtn.disabled = false
      })
      resumeBtn.addEventListener('click', () => {
        this.$options.lastTimeAbs = Date.now()
        player.resume()
        playState.textContent = player.getPlayState()
        playBtn.disabled = true
        stopBtn.disabled = false
        pauseBtn.disabled = false
        resumeBtn.disabled = true
      })
      slider.addEventListener('change', () => {
        const t = parseFloat(slider.value)
        this.$options.lastTimeRel = t * 1000
        this.$options.lastTimeAbs = Date.now()
        currentTime.textContent = t.toFixed(1)

        // You don't _have_ to pause and resume the context, but it makes
        // the UI jump around less.
        const playing = (player.getPlayState() === 'started')
        if (playing) {
          player.pause()
        }
        player.seekTo(t)
        if (playing) {
          player.resume()
        }
      })
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
    // a computed getter
    theNotes: function () {
      let answer 
      let notesFormat1 = this.object.notes
      answer.totalTime = this.object2.duration
      answer.notes = notesFormat1.map((note)=>{
        return {}
      })

    }
  }
}
</script>

<style scoped>

</style>