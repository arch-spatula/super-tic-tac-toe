import { UNIT_SIZE } from '@/constant/constant'
import type { Ref } from 'vue'

export function checkWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>, winCB: () => void) {
  checkColumWin(playersTurn, blockMarksRef, winCB)
  checkRowWin(playersTurn, blockMarksRef, winCB)
  checkDiagonalWin(playersTurn, blockMarksRef, winCB)
}

const markChecker = {
  O: (mark: MarkType) => mark === 'O',
  X: (mark: MarkType) => mark === 'X'
}

function checkColumWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>, winCB: () => void) {
  if (
    Array.from({ length: UNIT_SIZE }, (_, outerIdx) =>
      Array.from(
        { length: UNIT_SIZE },
        (_, innerIdx) => blockMarksRef.value[innerIdx + outerIdx * UNIT_SIZE]
      ).every(markChecker[playersTurn])
    ).some((col) => col)
  ) {
    winCB()
  }
}

function checkRowWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>, winCB: () => void) {
  if (
    Array.from({ length: UNIT_SIZE }, (_, outerIdx) =>
      Array.from(
        { length: UNIT_SIZE },
        (_, innerIdx) => blockMarksRef.value[outerIdx + innerIdx * UNIT_SIZE]
      ).every(markChecker[playersTurn])
    ).some((row) => row)
  ) {
    winCB()
  }
}

function checkDiagonalWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>, winCB: () => void) {
  if (
    [blockMarksRef.value[0], blockMarksRef.value[4], blockMarksRef.value[8]].every(
      markChecker[playersTurn]
    )
  ) {
    winCB()
  }

  if (
    [blockMarksRef.value[2], blockMarksRef.value[4], blockMarksRef.value[6]].every(
      markChecker[playersTurn]
    )
  ) {
    winCB()
  }
}
