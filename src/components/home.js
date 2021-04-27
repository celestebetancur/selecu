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

import bSettings from '../assets/images/mapa/settings/setting-normal.png'
import bSettingsOver from '../assets/images/mapa/settings/over.png'
import bPushHold from '../assets/images/mapa/settings/push-hold.png'
import bGame from '../assets/images/mapa/game/normal.png'
import bGameOver from '../assets/images/mapa/game/over.png'
import bGPushHold from '../assets/images/mapa/game/push-hold.png'
import bCommunityOver from '../assets/images/mapa/community/over.png'
import bCPushHold from '../assets/images/mapa/community/push-hold.png'
import bCommunity from '../assets/images/mapa/community/normal.png'
import bKnowledge from '../assets/images/mapa/knowledge/normal.png'
import bKnowledgeOver from '../assets/images/mapa/knowledge/over.png'
import bKPushHold from '../assets/images/mapa/knowledge/hold-push.png'

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ');

  const user = props.userInfo;

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
        <Container className="home-canvas-container" fluid>
          <MainScreen
            commands={commandForTarget}
          />
          <Row>
            <MainPanel
              user={user}
              textFunction='COORDENADAS'
              commandForTarget={(val) => setCommandsForTarget(val)}
              button4={[bSettingsOver,bPushHold,bSettings]}
              button3={[bGameOver,bGPushHold,bGame]}
              button2={[bCommunityOver,bCPushHold,bCommunity]}
              button1={[bKnowledgeOver,bKPushHold,bKnowledge]}
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
