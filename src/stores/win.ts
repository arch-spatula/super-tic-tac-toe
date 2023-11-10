import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePlayerTurnStore } from './playerTurn'

type WinMarkType = 'No one win' | 'X win' | 'O win' | 'Not determined'

export const useGlobalWin = defineStore('win', () => {
  const players = usePlayerTurnStore()

  const winMark = ref<WinMarkType>('Not determined')

  const winMap: Record<Players, () => void> = {
    O: () => {
      winMark.value = 'O win'
    },
    X: () => {
      winMark.value = 'X win'
    }
  }

  /** 승부 결정 */
  const isDetermined = computed(() => winMark.value !== 'Not determined')

  const win = computed(() => winMark.value)

  /** 승부를 정하면 변경할 수 없음  */
  function setWin() {
    if (isDetermined.value) return
    winMap[players.playersTurn]()
  }

  function setDraw() {
    winMark.value = 'No one win'
  }

  return { win, isDetermined, setWin, setDraw }
})
