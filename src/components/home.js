import React,  {useState, Suspense, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import {AuthCheck, StorageImage} from 'reactfire'

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

import { FaCog } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaExpandArrowsAlt } from "react-icons/fa";
import diagram from '../assets/images/icons/diagram.svg'

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
              button1={FaExpandArrowsAlt}
              button2={FaUserFriends}
              button3={FaGlobeAmericas}
              button4={diagram}
              button1Action={() => setSetContentActive(!contentActive)}
            />
          </Row>
        </Container>
      </AuthCheck>
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(Home);
