import React from 'react';

import '../../styles/mainlinks.css'
import '../../styles/landing.css'

const NuestraFilosofia = () => {

  return (
    <React.Fragment>
      <div className="fluid-container">
        <div class="jumbotron text-center">
          <h1>Nuestros principios de aprendizaje</h1>
        </div>
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
      </React.Fragment>
  );
}

export default NuestraFilosofia;
