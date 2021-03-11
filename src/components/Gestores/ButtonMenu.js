import React, {useState, useEffect} from 'react'

const ButtonMenu = (props) => {
  const  [state, setState] = useState(false);

  useEffect(()=>{
    props.setMenuNumber(state);
  },[state]);

  return(
    <div id="accordion">
      <div className="card">
        <div className="card-header">
          <a className="card-link" data-toggle="collapse" href="#collapseOne" onClick={e => setState(0)}>
            Perfil
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo" onClick={e => setState(1)}>
            Panel administración
          </a>
        </div>
        <div id="collapseTwo" className="collapse" data-parent="#accordion">
        </div>
      </div>
    </div>
  );
}

export default ButtonMenu;
