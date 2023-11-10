import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePlayerTurnStore } from '@/stores/playerTurn'
import { ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { checkWin } from './checkWin'

describe('checkWin', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('가로 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<LocalResultType[]>([
      'playing',
      'playing',
      'playing',
      'O',
      'O',
      'O',
      'playing',
      'playing',
      'playing'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('세로 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<LocalResultType[]>([
      'O',
      'playing',
      'playing',
      'O',
      'playing',
      'playing',
      'O',
      'playing',
      'playing'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('대각선 승리인지 확인합니다.', () => {
    const players = usePlayerTurnStore()
    const blockMarks = ref<LocalResultType[]>([
      'O',
      'playing',
      'playing',
      'playing',
      'O',
      'playing',
      'playing',
      'playing',
      'O'
    ])
    const mock = vi.fn(() => 0)

    checkWin(players.playersTurn, blockMarks, mock)

    expect(mock).toHaveBeenCalledTimes(1)
  })
})
