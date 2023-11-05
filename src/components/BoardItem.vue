<template>
  <ul v-if="localResult !== 'O' && localResult !== 'X'" class="grid-flow">
    <li
      v-for="(mark, idx) in blockMarks"
      :key="idx"
      class="block"
      @click="markPlayer(idx)"
      :data-test="`space-${idx}`"
    >
      <BoardSpace :mark="mark" />
    </li>
  </ul>
  <div v-if="localResult === 'O' || localResult === 'X'" class="done-board">
    <IconCircle v-if="localResult === 'O'" color="#3B82F6" width="100%" height="100%" />
    <IconX v-if="localResult === 'X'" color="#EF4444" width="100%" height="100%" />
  </div>
</template>

<script setup lang="ts">
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { ref } from 'vue'
import BoardSpace from './BoardSpace.vue'
import { BOARD_SIZE } from '@/constant/constant'
import { useSpaceFlag } from '@/stores/spaceFlag'
import { IconCircle, IconX } from '@tabler/icons-vue'
import { checkWin } from '@/util/win'

const players = usePlayerTurnStore()
const spaceFlag = useSpaceFlag()

const blockMarks = ref<MarkType[]>(Array.from({ length: BOARD_SIZE }, () => 'empty'))
const localResult = ref<Players | 'draw' | 'playing'>('playing')

function markPlayer(blockIdx: number) {
  blockMarks.value[blockIdx] = players.playersTurn
  checkWin(players.playersTurn, blockMarks, () => {
    localResult.value = players.playersTurn
  })

  players.swapTurn()
  spaceFlag.setFlag(blockIdx)
}

const color100Map: Record<Players | 'draw' | 'playing', string> = {
  O: '#DBEAFE',
  X: '#FEE2E2',
  draw: '#f8f8f8',
  playing: '#f8f8f8'
}

function mapColor(map: Record<Players | 'draw' | 'playing', string>) {
  return map[localResult.value]
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
.done-board {
  width: 12rem;
  height: 12rem;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('mapColor(color100Map)');
  border-radius: 1rem;
}
</style>
