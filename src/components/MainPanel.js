import React,  {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import {StorageImage} from 'reactfire'
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg'
import ReactHowler from 'react-howler'

import bleep from '../assets/audio/bleep.ogg'

import panel from '../assets/images/mapa/panel-vacio.png'
import toggle from '../assets/images/mapa/toggle.png'
import button from '../assets/images/icons/fondo.png'

import art from '../assets/images/icons/art.svg'
import profileIcon from '../assets/images/icons/profile-user.svg'

import '../styles/home.scss'
import Container from 'react-bootstrap/Container'
import Img from "react-cool-img";
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false)
  const [toggleMainPanel , setToggleMainPanel] = useState(false)
  const [toggleSubMenu , setToggleSubMenu] = useState(false)

  const setApp = (val) => {
    props.setAppActive(true)
    props.setIndex(val)
  }

  const toggleAppSubMenu = () => {
    setToggleSubMenu(!toggleSubMenu)
    props.setAppActive(!props.appActive)
    props.setIndex(-1)
  }

  return(
    <Container>
      <ReactHowler
        src={bleep}
        playing={(!props.btProfileState && !props.appActive) ? true : false}
        loop={!props.btProfileState && !props.appActive ? true : false}
      />
      <Container id="main-panel-home" className="container-main-panel">
        <div
          onClick={() => setToggleMainPanel(!toggleMainPanel)}
          style={{cursor:'pointer'}}
          >
            <Img src={toggle} className={`toggle-pos-${toggleMainPanel}`} id="main-panel-toggle"/>
        </div>
        <Container className={`main-panel panel-display-${toggleMainPanel}`}>
        <p id="panel-coordenadas" className="text-center">{props.textFunction}</p>
        <Container>
          <textarea
            className='command-textarea'
            onChange={e => props.commandForTarget(e.target.value)}
          />
        </Container>
        <Img src={panel} className="center" id="main-panel-image"/>
            <Button
              id="main-panel-profile-button"
              className={`btn-jump-${!props.btProfileState}`}
              onClick={() => toggleAppSubMenu()}
              >
            {props.userInfo.info.profileImage &&
              <StorageImage className="image-profile-button-done" storagePath={"/users/"+props.userInfo.access.UI.slice(0,10)+'/picture/perfil.jpg'} alt="Imagen de perfil"/>
            }
            </Button>
            {props.children}

            <span
              onClick={props.bt1State ? props.button1Action : null}
              className={`main-panel-a k-settings bt-active-${props.bt1State}`}
            >
              <Img src={button} className="panel-button-img-sm"/>
              <ReactSVG className="center-icons-sm" src={props.button1}/>
            </span>

            <Link to="home"
              onClick={() => props.setAppActive(false)}
              className={`main-panel-a c-settings bt-active-${props.bt2State}`}
            >
              <Img src={button} className="panel-button-img-lg" />
              <ReactSVG className="center-icons-lg" src={props.button2}/>
            </Link>
            <span className={`main-panel-submenu ${toggleSubMenu}`}>
              <ReactSVG
                onClick={() => setApp(0)}
                style={{filter:'drop-shadow(1px 1px 1px #284482'}}
                className="center-icons-submenu-1" src={art}/>
              <ReactSVG
                onClick={() => setApp(1)}
                style={{filter:'drop-shadow(1px 1px 1px #284482'}}
                className="center-icons-submenu-2"
                src={profileIcon}/>
            </span>
        </Container>
      </Container>
    </Container>
  );
}

MainPanel.propTypes = {
  commandForTarget: PropTypes.func,
  user: PropTypes.object,
  button4Action: PropTypes.string,
  textFunction: PropTypes.string,
  bt1State: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(MainPanel);
