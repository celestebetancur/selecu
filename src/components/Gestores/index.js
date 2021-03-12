import React, {useState, useEffect} from 'react'
import SignOut from '../SignOut'
import ButtonMenu from './ButtonMenu'
import Profile from '../Profile'
import CreateMentor from './CreateMentor'
import CreateUser from './CreateUser'
import List from './List'

import '../../styles/gestores.css'

import {connect} from 'react-redux'
import {loadUserData} from '../../actions'

import { useFirebaseApp} from 'reactfire'

const Gestores = (props) => {
  const [userRegistryInfo, setUserRegistryInfo] = useState({});
  const [menuToShow, setMenuToShow] = useState(-1);
  const [menuToShowCreate, setMenuToShowCreate] = useState(-1);
  const [usersList, setUsersList] = useState({});
  const [fullInfo, setFullInfo] = useState({});
  const [hour, setHour] = useState('');
  const [name, setName] = useState('');

  const firebase = useFirebaseApp();
  const db = firebase.database();

  useEffect(()=>{
    db.ref().child("/users/"+props.userData.data.uid.slice(0,10)).on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        setUserRegistryInfo(snap.registry);
      }
    );
    db.ref().child("/lists/").on(
      'value',(snapshot) => {
        setUsersList(snapshot.val())
      });
    db.ref().child("/users/").on(
      'value',(snapshot) => {
        setFullInfo(snapshot.val())
        let temp = snapshot.val();
        setName(temp[props.userData.data.uid.slice(0,10)]['info']['nick']);
      });
    let temp = new Date().getHours();
    let hourSec = temp < 12 && temp > 6 ? "Buen día" : temp < 18 && temp ? "Buenas tardes" : "Buenas Noches";
    setHour(hourSec);
  },[]);

  const setMenuNumber = (value) => {
    setMenuToShow(value);
  }

  return(
    <div className="container spaced">
      <div className="row">
        <div className="card selectCard" style={{width: "15rem"}}>
          <div className="card-body">
          <h5 className="card-title">PANEL GESTORES</h5>
            <div style={{display:"block"}}>
            <h6>{`¡${hour} ${name}!`}</h6>
              <hr />
              <ButtonMenu
                setMenuNumber={setMenuNumber}
              />
              <br/>
              <SignOut
                text="Salir"
               />
            </div>
          </div>
        </div>
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
                  <a className="nav-link" href="#" onClick={()=>setMenuToShowCreate(0)}>Crear Mentor</a>
                </li>
                <li className="list-group-item">
                  <a className="nav-link" href="#" onClick={()=>setMenuToShowCreate(1)}>Crear Aprendiz</a>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData
  };
}
export default connect(mapStateToProps,{loadUserData})(Gestores);
