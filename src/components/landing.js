import React, {useState} from 'react';

import HomePuzzle from '../animations/HomePuzzle'
import NavBar from './Main/navbar.js'
import SobreNosotros from'./Main/sobrenosotros.js'
import NuestraFilosofia from'./Main/nuestrafilosofia.js'
import Contacto from'./Main/contacto.js'
import Comunidad from'./Main/comunidad.js'

import '../styles/landing.css'

import background from '../assets/images/background.png'
import tablero from '../assets/images/tableroBack.png'
import symbol from '../assets/images/symbol.png'

const MenuRender = (props) => {

  switch (props.onMenu){
    case 0:
      return(
        <React.Fragment>
          <img className={`symbol-background z-top  state-${props.elementsActive}`} src={symbol} alt="..." />
          <div id="defaultP5" className={`container-fluid tablero-background state-${props.elementsActive}`}>
            <img className=" img-fluid" src={tablero} alt="..." />
            <h1 id="slogan"><p>CULTURE<br /> SELF LEARNING</p></h1>
            <HomePuzzle
            />
          </div>
          <div className="container-fluid" >
            <img className="index-background img-fluid"  src={background} alt="..." />
          </div>
        </React.Fragment>
      );
    case 1:
      return <SobreNosotros />;
    case 2:
      return <NuestraFilosofia />;
    case 3:
      return <Comunidad />;
    case 4:
      return <Contacto />;
    }
}

const Landing = () => {
  const [menu, setMenu] = useState(0);
  const [elementsActive, setElementsActive] = useState(false);

  const toggleMenu = (val) => {
    setMenu(val);
  }


  return (
    <div className="container-fluid pos-relative">
      <NavBar
        navCallback={toggleMenu}
        hideElemets={()=> setElementsActive(!elementsActive)}
       />
       <MenuRender
          onMenu={menu}
          elementsActive={elementsActive}
       />
    </div>
  );
}

export default Landing;
