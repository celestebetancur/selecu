import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button'

import { useFirebaseApp } from 'reactfire'
import 'firebase/storage'
import 'firebase/database'

import {connect} from 'react-redux'

import {loadUserData} from '../actions'

const UploadPhoto = (props) => {
  const [done, setDone] = useState(false);
  const [start, setStart] = useState(false);

  const user = props.userData;
  const firebase = useFirebaseApp();
  const db = firebase.storage();
  const data = firebase.database();

  const startLoading = (val) => {
    setStart(val);
    console.log(val);
  }

  useEffect(()=>{
    if(start){
      db.ref().child("/users/"+user.data.uid.slice(0,10)+'/picture/perfil.jpg').put(props.image).then((snapshot)=>{
        setDone(true);
        data.ref().child("/users/"+user.data.uid.slice(0,10)+'/info/profileImage/').set(true);
      });
      db.ref().child("/users/"+user.data.uid.slice(0,10)+'/picture/perfil.jpg').getDownloadURL().then((url)=>{
        data.ref().child("/users/"+user.data.uid.slice(0,10)+'/info/profileImageURL/').set(url);
      })
    }
  },[start]);

  return (
    <>
    {!done &&
      <Button variant="info" onClick={() => setStart(true)} className="mr-3">Subir como imagen perfil</Button>
    }
    {done &&
      <p>Foto de perfil cargada con éxito</p>
    }
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData})(UploadPhoto);
