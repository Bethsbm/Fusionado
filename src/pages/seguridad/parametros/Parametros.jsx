import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';


const urlapi = "http://localhost:3001";
export default function Parametros(props) {

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
       descripcion:'Ingreso a pantalla PARAMETROS',
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


    const [registros, setRegistros] = useState([]);
    const getRegistros = async () => {
      fetch(urlapi + "/ms_parametros/getall"
      , {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(responseJson => {  
          console.log("responseJson",responseJson)
          console.log("responseJson.status",responseJson.status)
          setRegistros(responseJson.object);
      })
      .catch(error=>{
          console.log(error)   
      })
  };
  
    useEffect(() => {
      saveLog()
      getRegistros();
    }, []);
  
  
    //Configuramos las columnas de la tabla
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id_parametro || 'No aplica',
        sortable: true,
      
      },
      {
        name: "Nombre",
        selector: (row) => row.parametro || 'No aplica',
        sortable: true,
      
      },
      {
        name: "Valor",
        selector: (row) => row.valor || 'No aplica',
        sortable: true,
      
      },
      {
        name: "Creado Por",
        selector: (row) => row.creado_por || 'No aplica',
        sortable: true,
      
      },
     
        {
          name: "Fecha",
          selector: (row) => row.fecha_creacion || 'No aplica',
          sortable: true,
        
        },
     
    ];
  
    //Configurar la paginación de la tabla
    const paginationComponentOptions = {
      rowsPerPageText: "Filas por página",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todos",
    };
  
    return (
      <div className="container">
        <h5>Par&aacute;metros del sistema</h5>
        
        <br />
        <div className="row">
          <DataTable
            columns={columns}
            data={registros}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="550px"
          />
        </div>
      </div>
    );
}
