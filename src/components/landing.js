import React, {useState} from 'react';

import HomePuzzle from '../animations/HomePuzzle'
import NavBar from './Main/navbar.js'
import SobreNosotros from'./Main/sobrenosotros.js'
import NuestraFilosofia from'./Main/nuestrafilosofia.js'
import Contacto from'./Main/contacto.js'
import Comunidad from'./Main/comunidad.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import '../styles/landing.css'

import background from '../assets/images/background.png'
import tablero from '../assets/images/tableroBack.png'
import symbol from '../assets/images/symbol.png'

const MenuRender = (props) => {

  switch (props.onMenu){
    case 0:
      return(
        <>
          <Container className="bg-img" style={{backgroundImage:`url(${background})`}} fluid>
            <Container>
              <Row className="justify-content-center mb-4">
                <Image src={symbol} />
              </Row>
              <Row>
                <Col />
                <Col lg={7} >
                  <Image src={tablero} rounded fluid/>
                  <Container id="defaultP5">
                    <HomePuzzle/>
                  </Container>
                </Col>
                <Col className="d-flex justify-content-start">
                  <h1 id="slogan"><p>CULTURE<br /> SELF LEARNING</p></h1>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
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
    <>
      <NavBar
        navCallback={toggleMenu}
        hideElemets={()=> setElementsActive(!elementsActive)}
       />
      <Container className="h-100 mh-100" fluid>
        <Row className="pt-4">
           <MenuRender
              onMenu={menu}
              elementsActive={elementsActive}
           />
        </Row>
      </Container>
    </>
  );
}

export default Landing;
