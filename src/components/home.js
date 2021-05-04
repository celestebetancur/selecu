import React,  {useState, Suspense, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import {AuthCheck, StorageImage} from 'reactfire'
import {map} from '../helpers'

import MainScreen from '../animations/MainScreen'
import MainPanel from './MainPanel'
import App from '../App'

import '../styles/home.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Img from "react-cool-img";
import Spinner from 'react-bootstrap/Spinner'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

import energy from '../assets/images/mapa/energia-bordes.png'
import diagram from '../assets/images/icons/diagram.svg'
import tierra from '../assets/images/icons/tierra.svg'

import ContentLoader from './ContentLoader'
import ContentDisplay from './ContentDisplay'

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ');
  const [registry, setRegistry] = useState('');
  const [contentActive, setSetContentActive] = useState(false);

  useEffect(()=>{
    let type = props.userInfo.info === '' ? 'undefined' : props.userInfo.registry.year
    setRegistry(type)
  })

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
          <ContentLoader
            degree={registry.toLowerCase()}
          />
        <Container className="home-canvas-container" fluid>
          {props.userInfo.info.profileImage === false &&
            <div className="container-glass-full"></div>
          }
          <MainScreen
            commands={commandForTarget}
          />
        {contentActive &&
          <ContentDisplay />
        }
          <Row>
            <MainPanel
              textFunction='COORDENADAS'
              commandForTarget={(val) => setCommandsForTarget(val)}
              button1={diagram}
              button2={tierra}
              button1Action={() => setSetContentActive(!contentActive)}
              bt1State={props.userInfo.info.profileImage}
              bt2State={props.userInfo.info.profileImage}
              btProfileState={!props.userInfo.info.profileImage}
            >
            <Energy />
            </ MainPanel>
          </Row>
        </Container>
      </AuthCheck>
    </Suspense>
  );
}

const Energy = () => {
  const [time , setTime] = useState(0)

  useEffect(()=>{
    let tempTime = new Date().getHours()
    let normalizedTime = tempTime >= 6 && tempTime < 20 ? tempTime : -1
    let widthEnergy = map(normalizedTime,6,20,181,0)
    setTime(widthEnergy)
  })

  return(
    <Container className="main-panel-b e-settings">
      <div>
        <Img className="img-energy-container" src={energy} />
      </div>
      <div className='energyBar' style={{width:`${time}px`}}>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(Home);
