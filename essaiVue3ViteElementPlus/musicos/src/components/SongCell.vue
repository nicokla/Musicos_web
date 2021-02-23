<template>
<div class='flex bg-white shadow-md my-2 p-4 item'>
  <!-- {{theSong.title}} -->
  <div>
    <img v-if="theSong.imageUrl" :src="theSong.imageUrl" :alt="theSong.title"/>
    <img v-else src="../img/defaultPicture.png" :alt="theSong.title"/>
  </div>
  <div class='ml-2'>
    <h2 class='font-bold text-xl'>{{theSong.title}}</h2>
    <h3>{{theSong.ownerName}}</h3>
  </div>
</div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

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
  }
})

const state = reactive({ count: 0 })

// onMounted(() => {
//   // ...
// })

</script>

<style scoped>

img {
  width: 120px;
  height: 90px;
}

.item{
  width: calc(100% - 5mm);
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