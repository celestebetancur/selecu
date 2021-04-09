import React, {useState, useEffect ,useRef} from 'react'
import firebaseAuth from "firebase/app";
import { useFirebaseApp, useUser } from 'reactfire'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import {connect} from 'react-redux'
import {loadUserData} from '../../actions'

const CreateMentor = (props) => {
  const[fullName, setFullName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[institution, setInstitution] = useState('');
  const[year, setYear] = useState('');
  const[msg, setMsg] = useState('');
  const[initDB, setInitDB] = useState(false);
  const[dcheck, setDCheck] = useState(false);
  const[passIUG, setpassIUG] = useState('');

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  const inputForm = useRef(null);
  let verCode = props.userData.data.uid.slice(0, 4);

  useEffect(()=>{
    if(user.data !== null && initDB){
      db.ref('/users/'+user.data.uid.slice(0,10)).set({
        info: {
          nick: '',
          color: '',
          animal: '',
          dayPreference: ''
        },
        access: {
          verification: user.data.uid.slice(0, 4),
          Admin: false,
          Gestores: false,
          Aprendices: false,
          Mentores: true,
          UI: user.data.uid
        },
        registry:{
          name: fullName,
          emailParents: email,
          institution: institution,
          year: year
        }
      });
      db.ref('/lists/'+fullName).set({
        UI: user.data.uid.slice(0,10)
      });
    }
  },[user.data]);

  const doubleCheck = () => {
      setDCheck(true);
      setMsg("Por favor revise los datos antes de oprimir -Crear-");
  }

  const createUser = async (event) => {
    if(verCode === passIUG){
      const userC = await firebase.auth().createUserWithEmailAndPassword(email,password).then(
        (s) => {
          setInitDB(true);
          setMsg("User succesfully created, Thank you!");
          inputForm.current.reset();
          setDCheck(false);
          setTimeout(setMsg(''), 2000);
        },
        (e) => setMsg(e.message)
      );
    }
    if(verCode !== passIUG){
      setMsg('Por favor verifica tu IUG');
    }
  }

  return(
    <Card style={{width: "27rem"}}>
      <Card.Body>
          <Card.Title>ADMIN</Card.Title>
          <Card.Title>Crear Mentor</Card.Title>
          <br/>
          <form onSubmit={e => e.preventDefault()} ref={inputForm}>
            <hr/>
            <Container>
              <label className="text-spaced-1">Nombre completo</label>
              <input className="input" type="text" required onChange={e => setFullName(e.target.value)}/>
            </Container>
            <Container>
              <label className="text-spaced-1">Email</label>
              <input className="input" type="email" required onChange={e => setEmail(e.target.value)}/>
            </Container>
            <Container>
              <label className="text-spaced-1">Contraseña</label>
              <input className="input" type="text" required onChange={e => setPassword(e.target.value)}/>
            </Container>
            <Container>
              <label className="text-spaced-1">Colegio</label>
              <input className="input" type="text" required onChange={e => setInstitution(e.target.value)}/>
            </Container>
            <Container>
              <label className="text-spaced-1">Cargo</label>
              <input  className="input" type="text" required onChange={e => setYear(e.target.value)}/>
            </Container>
            <hr/>
              {(initDB && msg !== '' ) &&
                <p className="alert alert-success" role="alert">{msg}</p>

              }
              {(msg !== '' && msg !== "User succesfully created!") &&
                <p className="alert alert-danger" role="alert">{msg}</p>
              }
            <hr/>
            {!dcheck &&
              <button className="btn btn-warning" onClick={()=> doubleCheck()}>Crear</button>
            }
            {dcheck &&
              <div>
                <label className="text-spaced-1">IUG</label>
                <input type="password" style={{width:"6rem"}} required onChange={e => setpassIUG(e.target.value)}/>
                <button className="btn btn-danger" onClick={(event) => createUser(event)}>Crear</button>
              </div>
            }
          </form>
        </Card.Body>
      </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(CreateMentor);
