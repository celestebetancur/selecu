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

import '../styles/gridsystem.scss'

let s = undefined;

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ');

  const user = props.userInfo;

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
        <Container className="grid-main-parent" fluid>
          <MainScreen
            commands={commandForTarget}
          />
          <Row className="grid-row-half pt-50">
            <MainPanel
              user={user}
              commandForTarget={(val) => setCommandsForTarget(val)}
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
