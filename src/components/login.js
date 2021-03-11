import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import Auth from './Auth'
import App from '../App'

import {loginFirstStage} from '../actions'

// 0 - Gestores
// 1 - Mentores
//  Aprendices
//    - 2 pre
//    - 3 primero
//    - 4 segundo
//    - 5 tercero
//    - 6 cuarto
//    - 7 quinto
//    - 8 sexto
//    - 9 séptimo
//    - 10 octavo
//    - 11 noveno
//    - 12 décimo
//    - 13 undécimo

const grades = ['Gestores','Mentores','Tercero','Cuarto'];

const Login = (props) => {


  useEffect(() => {
    if(props.userRoll === null){
      props.loginFirstStage(false);
    }
  },[]);

    return (
      <div>
        <Auth
          roll={grades[props.userRoll]}
         />
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    userRoll: state.userRollPass,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loginFirstStage})(Login);
