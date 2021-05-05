import React, {useState, useEffect} from 'react';
import MainPanel from './MainPanel'
import Img from "react-cool-img";

import {connect} from 'react-redux'
import {parser} from '../animations/commands.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Auth from './Auth'
import App from '../App'
import {PixelArt} from '../animations/Milecu/pixelArt'

import { FaPowerOff } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { BsGrid3X3 } from "react-icons/bs";

const PixelApp = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ')

  useEffect(()=>{
    setCommandsForTarget(props.commands)
  },[props.commands])

  return (
    <PixelArt
      commands={parser(commandForTarget)}
      grid={props.grid}
      camara={props.camara}
      ready={props.ready}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(PixelApp);
