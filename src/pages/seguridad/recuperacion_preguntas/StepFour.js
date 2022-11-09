import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap';
const urlAPi="http://localhost:3001"
export default function  StepFour()  {
  const [question4, setQuestion4] = useState('');
const [response4, setResponse4] = useState('');
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
      <Label for="question4">Pregunta 4</Label>
      <Input  type="select"  
      id="question4"
      name="question4"
      onChange={event => setQuestion4(event.target.value)}
      value={question4}
       >
      {
          registros.map((item) => (
          <option value={item.id_pregunta}>{item.pregunta}</option>
          ))}
      </Input>
      </FormGroup>
      <FormGroup>
      <Input type="text" 
      name="response4"
       id="response4"
       onChange={event => setResponse4(event.target.value)}
      value={response4}
        placeholder="Respuesta 4" />
      </FormGroup>
  </div>
)
}