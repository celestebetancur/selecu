import React,  {useState, Suspense, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import {AuthCheck, StorageImage} from 'reactfire'
import { ReactSVG } from 'react-svg'
import {map} from '../helpers'

import MainScreen from '../animations/MainScreen'
import MainPanel from './MainPanel'
import PixelApp from './PixelApp'
import App from '../App'

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

import { FiCamera, FiCameraOff } from "react-icons/fi";
import { MdGridOff, MdGridOn } from "react-icons/md";
import { FaStar} from "react-icons/fa";
import { IoArrowUndoOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaCloudUploadAlt } from "react-icons/fa";

import ContentLoader from './ContentLoader'
import ContentDisplay from './ContentDisplay'

const Home = (props) => {
  const [commandForTarget, setCommandsForTarget] = useState(' ');
  const [registry, setRegistry] = useState('');
  const [contentActive, setSetContentActive] = useState(false);
  const [appActive, setAppActive] = useState(false);

  const [camaraState, setCamaraState] = useState(false)
  const [gridState, setGridState] = useState(true)
  const [readyState, setReadyState] = useState(false)

  useEffect(()=>{
    let type = props.userInfo.info === '' ? 'undefined' : props.userInfo.registry.year
    setRegistry(type)
  })

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
        {appActive &&
          <PixelApp
            commands={commandForTarget}
            grid={gridState}
            camara={camaraState}
            ready={readyState}
          />
        }
          <Row>
            <MainPanel
              textFunction={appActive ? 'PIXELAPP CMD' : 'COORDENADAS'}
              commandForTarget={(val) => setCommandsForTarget(val)}
              button1={diagram}
              button2={tierra}
              button1Action={() => setSetContentActive(!contentActive)}
              button2Action={() => setAppActive(!appActive)}
              bt1State={props.userInfo.info.profileImage}
              bt2State={props.userInfo.info.profileImage}
              btProfileState={props.userInfo.info.profileImage}
              appActive={appActive}
            >
            {!appActive &&
              <Energy />
            }
            {appActive &&
              <NavPixel
                camaraState={camaraState}
                gridState={gridState}
                readyState={readyState}
                setCamaraState={setCamaraState}
                setGridState={setGridState}
                setReadyState={setReadyState}
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
        </>
      }
      <span
        className="bt-active-true"
        onClick={()=> props.setReadyState(!props.readyState)}
        setReadyState={props.setReadyState}
      >
        <Img src={button} className="bt-pixelapp"/>
        <IconContext.Provider
          value={{ color: 'white', size: '50px' }}
        >
        {props.readyState
          ?<IoArrowUndoOutline className="center-icons-b"/>
          :<FaStar className="center-icons-b"/>
        }
        </IconContext.Provider>
      </span>

    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData})(Home);
