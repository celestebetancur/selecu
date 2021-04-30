import React,  {useState} from 'react'
import { Link } from "react-router-dom"
import {StorageImage} from 'reactfire'
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg'

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
            <Button id="main-panel-profile-button" >
            {props.userInfo.info.profileImage &&
              <StorageImage className="image-profile-button" storagePath={"/users/"+props.userInfo.access.UI.slice(0,10)+'/picture/perfil.jpg'} alt="Imagen de perfil"/>
            }
            </Button>
          <Container className="main-panel-b e-settings">
            <div>
              <Img className="img-energy-container" src={energy} />
            </div>
            <div className='energyBar' style={{width:'7.95rem'}}>
            </div>
          </Container>
            <Button
              className="main-panel-a b-settings"
            >  </Button>
          <Link to="home">
            <Button
              className="main-panel-a g-settings"
            ><span className="center-icons"></span></Button>
          </Link>
            <Button
              className="main-panel-a c-settings"
            ><span className="center-icons"></span></Button>
            <Button
              onClick={props.button1Action}
              className="main-panel-a k-settings"
            ><ReactSVG className="center-icons" src={props.button4}/></Button>
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
