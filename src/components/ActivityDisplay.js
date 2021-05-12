import React, {useEffect, useState}  from 'react';
import {connect} from 'react-redux'
import { useFirebaseApp, StorageImage } from 'reactfire'

const ActivityDisplay = (props) => {
  const [index, setIndex] = useState(0)

  const [imgPath, setImgPath] = useState('')
  const [imgPathBG, setImgPathBG] = useState('')

  useEffect(()=>{
    setIndex(props.contentToDiplay['structure']['intro']+1)
  },[])

  useEffect(()=>{
    if(index !== 0){
      setImgPath(props.contentToDiplay[index].imgPath)
      setImgPathBG(props.contentToDiplay[index].imgPathBG)
    }
  },[index])

  return(
    <>
      <div className="container-glass-full"></div>
      {index !== 0 &&
        <>
        <StorageImage
            storagePath={props.contentToDiplay[index].imgPathBG}
            style={{width:'100%', left:'0%',top:'0%',position:'absolute',zIndex:'-1000',overflow:'hidden'}}
            />
        <StorageImage
          storagePath={props.contentToDiplay[index].imgPath}
          style={{width:'90%',height:'80%',overflow:'hidden',position:'absolute',zIndex:'3000',paddingTop:'1rem'}}
          />
        </>
      }

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    contentToDiplay: state.loadContent,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(ActivityDisplay);
