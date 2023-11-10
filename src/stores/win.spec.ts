import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useGlobalWin } from './win'
import { usePlayerTurnStore } from './playerTurn'

describe('spaceFlag', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('시작할 때는 승부가 정해지지 않음', () => {
    const globalWin = useGlobalWin()

    expect(globalWin.isDetermined).toBe(false)
  })

  it('O 가 승리', () => {
    const players = usePlayerTurnStore()
    const globalWin = useGlobalWin()

    globalWin.setWin()

    expect(players.playersTurn).toBe('O')
    expect(globalWin.win).toBe('O win')
    expect(globalWin.isDetermined).toBe(true)
  })

  it('X 가 승리', () => {
    const players = usePlayerTurnStore()
    const globalWin = useGlobalWin()

    players.swapTurn()
    globalWin.setWin()

    expect(players.playersTurn).toBe('X')
    expect(globalWin.win).toBe('X win')
    expect(globalWin.isDetermined).toBe(true)
  })

  it('승부가 정해지면 갱신할 수 없음', () => {
    const players = usePlayerTurnStore()
    const globalWin = useGlobalWin()

    globalWin.setWin()
    players.swapTurn()
    globalWin.setWin()

    expect(players.playersTurn).toBe('X')
    expect(globalWin.win).toBe('O win')
  })
})
