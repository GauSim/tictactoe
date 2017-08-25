import { GameState } from "../reducers/gameState";
import { PlayerState } from "../Field";
type T = { winner: PlayerState | null, reason: [number, number, number] }

export function getWinner(state: GameState): T {

  const none: T = { winner: null, reason: [-1, -1, -1] };

  const allMovesCommitted = !state.board.some(it => !it.isCommited);
  if (!allMovesCommitted) {
    return { ...none };
  }

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (state.board[a].value === state.board[b].value
      && state.board[a].value === state.board[c].value) {
      return { winner: state.board[a].value, reason: [a, b, c] };
    };
  }
  
  return { ...none };
}