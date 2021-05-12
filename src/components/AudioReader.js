import React, {useState} from 'react';
import { IconContext } from "react-icons";

import button from '../assets/images/icons/fondo.png'
import { ReactSVG } from 'react-svg'
import Img from "react-cool-img"
import next from '../assets/images/icons/next.svg'
import { BsFillVolumeUpFill } from "react-icons/bs";

import Readalong from '../animations/readalong.js'

const AudioReader = (props) => {
  const [play, setPlay] = useState(false)

  return(
    <button
      onClick={() => setPlay(!play)}
      className="button-pages btn-audioReader">
      <Img src={button} style={{width:'3rem',display:'inline'}}/>
      <IconContext.Provider
        value={{ color: 'white', size: '30px' }}
      >
        <BsFillVolumeUpFill className="center-icons-c"/>
      </IconContext.Provider >
      <Readalong
        play={play}
        text={props.text}
        offsets={props.offsets}
        audio={props.audio}
      />
    </button>
  )
}

export default AudioReader;
