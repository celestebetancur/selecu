import React, {useState} from 'react';

import HomePuzzle from '../animations/HomePuzzle'
import NavBar from './Main/navbar.js'
import SobreNosotros from'./Main/sobrenosotros.js'
import NuestraFilosofia from'./Main/nuestrafilosofia.js'
import Contacto from'./Main/contacto.js'
import Comunidad from'./Main/comunidad.js'

import '../styles/landing.css'

import background from '../assets/images/Background.png'
import footer from '../assets/images/Trazado.png'
import tablero from '../assets/images/tableroBack.png'
import symbol from '../assets/images/symbol.png'

const MenuRender = (props) => {

  switch (props.onMenu){
    case 0:
      return(
        <div className="container" style={{backgroundImage: `url(${background})`}}>
        <img className="symbol-background z-top" src={symbol} alt="..." />
        <main>
          <div id="defaultP5" className="container index-container img-fluid">
            <img className="tablero-background img-fluid" src={tablero} alt="..." />
            <h1 id="slogan"><p>CULTURE<br /> SELF LEARNING</p></h1>
            <HomePuzzle
            />
          </div>
        </main>
        <footer >
          <div className="container index-container img-fluid" style={{backgroundImage: `url(${footer})`}}>
          <img className="index-background" src={background} alt="..." />
            <div className="index-footer">
               <img className="img-fluid" src={footer} alt="..."/>
            </div>
          </div>
        </footer>
        </div>
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

  const toggleMenu = (val) => {
    setMenu(val);
  }

  return (
    <React.Fragment>
      <NavBar
        navCallback={toggleMenu}
       />
       <MenuRender
          onMenu={menu}
       />
    </React.Fragment>
  );
}

export default Landing;
