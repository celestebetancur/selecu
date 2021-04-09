import React from 'react';
import NavBar from './navbar'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const NuestraFilosofia = () => {

  return (
    <>
      <NavBar />
      <Container fluid>
        <Jumbotron>
          <h1>Nuestros principios de aprendizaje</h1>
        </Jumbotron>
        <Card>
          <Card.Body>
            <Card.Title>
              Estos son la base que determina cómo concebimos el concepto de aprendizaje, qué nos importa y cómo generamos experiencias de aprendizaje.
            </Card.Title>
              <ListGroup>
                <ListGroup.Item>Aprendizaje basado en proyectos</ListGroup.Item>
                <ListGroup.Item>Aprendizaje entre pares</ListGroup.Item>
                <ListGroup.Item>Piso bajo</ListGroup.Item>
                <ListGroup.Item>Techo alto</ListGroup.Item>
                <ListGroup.Item>Paredes anchas</ListGroup.Item>
                <ListGroup.Item>Comunidad</ListGroup.Item>
                <ListGroup.Item>Universalidad</ListGroup.Item>
              </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default NuestraFilosofia;
