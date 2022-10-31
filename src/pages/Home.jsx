import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";

const urlapi = "http://localhost:3001";
function Home() {
 /** 
   ** Creando bitacora  
   * enviado infromacion de bitacora a la BD
   * */ 
   const saveLog = async () => {
    const userdata= JSON.parse(localStorage.getItem('data')) 
    let log={
       fecha: new Date(),
       id_usuario:userdata.data.id || 0,
       accion:'READ',
       descripcion:'Ingreso entro a HOME',
  }
    fetch(urlapi + "/logs/save"
    , {
    method: 'POST',
    body:JSON.stringify(log),
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        console.log("responseJson",responseJson)
    })
    .catch(error=>{
        console.log(error)   
    })
};

useEffect(() => {
  saveLog()
}, []);

  return (
    <Row>
    <Col className="">
          <Card
          className="my-2"
          color="primary"
          inverse
          style={{
            width: '18rem'
          }}
        >
          <CardHeader>
            Usuarios
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              2,303
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
          </CardBody>
        </Card>
    </Col>
    <Col className="">
    <Card
    className="my-2"
    color="success"
    inverse
    style={{
      width: '18rem'
    }}
  >
    <CardHeader>
      Preguntas
    </CardHeader>
    <CardBody>
      <CardTitle tag="h5">
        2,303
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
    </CardBody>
  </Card>
    </Col>
    <Col className="">
    <Card
    className="my-2"
    color="warning"
    inverse
    style={{
      width: '18rem'
    }}
  >
    <CardHeader>
      Bit&aacute;coras
    </CardHeader>
    <CardBody>
      <CardTitle tag="h5">
        2,303
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
    </CardBody>
  </Card>
    </Col>
    <Col className="">
    <Card
    className="my-2"
    color="info"
    inverse
    style={{
      width: '18rem'
    }}
  >
    <CardHeader>
      Roles
    </CardHeader>
    <CardBody>
      <CardTitle tag="h5">
        2,303
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
    </CardBody>
  </Card>
    </Col>



    

  </Row>
  
  );
}

export default Home;
