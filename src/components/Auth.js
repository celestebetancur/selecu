import React, {useState} from 'react'
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
import background from '../assets/images/background.png'

import Shader from '../animations/Shader'
import vert from '../animations/shaders/shader.vert'
import frag from '../animations/shaders/shader.frag'

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
      <React.Fragment>
        <LoginCard
          loginUser={loginAdmin}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`¡Hola! Accediste a: ${props.roll}`}
        />
      </React.Fragment>
    );
  }

  if(props.roll === 'Mentores' && !mentorAccess){
    return(
      <React.Fragment>
        <LoginCard
          loginUser={loginMentor}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`¡Hola! Accediste a: ${props.roll}`}
        />
      </React.Fragment>
    );
  }

  if(props.roll !== 'Gestores' && props.roll !== 'Mentores' && !userAccess){
    return (
      <React.Fragment>
        <LoginCard
          loginUser={loginUser}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`¡Hola! Accediste a: ${props.roll}`}
        />
      </React.Fragment>
    );
  }
}

const LoginCard = (props) => {
  return(
    <div className="container-fluid backgroundContainer background-opacity-0">
      <div className="container background-opacity-0">
        <div className="card selectCard" style={{width: "23rem",backgroundColor:'rgba(255,255,255,0.3)',borderRadius:'1rem'}}>
          <div className="card-body background-opacity-0">
            <h4>{props.welcomeText}</h4>
            <div className="container background-opacity-0">
              <label className="text-spaced-1">Email</label>
              <div className="input-password background-opacity-0">
                <input type="email" className="input-card" onChange={(e) => props.setEmail(e.target.value)} />
                <p><strong>{props.emailNotFound}</strong></p>
              </div>
            </div>
            <div className="container background-opacity-0">
              <label className="text-spaced-1">Password </label>
              <div className="input-password background-opacity-0">
                <input type={props.seePass ? 'text' : 'password'} className="input-card rounded" onChange={(e) => props.setPassword(e.target.value)}/>
                <img src={icon} id="togglePassword" onClick={(e)=> props.seePassIcon()} alt="show password"/>
              </div>
            </div>
            {!props.authUser &&
              <button onClick={props.loginUser} className="buttonSubmit btn btn-warning">Autorizar</button>
            }
            {props.authUser &&
              <button onClick={props.loginUser} className="buttonSubmit btn btn-success">Entrar</button>
            }
            <SignOut
              text="Regresar"
            />
          </div>
        </div>
      </div>
      <Shader
        vert={vert}
        frag={frag}
      />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(Auth);
