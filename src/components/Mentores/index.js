import React, {useState, useEffect} from 'react'
import SignOut from '../SignOut'

import { useFirebaseApp, useUser } from 'reactfire'

const Mentores = () => {
  const [userRegistryInfo, setUserRegistryInfo] = useState({});

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  useEffect(()=>{
    db.ref().child(user.data.uid).on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        setUserRegistryInfo(snap.registry);
      }
    );
  },[]);

  return(
    <div className="card selectCard" style={{width: "25rem"}}>
      <div className="card-body">
      <h5 className="card-title">Mentores</h5>
        <div style={{display:"block"}}>
          <h6>{`Hola ${userRegistryInfo.name}`}</h6>
          <hr />
          <p>En esta página estará el panel para mentores</p>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Mentores;
