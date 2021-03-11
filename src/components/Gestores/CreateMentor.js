import React, {useState, useEffect ,useRef} from 'react'
import firebaseAuth from "firebase/app";
import { useFirebaseApp, useUser } from 'reactfire'

const CreateMentor = (props) => {
  const[fullName, setFullName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[institution, setInstitution] = useState('');
  const[year, setYear] = useState('');
  const[msg, setMsg] = useState('');
  const[initDB, setInitDB] = useState(false);
  const[dcheck, setDCheck] = useState(false);

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  const inputForm = useRef(null);

  useEffect(()=>{
    if(user.data !== null && initDB){
      db.ref(user.data.uid).set({
        info: {
          nick: '',
          color: '',
          animal: '',
          dayPreference: ''
        },
        access: {
          Admin: false,
          Gestores: false,
          Aprendices: false,
          Mentores: true
        },
        registry:{name: fullName,
        emailParents: email,
        institution: institution,
        year: year}
      });
    }
  },[user.data]);

  const doubleCheck = () => {
      setDCheck(true);
      setMsg("Por favor revise los datos antes de oprimir -Crear-");
  }

  const createUser = async (event) => {
    const userC = await firebase.auth().createUserWithEmailAndPassword(email,password).then(
      (s) => {
        setInitDB(true);
        setMsg("User succesfully created!");
        inputForm.current.reset();
        setDCheck(false);
        setTimeout(setMsg(''), 2000);
      },
      (e) => setMsg(e.message)
    );
  }

  return(
    <div className="card selectCard profileCard" style={{width: "27rem"}}>
      <div className="card-body">
          <h3 className="card-title">ADMIN</h3>
          <br/>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Crear Mentor</a>
              </li>
            </ul>
          </nav>
          <form onSubmit={e => e.preventDefault()} ref={inputForm}>
            <hr/>
            <div className="container">
              <label className="text-spaced-1">Nombre completo</label>
              <input className="input-card" type="text" required onChange={e => setFullName(e.target.value)}/>
            </div>
            <div className="container">
              <label className="text-spaced-1">Email</label>
              <input className="input-card" type="email" required onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="container">
              <label className="text-spaced-1">Contraseña</label>
              <input className="input-card" type="text" required onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="container">
              <label className="text-spaced-1">Colegio</label>
              <input className="input-card" type="text" required onChange={e => setInstitution(e.target.value)}/>
            </div>
            <div className="container">
              <label className="text-spaced-1">Cargo</label>
              <input  className="input-card" type="text" required onChange={e => setYear(e.target.value)}/>
            </div>
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
              <button className="btn btn-danger" onClick={(event) => createUser(event)}>Crear</button>
            }
          </form>
        </div>
      </div>
  );
}

export default CreateMentor;
