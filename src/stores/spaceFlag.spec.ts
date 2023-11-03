import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSpaceFlag } from './spaceFlag'

describe('spaceFlag', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('시작할 때는 정해지지 않으면 null로 지정합니다.', () => {
    const spaceFlag = useSpaceFlag()

    expect(spaceFlag.current).toBeNull()
  })

  it('함수를 호출하면 갱신할 수 있습니다.', () => {
    const spaceFlag = useSpaceFlag()

    spaceFlag.setFlag(0)

    expect(spaceFlag.current).toBe(0)
  })
})
