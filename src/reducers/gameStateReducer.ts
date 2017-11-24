import { FieldState, PlayerState } from "../Field";
import { FIELD_CLICK, FIELD_ENTER, FIELD_LEAVE } from "../actions/gameState";

export type BoardState = [
  FieldState, FieldState, FieldState,
  FieldState, FieldState, FieldState,
  FieldState, FieldState, FieldState
];

export interface GameState {
  board: BoardState;
  activePlayer: PlayerState;
  hoverRollback: null | BoardState;
}

const defaultState: GameState = {
  board: Array(9).fill(null).map(
    (_, idx): FieldState => ({ idx, value: null, isCommited: true })
  ) as BoardState,
  activePlayer: 'X',
  hoverRollback: null
}

export function gameStateReducer(currentState: GameState, { type, payload }: { type: string, payload: FieldState }):GameState {
  switch (type) {
    case FIELD_CLICK:
      return {
        ...currentState,
        board: currentState.board.map(
          (it, idx): FieldState => ({
            ...it,
            value: idx === payload.idx ? currentState.activePlayer : it.value,
            isCommited: idx === payload.idx ? true : it.isCommited
          })
        ) as BoardState,
        activePlayer: (currentState.activePlayer === 'X' ? 'O' : 'X' as PlayerState),
        hoverRollback: null
      }
    case FIELD_ENTER:
      return {
        ...currentState,
        board: currentState.board.map(
          (it, idx): FieldState => ({
            ...it,
            value: idx === payload.idx ? currentState.activePlayer : it.value,
            isCommited: idx === payload.idx ? false : it.isCommited
          })
        ) as BoardState,
        hoverRollback: currentState.board
      }
    case FIELD_LEAVE:
      return {
        ...currentState,
        board: currentState.hoverRollback
          ? currentState.hoverRollback
          : currentState.board,
        hoverRollback: null
      }
    default:
      return defaultState;
  }
}