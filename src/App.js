import React, {Suspense}  from 'react';
import Landing from './components/landing'

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from './actions'

import Spinner from 'react-bootstrap/Spinner'
import './styles/app.css'

const App = (props) => {

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <Landing />
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
