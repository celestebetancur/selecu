import React, {useState, useEffect} from 'react'
import Landing from '../landing'

import SignOut from '../SignOut'
import ButtonMenu from './ButtonMenu'
import Profile from '../Profile'
import CreateMentor from './CreateMentor'
import CreateUser from './CreateUser'
import List from './List'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import '../../styles/gestores.css'

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
    <AuthCheck fallback={<Landing />}>
    {props.userInfo !== {} &&
      <Container>
        <div className="row">
          <Card style={{width: "15rem"}}>
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
            />
          }
          {menuToShow === 1 &&
            <React.Fragment>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="list-group">
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
            </ React.Fragment>
          }
          {menuToShow === 2 &&
            <List
              usersList={usersList}
              fullInfo={fullInfo}
            />
          }
        </div>
      </Container>
    }
    </AuthCheck>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}
export default connect(mapStateToProps,{loadUserData})(Gestores);
