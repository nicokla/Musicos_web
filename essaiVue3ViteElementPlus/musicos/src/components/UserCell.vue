

<template>
<div class='flex flex-col justify-center bg-white shadow-md my-2 p-4 item'>
  <h2 class='font-bold text-xl ml-1 mb-0'>{{theUser.name}}</h2>
</div>
</template>

<script setup>
// [@vue/compiler-sfc] <script setup> is still an experimental proposal.
// Follow its status at https://github.com/vuejs/rfcs/pull/227.
import { defineProps, onMounted, reactive, ref, useContext, watch } from "vue";

const ctx = useContext();

const props = defineProps({
  theUser: {
    type: Object,
    default() {
      return {
        title: '',
        imageUrl: '',
        ownerName: '',
      }
    }
  },
})

const state = reactive({ count: 0 })

// onMounted(() => {
//   // ...
// })

</script>

<style scoped>

.item{
  /* width: calc(100% - 5mm); */
  cursor: pointer;
}

</style>
