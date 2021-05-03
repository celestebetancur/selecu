import React, {useState} from 'react'
import SignOut from './SignOut'
import Home from './home'
import Landing from './landing'
import {FallbackAccessDenied} from './fallbackAccessDenied'
import Blackhole from './Blackhole'
import 'firebase/auth'
import firebaseAuth from "firebase/app";
import { useUser } from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData,loadUserInfo} from '../actions'

import icon from '../assets/images/eye.png'
import logCard from '../assets/images/loginCard.png'
import background from '../assets/images/landing/background.png'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import '../styles/general.scss'

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
  const [opacity, setOpacity] = useState(false);

  const user = useUser();
  const database = firebaseAuth.database();

  const fbPersistance = () => {//SESSION
   firebaseAuth.auth().setPersistence(firebaseAuth.auth.Auth.Persistence.SESSION).then(
      ()=> {
        setLoginReady(true);
      }
    );
  }

  const loginUser = async () => {
    fbPersistance();
    await firebaseAuth.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        checkLoginUser();
        setAuthUser(true);
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const loginAdmin = () => {
    fbPersistance();
    firebaseAuth.auth().signInWithEmailAndPassword(email,password).then(
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
    firebaseAuth.auth().signInWithEmailAndPassword(email,password).then(
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
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          props.loadUserInfo(snap);
          let access = snap.access;
          let registry = snap.registry;
          let info = snap.info;
          if(props.roll === registry.year || access.Mentores || access.Gestores || access.Admin){
            setTimeout(()=>setLoggedUser(true),5000);
            setOpacity(true);
            setUserAccess(true);
            props.loadUserData(user);
          }
          if(props.roll !== registry.year){
            setEmailNotFound(`Te registraron en: ${registry.year}`);
          }
        }
      );
    }
  }
  const checkLoginAdmin = () => {
    if(user.data !== null && props.roll === "Gestores"){
      props.loadUserData(user);
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          props.loadUserInfo(snap);
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
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          props.loadUserInfo(snap);
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

  if(loggedUser){
    if(userAccess){
      return (
        <Blackhole
          roll="Aprendiz"
        />
      );
    }
    if(!userAccess){
      return (
        <FallbackAccessDenied
          roll="Aprendiz"
        />
      );
    }
  }

  if(loggedAdmin){
    if(!adminAccess){
      return(
        <FallbackAccessDenied
          roll="Gestor"
        />
      );
    }
    if(adminAccess){
      window.open("#/homegestores",'_self');
      return <></>;
    }
  }

  if(loggedMentor){
    if(!mentorAccess){
      return(
        <FallbackAccessDenied
          roll="Mentor"
        />
      );
    }
    if(mentorAccess){
      window.open("#/homementores",'_self');
      return <></>;
    }
  }

  if(props.roll === 'Gestores' && !loggedAdmin){
    return(
      <>
        <LoginCard
          loginUser={loginAdmin}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`${props.roll}`}
        />
      </>
    );
  }

  if(props.roll === 'Mentores' && !loggedMentor){
    return(
      <>
        <LoginCard
          loginUser={loginMentor}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`${props.roll}`}
        />
      </>
    );
  }

  if(props.roll !== 'Gestores' && props.roll !== 'Mentores' && !loggedUser){
    return (
      <>
        <LoginCard
          loginUser={loginUser}
          roll={props.roll}
          authUser={authUser}
          setEmail={setEmail}
          setPassword={setPassword}
          seePassIcon={seePassIcon}
          emailNotFound={emailNotFound}
          seePass={seePass}
          welcomeText={`${props.roll}`}
          opacity={opacity}
        />
      </>
    );
  }
}

const LoginCard = (props) => {
  return(
    <Container className={`bg-img opacity-${props.opacity}`} fluid style={{backgroundImage:`url(${background})`}}>
      <Container style={{marginTop:'8vh'}}>
          <Card id="login-card" style={{backgroundImage:`url(${logCard})`}}>
            <Card.Body>
              <Card.Title className="text-center">{props.welcomeText}</Card.Title>
              <Card.Subtitle className="text-center">{props.emailNotFound}</Card.Subtitle>
              <InputGroup className="mb-5 login-input-email" size="lg">
                <InputGroup.Prepend className="email-selecu">
                  <InputGroup.Text id="inputGroup-sizing-lg"></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="email"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="email-selecu"
                  onChange={e => props.setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-5 login-input-pwd" size="lg" id="password">
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">
                    <Image src={icon} id="togglePassword" onClick={(e)=> props.seePassIcon()} alt="show password"/>
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  type={props.seePass ? 'text' : 'password'}
                  aria-describedby="password"
                  placeholder="password"
                  aria-label="password"
                  onChange={e => props.setPassword(e.target.value)}
                />
              </InputGroup>
              <Container id="login-buttons" className="justify-content-sm-center">
                {!props.authUser &&
                  <>
                  <Button onClick={props.loginUser} variant="dark" className="login-button mr-1">Autorizar</Button>
                    <SignOut
                      text="Regresar"
                      className='login-button'
                    />
                  </>
                }
                {props.authUser &&
                  <Button onClick={props.loginUser} variant="dark" className="login-button">Iniciar</Button>
                }
              </Container>
            </Card.Body>
          </Card>
        </Container>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loadUserInfo})(Auth);
