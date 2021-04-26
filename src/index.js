import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route  } from "react-router-dom"
//Firebase----------------------------------------------------------------------
import config from './config/configDB'
import { FirebaseAppProvider } from 'reactfire'
//Redux stuff-------------------------------------------------------------------
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
//Entry point-------------------------------------------------------------------
import App from './App';
//Landing Page------------------------------------------------------------------
import SobreNosotros from './components/Main/sobrenosotros'
import NuestraFilosofia from './components/Main/nuestrafilosofia'
import Comunidad from './components/Main/comunidad'
import Contacto from './components/Main/contacto'
//LOGIN AND AUTH----------------------------------------------------------------
import Login from './components/login'
//Home for different usersList
import Home from './components/home'
import Gestores from './components/Gestores'
import Mentores from './components/Mentores'

import PixelArt from './animations/Milecu/pixelArt'
import CardMenu from './components/cardMenu'
import Profile from './components/Profile'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
    {/*<React.StrictMode>*/}
      <Provider store={store}>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            {/*Landing page--------------------------------------------------*/}
            <Route path ="/" component={App} exact />
            <Route path ="/quienessomos" component={SobreNosotros}/>
            <Route path ="/nuestrafilosofia" component={NuestraFilosofia}/>
            <Route path ="/comunidad" component={Comunidad}/>
            <Route path ="/contacto" component={Contacto}/>
            {/*Login---------------------------------------------------------*/}
            <Route path ="/login" component={Login} exact />
            {/*Home----------------------------------------------------------*/}
            <Route path ="/homementores" component={Mentores} exact />
            <Route path ="/homegestores" component={Gestores} exact />

            <Route path ="/pixelart" component={PixelArt} exact />
            <Route path ="/home" component={Home} exact />
            <Route path ="/perfilusuario" component={Profile} exact />


            <Route path ="/test" component={CardMenu} exact />
          </Switch>
        </HashRouter>
      </Provider>
    {/*</React.StrictMode>*/}
  </FirebaseAppProvider>,
  document.getElementById('root')
);
