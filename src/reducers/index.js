import { combineReducers } from 'redux'

const firstStageLoginReducer = (logged=false, action) => {
  if(action.type === 'FIRST_STAGE_LOGIN'){
    return action.payload;
  }
  return logged;
}

const firstStageRollReducer = (roll=null, action) => {
  if(action.type === 'FIRST_STAGE_PASSWORD'){
    return action.payload;
  }
  return roll;
}

const loadUserInfoReducer = (userInfo={info:''}, action) => {
  if(action.type === 'USER_INFO_LOADED'){
    return action.payload;
  }
  return userInfo;
}

const loadUserDataFirebaseReducer = (user={}, action) => {
  if(action.type === 'USER_ALREADY_LOGGED'){
    return action.payload;
  }
  return user;
}

const loadContentReducer = (data={}, action) => {
  if(action.type === 'CONTENT_LOADED'){
    return action.payload;
  }
  return data;
}

export default combineReducers({
  loginFirstStage: firstStageLoginReducer,
  userRollPass: firstStageRollReducer,
  loadUserData: loadUserDataFirebaseReducer,
  loadUserInfo: loadUserInfoReducer,
  loadContent: loadContentReducer
});
