import { describe, it, expect, beforeEach } from 'vitest'
import { usePlayerTurnStore } from './playerTurn'
import { createPinia, setActivePinia } from 'pinia'

describe('playerTurn', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("should start with O's turn", () => {
    const players = usePlayerTurnStore()

    expect(players.playersTurn).toBe('O')
  })

  it("should swap to  X's turn", () => {
    const players = usePlayerTurnStore()

    players.swapTurn()

    expect(players.playersTurn).toBe('X')
  })

  it("should swap back to  O's when it's called twice turn", () => {
    const players = usePlayerTurnStore()

    players.swapTurn()
    players.swapTurn()

    expect(players.playersTurn).toBe('O')
  })
})
