import React,  {useState} from 'react'
import { Redirect } from "react-router-dom"
import MainScreen from '../animations/MainScreen'
import Profile from './Profile'
import App from '../App'

import panel from '../assets/images/mapa/panel-vacio.png'

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
  const [profileToggle, setProfileToggle] = useState(false);


  if(profileToggle){
    return(
      <Profile
        onReturnToMap={setProfileToggle}
        update={true}
        signOut={true}
        returnToMap={true}
      />
    );
  }
  if(props.userData.data !== null){
    return(
      <React.Fragment>
          <MainScreen
            onClick={setClickedPlace}
            onTime={setElapsetTime}
          />
          <MainPanel
            clickedPlace={clickedPlace[0]}
            clickedPos={clickedPlace[1]}
            delta={elapsedTime}
            onAvatar={setProfileToggle}
          />
      </React.Fragment>
    );
  }
  return <App />;
}

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false);

  let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  let date = new Date();
  let text = `Elapsed time ${props.delta[0]}:${props.delta[1]}:${props.delta[2]} ${days[date.getDay()]} ${date.getDate()}`;

  return(
    <Container>
      <Container id="main-panel-home">
        <Image src={panel} className="center" id="main-panel-image"/>
          <Button id="main-panel-profile-button" onClick={()=>props.onAvatar(true)}>Perfil</Button>
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
