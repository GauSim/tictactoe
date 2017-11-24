import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { FieldState } from "./Field";
import { gameStateReducer } from "./reducers/gameStateReducer";
import { logger } from "./middleware/logger";
import { registerBot } from "./middleware/bot";
import { FIELD_LEAVE, FIELD_ENTER, FIELD_CLICK } from "./actions/gameState";


const store = createStore(gameStateReducer, applyMiddleware(logger));

registerBot('X',store);

registerBot('O',store);


const render = () => ReactDOM.render(
  <App
    state={store.getState()}
    onClick={(x: FieldState) => store.dispatch({ type: FIELD_CLICK, payload: x })}
    onMouseEnter={(x: FieldState) => store.dispatch({ type: FIELD_ENTER, payload: x })}
    onMouseLeave={(x: FieldState) => store.dispatch({ type: FIELD_LEAVE, payload: x })}
  />,
  document.getElementById('root') as HTMLElement
);

render();
store.subscribe(render);

registerServiceWorker();
