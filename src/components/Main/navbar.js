import React, {useState} from 'react';

import '../../styles/landing.css'

import symbol from '../../assets/images/symbol.png'
import selecu from '../../assets/images/Selecu.png'


const NavBar = (props) => {
  const [menu, setMenu] = useState(true);

  const show = (val) => {
    setMenu(val);
    props.navCallback(val);
  }

  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark z-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navi-list navbar-nav me-auto mb-2 mb-lg-2 bg-dark">
                  <li className="nav-items item-1 nav-item" onClick={e => show(0)}>
                    <img src={selecu} alt="..." />
                  </li>
                  <li className="nav-items item-rest" onClick={e => show(1)}>
                    SOBRE NOSOTROS
                  </li>
                  <li className="nav-items item-rest" onClick={e => show(2)}>
                    NUESTRA FILOSOFÍA
                  </li>
                  <li className="nav-items item-rest" onClick={e => show(3)}>
                    COMUNIDAD
                  </li>
                  <li className="nav-items item-rest" onClick={e => show(4)}>
                    CONTACTO
                  </li>
                  <li className="nav-item item-7">
                    <img width="20rem" src={symbol} alt="..." />
                  </li>
                </ul>
              </div>
            </div>
        </nav>
        </React.Fragment>
    );
  }

  export default NavBar;
