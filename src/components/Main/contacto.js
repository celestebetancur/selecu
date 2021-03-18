import React from 'react';

import '../../styles/mainlinks.css'
import '../../styles/landing.css'

const Contacto = () => {

  return (
    <React.Fragment>
      <div className="fluid-container">
        <div class="jumbotron text-center">
          <h1>¡Nos encantaría saber de ti!</h1>
        </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted"></h6>
              <p className="card-text">
                Si estás interesado en conocer más sobre nuestra plataforma, sobre nuestros centros de experiencia aliados, sobre nuestra filosofía o quisieras ser parte de nuestro equipo de trabajo, escríbenos a este correo <strong>hola@selecu.net</strong>
              </p>
            </div>
          </div>
      </React.Fragment>
  );
}

export default Contacto;
