import { defineStore } from 'pinia'
import { ref } from 'vue'

type PlayersTurnType = 'O' | 'X'

export const usePlayerTurnStore = defineStore('playerTurn', () => {
  const playersTurn = ref<PlayersTurnType>('O')

  function swapTurn() {
    const currentPlayer = playersTurn.value
    if (currentPlayer === 'O') playersTurn.value = 'X'
    if (currentPlayer === 'X') playersTurn.value = 'O'
  }

  return { playersTurn, swapTurn }
})
