import React, {useState, useEffect, Suspense} from 'react'
import App from '../../App'

import {
  BrowserView,
  MobileView
} from "react-device-detect";

import SignOut from '../SignOut'
import ButtonMenu from './ButtonMenu'
import Profile from '../Profile'
import CreateMentor from './CreateMentor'
import CreateUser from './CreateUser'
import List from './List'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import '../../styles/gestores.scss'

import {connect} from 'react-redux'
import {loadUserData} from '../../actions'

import { useFirebaseApp, AuthCheck} from 'reactfire'

const Gestores = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [menuToShow, setMenuToShow] = useState(-1);
  const [menuToShowCreate, setMenuToShowCreate] = useState(-1);
  const [usersList, setUsersList] = useState({});
  const [fullInfo, setFullInfo] = useState({});
  const [hour, setHour] = useState('');

  const firebase = useFirebaseApp();
  const db = firebase.database();

  useEffect(()=>{
    setUserInfo(props.userInfo);
    db.ref().child("/lists/").on(
      'value',(snapshot) => {
        setUsersList(snapshot.val())
      });
    db.ref().child("/users/").on(
      'value',(snapshot) => {
        setFullInfo(snapshot.val())
      });
    let temp = new Date().getHours();
    let hourSec = temp < 12 && temp > 6 ? "Buen día" : temp < 18 && temp ? "Buenas tardes" : "Buenas Noches";
    setHour(hourSec);
  },[props.userInfo]);

  const setMenuNumber = (value) => {
    setMenuToShow(value);
  }

  return(
    <>
    <BrowserView>
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <AuthCheck fallback={<App />}>
          <Container fluid>
            <Row>
            {props.userInfo !== {} &&
              <>
                <Card style={{width: "15rem", border:'none'}}>
                  <Card.Body>
                    <Card.Title>PANEL GESTORES</Card.Title>
                      <div style={{display:"block"}}>
                      <h6>{`¡${hour} ${props.userInfo.info.nick}!`}</h6>
                      <hr />
                      <ButtonMenu
                        setMenuNumber={setMenuNumber}
                      />
                      <br/>
                      <SignOut
                        text="Salir"
                      />
                      </div>
                    </Card.Body>
                  </Card>
                  {menuToShow === 0 &&
                    <Profile
                      update={true}
                      level='gestores'
                      functionsAvailable={false}
                    />
                  }
                  {menuToShow === 1 &&
                <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="list-group" style={{border:'none'}}>
                <li className="list-group-item">
                  <a className="nav-link" onClick={()=>setMenuToShowCreate(0)}>Crear Mentor</a>
                </li>
                <li className="list-group-item">
                  <a className="nav-link" onClick={()=>setMenuToShowCreate(1)}>Crear Aprendiz</a>
                </li>
              </ul>
            </nav>
            {menuToShowCreate === 0 &&
              <CreateMentor />
            }
            {menuToShowCreate === 1 &&
              <CreateUser />
            }
          </>
          }
            {menuToShow === 2 &&
              <List
                usersList={usersList}
                fullInfo={fullInfo}
              />
            }
            </>
          }
          </Row>
        </Container>
        </AuthCheck>
      </Suspense>
    </BrowserView>
    <MobileView>
      <p>Esta app solo puede ser visualizada desde un computador</p>
    </MobileView>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}
export default connect(mapStateToProps,{loadUserData})(Gestores);
