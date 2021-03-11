import React from 'react';
import NavBar from './navbar.js';

import '../../styles/mainlinks.css'
import '../../styles/landing.css'

import background from '../../assets/images/Background.png'
import footer from '../../assets/images/Trazado.png'
import symbol from '../../assets/images/symbol.png'

const SobreNosotros = () => {

  return (
    <React.Fragment>
      <div className="fluid-container">
      </div>
        <div className="container">
          <div className="card margin-top overflow" style={{width: "80%"}}>
            <div className="card-body">
              <h5 className="card-title">Sobre Nosotros</h5>
              <h6 className="card-subtitle mb-2 text-muted">Somos un grupo de idealistas.</h6>
              <p className="card-text">
                Creemos que nuestra sociedad puede elegir tener un mundo en armonía, y es necesario construirlo desde el presente. Creemos que la educación tiene un gran poder de transformador, y vemos necesario transformarla para que su poder reflorezca. Creemos que los niños y los jóvenes serán quienes construyan un mundo sostenible, nosotros queremos acompañarlos y darles herramientas útiles para ese camino.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Aquí encontrarás una plataforma.</h6>
              <p>
                Una plataforma tecnológica en la que podrás aprender desde matemáticas hasta trabajar en ser un mejor humano. Pero también una plataforma de personas que se conectan para aprender en conjunto, para crear conocimiento colectivo, para compartir aprendizajes. Una plataforma que acompaña a colegios en su proceso pedagógico, permitiéndoles ser centros de experiencias significativas, al tener una plataforma tecnológica para el aprendizaje individual y colectivo.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Nuestro presente.</h6>
              <p>
                Holss y Comfama nos unimos para crear un espacio para el aprendizaje. Estamos en un proceso de construcción que esperamos nunca termine. En nuestro presente, te invitamos a conocer nuestro curso de comprensión lectora para niños, jóvenes y adultos, y nuestro programa de aprendizaje para nuevas madres y padres.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
  );
}

export default SobreNosotros;
