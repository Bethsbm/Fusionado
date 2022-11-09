import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap';



const urlAPi="http://localhost:3001"

export default function  StepTwo()  {
  const [question2, setQuestion2] = useState('');
  const [response2, setResponse2] = useState('');
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
        <Input type="text" 
        name="response2"
         id="response2"
         onChange={event => setResponse2(event.target.value)}
        value={response2}
          placeholder="Respuesta 2" />
        </FormGroup>
    </div>
  )
}