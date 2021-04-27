import React, {Suspense}  from 'react';
import Landing from './components/landing'
import Login from './components/login'
import FillRedux from './components/fillRedux'

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from './actions'

import {AuthCheck} from 'reactfire'

import Spinner from 'react-bootstrap/Spinner'
import './styles/app.css'

const App = (props) => {

  if(props.firstStageStatus){
    return (
      <Login
        roll={props.userRoll}
      />
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
    userRoll: state.userRollPass
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(App);
