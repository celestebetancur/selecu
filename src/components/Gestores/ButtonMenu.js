import React, {useState, useEffect} from 'react'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

const ButtonMenu = (props) => {
  const  [state, setState] = useState(false);

  useEffect(()=>{
    props.setMenuNumber(state);
  },[state]);

  return(
    <Accordion>
      <Card>
          <a className="card-link" onClick={e => setState(0)}>
            Perfil
          </a>
      </Card>
      <Card>
          <a className="collapsed card-link" onClick={e => setState(1)}>
            Panel administración
          </a>
      </Card>
      <Card>
          <a className="collapsed card-link" onClick={e => setState(2)}>
            Listas
          </a>
      </Card>
    </Accordion>
  );
}

export default ButtonMenu;
