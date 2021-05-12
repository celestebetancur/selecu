import React  from 'react';
import { IconContext } from "react-icons";

import button from '../assets/images/icons/fondo.png'
import { ReactSVG } from 'react-svg'
import Img from "react-cool-img"
import next from '../assets/images/icons/next.svg'
import { BsFillVolumeUpFill } from "react-icons/bs";

import Readalong from '../animations/readalong.js'

const AudioReader = (props) => {

  return(
    <button
      className="button-pages btn-audioReader">
      <Img src={button} style={{width:'3rem',display:'inline'}}/>
      <IconContext.Provider
        value={{ color: 'white', size: '30px' }}
      >
        <BsFillVolumeUpFill className="center-icons-c"/>
      </IconContext.Provider >
      < Readalong
        text="hola este texto es para probar hola este texto es para probar hola este texto es para probar hola este texto es para probar"
      />
    </button>
  )
}

export default AudioReader;
