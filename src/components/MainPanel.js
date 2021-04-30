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
  const [toggleMainPanel, setToggleMainPanel] = useState(false);

  return(
    <Container>
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
          <Link to="pixelapp">
            <Button id="main-panel-profile-button" >
            {props.userInfo.info.profileImage &&
              <StorageImage className="image-profile-button" storagePath={"/users/"+props.userInfo.access.UI.slice(0,10)+'/picture/perfil.jpg'} alt="Imagen de perfil"/>
            }
            </Button>
          </Link>
          <Container className="main-panel-b e-settings">
            <div>
              <Img className="img-energy-container" src={energy} />
            </div>
            <div className='energyBar' style={{width:'7.95rem'}}>
            </div>
          </Container>
          <Link to={props.button4Action}>
            <Button
              className="main-panel-a b-settings"
            ><span className="center-icons">{props.button4()}</span></Button>
          </Link>
          <Link to="home">
            <Button
              className="main-panel-a g-settings"
            ><span className="center-icons">{props.button3()}</span></Button>
          </Link>
          <Link to="comunidad">
            <Button
              className="main-panel-a c-settings"
            ><span className="center-icons">{props.button2()}</span></Button>
          </Link>
          <Link to="">
            <Button
              className="main-panel-a k-settings"
            ><span className="center-icons">{props.button1()}</span></Button>
          </Link>
        </Container>
      </Container>
    </Container>
  );
}

MainPanel.propTypes = {
  commandForTarget: PropTypes.func,
  user: PropTypes.object,
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
