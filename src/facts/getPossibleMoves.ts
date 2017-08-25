import { GameState } from "../reducers/gameState";

export const getPossibleMoves = (game: GameState) => game.board.filter(it => !it.value)