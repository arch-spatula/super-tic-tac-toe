import { describe, it, expect, beforeEach, vi } from 'vitest'
import { checkWin } from './checkWin'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

describe('checkWin', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('가로 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<MarkType[]>([
      'empty',
      'empty',
      'empty',
      'O',
      'O',
      'O',
      'empty',
      'empty',
      'empty'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('세로 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<MarkType[]>([
      'O',
      'empty',
      'empty',
      'O',
      'empty',
      'empty',
      'O',
      'empty',
      'empty'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('대각선 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<MarkType[]>([
      'O',
      'empty',
      'empty',
      'empty',
      'O',
      'empty',
      'empty',
      'empty',
      'O'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })
})
