import React, {useState} from 'react'
import SignOut from './SignOut'
import Home from './home'
import Landing from './landing'
import Gestores from './Gestores'
import Mentores from './Mentores'
import 'firebase/auth'
import database from 'firebase/database'
import firebaseAuth from "firebase/app";
import { useUser } from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData} from '../actions'

import icon from '../assets/images/eye.png'
import background from '../assets/images/background.png'

import Shader from '../animations/Shader'
import vert from '../animations/shaders/shader.vert'
import frag from '../animations/shaders/shader.frag'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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

  const user = useUser();
  const database = firebaseAuth.database();

  const fbPersistance = () => {
   firebaseAuth.auth().setPersistence(firebaseAuth.auth.Auth.Persistence.NONE).then(
      ()=> {
        setLoginReady(true);
      }
    );
  }

  const loginUser = async () => {
    fbPersistance();
    await firebaseAuth.auth().signInWithEmailAndPassword(email,password).then(
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
      props.loadUserData(user);
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
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
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
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
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
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
    <Container>
      <Row>
        <Col />
          <Col>
          <Card style={{width: "23rem",backgroundColor:'rgba(255,255,255,0.3)',borderRadius:'1rem', top:'50%'}}>
            <Card.Body>
              <Card.Title>{props.welcomeText}</Card.Title>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="email-selecu">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="email"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="email-selecu"
                  onChange={e => props.setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3" id="password">
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
              {!props.authUser &&
                <Button onClick={props.loginUser} variant="warning">Autorizar</Button>
              }
              {props.authUser &&
                <Button onClick={props.loginUser} variant="success">Entrar</Button>
              }
              <SignOut
                text="Regresar"
              />
            </Card.Body>
          </Card>
        </Col>
        <Shader
          vert={vert}
          frag={frag}
        />
        <Col />
      </Row>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(Auth);
