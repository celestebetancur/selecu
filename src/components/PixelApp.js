import React, {useState} from 'react';
import MainPanel from './MainPanel'
import Img from "react-cool-img";

import {connect} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Auth from './Auth'
import App from '../App'
import PixelArt from '../animations/Milecu/pixelArt'
import CommandPixelArtfrom from '../animations/Milecu/commandsPixelArt'

import fondo from '../assets/images/pixelapp/fondo-colors.png'
import marco from '../assets/images/pixelapp/cuadrícula.png'

const PixelApp = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ')

  const user = props.userInfo

  return (
    <Container className="justify-content-center" style={{overflow:'hidden', height:'80%'}} fluid>
      <Row className="container-pixelapp justify-content-center">
        <Img style={{width:"90%",height:'70%'}} src={fondo}/>
        <PixelArt />
      </Row>
      <MainPanel
        user={user}
        commandForTarget={(val) => setCommandsForTarget(val)}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(PixelApp);
