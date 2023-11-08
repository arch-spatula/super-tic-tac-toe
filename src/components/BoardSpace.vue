<template>
  <button class="block">
    <IconCircle v-if="props?.mark === 'O'" color="#3B82F6" />
    <IconX v-if="props?.mark === 'X'" color="#EF4444" />
  </button>
</template>

<script setup lang="ts">
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { IconX, IconCircle } from '@tabler/icons-vue'

type MarkType = 'empty' | Players
type BoardSpaceProps = {
  mark: MarkType
  disabled: boolean
}

const props = withDefaults(defineProps<BoardSpaceProps>(), { mark: 'empty', disabled: false })

const player = usePlayerTurnStore()

const color100Map: Record<Players, string> = {
  O: '#DBEAFE',
  X: '#FEE2E2'
}

const color200Map: Record<Players, string> = {
  O: '#BFDBFE',
  X: '#FECACA'
}

function mapColor(map: Record<Players, string>) {
  if (props.mark === 'empty') return map[player.playersTurn]
  else return '#f8f8f8'
}
</script>

<style scoped>
.block {
  all: unset;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind('$props.disabled ? "#F3F4F6" : "#f8f8f8" ');
  border-radius: 0.5rem;
}

.block:hover {
  background-color: v-bind('$props.disabled ? "#F3F4F6" : mapColor(color100Map)');
}

.block:active {
  background-color: v-bind('$props.disabled ? "#F3F4F6" :mapColor(color200Map)');
}
</style>
