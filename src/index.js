import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MilecuFirst from './animations/Milecu/MilecuFirst'
import Home from './components/home'

import { HashRouter, Switch, Route  } from "react-router-dom"

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
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path ="/" component={App} exact />
            <Route path ="/app" component={MilecuFirst} exact />
            <Route path ="/home" component={Home} exact />
          </Switch>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </FirebaseAppProvider>,
  document.getElementById('root')
);
