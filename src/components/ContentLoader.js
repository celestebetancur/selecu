import React, {Suspense, useEffect, useState}  from 'react';

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from '../actions'

import {useDatabase} from 'reactfire'

const ContentLoader = (props) => {
  const [content, setContent] = useState({})

  const db = useDatabase();

  useEffect(()=>{
    if(props.degree !== 'undefined'){
      db.ref().child("/content/"+props.degree+"/"+"1"+"/").get().then((snapshot) => {
        if (snapshot.exists()) {
          setContent(snapshot.val());
          console.log(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  },[])

  return(
    <></>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(ContentLoader);
