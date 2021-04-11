import React, {useState, useEffect} from 'react'
import Landing from '../landing'
import SignOut from '../SignOut'

import { AuthCheck } from 'reactfire'
import {connect} from 'react-redux'

const Mentores = (props) => {
  const [userInfo, setUserInfo] = useState({});


  useEffect(()=>{
    setUserInfo(props.userInfo);
  },[props.userInfo]);

  return(
    <AuthCheck fallback={<Landing />}>
    {props.userInfo !== {} &&
      <div className="card selectCard" style={{width: "25rem"}}>
        <div className="card-body">
        <h5 className="card-title">Mentores</h5>
          <div style={{display:"block"}}>
            <h6>{`Hola ${props.userInfo.info.nick}`}</h6>
            <hr />
            <p>En esta página estará el panel para mentores</p>
            <SignOut />
          </div>
        </div>
      </div>
    }
    </AuthCheck>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(Mentores);
