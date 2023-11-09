<template>
  <div class="teleport-container">
    <form class="modal-container">
      <button class="new-game-btn">
        <IconCircle
          width="240px"
          height="240px"
          v-if="players.playersTurn === 'X'"
          color="#3B82F6"
        />
        <IconX width="240px" height="240px" v-if="players.playersTurn === 'O'" color="#EF4444" />
        <span>win's </span>
      </button>
    </form>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { IconX } from '@tabler/icons-vue'
import { IconCircle } from '@tabler/icons-vue'

const players = usePlayerTurnStore()
</script>

<style>
.teleport-container {
  position: fixed;
  top: 0;
  left: 0;
  /* display: flex; */
}

.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.new-game-btn {
  all: unset;
  font-size: 12rem;
  cursor: pointer;
  color: v-bind('players.playersTurn !== "O" ? "#3B82F6":"#EF4444"');
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  height: 100vh;
  width: 100vw;
  background-color: #00000040;
}

.win-mark {
  width: 15rem;
}
</style>
