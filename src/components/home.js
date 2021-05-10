import React,  {useState, Suspense, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import {AuthCheck} from 'reactfire'
import { ReactSVG } from 'react-svg'
import {map} from '../helpers'

import MainScreen from '../animations/MainScreen'
import MainPanel from './MainPanel'
import PixelApp from './PixelApp'
import App from '../App'
import MainProfile from './MainProfile'

import '../styles/home.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Img from "react-cool-img";
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

import button from '../assets/images/icons/fondo.png'
import energy from '../assets/images/mapa/energia-bordes.png'
import diagram from '../assets/images/icons/diagram.svg'
import tierra from '../assets/images/icons/tierra.svg'

import next from '../assets/images/icons/next.svg'
import back from '../assets/images/icons/back.svg'
import buttonImg from '../assets/images/icons/fondo.png'

import { FiCamera, FiCameraOff } from "react-icons/fi";
import { MdGridOff, MdGridOn } from "react-icons/md";
import { FaStar} from "react-icons/fa";
import { IoArrowUndoOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";

import ContentLoader from './ContentLoader'
import ContentDisplay from './ContentDisplay'

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ')
  const [registry, setRegistry] = useState('')
  const [contentActive, setSetContentActive] = useState(false)
  const [appActive, setAppActive] = useState(false)
  const [index, setIndex] = useState(-1)

  const [camaraState, setCamaraState] = useState(false)
  const [gridState, setGridState] = useState(true)
  const [paintState, setPaintState] = useState(false)
  const [readyState, setReadyState] = useState(false)

  const [updateState, setUpdateState] = useState(false)

  useEffect(()=>{
    let type = props.userInfo.info === '' ? 'undefined' : props.userInfo.registry.year
    setRegistry(type)
    console.log(index);
  })

  const setIndexUp = () => {
    setIndex((index+1)%2)
  }
  const setIndexDown = () => {
    setIndex((Math.abs(index-1))%2)
  }

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
          <ContentLoader
            degree={registry.toLowerCase()}
          />
        <Container className="home-canvas-container" fluid>
          {props.userInfo.info.profileImage === false &&
            <div className="container-glass-full"></div>
          }
          <MainScreen
            commands={commandForTarget}
          />
        {contentActive && !appActive &&
          <ContentDisplay />
        }
        {index >= 0 &&
          <>
          <BtnsNav
            setIndexUp={setIndexUp}
            setIndexDown={setIndexDown}
          />
          {index === 0 &&
            <PixelApp
              commands={commandForTarget}
              grid={gridState}
              camara={camaraState}
              ready={readyState}
              paintState={paintState}
            />
          }
          {index === 1 &&
            <MainProfile
              updateState={updateState}
              setUpdateState={setUpdateState}
            />
          }
          </>
        }
          <Row>
            <MainPanel
              textFunction={appActive && index === 0 ? 'PIXELAPP CMD' : 'COORDENADAS'}
              commandForTarget={(val) => setCommandsForTarget(val)}
              button1={diagram}
              button2={tierra}
              button1Action={() => setSetContentActive(!contentActive)}
              button2Action={() => setAppActive(!appActive)}
              setAppActive={setAppActive}
              bt1State={props.userInfo.info.profileImage}
              bt2State={props.userInfo.info.profileImage}
              btProfileState={props.userInfo.info.profileImage}
              appActive={appActive}
              setIndex={setIndex}
            >
            {index < 0 &&
              <Energy />
            }
            {appActive && index === 0 &&
              <NavPixel
                camaraState={camaraState}
                gridState={gridState}
                readyState={readyState}
                setCamaraState={setCamaraState}
                setGridState={setGridState}
                setReadyState={setReadyState}
                setPaintState={setPaintState}
                paintState={paintState}
              />
            }
            {appActive && index === 1 &&
              <NavProfile
                setUpdateState={setUpdateState}
              />
            }
            </ MainPanel>
          </Row>
        </Container>
      </AuthCheck>
    </Suspense>
  );
}

const Energy = () => {
  const [time , setTime] = useState(0)

  useEffect(()=>{
    let tempTime = new Date().getHours()
    let normalizedTime = tempTime >= 6 && tempTime < 20 ? tempTime : -1
    let widthEnergy = map(normalizedTime,6,20,181,0)
    setTime(widthEnergy)
  })

  return(
    <Container className="main-panel-b e-settings">
      <div>
        <Img className="img-energy-container" src={energy} />
      </div>
      <div className='energyBar' style={{width:`${time}px`}}>
      </div>
    </Container>
  )
}

const NavPixel = (props) => {

  return(
    <Container className="main-panel-c">
      {!props.readyState &&
        <>
        <span
          className="bt-active-true"
          onClick={()=> props.setCamaraState(!props.camaraState)}
        >
          <Img src={button} className="bt-pixelapp"/>
          <IconContext.Provider
            value={{ color: 'white', size: '50px' }}
          >
          {props.camaraState
            ?<FiCameraOff className="center-icons-b"/>
            :<FiCamera className="center-icons-b"/>
          }

          </IconContext.Provider>
        </span>

        <span
          className="bt-active-true"
          onClick={()=> props.setGridState(!props.gridState)}
        >
          <Img src={button} className="bt-pixelapp"/>
          <IconContext.Provider
            value={{ color: 'white', size: '50px' }}
          >
          {props.gridState
            ?<MdGridOff className="center-icons-b"/>
            :<MdGridOn className="center-icons-b"/>
          }
          </IconContext.Provider>
        </span>

        <span
          className="bt-active-true"
          onClick={()=> props.setPaintState(!props.paintState)}
        >
          <Img src={button} className="bt-pixelapp"/>
          <IconContext.Provider
            value={{ color: 'white', size: '30px' }}
          >
          {!props.readyState &&
            <FaFilm className="center-icons-f"/>
          }
          </IconContext.Provider>
        </span>
        </>
      }

      <span
        className="bt-active-true"
        onClick={()=> props.setReadyState(!props.readyState)}
        setReadyState={props.setReadyState}
      >
        <Img src={button} className="bt-pixelapp"/>
        <IconContext.Provider
          value={{ color: 'white', size: '30px' }}
        >
        {props.readyState
          ?<IoArrowUndoOutline className="center-icons-c"/>
          :<FaStar className="center-icons-c"/>
        }
        </IconContext.Provider>
      </span>

    </Container>
  )
}

const NavProfile = (props) => {
  return (
    <Container className="main-panel-c">
      <span
        onClick={() => props.setUpdateState(true)}
        className="bt-active-true"
      >
        <Img src={button} className="bt-pixelapp"/>
        <IconContext.Provider
          value={{ color: 'white', size: '30px' }}
        >
        <FaChild className="center-icons-c"/>
        </IconContext.Provider>
      </span>
    </Container>
  )
}

const BtnsNav = (props) => {
  return(
    <>
      <span
        onClick={()=>props.setIndexDown()}
        className="bt-main-menu-pos btn-back-main-menu">
        <Img src={button} style={{width:'3rem'}}/>
        <ReactSVG className="center-icons-tn" src={back}/>
      </span>
      <span
        onClick={()=>props.setIndexUp()}
        className="bt-main-menu btn-next-main-menu">
        <Img src={button} className="panel-button-img-sm" style={{width:'3rem',display:'inline'}}/>
        <ReactSVG className="center-icons-tn" src={next}/>
      </span>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(Home);
