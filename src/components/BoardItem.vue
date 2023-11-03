<template>
  <ul class="grid-flow">
    <li v-for="(mark, idx) in blockMarks" :key="idx" class="block" @click="markPlayer(idx)">
      <BoardSpace :mark="mark" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { ref } from 'vue'
import BoardSpace from './BoardSpace.vue'

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
  list-style-type: none;
}
</style>
