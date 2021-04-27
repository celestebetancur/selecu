import React, {useState, useEffect} from 'react'
import App from '../App'
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
        sessionStorage.clear();
        localStorage.clear();
        props.loginFirstStage(false);
        props.loadUserData({});
        props.userRollPass(null);
        window.open("/","_self");
      }
    );
  }

    if(signOutCompleted){
      return(
        <App />
      );
    }

    return (
      <Button
        variant="dark"
        onClick={signOutFB}
        className={props.className}
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
