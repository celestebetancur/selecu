import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {BrowserView, MobileView} from "react-device-detect";
import {FallbackMobile} from './fallbackAccessDenied'

import Auth from './Auth'
import App from '../App'

import {loginFirstStage} from '../actions'

const grades = ['Primero','Segundo','Tercero','Cuarto','Gestores','Mentores'];

const Login = (props) => {

  useEffect(() => {
    if(props.userRoll === null){
      props.loginFirstStage(false);
    }
  },[]);

  return (
    <>
      <BrowserView>
      {props.userRoll === null
        ? <Auth roll={grades[0]}/>
        : <Auth roll={grades[props.userRoll]}/>
      }
      </BrowserView>
      <MobileView>
        <FallbackMobile />
      </MobileView>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userRoll: state.userRollPass
  };
}

export default connect(mapStateToProps,{loginFirstStage})(Login);
