import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import 'firebase/auth'
import { useFirebaseApp} from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData,loginFirstStage, userRollPass} from '../actions'

const SignOut = (props) => {
  const [signOutCompleted, setSignOutCompleted] = useState(false);

  const firebase = useFirebaseApp();

  const signOutFB = async () =>{
    window.alert("Estás por salir de SELECU");
    await firebase.auth().signOut().then(
      () => {
        setSignOutCompleted(true);
      }
    );
  }

  useEffect(()=>{
    if(signOutCompleted){
      sessionStorage.clear();
      localStorage.clear();
      props.loginFirstStage(false);
      props.loadUserData({});
      props.userRollPass(null);
    }
  },[signOutCompleted]);

    return (
      <Button
        variant="primary"
        onClick={signOutFB}
        >{props.text}
      </Button>
    );
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage, userRollPass})(SignOut);
