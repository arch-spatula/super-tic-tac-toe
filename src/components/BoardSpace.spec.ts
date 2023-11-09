import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BoardSpace from './BoardSpace.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('BoardSpace', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // 스타일에 대한 지역 상태 이외 상태 의존을 최소화함

  it('초기 값은 비어있어야 합니다.', () => {
    const wrapper = mount(BoardSpace, { props: { mark: 'playing' } })

    expect(wrapper.find('.tabler-icon-circle').exists()).toBe(false)
    expect(wrapper.find('.tabler-icon-x').exists()).toBe(false)
  })

  it('O가 표시하면 O가 표시됩니다.', () => {
    const wrapper = mount(BoardSpace, { props: { mark: 'O' } })

    expect(wrapper.find('.tabler-icon-circle').exists()).toBe(true)
  })

  it('2번 클릭하면 표시가 덮어써지지 않습니다.', () => {
    const wrapper = mount(BoardSpace, { props: { mark: 'X' } })

    expect(wrapper.find('.tabler-icon-x').exists()).toBe(true)
  })
})
