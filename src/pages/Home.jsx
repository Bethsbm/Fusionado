import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";
import { getOneParam } from "../utils/utils";
// const urlapi = "http://localhost:3001";
function Home() {

  var dataPar=JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlAPi =urlApiParam.valor

  let navigate = useNavigate();
 /** 
   ** Creando bitacora  
   * enviado infromacion de bitacora a la BD
   * */ 
   const saveLog = async () => {
    const userdata= JSON.parse(localStorage.getItem('data')) 
    let log={
       fecha: new Date(),
       id_usuario:userdata.data.id || 0,
       accion:'LECTURA',
       descripcion:'Ingreso a  INICIO',
  }
    fetch(urlAPi + "/logs/save"
    , {
    method: 'POST',
    body:JSON.stringify(log),
    headers: {
        'Content-type': 'application/json'
    }
    })
    // .then(response => response.json())
    // .then(responseJson => {  
    //     // console.log("responseJson",responseJson)
    // })
    // .catch(error=>{
    //     // console.log(error)   
    // })
};



/** 
   ** Validando estado de usuario  
   * validando estado de usario para crear camnio de pass
   * */ 
   const validateUserState = async () => {
    const userdata= JSON.parse(localStorage.getItem('data')) 
    let data={
       fecha: new Date(),
       id_usuario:userdata.data.id || 0,
  }
    fetch(urlAPi + "/ms_registro/validateUserState"
    , {
    method: 'POST',
    body:JSON.stringify(data),
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        // console.log("responseJson",responseJson)
        if(!responseJson.status){
          // console.log('algo salio mal en el servidor')
          return
        }
        let statusUser=responseJson.object.estado_usuario
        if(statusUser===1){
          // console.log('Usuario NUEVO')
          navigate('/recuperacion_preguntas/'+userdata.data.id || 0)
        }
        if(statusUser===2){
          // console.log('USUARIO ACTIVO')
        }
    })
    .catch(error=>{
        // console.log(error)   
    })
};
useEffect(() => {
  saveLog()
  validateUserState()
}, []);

  return (
    <div>
      <h1 id="Bienvenido">Bienvenido Al Sistema POS Burridogs</h1>
      <img id="LogoEmpresa" src={logoEmpresa} alt="Logo Empresa" />
    </div>
  );
}

export default Home;
