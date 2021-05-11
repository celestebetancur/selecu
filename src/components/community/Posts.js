import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Img from "react-cool-img";

const Posts = (props) => {

  const epochToDate = (val) => {
    var dateVal =`/Date(${val})/`;
    var date = new Date( parseFloat( dateVal.substr(6 )));
    return (date.getMonth() + 1) + "/" +date.getDate() + "/" + date.getFullYear() + " " +date.getHours() + ":" +date.getMinutes() + ":" +date.getSeconds()
  }

  if(props.type === 0){
    return(
      <Card border="primary" style={{ width: '400px', marginTop:'4px' }}>
        <Card.Header>{epochToDate(props.id)}</Card.Header>
        <Row>
          <Col style={{margin:'0'}}>
            <Img src={props.imgProfile} style={{width:'3rem'}}/>
          </Col>
          <Col xs={9} style={{margin:'0',paddingLeft:'0',paddingTop:'0.5rem'}}>
            <h4 >{props.name}</h4>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-center">
          <Card.Img src={props.imgProfile} style={{width:'300px'}}/>
          <Card.Body style={{paddingTop:'0.1rem'}}>
            <hr />
            {props.post}
          </Card.Body>
        </Row>
      </Card>
    )
  }
  if(props.type === 1){
    return(
      <Card border="primary" style={{ width: '400px', marginTop:'4px' }}>
        <Card.Header>{epochToDate(props.id)}</Card.Header>
        <Row>
          <Col style={{margin:'0'}}>
            <Img src={props.imgProfile} style={{width:'3rem'}}/>
          </Col>
          <Col xs={9} style={{margin:'0',paddingLeft:'0',paddingTop:'0.5rem'}}>
            <h4 >{props.name}</h4>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-center">
          <hr />
          <Card.Body style={{paddingTop:'0.2rem'}}>
            {props.post}
          </Card.Body>
        </Row>
      </Card>
    )
  }
  return <></>
}

Posts.propTypes = {
  name: PropTypes.string,
  post: PropTypes.string
}

export default Posts;
