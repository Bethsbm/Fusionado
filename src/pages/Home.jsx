import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";
function Home() {
  // console.log(route)
  // console.log(route.params)
  // console.log(route.params.text)
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
