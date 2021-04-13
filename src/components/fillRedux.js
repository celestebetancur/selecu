import React, {useState, useEffect, Suspense} from 'react';
import {useUser, useDatabase} from 'reactfire'

import {connect} from 'react-redux'
import {loadUserInfo, userRollPass, loadUserData} from '../actions'

import Blackhole from './Blackhole'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

const FillRedux = (props) => {
  const [reduxReady, setReduxReady] = useState(false);
  const [homeSelect, setHomeSelect] = useState(0);

  const user = useUser();
  const database = useDatabase();

  useEffect(()=>{
    if(!reduxReady){
      props.loadUserData(user);
      database.ref().child("/users/"+user.data.uid.slice(0,10)).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          props.loadUserInfo(snap);
          props.userRollPass(snap.registry.year);
        }
      );
    }
    if(props.userInfo.info !== '' && !reduxReady){
      if(props.userInfo.access.Aprendices){
        setHomeSelect(3);
      }
      if(props.userInfo.access.Mentores){
        setHomeSelect(2);
      }
      if(props.userInfo.access.Gestores){
        setHomeSelect(1);
      }
      setReduxReady(true);
    }
  },[user]);

  switch(homeSelect){
    case 0:
      return(
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <Container className="center">
            <Spinner animation="border" variant="primary" />
          </Container>
        </Suspense>
      );
      break;
    case 1:
      return <Blackhole roll="Gestores"/>;
      break;
    case 2:
      return <Blackhole roll="Mentores"/>;
      break;
    case 3:
      return <Blackhole roll="Aprendices" />
      break;
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{
  loadUserInfo,
  userRollPass,
  loadUserData
})(FillRedux);
