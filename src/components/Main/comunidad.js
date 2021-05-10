import React from 'react';
import NavBar from './navbar'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Community from '../community'

const Comunidad = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Jumbotron className="mt-5">
          <h1>Comunidad Selecu</h1>
        </Jumbotron>
        <hr />
      </Container>
      <Container fluid>
        <Container className="justify-content-center" style={{display:'flex'}}>
          <Community />
        </Container>
      </Container>
    </>
  );
}

export default Comunidad;
