import React, {useEffect, useState} from 'react';
import Posts from './Posts'

import { useFirebaseApp } from 'reactfire'

const Community = (props) => {
  const [postHistory, setPostHistory] = useState([]);
  const [done, setDone] = useState(false);

  const firebase = useFirebaseApp();
  const db = firebase.database();

  useEffect(()=>{
    db.ref().child("/community/general").on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        let temp = []
        for (const [key] of Object.entries(snap)) {
          temp.push([key,snap[key].name,snap[key].photo,snap[key].post])
        }
        setPostHistory(temp.reverse())
        setDone(true)

      }
    );
  },[]);

  const mapDBPost = postHistory.map((value)=>{
    return(
      <Posts
        id={value[0]}
        name={value[1]}
        imgProfile={value[2]}
        post={value[3]}
      />
    )
  })

  return(
    <div>{mapDBPost}</div>
  );
}

export default Community;
