<template>
<div class='item'>{{theSong.title}}</div>
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
.item{
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 0.333;
  /* flex: 0 0 0.333; */
  /* width: 80%; */
  /* height: 1cm; */
  width: calc(100% - 0mm);

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