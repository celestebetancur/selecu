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

  const put = (entry, value) => {
    // db.ref("/users/"+user.data.uid.slice(0,10) + '/info/').update(
    db.ref().child("/users/"+'MRmuDPwCwc'+'/'+entry+'/perfil.jpg').put(value).then((snapshot)=>{
      setDone(true);
      data.ref().child("/users/"+'MRmuDPwCwc'+'/info/profileImage/').set(true);
    });
    db.ref().child("/users/"+'MRmuDPwCwc'+'/'+entry+'/perfil.jpg').getDownloadURL().then((url)=>{
      setUrl(url);
      data.ref().child("/users/"+'MRmuDPwCwc'+'/info/profileImageURL/').set(url);
    })
  }

  const get = (entry) => {
    // db.ref("/users/"+user.data.uid.slice(0,10) + '/info/').update(
    db.ref().child("/users/"+'MRmuDPwCwc'+'/'+entry+'/perfil.jpg').getDownloadURL().then((url)=>{
      setUrl(url);
    });
  }

  return (
    <>
    {!done &&
      <Button variant="info" onClick={() => put('picture',props.image)} className="mr-3">Imagen de perfil</Button>
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
