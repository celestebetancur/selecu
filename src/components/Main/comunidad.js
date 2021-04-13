import React from 'react';
import NavBar from './navbar'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Comunidad = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Jumbotron className="mt-5">
          <h1>Comunidad Selecu</h1>
        </Jumbotron>
      </Container>
    </>
  );
}

export default Comunidad;
