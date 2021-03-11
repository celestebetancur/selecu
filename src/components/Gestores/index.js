import React, {useState, useEffect} from 'react'
import SignOut from '../SignOut'
import ButtonMenu from './ButtonMenu'
import Profile from '../Profile'
import CreateMentor from './CreateMentor'

import '../../styles/gestores.css'

import {connect} from 'react-redux'
import {loadUserData} from '../../actions'

import { useFirebaseApp} from 'reactfire'

const Gestores = (props) => {
  const [userRegistryInfo, setUserRegistryInfo] = useState({});
  const [menuToShow, setMenuToShow] = useState(-1);

  const firebase = useFirebaseApp();
  const db = firebase.database();

  useEffect(()=>{
    db.ref().child("/users/"+props.userData.data.uid).on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        setUserRegistryInfo(snap.registry);
      }
    );
  },[]);

  const setMenuNumber = (value) => {
    setMenuToShow(value);
  }

  return(
    <div className="container spaced">
      <div className="row">
        <div className="card selectCard" style={{width: "25rem"}}>
          <div className="card-body">
          <h5 className="card-title">PANEL GESTORES</h5>
            <div style={{display:"block"}}>
              <h6>{`Hola ${userRegistryInfo.name}`}</h6>
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
        {menuToShow == 0 &&
          <Profile
            update={true}
          />
        }
        {menuToShow == 1 &&
          <CreateMentor />
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
