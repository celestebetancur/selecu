import React, {Suspense}  from 'react';
import Landing from './components/landing'
import Login from './components/login'
import Home from './components/home'
import FillRedux from './components/fillRedux'

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from './actions'

import {AuthCheck, useUser} from 'reactfire'

import Spinner from 'react-bootstrap/Spinner'
import './styles/app.css'

const App = (props) => {

  if(props.firstStageStatus){
    return (
      <AuthCheck fallback={<Login/>}>
        <FillRedux />
      </AuthCheck>
    );
  }

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<Landing/>}>
        <FillRedux />
      </AuthCheck>
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(App);
