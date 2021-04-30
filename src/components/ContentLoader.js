import React, {Suspense, useEffect, useState}  from 'react';

import {connect} from 'react-redux'
import {loadContent} from '../actions'

import {useDatabase} from 'reactfire'

const ContentLoader = (props) => {

  const db = useDatabase();

  useEffect(()=>{
    if(props.degree !== 'undefined'){
      db.ref().child("/content/"+props.degree+"/"+"1"+"/").get().then((snapshot) => {
        if (snapshot.exists()) {
          props.loadContent(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  },[props.degree])

  return(
    <></>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo,
  };
}

export default connect(mapStateToProps,{loadContent})(ContentLoader);
