
import { GameState } from "../reducers/gameState";
import { Store } from "redux";
import { FIELD_CLICK } from "../actions/gameState";
import { getPossibleMoves } from "../facts/getPossibleMoves";
import { FieldState } from "../Field";

let current: GameState;



export function registerBot(store: Store<GameState>) {

  


  function rankMove(move: FieldState): number {

    // 1. try to win with the next move 
    // 2. prevent other player from winning => does he win when this field is not moved to
    // 3. try to place in corner 

    // random is not AI :)
    const r = Math.floor((Math.random() * 10) + 1);

    return r;
  }

  function rankMoves(possibleMoves: FieldState[]): { move: FieldState, rank: number }[] {
    return possibleMoves.map((move, idx) => ({
      move,
      rank: rankMove(move)
    }))
  }


  function perform(x: FieldState) {
    store.dispatch({ type: FIELD_CLICK, payload: x });
  }

  return store.subscribe(() => {
    const previous = current
    current = store.getState() as GameState;

    if (!previous
      || !current
      || previous.activePlayer === current.activePlayer
      || current.activePlayer === 'X') {
      return;
    }
    console.log('thinking ...');

    const possibleMoves = getPossibleMoves(current);

    const [bestMove] = rankMoves(possibleMoves)
      .sort((a, b) => a.rank >= b.rank ? 0 : 1)
      .map(it => it.move);

    perform(bestMove)

    console.log('done ...');

  });

}