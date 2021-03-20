import React, {useState, useEffect} from 'react'
import { useFirebaseApp } from 'reactfire'
import SignOut from './SignOut'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

const Profile = (props) => {

  const [username, setUserName] = useState('');
  const [nickname, setNickName] = useState('');
  const [favoriteDay, setFavoriteDay] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [parentsEmail, setParentsEmail] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');

  const firebase = useFirebaseApp();
  const db = firebase.database();

  const updateFirebase = (entry, value) => {
    let obj = {};
    obj[entry] = value;
    const ref = db.ref("/users/"+props.userData.data.uid.slice(0,10) + '/info/').update(
      obj
    );
  }

  const writeInfo = () => {
    updateFirebase('nick',nickname);
    updateFirebase('color',favoriteColor);
    updateFirebase('animal',favoriteAnimal);
    updateFirebase('dayPreference',favoriteDay);
  }

  useEffect(()=>{
    db.ref().child("/users/"+props.userData.data.uid.slice(0,10)).on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        let info = snap.info;
        let registry = snap.registry;

        setNickName(info.nick);
        setFavoriteColor(info.color);
        setFavoriteDay(info.dayPreference);
        setFavoriteAnimal(info.animal);
        setUserName(registry.name);
        setParentsEmail(registry.emailParents);
        setSchool(registry.institution);
        setLevel(registry.year);
      }
    );
  },[]);


  return(
    <div className="card profileCard" style={{width: "33rem"}}>
      <div className="card-body">
        <h5 className="card-title">Mi perfil</h5>
        <hr />
        <div className="text-spaced-6">
          <p className="card-text">Actualiza tus datos</p>
        </div>
        <form>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Cómo me gusta que me digan</label>
            <input type="text" className="input" value={nickname} required onChange={e => setNickName(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi nombre completo</label>
            <input type="text" className="input" value={username} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Correo de mi responsable</label>
            <input type="text" className="input" value={parentsEmail} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi grado</label>
            <input type="text" className="input" value={level} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi colegio</label>
            <input type="text" className="input" value={school} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Día favorito</label>
            <input type="text" className="input" value={favoriteDay} required onChange={e => setFavoriteDay(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">El animal que más me gusta</label>
            <input type="text" className="input" value={favoriteAnimal} required onChange={e => setFavoriteAnimal(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Color que más me gusta</label>
            <input type="text" className="input"  value={favoriteColor} required onChange={e => setFavoriteColor(e.target.value)}/>
          </div>
        </form>
        {props.update === true &&
          <button  className="buttonSubmit btn btn-primary" onClick={writeInfo}>¡Actualizate!</button>
        }
        {props.returnToMap == true &&
          <button  className="buttonSubmit btn btn-secondary" onClick={()=>props.onReturnToMap(false)}>Regresar al mapa</button>
        }
        {props.signOut ===true &&
          <SignOut
            text="Salir"
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

export default connect(mapStateToProps,{loadUserData})(Profile);
