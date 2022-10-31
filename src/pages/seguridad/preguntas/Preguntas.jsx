import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import '../preguntas/preguntas.css';
const urlapi = "http://localhost:3001";

export default function Pregunta(props) {

    const [registros, setRegistros] = useState([]);
    const getRegistros = async () => {
      fetch(urlapi + "/ms_pregunta/getall"
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
      getRegistros();
    }, []);
  
  
    //Configuramos las columnas de la tabla
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id_pregunta,
        sortable: true,
      
      },
      {
        name: "Pregunta",
        selector: (row) => row.pregunta,
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
        <h3>Preguntas de seguridad</h3>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
          consectetur odio asperiores, deserunt beatae accusantium omnis iure.
        </h5>
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
