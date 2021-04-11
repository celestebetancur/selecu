import React,  {useState, Suspense} from 'react'
import { Redirect } from "react-router-dom"
import {AuthCheck} from 'reactfire'

import MainScreen from '../animations/MainScreen'
import Landing from './landing'

import panel from '../assets/images/mapa/panel-vacio.png'
import bSettings from '../assets/images/mapa/settings/setting-normal.png'
import bSettingsOver from '../assets/images/mapa/settings/over.png'
import bPushHold from '../assets/images/mapa/settings/push-hold.png'
import bGame from '../assets/images/mapa/game/normal.png'
import bGameOver from '../assets/images/mapa/game/over.png'
import bGPushHold from '../assets/images/mapa/game/push-hold.png'
import bCommunity from '../assets/images/mapa/community/normal.png'
import bCommunityOver from '../assets/images/mapa/community/over.png'
import bCPushHold from '../assets/images/mapa/community/push-hold.png'
import bKnowledge from '../assets/images/mapa/knowledge/normal.png'
import bKnowledgeOver from '../assets/images/mapa/knowledge/over.png'
import bKPushHold from '../assets/images/mapa/knowledge/hold-push.png'

import '../styles/home.scss'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

let s = undefined;

const Home = (props) => {
  const [clickedPlace, setClickedPlace] = useState([]);
  const [elapsedTime, setElapsetTime] = useState([]);

  return(
    <>
    {/*<AuthCheck fallback={<Landing />}>*/}
    <Suspense fallback="cargando...">
      <MainScreen
        onClick={setClickedPlace}
        onTime={setElapsetTime}
      />
      <MainPanel
        clickedPlace={clickedPlace[0]}
        clickedPos={clickedPlace[1]}
        delta={elapsedTime}
      />
      </Suspense>
    {/*</AuthCheck>*/}
    </>
  );
}

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false);
  const [settingsSrc, setSettingsSrc] = useState(bSettings);
  const [gameSrc, setGameSrc] = useState(bGame);
  const [communitySrc, setCommunitySrc] = useState(bCommunity);
  const [knowledgeSrc, setknowlegdeSrc] = useState(bKnowledge);

  let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  let date = new Date();
  let text = `Elapsed time ${props.delta[0]}:${props.delta[1]}:${props.delta[2]} ${days[date.getDay()]} ${date.getDate()}`;

  return(
    <Container>
      <Container id="main-panel-home">
        <p id="panle-coordenadas">COORDENADAS</p>
        <Image src={panel} className="center" id="main-panel-image"/>
          <a href="#/pixelart"><Button id="main-panel-profile-button" >Perfil</Button></a>
          <a href="#/perfilusuario">
            <Image
              src={settingsSrc} className="main-panel-a b-settings"
              onMouseEnter={() => setSettingsSrc(bSettingsOver)}
              onMouseDown={() => setSettingsSrc(bPushHold)}
              onMouseLeave={() => setSettingsSrc(bSettings)}
            />
          </a>
          <a>
            <Image
              src={gameSrc} className="main-panel-a g-settings"
              onMouseEnter={() => setGameSrc(bGameOver)}
              onMouseDown={() => setGameSrc(bGPushHold)}
              onMouseLeave={() => setGameSrc(bGame)}
            />
          </a>
          <a>
            <Image
              src={communitySrc} className="main-panel-a c-settings"
              onMouseEnter={() => setCommunitySrc(bCommunityOver)}
              onMouseDown={() => setCommunitySrc(bCPushHold)}
              onMouseLeave={() => setCommunitySrc(bCommunity)}
            />
          </a>
          <a>
            <Image
              src={knowledgeSrc} className="main-panel-a k-settings"
              onMouseEnter={() => setknowlegdeSrc(bKnowledgeOver)}
              onMouseDown={() => setknowlegdeSrc(bKPushHold)}
              onMouseLeave={() => setknowlegdeSrc(bKnowledge)}
            />
          </a>
      </Container>
    </Container>
  );
}


const TextField = (props) => {
  return (
    <div className="container">
      <textarea className={`command-textarea command-textarea-${props.active}`}/>
    </div>
  );
}

const Instructions = (props) => {
  return (
    <div className="container">
      <p className="p-instruct-true">{props.text}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(Home);
