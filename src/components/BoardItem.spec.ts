import { beforeEach, describe, expect, it } from 'vitest'
import BoardItem from './BoardItem.vue'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { usePlayerTurnStore } from '@/stores/playerTurn'

describe('BoardItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('시작할 때 모두 비어있음', () => {
    const wrapper = mount(BoardItem, { props: {} })

    expect(wrapper.find('.tabler-icon-circle').exists()).toBe(false)
    expect(wrapper.find('.tabler-icon-x').exists()).toBe(false)
  })

  it('클릭하면 플레이어 차례가 바뀜', () => {
    const wrapper = mount(BoardItem, { props: {} })
    const playerTurn = usePlayerTurnStore()
    expect(playerTurn.playersTurn).toBe('O')

    const space0 = wrapper.get('[data-test="space-0"')
    space0.trigger('click')

    expect(playerTurn.playersTurn).toBe('X')
    expect(wrapper.find('.tabler-icon-circle').exists()).toBe(false)
    expect(wrapper.find('.tabler-icon-x').exists()).toBe(false)
  })
})
