<template>
  <h2>{{ players.playersTurn }}'s turn and {{ winMark }}</h2>

  <ul class="gird-board">
    <li v-for="(elem, idx) in blockMarks" :key="idx" class="board-item">
      <BoardItem v-model="blockMarks" :idx="idx" :board-win="checkBoardWin" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import BoardItem from '@/components/BoardItem.vue'
import { BOARD_SIZE } from '@/constant/constant'
import { checkWin } from '@/util/win'

type MarkType = 'empty' | Players
type WinMarkType = 'No one win' | 'X win' | 'O win'

const players = usePlayerTurnStore()
const blockMarks = ref<MarkType[]>(Array.from({ length: BOARD_SIZE }, () => 'empty'))
const winMark = ref<WinMarkType>('No one win')

function checkBoardWin() {
  const winMap: Record<Players, () => void> = {
    O: () => {
      winMark.value = 'O win'
    },
    X: () => {
      winMark.value = 'X win'
    }
  }
  checkWin(players.playersTurn, blockMarks, () => {
    winMap[players.playersTurn]()
  })
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
