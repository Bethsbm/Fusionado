import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../recuperacion_preguntas/login.css';
import burridogs from '../recuperacion_preguntas/loginbg.jpg';


const urlAPi="http://localhost:3001"
export default function RecuperacionPreguntas(props) {

    const [registros, setRegistros] = useState([]);
    const getRegistros = async () => {
      fetch(urlAPi + "/ms_pregunta/getall"
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

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Recuperacion preguntas secretas</h1>
                <Form>
                    
               
                <div className="inputs">
                    <label>Pregunta 1</label>
                    <div className="">
                        <div className="fa fa-user-o"></div>
                        {/* <input
                            type="text"
                            placeholder="Seleccione su pregunta"
                        /> */}
                          <FormGroup>
                            <Label for="exampleSelectMulti">Select Multiple</Label>
                            <Input  type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                <option>1</option>
                            </Input>
                            </FormGroup>
                    </div>

                    <label>Respuesta</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su respuesta"
                        />
                    </div>

                    <button
                        className='btn'>Ingresar</button>
                        <div className="buttom-container">
                        <Link to="/login">
                            Cancelar
                        </Link>
                    </div>
                </div>


                </Form>
            </div>
        </div>
    )
}
