import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { Link } from "react-router-dom"

import '../../styles/landing.scss'

import symbol from '../../assets/images/landing/symbol.png'
import selecu from '../../assets/images/landing/Selecu.png'

const NavBar = (props) => {
  const [active, setActive] = useState(0)

  useEffect(()=>{
    let loc = window.location.hash
    switch (loc) {
      case '#/':
        setActive(0)
        break;
      case '#/quienessomos':
        setActive(1)
        break;
      case  '#/nuestrafilosofia':
        setActive(2)
        break;
      case '#/comunidad':
        setActive(3)
        break;
      case '#/contacto':
        setActive(4)
        break;
    }
  },[])

  return (
      <>
        <header>
          <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Container>
            <Nav.Item className={active == 0 ? 'nav-item-border' : ''}>
              <Navbar.Brand href="#">
                <Image src={selecu}/>
              </Navbar.Brand>
            </Nav.Item>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item className={active == 1 ? 'nav-item-border' : ''}>
                  <Link className="nav-link" to="quienessomos">SOBRE NOSOTROS</Link>
                </Nav.Item>
                <Nav.Item className={active == 2 ? 'nav-item-border' : ''}>
                  <Link className="nav-link" to="nuestrafilosofia">NUESTRA FILOSOFÍA</Link>
                </Nav.Item>
                <Nav.Item className={active == 3? 'nav-item-border' : ''}>
                  <Link className="nav-link" to="comunidad">COMUNIDAD</Link>
                </Nav.Item>
                <Nav.Item className={active == 4 ? 'nav-item-border' : ''}>
                  <Link className="nav-link" to="contacto">CONTACTO</Link>
                </Nav.Item>
                <Nav.Item className="ml-1">
                  <Image width="25rem" src={symbol} style={{marginTop:"0.5rem"}}/>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }

export default NavBar;
