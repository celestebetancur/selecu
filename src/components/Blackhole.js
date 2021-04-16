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
  const [opacity, setOpacity] = useState(false);

  useEffect(()=>{
    setTimeout(() => setOpacity(true),1000);
    setTimeout(() => setStatus(true),6000);
  },[]);

  if(status){
    console.log(props.roll)
    if(props.roll === "Aprendiz"){
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
      <Container id="canvasParentBH" className='opacity-fadeInOut' fluid>
        <Shader
          vert={vert}
          frag={frag}
        />
        {props.userInfo.info.profileImage &&
          <Anime
            easing="easeOutElastic"
            loop={false}
            duration={3000}
            direction="alternate"
            delay={500}
            scale={[1.0,3.0, 0.0]}
            rotate={[0.0,360.0]}
          >
          <StorageImage
            id="bh-img"
            storagePath={"/users/"+props.userInfo.access.UI.slice(0,10)+'/picture/perfil.jpg'}
            alt="Imagen de perfíl"
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
