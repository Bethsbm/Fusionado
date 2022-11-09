import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap';


const urlAPi="http://localhost:3001"

export default function  StepThree() {
  const [question3, setQuestion3] = useState('');
const [response3, setResponse3] = useState('');
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
      <Input type="text" 
      name="response3"
       id="response3"
       onChange={event => setResponse3(event.target.value)}
      value={response3}
        placeholder="Respuesta 3" />
      </FormGroup>
  </div>
)
}