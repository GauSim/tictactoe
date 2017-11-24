import { PlayerState } from "../Field";
import { BoardState } from "../reducers/gameStateReducer";
export type T = { winner: PlayerState | null, reason: [number, number, number] }

export function getWinner(board: BoardState): T {

  const none: T = { winner: null, reason: [-1, -1, -1] };

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
    if (board[a].value && board[b].value && board[c].value
      && board[a].isCommited && board[b].isCommited && board[c].isCommited
      && board[a].value === board[b].value && board[b].value === board[c].value) {
      return { winner: board[a].value, reason: [a, b, c] };
    };
  }

  return { ...none };
}