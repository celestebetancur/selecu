import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Home from './home'
import Landing from './landing'
import Gestores from './Gestores'
import Mentores from './Mentores'
import 'firebase/auth'
import firebaseAuth from "firebase/app";
import { useFirebaseApp, useUser } from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData} from '../actions'

import icon from '../assets/images/eye.png'

import '../styles/general.css'

const Auth = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [emailNotFound, setEmailNotFound] = useState('')
  const [newUser, setNewUser] = useState('')
  const [loggedAdmin, setLoggedAdmin] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);
  const [loggedMentor, setLoggedMentor] = useState(false);
  const [mentorAccess, setMentorAccess] = useState(false);
  const [loggedUser, setLoggedUser] = useState(false);
  const [userAccess, setUserAccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailParents, setEmailParents] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [loginReady, setLoginReady] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  const fbPersistance = () => {
   firebaseAuth.auth().setPersistence(firebaseAuth.auth.Auth.Persistence.NONE).then(
      ()=> {
        setLoginReady(true);
      }
    );
  }

  const loginUser = async () => {
    fbPersistance();
    await firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        setAuthUser(true);
        checkLoginUser();
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const loginAdmin = () => {
    fbPersistance();
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        checkLoginAdmin();
        setAuthUser(true);
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const loginMentor = () => {
    fbPersistance();
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        checkLoginMentor();
        setAuthUser(true);
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }
  const checkLoginUser = () => {
    if(user.data !== null){
      props.loadUserData(user);
      db.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          let registry = snap.registry;
          if(props.roll === registry.year || access.Mentores || access.Gestores || access.Admin){
            setLoggedUser(true);
            setUserAccess(true);
          }
        }
      );
    }
  }
  const checkLoginAdmin = () => {
    if(user.data !== null && props.roll === "Gestores"){
      props.loadUserData(user);
      db.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          setAdminAccess(access.Gestores);
          setLoggedAdmin(true);
        }
      );
    }
  }
  const checkLoginMentor = () => {
    if(user.data !== null && props.roll === "Mentores"){
      props.loadUserData(user);
      db.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          setMentorAccess(access.Mentores);
          setLoggedMentor(true);
        }
      );
    }
  }

  const seePassIcon = () => {
    setSeePass(!seePass);
  }

  useEffect(() => {

  },[]);

  if(userAccess){
    return <Home />;
  }

  if(adminAccess){
    return(
      <Gestores />
    );
  }
  if(mentorAccess){
    return(
      <Mentores />
    );
  }

  if(props.roll === 'Gestores' && !adminAccess){
    return(
      <div className="container">
        <div className="card selectCard" style={{width: "25rem"}}>
          <div className="card-body">
            <h6 className="card-title text-spaced-2">
              <p>Hola Gestor, realiza tu login para poder ingresar a la plataforma</p>
            </h6>
            <div style={{display:"block"}}>
              <label className="text-spaced-3">Email</label>
              <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
              <p><strong>{emailNotFound}</strong></p>
            </div>
            <div style={{display:"block"}}>
              <label className="text-spaced-1">Password</label>
              <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()} alt="show password"/>
            </div>
            {!authUser &&
              <button onClick={loginAdmin} className="buttonSubmit btn btn-warning">Autorizar</button>
            }
            {authUser &&
              <button onClick={loginAdmin} className="buttonSubmit btn btn-success">Entrar</button>
            }
            <SignOut
              text="Regresar"
             />
          </div>
        </div>
      </div>
    );
  }

  if(props.roll === 'Mentores' && !mentorAccess){
    return(
      <div className="container">
        <div className="card selectCard" style={{width: "25rem"}}>
          <div className="card-body">
            <h6 className="card-title text-spaced-2">
              <p>Hola Mentor, realiza tu login para poder ingresar a la plataforma</p>
            </h6>
            <div style={{display:"block"}}>
              <label className="text-spaced-3">Email</label>
              <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
              <p><strong>{emailNotFound}</strong></p>
            </div>
            <div style={{display:"block"}}>
              <label className="text-spaced-1">Password</label>
              <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()} alt="show password"/>
            </div>
            {!authUser &&
              <button onClick={loginMentor} className="buttonSubmit btn btn-warning">Autorizar</button>
            }
            {authUser &&
              <button onClick={loginMentor} className="buttonSubmit btn btn-success">Entrar</button>
            }
            <SignOut
              text="regresar"
            />
          </div>
        </div>
      </div>
    );
  }

  if(props.roll !== 'Gestores' && props.roll !== 'Mentores' && !userAccess){
    return (
      <div className="container">
        <div className="card selectCard" style={{width: "30rem"}}>
          <div className="card-body">
            <h6 className="card-title text-spaced-2">{`Accediste con un password para: ${props.roll}`}</h6>
            <div style={{display:"block"}}>
              <label className="text-spaced-3">Email</label>
              <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
              <p><strong>{emailNotFound}</strong></p>
            </div>
            <div style={{display:"block"}} className="container">
              <label className="text-spaced-1">Password </label>
              <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()} alt="show password"/>
            </div>
            {!authUser &&
              <button onClick={loginUser} className="buttonSubmit btn btn-warning">Autorizar</button>
            }
            {authUser &&
              <button onClick={loginUser} className="buttonSubmit btn btn-success">Entrar</button>
            }
            <SignOut
              text="Regresar"
            />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(Auth);
