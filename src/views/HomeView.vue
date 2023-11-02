<template>
  <h2>{{ players.playersTurn }}'s turn and {{ winMark }}</h2>

  <ul class="gird-board">
    <li v-for="(elem, idx) in OuterBoard" :key="idx" class="board-item">
      <BoardItem />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import BoardItem from '@/components/BoardItem.vue'

type MarkType = 'empty' | Players
type WinMarkType = 'No one win' | 'X win' | 'O win'

const players = usePlayerTurnStore()

const OuterBoard = ref(Array.from({ length: 9 }))

const blockMarks = ref<MarkType[]>(Array.from({ length: 9 }, () => 'empty'))
const winMark = ref<WinMarkType>('No one win')

function markPlayer(blockIdx: number) {
  if (blockMarks.value[blockIdx] !== 'empty' || winMark.value !== 'No one win') return

  blockMarks.value[blockIdx] = players.playersTurn
  players.swapTurn()
  // checkWin()
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
.gird-board {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 37.75rem;
  gap: 0.5rem;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
