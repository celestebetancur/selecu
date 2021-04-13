import React, {useEffect,useState} from 'react';
import Anime from 'react-anime';
import {connect} from 'react-redux'
import {StorageImage} from 'reactfire'

import Shader from '../animations/Shader'

import frag from '../animations/shaders/shader.frag'
import vert from '../animations/shaders/shader.vert'

import Container from 'react-bootstrap/Container'

const Blackhole = (props) => {
  const [status, setStatus] = useState(false);


  useEffect(()=>{
    setTimeout(() => setStatus(true),5000);
  },[]);

  console.log(status, props.roll);

  if(status){
    if(props.roll === "Aprendices"){
      window.open("#/home",'_self');
      return <></>;
    }
    if(props.roll === "Mentores"){
      window.open("#/homementores",'_self');
      return <></>;
    }
    if(props.roll === "Gestores"){
      window.open("#/homegestores",'_self');
      return <></>;
    }
  }

    return (
      <Container id="canvasParentBH" fluid>
        <Shader
          vert={vert}
          frag={frag}
        />
        {props.userInfo.info.profileImage &&
          <Anime
          easing="easeOutElastic"
          loop={false}
          duration={5000}
          direction="alternate"
          delay={1000}
          scale={[3.0, 0.0]}
          rotate={[0.0,360.0]}
        >
          <StorageImage
            id="bh-img"
            className="bh-img"
            storagePath={"/users/"+props.userData.data.uid.slice(0,10)+'/picture/perfil.jpg'}
            alt="Imagen de perfíl"
            style={{clipPath: "circle(50% at 50% 50%)"}}
            />
          </Anime>
        }
      </Container>
    );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(Blackhole);
