import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <CSSReset />
        <App />
      </DndProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
