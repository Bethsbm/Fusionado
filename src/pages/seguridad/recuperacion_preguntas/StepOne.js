import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const urlAPi="http://localhost:3001"

export default function StepOne () {
  const [question1, setQuestion1] = useState('');
    const [response1, setResponse1] = useState('');
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
    <div>
      <FormGroup>
        <Label for="question1">Pregunta 1</Label>
        <Input  type="select"  
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
        <Input type="text" 
        name="response1"
         id="response1"
         onChange={event => setResponse1(event.target.value)}
        value={response1}
          placeholder="Respuesta 1" />
        </FormGroup>
    </div>
  )
}