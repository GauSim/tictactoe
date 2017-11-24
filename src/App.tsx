import * as React from 'react';
import './App.css';
import { Field, FieldState } from './Field';
import { GameState } from "./reducers/gameStateReducer";
import { getPossibleMoves } from "./facts/getPossibleMoves";
import { getWinner } from "./facts/getWinner";

class App extends React.Component<{
  state: GameState,
  onClick: (x: FieldState) => any,
  onMouseEnter: (x: FieldState) => any,
  onMouseLeave: (x: FieldState) => any,
}> {
  render() {

    const { winner, reason } = getWinner(this.props.state.board);
    
    return (
      <div className="App">
        <span>
          {
            (winner || getPossibleMoves(this.props.state).length === 0)
              ? winner ? `winner:${winner}` : 'draw'
              : 'next ==>>> ' + this.props.state.activePlayer
          }
        </span>
        <div className="flex-grid">
          {this.props.state.board.map(
            (field, idx) => <Field
              {...field}
              key={idx}
              highlight={winner && reason.indexOf(idx) > -1 ? true : false}
              onClick={it => (!winner && !it.isCommited && it.value ? this.props.onClick(it) : void 0)}
              onMouseEnter={it => winner || (it.value && it.isCommited) ? void 0 : this.props.onMouseEnter(it)}
              onMouseLeave={it => winner || it.isCommited ? void 0 : this.props.onMouseLeave(it)}
            />)
          }
        </div>

      </div>
    );
  }
}

export default App;
