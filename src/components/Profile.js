import React, {useState, useEffect, Suspense} from 'react'
import { useFirebaseApp, StorageImage } from 'reactfire'
import SignOut from './SignOut'
import App from '../App'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

import {AuthCheck} from 'reactfire'

const Profile = (props) => {

  const [username, setUserName] = useState('');
  const [nickname, setNickName] = useState('');
  const [favoriteDay, setFavoriteDay] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [parentsEmail, setParentsEmail] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [pixelArtState, setPixelArtState] = useState(false);

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
        setProfileImage(info.profileImage);
        setProfileImageURL(info.profileImageURL);
        setUserName(registry.name);
        setParentsEmail(registry.emailParents);
        setSchool(registry.institution);
        setLevel(registry.year);
      }
    );
  },[]);

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
          <Card style={{width: "33rem"}}>
          {profileImage &&
            <StorageImage className="image-profile" storagePath={"/users/"+props.userData.data.uid.slice(0,10)+'/picture/perfil.jpg'} alt="Imagen de perfíl"/>
          }
            <Card.Body>
              <Card.Title>Mi perfil</Card.Title>
              <hr />
              <div className="mb-5 mt-5">
                <p className="card-text">Actualiza tus datos</p>
              </div>
              <form>
                <div style={{display:"block"}}>
                  <label className="mb-3">Cómo me gusta que me digan</label>
                  <input type="text" className="input" value={nickname} required onChange={e => setNickName(e.target.value)}/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Mi nombre completo</label>
                  <input type="text" className="input" value={username} disabled/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Correo de mi responsable</label>
                  <input type="text" className="input" value={parentsEmail} disabled/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Mi grado</label>
                  <input type="text" className="input" value={level} disabled/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Mi colegio</label>
                  <input type="text" className="input" value={school} disabled/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Día favorito</label>
                  <input type="text" className="input" value={favoriteDay} required onChange={e => setFavoriteDay(e.target.value)}/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">El animal que más me gusta</label>
                  <input type="text" className="input" value={favoriteAnimal} required onChange={e => setFavoriteAnimal(e.target.value)}/>
                </div>
                <div style={{display:"block"}}>
                  <label className="mb-3">Color que más me gusta</label>
                  <input type="text" className="input"  value={favoriteColor} required onChange={e => setFavoriteColor(e.target.value)}/>
                </div>
              </form>
              <Button className="mr-2" variant="info" onClick={writeInfo}>¡Actualizate!</Button>
              {props.userRoll < 4 &&
                <>
                  <a href="#/home"><Button className="mr-2" variant="info">Regresar al mapa</Button></a>
                  <SignOut
                    text="Salir"
                   />
                </>
              }
            </Card.Body>
          </Card>
      </AuthCheck>
    </Suspense>
  );
}

Profile.defaultProps = {
  
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userRoll: state.userRollPass
  };
}

export default connect(mapStateToProps,{loadUserData})(Profile);
