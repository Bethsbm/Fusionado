import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Usuarios.css";
import { downloadCSV, toUpperCaseField } from "../../../utils/utils";

const urlapi = "http://localhost:3001";
// const UrlMostrar = "http://190.53.243.69:3001/categoria/getall/";
// const UrlEliminar = "http://190.53.243.69:3001/categoria/eliminar/";
const Usuarios = () => {
 let navigate = useNavigate();
 //Configurar los hooks
 const [registroDelete, setRegistroDelete] = useState('');


 const [message, setMesagge] = useState("");
 const [color, setColor] = useState("danger");
 const [isValid, setIsValid] = useState(false);
 


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
       descripcion:'Ingreso a pantalla USUARIOS',
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
    fetch(urlapi + "/registro/getall"
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
    saveLog();
    getRegistros();
  }, []);

  // const goToEdit= (id)=>{
  //   navigate('/admin/editUser/'+id,{
  //     data:"data"
  //   })
  // }


  //procedimineto para eliminar un registro
  const deleteRegistro = async () => {
      console.log('registroDelete',registroDelete)
    try {
      console.log("id arriba")
      setIsValid(true)
      const res = await axios.delete(`${urlapi}/ms_registro/eliminar/${registroDelete}`);
      console.log('res',res)
      if (res.status) {
        // alert("Eliminado!"); 
        setColor("success")
        setMesagge('Registro eliminado exitosamente')
      } else {
        setColor("danger")
        setMesagge(res.message)
      }
      setTimeout(()=>{
        setIsValid(false)
       },1000) 


      setRegistros([]);
      getRegistros();
    } catch (error) {
      console.log('error.response.data',error.response)
      if(!error.response.data.status){
        setColor("warning")
        setMesagge('El usuario ya posee historial en BD,no puede ser eliminado')
      }
      setTimeout(()=>{
        setIsValid(false)
       },1000) 
    }
  };
   //Ventana modal de confirmación de eliminar
   const [modalEliminar, setModalEliminar] = useState(false);
   const abrirModalEliminar = () => setModalEliminar(!modalEliminar);
 

   
   
  

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_usuario || 'NO APLICA',
      sortable: false,
    }, 

    // {
    //   name: "ESTADO",
    //   sortable: false,
    //   render:statusDes()
      
    // },
    {
      name: "ESTADO",
      selector: (row) => toUpperCaseField(row.descripcion) || 'NO APLICA',
      sortable: false,
    
    },
  
    {
      name: "NOMBRE",
      selector: (row) => toUpperCaseField(row.usuario) || 'NO APLICA',
      sortable: false,
    
    },
    {
      name: "USUARIO",
      selector: (row) => toUpperCaseField(row.nombre_usuario) || 'NO APLICA',
      sortable: true,
    
    },
    {
      name: "CORREO",
      selector: (row) => row.correo_electronico || 'NO APLICA',
      sortable: false,
    
    },
    {
      name: "CONTRASEÑA",
      selector: (row) => row.contrasena || 'NO APLICA',
      sortable: false,
    
    },
    {
      name: "ROLE",
      selector: (row) => toUpperCaseField(row.rol) || 'NO APLICA',
      sortable: true,
    
    },
    {
      name: "CREADO POR",
      selector: (row) => toUpperCaseField(row.creado_por) || 'NO APLICA',
      sortable: false,
    },
    {
      name: "ULTIMA C",
      selector: (row) => row.fecha_ultima_conexion || 'NO APLICA',
      sortable: false,
    },
    {
      name: "INTENTOS",
      selector: (row) => row.intentos_login || 'NO APLICA',
      sortable: false,
    },
    {
      name: "PRIMER INGRESO",
      selector: (row) => row.primer_ingreso || 'NO APLICA',
      sortable: false,
    },
    {
      name: "FECHA CREACIÓN",
      selector: (row) => row.fecha_creacion || 'NO APLICA',
      sortable: false,
    },
    {
      name: "FECHA VEN",
      selector: (row) => row.fecha_vencimiento || 'NO APLICA',
      sortable: false,
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Link
            to={`/admin/editUser/${row.id_usuario}`}
            
            className="btn  btn-light"
            
            title="Editar"
          >
            <i className="bi bi-pencil-fill"></i>
          </Link>
          {/* <button
            className="btn  btn-light"
            title="Editar"
            onClick={goToEdit(row.id_usuario)}
          >
            <i className="bi bi-trash-fill"></i>
          </button> */}
          &nbsp;
          <button
            className="btn  btn-light"
            title="Eliminar"
            onClick={() => {
              console.log(row.id_usuario);
              setRegistroDelete(row.id_usuario);
              abrirModalEliminar();
            }}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };


 //Barra de busqueda
 const [ busqueda, setBusqueda ] = useState("")
 //capturar valor a buscar
  const valorBuscar = (e) => {
    setBusqueda(e.target.value)   
  }
    //metodo de filtrado 
  let results = []
  if(!busqueda){
      results = registros
  }else{
      results = registros.filter( (dato) =>
      dato.id_usuario.toString().includes(busqueda.toLocaleLowerCase()) || 
      dato?.nombre_usuario?.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||       
      dato?.usuario?.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||       
      dato?.fecha_creacion?.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||       
      dato?.correo_electronico?.toLowerCase().includes(busqueda.toLocaleLowerCase())     
      )
  };

  return (
    <div className="container">
      <h5>Usuarios</h5>
      {/* <h5>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
        consectetur odio asperiores, deserunt beatae accusantium omnis iure.
      </h5> */}
      <br />
      

      <div className="row">
      <Alert 
                     isOpen={isValid} 
                     color={color}
                     >{message}</Alert>
        {/* <div className="col">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group me-2"
              role="group"
              aria-label="First group"
            >
              <Link
                to="/admin/createUser"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                <i className="fa-solid fa-plus"></i> Nuevo
              </Link>
            </div>

            
          </div>
        </div> */}
        <div className="col">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group me-2"
              role="group"
              aria-label="First group"
            >
              <Link
                to="/admin/createUser"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                 Nuevo
                <i class="bi bi-plus-lg"></i>
              </Link>
            </div>
            <div
              className="btn-group me-2"
              role="group"
              aria-label="Second group"
            >
              <Link
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={() => downloadCSV(registros,'Reporte_usuarios_')}
              >
                <i class="bi bi-file-excel-fill"></i> Excel
              </Link>
            </div>
          </div>
        </div>

        {/*Mostrar la barra de busqueda*/}
        <div className="col-4">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
            <i class="bi bi-search"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar por Nombre|Usuario|Correo..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
          </div>
        </div>

      </div>
      <div className="row">
        <DataTable
          columns={columns}
          data={results}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          noDataComponent=". . . Datos no encontrados . . ."
          paginationPerPage="6"
          // fixedHeaderScrollHeight="550px"
        />
      </div>

      {/* Ventana Modal de Eliminar*/}
      <Modal isOpen={modalEliminar} toggle={abrirModalEliminar} centered>
        <ModalHeader toggle={abrirModalEliminar}>Eliminar Registro</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de Eliminar este Registro?</p>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // console.log('elimionar')
              deleteRegistro();
              abrirModalEliminar();
            }}
          >
            Eliminar
          </Button>
          <Button color="secondary" onClick={abrirModalEliminar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};
export default Usuarios;
