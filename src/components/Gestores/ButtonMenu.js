import React, {useState, useEffect} from 'react'

const ButtonMenu = (props) => {
  const  [state, setState] = useState(false);

  useEffect(()=>{
    props.setMenuNumber(state);
  },[state]);

  return(
    <div id="accordion">
      <div className="card">
          <a className="card-link" href='#' onClick={e => setState(0)}>
            Perfil
          </a>
      </div>
      <div className="card">
          <a className="collapsed card-link" href='#' onClick={e => setState(1)}>
            Panel administración
          </a>
      </div>
      <div className="card">
          <a className="collapsed card-link" href='#' onClick={e => setState(2)}>
            Listas
          </a>
      </div>
    </div>
  );
}

export default ButtonMenu;
