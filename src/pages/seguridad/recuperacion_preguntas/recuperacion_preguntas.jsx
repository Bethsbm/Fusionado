import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "../recuperacion_preguntas/login.css";
import burridogs from "../recuperacion_preguntas/loginbg.jpg";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getOneParam } from "../../../utils/utils";

// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log('URL_API_ENV===>',URL_API_ENV)

export default function RecuperacionPreguntas(props) {
  let navigate = useNavigate();
 


  const [params, setParams] = useState([]);
  var steps = [];
  var numberQuestion = getOneParam(params, "ADMIN_PREGUNTAS");
  // numberQuestion=numberQuestiond.valor
  // console.log("nombreParam", numberQuestion.valor);

  for (let index = 0; index < numberQuestion.valor; index++) {
    steps.push("Pregunta" + (index + 1));
  }


  var dataPar=JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlAPi =urlApiParam.valor
  // var ObjetData={}

  const [question1, setQuestion1] = useState("");
  const [response1, setResponse1] = useState("");

  const [question2, setQuestion2] = useState("");
  const [response2, setResponse2] = useState("");

  const [question3, setQuestion3] = useState("");
  const [response3, setResponse3] = useState("");

  const [activeStep, setActiveStep] = React.useState(0);
  // const [completed, setCompleted] = React.useState<{[k]}>({});
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();

   
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    // console.log(state)
    navigate("/login")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("handleSubmit ran");
    
  

    const userData = JSON.parse(localStorage.getItem("data"));
    // console.log("userData", userData);
    let dataQuest1 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(question1),
      respuesta: response1,
    };
    let dataQuest2 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(question2),
      respuesta: response2,
    };
    let dataQuest3 = {
      id_usuario: userData.data.id,
      id_pregunta: parseInt(question3),
      respuesta: response3,
    };
    // console.log("dataQuest1", dataQuest1);
    // console.log("dataQuest2", dataQuest2);
    // console.log("dataQuest3", dataQuest3);
   

    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest1),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson 1", responseJson);
        // console.log("responseJson.status 1", responseJson.status);
      });

    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest2),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson 2", responseJson);
        // console.log("responseJson.status 2", responseJson.status);
      });
    await fetch(urlAPi + "/ms_pregunta/save", {
      method: "POST",
      body: JSON.stringify(dataQuest3),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson 3", responseJson);
        // console.log("responseJson.status 3", responseJson.status);
      });

    await fetch(urlAPi + "/ms_registro/updateUserState", {
      method: "POST",
      body: JSON.stringify({ id_usuario: userData.data.id }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("update user", responseJson);
        // console.log("responseJson.status 3", responseJson.status);
      });

    localStorage.clear();
    navigate("/login");
    //   .catch(error=>{
    //     console.log('error',error)
    //   })

    // setName('');
    // setEmail('');
    // setRole('');
  };
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
  // const steps = [
  //   {title: 'Pregunta 1', component: <StepOne/>},
  //   {title: 'Pregunta 2', component: <StepTwo/>},
  //   {title: 'Pregunta 3', component: <StepThree/>},
  //   {title: 'Pregunta 4', component: <StepFour/>}
  // ];
  // custom styles
  // const prevStyle = { background: '#635e5e' }
  // const nextStyle = { background: '#e327' }
  
// const  handleChange =(name,value)  => {
//     //more logic here as per the requirement
//     setState({
//         [name]: value,
//     });
// };
const handleChange = (name,value) =>{ 
  // const key = e.target.name; 
  // valor const = e.objetivo.valor;
  // setState({ [name]: value }); 
//   setState(
//     state.map((val, ix) => (name === ix ? "nada" : val))
// );
}
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
            <Box sx={{ width: "100%" }}>
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                <Form >
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Todos los pasos han sido completados
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button  onClick={handleReset}>Enviar</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }} align="center">
                      Pregunta {activeStep + 1} / {totalSteps()}
                    </Typography>
                    {steps.map((label, index) => (
                                // onChange={(event) => setQuestion1(event.target.value)}
                                // onChange={(event) => setResponse1(event.target.value)}
                            // value={question1}
                            <div className="">
                            {
                                activeStep + 1 === index + 1? 
                                <Box >
                                    <FormGroup>
                                    <Input
                                        type="select"
                                        id={"question"+(index + 1)}
                                        name={"question"+(index + 1)}
                                        // onChange={(event)=>handleChange("question"+(index + 1))}
                                    >
                                        {registros.map((item,index) => (
                                        <option key={index} value={item.id_pregunta}> {item.pregunta} </option>
                                        ))}
                                    </Input>
                                    </FormGroup>
                                    <FormGroup>
                                    <Input
                                        type="text"
                                        name={"response"+(index + 1)}
                                        id={"response"+(index + 1)}
                                        // onChange={(event)=>handleChange("response"+(index + 1),event.target.value)}
                                        placeholder={"Respuesta "+(index + 1)}
                                    />
                                    </FormGroup>
                                </Box>
                                :null
                            }
                            </div>
                        
                        ))}
                            
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                        Atras
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Siguiente
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                          >
                            Paso {activeStep + 1} ha sido completado
                          </Typography>
                        ) : (
                          <Button  onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                              ? "Terminado"
                              : "Paso Completado"}
                          </Button>
                        ))}
                    </Box>
                  </React.Fragment>
                )}
                </Form>
              </div>
            </Box>
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
