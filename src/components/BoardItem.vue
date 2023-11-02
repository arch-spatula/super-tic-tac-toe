<template>
  <ul class="grid-flow">
    <li v-for="(mark, idx) in blockMarks" :key="idx" class="block" @click="markPlayer(idx)">
      {{ mark }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { ref } from 'vue'

type MarkType = 'empty' | Players

const players = usePlayerTurnStore()

const blockMarks = ref<MarkType[]>(Array.from({ length: 9 }, () => 'empty'))

function markPlayer(blockIdx: number) {
  // if (blockMarks.value[blockIdx] !== 'empty' || winMark.value !== 'No one win') return
  blockMarks.value[blockIdx] = players.playersTurn
  players.swapTurn()
  // checkWin()
}
</script>

<style scoped>
.grid-flow {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 12rem;
  height: 12rem;
  padding: 0;
}
.block {
  width: 4rem;
  height: 4rem;
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
