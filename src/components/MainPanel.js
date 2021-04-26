import React,  {useState} from 'react'
import { Link } from "react-router-dom"
import {StorageImage} from 'reactfire'

import panel from '../assets/images/mapa/panel-vacio.png'
import toggle from '../assets/images/mapa/toggle.png'
import energy from '../assets/images/mapa/energia-bordes.png'
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
import Img from "react-cool-img";
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false);
  const [settingsSrc, setSettingsSrc] = useState(bSettings);
  const [gameSrc, setGameSrc] = useState(bGame);
  const [communitySrc, setCommunitySrc] = useState(bCommunity);
  const [knowledgeSrc, setknowlegdeSrc] = useState(bKnowledge);
  const [toggleMainPanel, setToggleMainPanel] = useState(false);

  return(
    <Container>
      <Container id="main-panel-home" className="container-main-panel">
        <a
          onClick={() => setToggleMainPanel(!toggleMainPanel)}
          style={{cursor:'pointer'}}
          >
            <Img src={toggle} className={`toggle-pos-${toggleMainPanel}`} id="main-panel-toggle"/>
        </a>
        <Container className={`main-panel panel-display-${toggleMainPanel}`}>
        <p id="panel-coordenadas">COORDENADAS</p>
        <Container>
          <textarea
            className='command-textarea'
            onChange={e => props.commandForTarget(e.target.value)}
          />
        </Container>
        <Img src={panel} className="center" id="main-panel-image"/>
          <Link to="pixelart">
            <Button id="main-panel-profile-button" >
            {props.userInfo.info.profileImage &&
              <StorageImage className="image-profile-button" storagePath={"/users/"+props.userInfo.access.UI.slice(0,10)+'/picture/perfil.jpg'} alt="Imagen de perfil"/>
            }
            </Button>
          </Link>
          <Img className="main-panel-b e-settings" src={energy} />
          <Link to="perfilusuario">
            <Img
              src={settingsSrc} className="main-panel-a b-settings"
              onMouseEnter={() => setSettingsSrc(bSettingsOver)}
              onMouseDown={() => setSettingsSrc(bPushHold)}
              onMouseLeave={() => setSettingsSrc(bSettings)}
            />
          </Link>
          <Link>
            <Img
              src={gameSrc} className="main-panel-a g-settings"
              onMouseEnter={() => setGameSrc(bGameOver)}
              onMouseDown={() => setGameSrc(bGPushHold)}
              onMouseLeave={() => setGameSrc(bGame)}
            />
          </Link>
          <Link>
            <Img
              src={communitySrc} className="main-panel-a c-settings"
              onMouseEnter={() => setCommunitySrc(bCommunityOver)}
              onMouseDown={() => setCommunitySrc(bCPushHold)}
              onMouseLeave={() => setCommunitySrc(bCommunity)}
            />
          </Link>
          <Link>
            <Img
              src={knowledgeSrc} className="main-panel-a k-settings"
              onMouseEnter={() => setknowlegdeSrc(bKnowledgeOver)}
              onMouseDown={() => setknowlegdeSrc(bKPushHold)}
              onMouseLeave={() => setknowlegdeSrc(bKnowledge)}
            />
          </Link>
        </Container>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(MainPanel);
