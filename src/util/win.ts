import { UNIT_SIZE } from '@/constant/constant'
import type { Ref } from 'vue'

export function checkWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>) {
  checkColumWin(playersTurn, blockMarksRef)
  checkRowWin(playersTurn, blockMarksRef)
  checkDiagonalWin(playersTurn, blockMarksRef)
}

const markChecker = {
  O: (mark: MarkType) => mark === 'O',
  X: (mark: MarkType) => mark === 'X'
}

function checkColumWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>) {
  if (
    Array.from({ length: UNIT_SIZE }, (_, outerIdx) =>
      Array.from(
        { length: UNIT_SIZE },
        (_, innerIdx) => blockMarksRef.value[innerIdx + outerIdx * UNIT_SIZE]
      ).every(markChecker[playersTurn])
    ).some((col) => col)
  ) {
    console.log(`${playersTurn} win`)
  }
}

function checkRowWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>) {
  if (
    Array.from({ length: UNIT_SIZE }, (_, outerIdx) =>
      Array.from(
        { length: UNIT_SIZE },
        (_, innerIdx) => blockMarksRef.value[outerIdx + innerIdx * UNIT_SIZE]
      ).every(markChecker[playersTurn])
    ).some((row) => row)
  ) {
    console.log(`${playersTurn} win`)
  }
}

function checkDiagonalWin(playersTurn: Players, blockMarksRef: Ref<MarkType[]>) {
  if (
    [blockMarksRef.value[0], blockMarksRef.value[4], blockMarksRef.value[8]].every(
      markChecker[playersTurn]
    )
  ) {
    console.log(`${playersTurn} win`)
  }

  if (
    [blockMarksRef.value[2], blockMarksRef.value[4], blockMarksRef.value[6]].every(
      markChecker[playersTurn]
    )
  ) {
    console.log(`${playersTurn} win`)
  }
}
