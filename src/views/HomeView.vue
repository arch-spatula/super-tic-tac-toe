<template>
  <h2>{{ players.playersTurn }}'s turn and {{ winMark }}</h2>
  <ul class="grid-flow">
    <li v-for="(mark, idx) in blockMarks" :key="idx" class="block" @click="markPlayer(idx)">
      {{ mark }}
    </li>
  </ul>
  <BoardItem />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import BoardItem from '@/components/BoardItem.vue'

type MarkType = 'empty' | Players
type WinMarkType = 'No one win' | 'X win' | 'O win'

const players = usePlayerTurnStore()

const blockMarks = ref<MarkType[]>(Array.from({ length: 9 }, () => 'empty'))
const winMark = ref<WinMarkType>('No one win')

function markPlayer(blockIdx: number) {
  if (blockMarks.value[blockIdx] !== 'empty' || winMark.value !== 'No one win') return

  blockMarks.value[blockIdx] = players.playersTurn
  players.swapTurn()
  checkWin()
}

const markChecker = {
  O: (mark: MarkType) => mark === 'O',
  X: (mark: MarkType) => mark === 'X'
}

function checkWin() {
  if (
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 0]).every(markChecker['O']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 3]).every(markChecker['O']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 6]).every(markChecker['O'])
  ) {
    winMark.value = 'O win'
  }

  if (
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 0]).every(markChecker['X']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 3]).every(markChecker['X']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[idx + 6]).every(markChecker['X'])
  ) {
    winMark.value = 'X win'
  }

  if (
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[0 + idx * 3]).every(markChecker['O']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[1 + idx * 3]).every(markChecker['O']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[2 + idx * 3]).every(markChecker['O'])
  ) {
    winMark.value = 'O win'
  }

  if (
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[0 + idx * 3]).every(markChecker['X']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[1 + idx * 3]).every(markChecker['X']) ||
    Array.from({ length: 3 }, (_, idx) => blockMarks.value[2 + idx * 3]).every(markChecker['X'])
  ) {
    winMark.value = 'X win'
  }

  if ([blockMarks.value[0], blockMarks.value[4], blockMarks.value[8]].every(markChecker['O'])) {
    winMark.value = 'O win'
  }
  if ([blockMarks.value[0], blockMarks.value[4], blockMarks.value[8]].every(markChecker['X'])) {
    winMark.value = 'X win'
  }
  if ([blockMarks.value[2], blockMarks.value[4], blockMarks.value[6]].every(markChecker['O'])) {
    winMark.value = 'O win'
  }
  if ([blockMarks.value[2], blockMarks.value[4], blockMarks.value[6]].every(markChecker['X'])) {
    winMark.value = 'X win'
  }
}
</script>

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
