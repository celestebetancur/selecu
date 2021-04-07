import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'

import '../../styles/milecu.scss'

const MaskMenuMilecu = (props) => {
  const [id, setId] = useState(0);

  const img = props.images.map((i ,index)=> {
    return (
      <Nav.Item key={index}>
        <Image className="menuMask-image" src={i} onClick={()=> props.passIndex(index)}></Image>
      </Nav.Item>
    );
  })

  return (
    <Container id="maskSelector">
      <Nav className="flex-column">
        {img}
      </Nav>
    </Container>
  );
}

export default MaskMenuMilecu;
