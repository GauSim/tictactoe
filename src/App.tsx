import * as React from 'react';
import './App.css';
import { Button } from './Button';
import { Field, FieldState } from './Field';
import { State } from "./index";


function isGameOver(state: State) {
  
  const rowList = state.board.map(row => row.map(f => f.value ? f.value : '#').join(''));

  console.log(`rowList.join('').replace('_', '').length`, rowList.join('').replace('',''))
  const canMakeMove = rowList.join('').replace('_', '').length === (state.board.length ^ 2);


  const [winnerByRow] = rowList.map((current) => {
    return current.indexOf('XXX') != -1
      ? 'X'
      : current.indexOf('OOO') != -1
        ? 'O'
        : null
  }).filter(it => !!it);


  const winnerByCol = ((rowList.reduce((last, row) => { return last === row[0] ? row[0] : null; }, rowList[0])
    || []) as (string | null)[])

  console.log(rowList);
  console.log('winnerByCol', winnerByCol);

  return winnerByRow || !canMakeMove
    ? 'game over' + (
      winnerByRow
        ? `${winnerByRow} wins`
        : ''
    )
    : 'next turn: ' + state.activePlayer
}

class App extends React.Component<{ state: State, onFieldClick: (x: FieldState) => any }> {
  render() {
    return (
      <div className="App">

        <Button />
        <h1>{
          isGameOver(this.props.state)
        }
        </h1>
        <div className="flex-grid">
          {this.props.state.board.map(
            (row, rowIdx) => row.map(
              (field, fieldIdx) => <Field {...field} onFieldClick={this.props.onFieldClick} />)
          )}
        </div>

      </div>
    );
  }
}

export default App;
