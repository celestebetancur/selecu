import React, {useState} from 'react';
import MainPanel from './MainPanel'
import Img from "react-cool-img";

import {connect} from 'react-redux'
import {parser} from '../animations/commands.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Auth from './Auth'
import App from '../App'
import PixelArt from '../animations/Milecu/pixelArt'

import fondo from '../assets/images/pixelapp/fondo-colors.png'
import marco from '../assets/images/pixelapp/cuadrícula.png'

import { FaPowerOff } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { BsGrid3X3 } from "react-icons/bs";

const PixelApp = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ')

  return (
    <Container className="justify-content-center" style={{overflow:'hidden', height:'80%'}} fluid>
      <Row className="container-pixelapp justify-content-center">
        <Img style={{width:"90%",height:'70%'}} src={fondo}/>
        <PixelArt
          commands={parser(commandForTarget)}
        />
      </Row>
      <MainPanel
        textFunction='CONFIGURACIÓN'
        commandForTarget={(val) => setCommandsForTarget(val)}
        button1={FaPowerOff}
        button2={FaCamera}
        button3={FaGlobeAmericas}
        button4={BsGrid3X3}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(PixelApp);
