import React from 'react';
import SignOut from './SignOut'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import background from '../assets/images/landing/background.png'

const FallbackAccessDenied = (props) => {

  return (
    <Container className="bg-img" fluid style={{backgroundImage:`url(${background})`}}>
      <Container fluid>
        <Card style={{width:'60%',left:"20%"}} className="text-center">
          <Card.Body>
            <Card.Title>ACCESO DENEGADO</Card.Title>
            <Card.Text>
              {`No tienes autorización para ingresar como: ${props.roll}.
               Si crees que esto es un error, portate bien, haz tus tareas,
               se respetuoso con todos y con todo y por último... comunicate con Celes ;)`}
            </Card.Text>
            <SignOut
              text='Regresar al rompecabezas'
            />
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default FallbackAccessDenied;
