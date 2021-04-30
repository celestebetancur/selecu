import React, {useEffect, useState}  from 'react';
import {connect} from 'react-redux'

import Img from "react-cool-img";
import Container from 'react-bootstrap/Container'
import { ReactSVG } from 'react-svg'

import CDialogo from '../assets/images/content/CuadroDialogo.png'

import next from '../assets/images/icons/next.svg'
import back from '../assets/images/icons/back.svg'
import button from '../assets/images/icons/fondo.png'

const ContentDisplay = (props) => {
  const [index, setIndex] = useState(0)
  const [inputText, setInputText] = useState('')

  const checkInput = (text) => {
    const posible = ['COMO','CÓMO','¿COMO','¿CÓMO','PUEDO','AYUDAR','AYUDAR?']
    let counter = 0;
    for (let word of text.toUpperCase().split(' ')){
      if(posible.includes(word)){
        counter++;
      }
    }
    if(counter === 3){
      setIndex(1)
    }
  }

  const setIndexUp = () => {
    setIndex(index+1)
  }
  const setIndexDown = () => {
    setIndex(index-1)
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
      checkInput(inputText)
    }, 3000);
    return () => clearTimeout(timer);
  },[inputText])

  return(
      <div>
        {index === 0 &&
          <ContainerBack>
            <Intro
              setInputText={setInputText}
              nick={props.userInfo.info.nick}
            />
          </ContainerBack>
        }
        {index === 1 &&
          <ContainerBack>
            <TxtAlone
              text={props.contentToDiplay[index].mainText}
              index={index}
              setIndexUp={setIndexUp}
              setIndexDown={setIndexDown}
            />
          </ContainerBack>
        }
        {index === 2 &&
          <ContainerBack>
            <TxtAlone
              text={props.contentToDiplay[index].mainText}
              index={index}
              setIndexUp={setIndexUp}
              setIndexDown={setIndexDown}
            />
          </ContainerBack>
        }
      </div>
  )
}

const ContainerBack = (props) => {
  return (
    <div className="container-text-background">
      <Img src={CDialogo} className="img-text-background centerX" />
      {props.children}
    </div>
  )
}

const Intro = (props) => {
  return(
    <>
      <p className="p-content-main">
        {props.nick}
        <br />
        ¡El mundo te necesita!
      </p>
      <input
        onChange={e => props.setInputText(e.target.value)}
        className="input-content-enter"
        type="text"/>
    </>
  )
}

const TxtAlone = (props) => {
  return(
    <>
      <p className="p-content-main">
        {props.text}
      </p>
      {props.index > 1 &&
        <button
          onClick={()=>props.setIndexDown()}
          className="button-pages bt-back">
          <Img src={button} style={{width:'3rem'}}/>
          <ReactSVG className="center-icons" src={back}/>
        </button>
      }
      <button
        onClick={()=>props.setIndexUp()}
        className="button-pages bt-next">
        <Img src={button} style={{width:'3rem',display:'inline'}}/>
        <ReactSVG className="center-icons" src={next}/>
      </button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    contentToDiplay: state.loadContent,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(ContentDisplay);
