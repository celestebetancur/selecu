import React, {useState} from 'react'

import Button from 'react-bootstrap/Button'

import { useFirebaseApp } from 'reactfire'
import 'firebase/storage'
import 'firebase/database'

import {connect} from 'react-redux'

import {loadUserData} from '../actions'

const UploadPhoto = (props) => {
  const [url, setUrl] = useState('');
  const [done, setDone] = useState(false);

  const user = props.userData;
  const firebase = useFirebaseApp();
  const db = firebase.storage();
  const data = firebase.database();

  const put = (value) => {
    db.ref().child("/users/"+user.data.uid.slice(0,10)+'/picture/perfil.jpg').put(value).then((snapshot)=>{
      setDone(true);
      data.ref().child("/users/"+user.data.uid.slice(0,10)+'/info/profileImage/').set(true);
    });
    db.ref().child("/users/"+user.data.uid.slice(0,10)+'/picture/perfil.jpg').getDownloadURL().then((url)=>{
      setUrl(url);
      data.ref().child("/users/"+user.data.uid.slice(0,10)+'/info/profileImageURL/').set(url);
    })
  }


  return (
    <>
    {!done &&
      <Button variant="info" onClick={() => put(props.image)} className="mr-3">Imagen de perfil</Button>
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
