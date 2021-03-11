import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter, Switch, Route  } from "react-router-dom"

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers'

import config from './config/configDB'
import { FirebaseAppProvider,useUser } from 'reactfire'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <Provider store={createStore(reducers)}>
        <BrowserRouter>
          <Switch>
            <Route path ="/" component={App} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
