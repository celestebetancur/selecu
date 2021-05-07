import React from 'react'
import Profile from './Profile'
import Container from 'react-bootstrap/Container'
import Img from "react-cool-img";

import fondo from '../assets/images/pixelapp/fondo-colors.png'

const MainProfile = (props) => {
  return (
    <Container className="bg-img-profile font-learners" fluid
      style={{backgroundImage: `url(${fondo})`, paddingLeft:'0rem',position:'absolute'}}>
        <Profile
          updateState={props.updateState}
          setUpdateState={props.setUpdateState}
          />
    </Container>
  )
}

export default MainProfile
