import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../recuperacion_preguntas/login.css';
import burridogs from '../recuperacion_preguntas/loginbg.jpg';


const urlAPi="http://localhost:3001"
export default function RecuperacionPreguntas(props) {
    let navigate = useNavigate();

    const [question1, setQuestion1] = useState('');
    const [response1, setResponse1] = useState('');
    
    const [question2, setQuestion2] = useState('');
    const [response2, setResponse2] = useState('');
    
    const [question3, setQuestion3] = useState('');
    const [response3, setResponse3] = useState('');
    
    
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        console.log('handleSubmit ran');
        
        const userData= JSON.parse(localStorage.getItem('data'))
        console.log('userData',userData)
        let dataQuest1={
            id_usuario:userData.data.id,
            id_pregunta:parseInt(question1),
            respuesta:response1
        }
        let dataQuest2={
            id_usuario:userData.data.id,
            id_pregunta:parseInt(question2),
            respuesta:response2
        }
        let dataQuest3={
            id_usuario:userData.data.id,
            id_pregunta:parseInt(question3),
            respuesta:response3
        }
        console.log('dataQuest1',dataQuest1)
        console.log('dataQuest2',dataQuest2)
        console.log('dataQuest3',dataQuest3)
    
       await fetch(urlAPi+'/ms_pregunta/save',
              {
              method: 'POST',
              body: JSON.stringify(dataQuest1),
              headers: {
                  'Content-type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(responseJson => {  
              console.log("responseJson 1",responseJson)
              console.log("responseJson.status 1",responseJson.status)
          })

       await fetch(urlAPi+'/ms_pregunta/save',
              {
              method: 'POST',
              body: JSON.stringify(dataQuest2),
              headers: {
                  'Content-type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(responseJson => {  
              console.log("responseJson 2",responseJson)
              console.log("responseJson.status 2",responseJson.status)
          })
       await fetch(urlAPi+'/ms_pregunta/save',
              {
              method: 'POST',
              body: JSON.stringify(dataQuest3),
              headers: {
                  'Content-type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(responseJson => {  
              console.log("responseJson 3",responseJson)
              console.log("responseJson.status 3",responseJson.status)
          })
       
          await fetch(urlAPi+'/ms_registro/updateUserState',
              {
              method: 'POST',
              body: JSON.stringify({id_usuario:userData.data.id,}),
              headers: {
                  'Content-type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(responseJson => {  
              console.log("update user",responseJson)
              console.log("responseJson.status 3",responseJson.status)
          })


          localStorage.clear()
         navigate("/login");
        //   .catch(error=>{
        //     console.log('error',error)
        //   })
    
    
        // setName('');
        // setEmail('');
        // setRole('');
      };


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

                <h2>Recuperaci&oacute;n por preguntas </h2>
                <h5 >Antes de continuar es necesario que crees tus preguntas/respuestas de seguridad</h5>
                <Form onSubmit={handleSubmit}>
                    
               
                <div className="inputs">
                    {/* <label>Pregunta 1</label> */}
                    <div className="">
                          <FormGroup>
                            <Label for="question1">Pregunta 1</Label>
                            <Input  
                            type="select"  
                            id="question1" 

                            name="question1"
                            onChange={event => setQuestion1(event.target.value)}
                            value={question1}
                            >
                            {
                                registros.map((item) => (
                                <option value={item.id_pregunta}>{item.pregunta}</option>
                                ))}
                            </Input>
                            </FormGroup>
                            <FormGroup>
                            {/* <Label for="response1">Respuesta 1</Label> */}
                            <Input type="text" 
                            name="response1"
                            id="response1"
                            onChange={event => setResponse1(event.target.value)}
                            value={response1}
                             placeholder="Respuesta 1" />
                            </FormGroup>



                          <FormGroup>
                            <Label for="question2">Pregunta 2</Label>
                            <Input  type="select"  
                            id="question2"
                            name="question2"
                            onChange={event => setQuestion2(event.target.value)}
                            value={question2}
                             >
                            {
                                registros.map((item) => (
                                <option value={item.id_pregunta}>{item.pregunta}</option>
                                ))}
                            </Input>
                            </FormGroup>

                            <FormGroup>
                            {/* <Label for="response2">Respuesta 2</Label> */}
                            <Input type="text" 
                            name="response2"
                             id="response2"
                             onChange={event => setResponse2(event.target.value)}
                            value={response2}
                              placeholder="Respuesta 2" />
                            </FormGroup>


                          <FormGroup>
                            <Label for="question3">Pregunta 3</Label>
                            <Input  type="select"  
                            id="question3"
                            name="question3"
                            onChange={event => setQuestion3(event.target.value)}
                            value={question3}
                             >
                            {
                                registros.map((item) => (
                                <option value={item.id_pregunta}>{item.pregunta}</option>
                                ))}
                            </Input>
                            </FormGroup>
                            <FormGroup>
                            {/* <Label for="response3">Respuesta 3</Label> */}
                            <Input type="text" 
                            name="response3" 
                            id="response3"
                             onChange={event => setResponse3(event.target.value)}
                            value={response3}
                             placeholder="Respuesta 3" />
                            </FormGroup>
                            <FormGroup>
                            <button type='submit' className='btn'>Aceptar</button>
                            </FormGroup>
                    </div>

                    


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
