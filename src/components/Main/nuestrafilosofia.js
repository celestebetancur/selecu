import React from 'react';
import NavBar from './navbar.js';

import '../../styles/mainlinks.css'
import '../../styles/landing.css'

import background from '../../assets/images/Background.png'
import footer from '../../assets/images/Trazado.png'
import symbol from '../../assets/images/symbol.png'

const NuestraFilosofia = () => {

  return (
    <React.Fragment>
      <div className="fluid-container">
      </div>
        <div className="container">
          <div className="card margin-top overflow translate-top" style={{width: "60%"}}>
            <div className="card-body">
              <h5 className="card-title">Nuestros principios de creación de aprendizaje.</h5>
              <p className="card-text">
                Estos son la base que determina cómo concebimos el concepto de aprendizaje, qué nos importa y cómo generamos experiencias de aprendizaje.
                <ul>
                  <li>Aprendizaje basado en proyectos</li>
                  <li>Aprendizaje entre pares</li>
                  <li>Piso bajo</li>
                  <li>Techo alto</li>
                  <li>Paredes anchas</li>
                  <li>Comunidad</li>
                  <li>Universalidad</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
  );
}

export default NuestraFilosofia;
