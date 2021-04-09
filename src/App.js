import React, {useEffect , useState}  from 'react';
import Landing from './components/landing'
import Login from './components/login'
import firebase from 'firebase/app'
import { useUser } from 'reactfire'
import 'firebase/auth'

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from './actions'

import './styles/app.css'

const App = (props) => {
  const [name, setName] = useState('');

  const user = useUser();

  useEffect(()=>{
    if(user.data !== null && !props.firstStageStatus){
      props.loadUserData(user);
      props.loginFirstStage(user.hasEmitted);
      const ref = firebase.database().ref().child(user.data.uid).child('info').child('name');
      ref.on(
        'value',(snapshot) => {
          setName(snapshot.val());
        }
      );
    }
  });

  if(!props.firstStageStatus){
    return <Landing />;
  }
  return <Login/>;
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(App);
