import React, {useState} from 'react';
import {BrowserView} from "react-device-detect";

import HomePuzzle from '../animations/HomePuzzle'
import NavBar from './Main/navbar.js'
import SobreNosotros from'./Main/sobrenosotros.js'
import NuestraFilosofia from'./Main/nuestrafilosofia.js'
import Contacto from'./Main/contacto.js'
import Comunidad from'./Main/comunidad.js'

import Img from "react-cool-img";

import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/landing.scss'

import {connect} from 'react-redux'

import {loginFirstStage, userRollPass} from '../actions'

import background from '../assets/images/landing/background.png'
import symbol from '../assets/images/landing/symbol.png'
import key from '../assets/images/landing/key.png'

const Landing = (props) => {

  const keyMentors = () => {
    props.userRollPass(5);
    props.loginFirstStage(true);
  }
  const keyAdmin = () => {
    props.userRollPass(4);
    props.loginFirstStage(true);
  }

  return (
    <>
      <NavBar/>
      <Container className="h-100 mh-100" fluid>
        <Row className="pt-4">
          <Container className="bg-img" style={{backgroundImage:`url(${background})`}} fluid>
              <Row className="justify-content-center symbol-container" lg={7}>
                <Img className="mt-5" src={symbol} style={{width:'30px'}}/>
              </Row>
              <Row className="justify-content-center" id="divP5Puzzle" lg={7}>
                <HomePuzzle/>
                <BrowserView>
                  <OverlayTrigger
                    trigger="click"
                    key='left'
                    placement='left'
                    overlay={
                      <Popover id='popover-positioned-left'>
                        <Popover.Title as="h3">Ingreso para Mentores y Gestores</Popover.Title>
                        <Popover.Content>
                          <Button variant="warning" className="mr-3 ml-3" onClick={keyMentors}>Mentores</Button>
                          <Button variant="warning" onClick={keyAdmin}>Gestores</Button>
                        </Popover.Content>
                      </Popover>
                    }
                    >
                    <Button variant="secondary" className="landing-button-popover" style={{backgroundImage:`url(${key})`}} />
                  </OverlayTrigger>
                </BrowserView>
              </Row>
            </Container>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userRoll: state.userRollPass
  };
}

export default connect(mapStateToProps,{
  loginFirstStage,
  userRollPass
})(Landing);
