import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux';
import { FieldState } from "./Field";
export interface State {
  board: FieldState[][];
  activePlayer: 'X' | 'O';
}
const defaultState: State = {
  board: (Array(3).fill(Array(3).fill({ value: null, fieldIdx: -1, rowIdx: -1 } as FieldState)) as FieldState[][]).map((row, rowIdx) => row.map((field, fieldIdx) => ({ ...field, fieldIdx, rowIdx }))),
  activePlayer: 'X'
}

function rootReducer(currentState: State, action: { type: string, payload: any }) {
  switch (action.type) {
    case 'FIELD_CLICK':
      return {
        ...currentState,
        board: currentState.board.map((row, rowIdx) => row.map((currentField, fieldIdx) => ({
          ...currentField,
          value: (action.payload as FieldState).fieldIdx === fieldIdx
            && (action.payload as FieldState).rowIdx === rowIdx
            && currentField.value === null
            ? currentState.activePlayer
            : currentField.value
        }))),
        activePlayer: (currentState.activePlayer === 'X' ? 'O' : 'X' as 'X' | 'O')
      }
    default:
      return defaultState;
  }
}

const store = createStore(rootReducer);

const render = () => ReactDOM.render(
  <App
    state={store.getState()}
    onFieldClick={(x: FieldState) => store.dispatch({ type: 'FIELD_CLICK', payload: x })}
  />,
  document.getElementById('root') as HTMLElement
);

render();
store.subscribe(render);

registerServiceWorker();
