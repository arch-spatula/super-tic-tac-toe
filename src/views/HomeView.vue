<template>
  <h2>{{ players.playersTurn }}'s turn and {{ globalWin.win }}</h2>

  <ul class="gird-board">
    <li v-for="(elem, idx) in blockMarks" :key="idx" class="board-item">
      <BoardItem
        v-model="blockMarks"
        :idx="idx"
        :board-win="checkBoardWin"
        :disabled="idx !== spaceFlag.current && spaceFlag.current !== null"
      />
    </li>
  </ul>
  <Teleport v-if="globalWin.isDetermined" to="body">
    <WinPopup />
  </Teleport>
</template>

<script setup lang="ts">
import { Teleport, ref } from 'vue'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import BoardItem from '@/components/BoardItem.vue'
import { BOARD_SIZE } from '@/constant/constant'
import { checkWin } from '@/util/checkWin'
import { useGlobalWin } from '@/stores/win'
import { useSpaceFlag } from '@/stores/spaceFlag'
import WinPopup from '@/components/WinPopup.vue'

const players = usePlayerTurnStore()
const globalWin = useGlobalWin()
const blockMarks = ref<LocalResultType[]>(Array.from({ length: BOARD_SIZE }, () => 'playing'))
const spaceFlag = useSpaceFlag()

function checkBoardWin() {
  if (globalWin.isDetermined) return

  checkWin(players.playersTurn, blockMarks, () => {
    globalWin.setWin()
  })

  determinedResult()
  checkFiveWin()
}

function checkFiveWin() {
  if (blockMarks.value.filter((board) => board === 'O').length >= 5) globalWin.setWin()
  if (blockMarks.value.filter((board) => board === 'X').length >= 5) globalWin.setWin()
}

function determinedResult() {
  if (blockMarks.value.includes('playing')) return
  globalWin.isDetermined
  if (
    blockMarks.value.filter((board) => board === 'O').length >
    blockMarks.value.filter((board) => board === 'X').length
  ) {
    if (players.playersTurn !== 'O') players.swapTurn()
    globalWin.setWin()
  }
  if (
    blockMarks.value.filter((board) => board === 'O').length <
    blockMarks.value.filter((board) => board === 'X').length
  ) {
    if (players.playersTurn !== 'X') players.swapTurn()
    globalWin.setWin()
  }
  globalWin.setDraw()
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
