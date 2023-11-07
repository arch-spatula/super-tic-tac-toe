import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePlayerTurnStore } from './playerTurn'

type WinMarkType = 'No one win' | 'X win' | 'O win'

export const useGlobalWin = defineStore('win', () => {
  const players = usePlayerTurnStore()

  const winMark = ref<WinMarkType>('No one win')

  const winMap: Record<Players, () => void> = {
    O: () => {
      winMark.value = 'O win'
    },
    X: () => {
      winMark.value = 'X win'
    }
  }

  /** 승부 결정 */
  const isDetermined = computed(() => winMark.value !== 'No one win')

  const win = computed(() => winMark.value)

  /** 승부를 정하면 변경할 수 없음  */
  function setWin() {
    if (isDetermined.value) return
    winMap[players.playersTurn]()
  }

  return { win, isDetermined, setWin }
})
