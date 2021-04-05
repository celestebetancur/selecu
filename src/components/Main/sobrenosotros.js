import React from 'react';
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'

const SobreNosotros = () => {
  return (
    <>
      <Container fluid>
        <Jumbotron>
          <h1>Sobre Nosotros</h1>
        </Jumbotron>
        <Card>
          <Card.Body>
            <Card.Title>Somos un grupo de idealistas</Card.Title>
            <Card.Text>
              Creemos que nuestra sociedad puede elegir tener un mundo en armonía, y es necesario construirlo desde el presente. Creemos que la educación tiene un gran poder de transformador, y vemos necesario transformarla para que su poder reflorezca. Creemos que los niños y los jóvenes serán quienes construyan un mundo sostenible, nosotros queremos acompañarlos y darles herramientas útiles para ese camino.
            </Card.Text>
            <Card.Title>Aquí encontrarás una plataforma</Card.Title>
            <Card.Text>
              Una plataforma tecnológica en la que podrás aprender desde matemáticas hasta trabajar en ser un mejor humano. Pero también una plataforma de personas que se conectan para aprender en conjunto, para crear conocimiento colectivo, para compartir aprendizajes. Una plataforma que acompaña a colegios en su proceso pedagógico, permitiéndoles ser centros de experiencias significativas, al tener una plataforma tecnológica para el aprendizaje individual y colectivo.
            </Card.Text>
            <Card.Title>Nuestro presente</Card.Title>
            <Card.Text>
              Holss y Comfama nos unimos para crear un espacio para el aprendizaje. Estamos en un proceso de construcción que esperamos nunca termine. En nuestro presente, te invitamos a conocer nuestro curso de comprensión lectora para niños, jóvenes y adultos, y nuestro programa de aprendizaje para nuevas madres y padres.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default SobreNosotros;
