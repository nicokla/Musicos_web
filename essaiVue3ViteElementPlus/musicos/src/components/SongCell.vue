

<template>
<div class='flex bg-white shadow-md my-2 p-4 item'>
  <!-- {{theSong.title}} -->
  <img v-if="theSong.imageUrl" :src="theSong.imageUrl" :alt="theSong.title"/>
  <img v-else src="../img/defaultPicture.png" :alt="theSong.title"/>
  <div class='ml-2'>
    <h2 class='font-bold text-xl'>{{theSong.title}}</h2>
    <h3>{{theSong.ownerName}}</h3>
  </div>
  <div v-if="canBeDeleted" class='flex items-center ml-auto '>
    <i-mdi-delete style="font-size: 2em; color: black" class='deleteButton' v-on:click="deleteSong"/>
  </div>
</div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref, useContext, watch } from "vue";

const ctx = useContext();

const props = defineProps({
  theSong: {
    type: Object,
    default() {
      return {
        title: '',
        imageUrl: '',
        ownerName: '',
      }
    }
  },
  canBeDeleted:{
    type: Boolean,
    default() {
      return true
    }
  }
})

const state = reactive({ count: 0 })

function deleteSong(){
  console.log('yop')
  ctx.emit('deleteEvent')
}

// onMounted(() => {
//   // ...
// })

</script>

<style scoped>

.deleteButtonContainer{
  padding: 4mm;
  background-color: tomato;
}

.deleteButton {
  border-radius: 100%;
  background-color: tomato;
  height: 12mm;
  width: 12mm;
}

img {
  width: 120px;
  height: 90px;
}

.item{
  width: calc(100% - 5mm);
  cursor: pointer;
}

.itemOld{
  width: calc(100% - 0mm);

  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 0.333;
  /* flex: 0 0 0.333; */
  /* width: 80%; */
  /* height: 1cm; */

  line-height: 1cm;

  margin-top: 3px;
  margin-bottom: 3px;
  /* margin: 3px; */
	padding: 10px;

	opacity: 1;
	cursor: pointer;
	background-color: #ffd6a7;
	border: 5px solid #ffc527;
	border-radius: 8px;
	color: rgb(0, 0, 0);
	font-size: 24px;
	text-align: center;
}
</style>
