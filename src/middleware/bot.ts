
import { GameState } from "../reducers/gameState";
import { Store } from "redux";
import { FIELD_CLICK } from "../actions/gameState";
import { getPossibleMoves } from "../facts/getPossibleMoves";
import { FieldState } from "../Field";

let current: GameState;



export function registerBot(store: Store<GameState>) {

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

    const moves = getPossibleMoves(current);

    const [move] = moves.map((move, idx) => ({
      move,
      rank: 0 // cal rank of move
    }))
    .sort((a, b) => a.rank >= b.rank ? 0 : 1)
    .map(it => it.move);

    perform(move)

    console.log('done ...');

  });

}