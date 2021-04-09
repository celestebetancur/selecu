import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import '../../styles/landing.scss'

import symbol from '../../assets/images/landing/symbol.png'
import selecu from '../../assets/images/landing/Selecu.png'

const NavBar = (props) => {
  return (
      <>
        <header>
          <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Nav.Item className="ml-5">
              <Navbar.Brand className="ml-5 mr-5" href="#">
                <Image src={selecu}/>
              </Navbar.Brand>
            </Nav.Item>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item>
                  <Nav.Link href="#/quienessomos">SOBRE NOSOTROS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#/nuestrafilosofia">NUESTRA FILOSOFÍA</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#/comunidad">COMUNIDAD</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#/contacto">CONTACTO</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-5">
                  <Image width="25rem" src={symbol} style={{marginTop:"0.5rem"}}/>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </>
    );
  }

export default NavBar;
