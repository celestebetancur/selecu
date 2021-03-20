import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter, Switch, Route  } from "react-router-dom"

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

import config from './config/configDB'
import { FirebaseAppProvider } from 'reactfire'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path ="/" component={App} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </FirebaseAppProvider>,
  document.getElementById('root')
);
