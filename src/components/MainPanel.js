import React,  {useState} from 'react'
import { Link } from "react-router-dom"
import {StorageImage} from 'reactfire'
import PropTypes from 'prop-types';

import panel from '../assets/images/mapa/panel-vacio.png'
import toggle from '../assets/images/mapa/toggle.png'
import energy from '../assets/images/mapa/energia-bordes.png'

import '../styles/home.scss'
import Container from 'react-bootstrap/Container'
import Img from "react-cool-img";
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false);
  const [settingsSrc, setSettingsSrc] = useState(props.button4[2]);
  const [gameSrc, setGameSrc] = useState(props.button3[2]);
  const [communitySrc, setCommunitySrc] = useState(props.button2[2]);
  const [knowledgeSrc, setknowlegdeSrc] = useState(props.button1[2]);
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
        <p id="panel-coordenadas" className="text-center">{props.textFunction}</p>
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
          <Link to={props.button4Action}>
            <Img
              src={settingsSrc} className="main-panel-a b-settings"
              onMouseEnter={() => setSettingsSrc(props.button4[0])}
              onMouseDown={() => setSettingsSrc(props.button4[1])}
              onMouseLeave={() => setSettingsSrc(props.button4[2])}
            />
          </Link>
          <Link>
            <Img
              src={gameSrc} className="main-panel-a g-settings"
              onMouseEnter={() => setGameSrc(props.button3[0])}
              onMouseDown={() => setGameSrc(props.button3[1])}
              onMouseLeave={() => setGameSrc(props.button3[2])}
            />
          </Link>
          <Link>
            <Img
              src={communitySrc} className="main-panel-a c-settings"
              onMouseEnter={() => setCommunitySrc(props.button2[0])}
              onMouseDown={() => setCommunitySrc(props.button2[1])}
              onMouseLeave={() => setCommunitySrc(props.button2[2])}
            />
          </Link>
          <Link>
            <Img
              src={knowledgeSrc} className="main-panel-a k-settings"
              onMouseEnter={() => setknowlegdeSrc(props.button1[0])}
              onMouseDown={() => setknowlegdeSrc(props.button1[1])}
              onMouseLeave={() => setknowlegdeSrc(props.button1[2])}
            />
          </Link>
        </Container>
      </Container>
    </Container>
  );
}

MainPanel.propTypes = {
  commandForTarget: PropTypes.func,
  user: PropTypes.object,
  button1: PropTypes.array,
  button2: PropTypes.array,
  button3: PropTypes.array,
  button4: PropTypes.array,
  button4Action: PropTypes.string,
  textFunction: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(MainPanel);
