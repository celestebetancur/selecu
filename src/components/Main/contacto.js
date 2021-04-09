import React from 'react';
import NavBar from './navbar'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'

const Contacto = () => {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Jumbotron>
          <h1>¡Nos encantaría saber de ti!</h1>
        </Jumbotron>
        <Card>
          <Card.Body>
            <Card.Text>
              Si estás interesado en conocer más sobre nuestra plataforma, sobre nuestros centros de experiencia aliados, sobre nuestra filosofía o quisieras ser parte de nuestro equipo de trabajo, escríbenos a este correo <strong>hola@selecu.net</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Contacto;
