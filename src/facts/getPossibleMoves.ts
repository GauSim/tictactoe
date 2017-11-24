import { GameState } from "../reducers/gameStateReducer";

export const getPossibleMoves = (game: GameState) => game.board.filter(it => !it.value && it.isCommited)