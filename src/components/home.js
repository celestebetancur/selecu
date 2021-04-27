import React,  {useState, Suspense} from 'react'
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

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ');

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
        <Container className="home-canvas-container" fluid>
          <MainScreen
            commands={commandForTarget}
          />
          <Row>
            <MainPanel
              textFunction='COORDENADAS'
              commandForTarget={(val) => setCommandsForTarget(val)}
              button1={FaExpandArrowsAlt}
              button2={FaUserFriends}
              button3={FaGlobeAmericas}
              button4={FaCog}
              button4Action='perfilusuario'
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
