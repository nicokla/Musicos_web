<template>
<div class="plusminus horiz">
  <button @click="minusClick()"></button>
  <input type="text" name="productQty" :value="noteName" disabled="true">
  <!-- -->
  <button @click="plusClick()"></button> 
</div>
</template>

<script>
export default {
  data(){
    return {
      index: 60
    }
  },
  myNotes: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
  methods:{
    plusClick(){
      this.index++
    },
    minusClick(){
      this.index--
    },
    getNoteName(noteNumber){
      let noteOutOf12 = (noteNumber + 1200) % 12
      let noteName1 = this.$options.myNotes[noteOutOf12]
      let noteIndex = Math.floor(noteNumber / 12) - 1
      let noteName = `${noteName1}${noteIndex}`
      return noteName
    }
  },
  computed:{
    noteName(){
      return this.getNoteName(this.index)
    }
  }
}
</script>

<style scoped>/*just for demo...*/
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  font-family: BlinkMacSystemFont, futura, 'Roboto', sans-serif;
}

.plusminus {
  display: inline-block;
  position: relative;
  font-size: 0;
  overflow: hidden;
  border-radius: 3px;
  width: 44px;
  height: 132px;
}
.plusminus button {
  display: block;
  width: 44px;
  height: 44px;
  position: absolute;
  margin: 0;
  padding: 0;
  border: 0;
  background: #000;
  color: #fff;
  font-size: 30.8px;
  line-height: 1;
  font-family: bonds, sans-serif;
  cursor: pointer;
  -moz-transition: color 200ms;
  -o-transition: color 200ms;
  -webkit-transition: color 200ms;
  transition: color 200ms;
}
.plusminus button:focus {
  outline: none;
  color: #2bebaf;
}
.plusminus button:disabled {
  background: #999;
  color: #ccc;
  cursor: default;
}
.plusminus button:first-child {
  bottom: 0;
}
.plusminus button:first-child:before {
  content: "-";
}
.plusminus button:last-child {
  top: 0;
}
.plusminus button:last-child:before {
  content: "+";
}
.plusminus button:last-child:focus {
  color: #ff6367;
}
.plusminus input[type="text"] {
  position: absolute;
  width: 44px;
  height: 44px;
  top: 44px;
  margin: 0;
  padding: 0 0 16.92308px;
  border: 0;
  font-size: 17.6px;
  font-weight: bold;
  text-align: center;
  -moz-appearance: textfield;
}
.plusminus input[type="text"]::-webkit-outer-spin-button, .plusminus input[type="text"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.plusminus:after {
  content: "Root";
  position: absolute;
  font-size: 9.68px;
  left: 0;
  right: 0;
  line-height: 1;
  padding: 3.52px 0 3.52px 0;
  width: 44px;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  color: #888;
  text-align: center;
  bottom: 34%;
}
.plusminus.horiz {
  width: 132px;
  height: 44px;
}
.plusminus.horiz button:first-child {
  left: 0;
}
.plusminus.horiz button:last-child {
  right: 0;
}
.plusminus.horiz:after {
  bottom: 0;
}
.plusminus.horiz input[type="text"] {
  position: absolute;
  top: 0;
  left: 44px;
}
.plusminus.stacked {
  width: 88px;
  height: 88px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.plusminus.stacked:after {
  width: 100%;
  bottom: 50%;
}
.plusminus.stacked button {
  float: none;
  top: auto;
  bottom: 0;
}
.plusminus.stacked button:first-child {
  left: 0;
}
.plusminus.stacked button:last-child {
  right: 0;
}
.plusminus.stacked input[type="text"] {
  top: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #eee;
  width: 100%;
}
.plusminus.stacked input[type="text"]:after {
  width: 100%;
}

</style>