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

const loadUserDataFirebaseReducer = (user={}, action) => {
  if(action.type === 'USER_ALREADY_LOGGED'){
    return action.payload;
  }
  return user;
}

export default combineReducers({
  loginFirstStage: firstStageLoginReducer,
  userRollPass: firstStageRollReducer,
  loadUserData: loadUserDataFirebaseReducer
});
