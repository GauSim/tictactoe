
import { GameState, gameStateReducer } from "../reducers/gameStateReducer";
import { Store } from "redux";
import { FIELD_CLICK } from "../actions/gameState";
import { getPossibleMoves } from "../facts/getPossibleMoves";
import { FieldState, PlayerState } from "../Field";
import { getWinner } from "../facts/getWinner";

function isMoveToWin(palyer: PlayerState, state: GameState, move: FieldState): boolean {
  return getWinner(gameStateReducer(state, { type: FIELD_CLICK, payload: move }).board).winner === palyer;
}

export function registerBot(me: PlayerState = 'X', store: Store<GameState>) {

  const otherPlayer = me === 'O' ? 'X' : 'O';
  let currentState: GameState;

  function rankMove(move: FieldState): number {
    // 5. random is not AI :)
    let rank = Math.floor((Math.random() * 5) + 1);

    // 4. human has a corner position? go for center (+50)
    if (move.idx === 4 &&
      currentState.board.some(it => [0, 2, 6, 8].indexOf(it.idx) != -1 && it.isCommited && it.value === otherPlayer)) {
      console.log('############## CENTER');
      rank = rank + 50;
    }

    // 3. human has or i have center go for corner [0,3,6,8] 
    if ([0, 3, 6, 8].indexOf(move.idx) > -1 && currentState.board[4].value && currentState.board[4].isCommited) {
      console.log('############## CORNER');
      rank = rank + 25;
    }

    // 2. prevent other player from winning => does he win when this field is not moved to (+500)
    if (isMoveToWin(otherPlayer, { ...currentState, activePlayer: otherPlayer }, move)) {
      console.log('############## PREVENT WIN');
      rank = rank + 100;
    }

    // 1. try to win with the next move (+100)
    if (isMoveToWin(me, currentState, move)) {
      console.log('############## I CAN WIN');
      rank = rank + 200;
    }

    return rank;
  }

  function getBestNextMove(possibleMoves: FieldState[]): FieldState {

    console.log('thinking ...');
    const [{ move }] = possibleMoves
      .map((move, idx) => ({ move, rank: rankMove(move) }))
      .sort((a, b) => a.rank >= b.rank ? 0 : 1)

    return move;
  }


  const act = () => {

    currentState = store.getState() as GameState;

    const possibleMoves = getPossibleMoves(currentState);
    if (!currentState
      || currentState.activePlayer === otherPlayer
      || possibleMoves.length === 0
      || getWinner(currentState.board).winner) {

      console.log(me, 'skip...');
      return;
    }
    setTimeout(() => {

      store.dispatch({
        type: FIELD_CLICK,
        payload: getBestNextMove(possibleMoves)
      });

    }, 400);
  };

  store.subscribe(act);
  act();

}