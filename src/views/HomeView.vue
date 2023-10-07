<script setup lang="ts">
import { ref } from 'vue'

type Players = 'O' | 'X'
type MarkType = 'empty' | Players

const blockMarks = ref<MarkType[]>([
  'empty',
  'empty',
  'empty',
  'empty',
  'empty',
  'empty',
  'empty',
  'empty',
  'empty'
])
const playersTurn = ref<Players>('O')

function markPlayer(blockIdx: number) {
  if (blockMarks.value[blockIdx] !== 'empty') return

  const currentPlayer = playersTurn.value
  blockMarks.value[blockIdx] = currentPlayer
  if (currentPlayer === 'O') playersTurn.value = 'X'
  if (currentPlayer === 'X') playersTurn.value = 'O'
}
</script>

<template>
  <h2>{{ playersTurn }}'s turn'</h2>
  <ul class="grid-flow">
    <li v-for="(mark, idx) in blockMarks" :key="idx" class="block" @click="markPlayer(idx)">
      {{ mark }}
    </li>
  </ul>
</template>

<style scoped>
.grid-flow {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 15rem;
  height: 15rem;
}
.block {
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
.block:hover {
  background-color: #f0f0f0;
}
.block:active {
  background-color: #e8e8e8;
}
</style>
