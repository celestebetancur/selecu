import React, {useState, useEffect} from 'react'

const List = (props) => {
  const [typeOfUser, setTypeOfUser] = useState('');
  const [userToDisplay, setUserToDisplay] = useState('');

  const users = props.usersList;
  const fullInfo = props.fullInfo;
  const keys = Object.keys(users);

  const names = keys.map((name)=>{
    if(fullInfo[users[name]['UI']]['access'][typeOfUser]){
      return(
        <div className="container">
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body bg-muted">
              <a href="#" onClick={() => setUserToDisplay(name)}><h6 className="card-text">{name}</h6></a>
            </div>
          </div>
        </div>
      );
    }
  });

  return(
    <React.Fragment>
      <div className="card" style={{width: "26rem"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav sm">
            <li className={`list-group-item ${typeOfUser === 'Gestores' ? 'active': ' '}`}>
              <a className="nav-link" href="#" onClick={()=>setTypeOfUser('Gestores')}>Gestores</a>
            </li>
            <li className={`list-group-item ${typeOfUser === 'Mentores' ? 'active': ' '}`}>
              <a className="nav-link" href="#" onClick={()=>setTypeOfUser('Mentores')}>Mentores</a>
            </li>
            <li className={`list-group-item ${typeOfUser === 'Aprendices' ? 'active': ' '}`}>
              <a className="nav-link" href="#" onClick={()=>setTypeOfUser('Aprendices')}>Aprendices</a>
            </li>
          </ul>
        </nav>
        {names}
      </div>
        {userToDisplay &&
        <div className="card" style={{width: "26rem"}}>
          <div className="card-body">
            <Reg
              set={userToDisplay}
              name={`${userToDisplay}`}
              email={`Email: ${fullInfo[users[userToDisplay]['UI']]['registry']['emailParents']}`}
              institution={`Colegio: ${fullInfo[users[userToDisplay]['UI']]['registry']['institution']}`}
              position={`Cargo: ${fullInfo[users[userToDisplay]['UI']]['registry']['year']}`}
              validation={`IUM: ${fullInfo[users[userToDisplay]['UI']]['access']['verification']}`}
            />
          </div>
        </div>
        }
      </React.Fragment>
  );
}

const Reg = (props)=>{
  if(props.set !== undefined){
    return(
      <div className="container">
        <div className="card" style={{width: "22rem"}}>
        <h5 className="card-title">Información de registro</h5>
        <h6 className="card-title">{props.name}</h6>
        <hr/>
          <div className="card-body">
            <p>{props.email}</p>
            <p>{props.institution}</p>
            <p>{props.position}</p>
            <p>{props.validation}</p>
          </div>
        </div>
      </div>
    );
  }
};


export default List;
