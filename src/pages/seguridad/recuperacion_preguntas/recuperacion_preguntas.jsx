import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Form, FormGroup, Input, Label } from "reactstrap";
/* eslint-disable jsx-a11y/accessible-emoji */

// import { render } from 'react-dom'
import Styles from './Styles'
import { Field } from 'react-final-form'
import Wizard from './Wizard'
import "../recuperacion_preguntas/login.css";
import burridogs from "../recuperacion_preguntas/loginbg.jpg";

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepButton from "@mui/material/StepButton";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { getOneParam } from "../../../utils/utils";

// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log('URL_API_ENV===>',URL_API_ENV)



const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const required = value => (value ? undefined : 'Required')


export default function RecuperacionPreguntas(props) {
  let navigate = useNavigate();
  const { id_usuario } = useParams();


  const [params, setParams] = useState([]);
  // var steps = [];
  var numberQuestion = getOneParam(params, "ADMIN_PREGUNTAS");
  // numberQuestion=numberQuestiond.valor
  // console.log("nombreParam", numberQuestion.valor);

  // for (let index = 0; index < numberQuestion.valor; index++) {
  //   steps.push("Pregunta" + (index + 1));
  // }


  var dataPar=JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlAPi =urlApiParam.valor

  const onSubmit = async values => {
    console.log("values",values)
    // await sleep(300)
    // window.alert(JSON.stringify(values, 0, 2))
  
    const userData = JSON.parse(localStorage.getItem("data"));
    // console.log("userData", userData);
    let dataQuest1 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(values.pregunta1),
      respuesta: values.respuesta1,
    };
    let dataQuest2 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(values.pregunta2),
      respuesta: values.respuesta2,
    };
    let dataQuest3 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(values.pregunta3),
      respuesta: values.respuesta3,
    };
  
    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest1),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
     
  
    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest2),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
     
    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest3),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
    
    await fetch(urlAPi + "/ms_registro/updateUserState", {
      method: "POST",
      body: JSON.stringify({ id_usuario: userData.data.id }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
    localStorage.clear();
    navigate("/login");
  }
  

  /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
  const getAllSettingsParams = async () => {
    fetch(URL_API_ENV + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("dataSettingsParams", responseJson);
        // console.log("dataSettingsParams", responseJson.object);
        if (!responseJson.status) {
          console.log("algo salio mal en el servidor");
          return;
        }
        // localStorage.setItem("params", JSON.stringify(responseJson.object));
        setParams(responseJson.object);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const [registros, setRegistros] = useState([]);
  const getRegistros = async () => {
    fetch(urlAPi + "/ms_pregunta/getall", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson", responseJson);
        // console.log("responseJson.status", responseJson.status);
        setRegistros(responseJson.object);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getAllSettingsParams();
    getRegistros();
  }, []);


  return (
    <div className="background">
      <img src={burridogs} alt="burridogs" />

      <div className="formulario steps">
        <h2>Recuperaci&oacute;n por preguntas </h2>
        <h5>
          Antes de continuar es necesario que crees tus preguntas/respuestas de
          seguridad
        </h5>
        
          <div className="container">
            
            {/* {counter}/{numberQuestion.valor} */}
          <Styles>
    {/* <h1>React Final Form Example</h1>
    <h2>Wizard Form</h2>
    <a
      href="https://final-form.org/react"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Docs
    </a>
    <p>
      Notice the mixture of field-level and record-level (or <em>page-level</em>{' '}
      in this case) validation.
    </p> */}
    <Wizard
      initialValues={{ id_usuario: id_usuario }}
      onSubmit={onSubmit}
    >
      {/* <Wizard.Page>
        <div>
          <label>Primer Pregunta</label>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            validate={required}
          />
          <Error name="firstName" />
        </div>
        <div>
          <label>Primer Respuesta</label>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            validate={required}
          />
          <Error name="lastName" />
        </div>
      </Wizard.Page> */}
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.respuesta1) {
            errors.respuesta1 = 'Requerido'
          }
          if (!values.pregunta1) {
            errors.pregunta1 = 'Requerido'
          }
          return errors
        }}
      >
        <div>
          <label>Pregunta 1</label>
          <Field name="pregunta1" component="select">
            { registros.map((item) => (
              <option value={item.id_pregunta}>{item.pregunta}</option>
              ))
            }
          </Field>
          <Error name="pregunta1" />
        </div>
        <div>
          <label>Respuesta 1</label>
          <Field
            name="respuesta1"
            component="input"
            type="text"
            placeholder="Respuesta 1"
          />
          <Error name="respuesta1" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.respuesta2) {
            errors.respuesta2 = 'Requerido'
          }
          if (!values.pregunta2) {
            errors.pregunta2 = 'Requerido'
          }
          return errors
        }}
      >
        <div>
          <label>Pregunta 2</label>
          <Field name="pregunta2" component="select">
            { registros.map((item) => (
              <option value={item.id_pregunta}>{item.pregunta}</option>
              ))
            }
          </Field>
          <Error name="pregunta2" />
        </div>
        <div>
          <label>Respuesta 2</label>
          <Field
            name="respuesta2"
            component="input"
            type="text"
            placeholder="Respuesta 2"
          />
          <Error name="respuesta2" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.respuesta3) {
            errors.respuesta3 = 'Requerido'
          }
          if (!values.pregunta3) {
            errors.pregunta3 = 'Requerido'
          }
          return errors
        }}
      >
        <div>
          <label>Pregunta 3</label>
          <Field name="pregunta3" component="select">
            { registros.map((item) => (
              <option value={item.id_pregunta}>{item.pregunta}</option>
              ))
            }
          </Field>
          <Error name="pregunta3" />
        </div>
        <div>
          <label>Respuesta 3</label>
          <Field
            name="respuesta3"
            component="input"
            type="text"
            placeholder="Respuesta 3"
          />
          <Error name="respuesta3" />
        </div>
      </Wizard.Page>
      {/* <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.toppings) {
            errors.toppings = 'Required'
          } else if (values.toppings.length < 2) {
            errors.toppings = 'Choose more'
          }
          return errors
        }}
      >
        <div>
          <label>Employed?</label>
          <Field name="employed" component="input" type="checkbox" />
        </div>
        <div>
          <label>Toppings</label>
          <Field name="toppings" component="select" multiple>
            <option value="ham">🐷 Ham</option>
            <option value="mushrooms">🍄 Mushrooms</option>
            <option value="cheese">🧀 Cheese</option>
            <option value="chicken">🐓 Chicken</option>
            <option value="pineapple">🍍 Pinapple</option>
          </Field>
          <Error name="toppings" />
        </div>
      </Wizard.Page> */}
      {/* <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.notes) {
            errors.notes = 'Required'
          }
          return errors
        }}
      >
        <div>
          <label>Best Stooge?</label>
          <div>
            <label>
              <Field
                name="stooge"
                component="input"
                type="radio"
                value="larry"
              />{' '}
              Larry
            </label>
            <label>
              <Field name="stooge" component="input" type="radio" value="moe" />{' '}
              Moe
            </label>
            <label>
              <Field
                name="stooge"
                component="input"
                type="radio"
                value="curly"
              />{' '}
              Curly
            </label>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <Field name="notes" component="textarea" placeholder="Notes" />
          <Error name="notes" />
        </div>
      </Wizard.Page> */}
    </Wizard>
  </Styles>


            <div className="buttom-container">
                        <Link to="/login">
                            Cancelar
                        </Link>
                    </div>
          </div>

          {/* <div className="inputs">
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
                </div> */}
      </div>
    </div>
  );
}
