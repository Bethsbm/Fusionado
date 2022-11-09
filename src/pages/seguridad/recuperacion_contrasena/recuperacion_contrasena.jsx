import React, { useEffect, useRef, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { Alert, Button, FormGroup, Input, Label } from "reactstrap";
// import { FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { Form, Field } from "react-final-form";
import "../recuperacion_contrasena/login.css";
import burridogs from "../recuperacion_contrasena/loginbg.jpg";



//url
/*const URL_LOGIN = ""

const enviarData = async (url, data) => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const json = await resp.json();
}*/
const urlAPi = "http://localhost:3001";
export default function RecuperacionContra(props) {
  let navigate = useNavigate();
  //capturar los datos ingresados
  //  const refPregunta = useRef(null);
  //  const RefRespuesta = useRef(null);
  const refNombreUsuario = useRef(null);

  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);

  const onSubmit = (values) => {
    const data = {
    //   nombre_usuario: refNombreUsuario.current.value,
      nombre_usuario: values.username,
    };
    //  console.log("data",data);
    //  console.log('hacer recuperaicon de pass');
    setIsValid(true);
    setColor("primary");
    setMesagge("Enviado solicitud....");
    fetch(urlAPi + "/reset", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        console.log("responseJson.status", responseJson.status);

        if (!responseJson.status) {
          setColor("danger");
          setMesagge(responseJson.message);
          console.log("ha ocurrido un erorr al enviar el correo");
        }
        setMesagge(responseJson.message);
        setColor("success");
        setIsValid(true);
        setTimeout(() => {
          setIsValid(false);
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsValid(false);
        setColor("danger");
      })
      .finally(() => {
        console.log("asdasda");
        setIsValid(false);
      });
  };

//   const onSubmit = async (values) => {
//     console.log("values",values);
//   };


// const steps = [
//   {title: 'StepOne', component: <Step/>},
//   {title: 'StepTwo', component: <Step/>},
//   {title: 'StepThree', component: <Step/>},
//   {title: 'StepFour', component: <Step/>}
// ];
// // custom styles
// const prevStyle = { background: '#33c3f0' }
// const nextStyle = { background: '#33c3f0' }
  return (
      // <>
      // <div className='container'>
      //   <MultiStep activeStep={0} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
      //   <div className='app-footer'>
      //     <h6>Press 'Enter' or click on progress bar for next step.</h6>
      //     Code is on{' '}
      //     <a href='https://github.com/Srdjan/react-multistep' target='_blank' rel='noreferrer'>
      //       github
      //     </a>
      //   </div>
      // </div>
      // </>

    <div className="background">
      <img src={burridogs} alt="burridogs" />
      <div className="formulario">
        <Alert isOpen={isValid} color={color}>
          {" "}
          {message}{" "}
        </Alert>
        <h2>¿Olvidaste tu contraseña?</h2>
        <h5 className="caption">
          Ingresa tu nombre de usuario y selecciona metodo de reinicio{" "}
        </h5>

        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            function validateText(username) {
              var re = /^[a-zA-Z0-9]*$/;
              return re.test(String(username).toLowerCase());
            }

            if (!values.username) {
              errors.username = "Campo requerido";
            } else if (!validateText(values.username)) {
              errors.username = "Nombre de usuario no válido";
            }

            return errors;
          }}
          render={({ handleSubmit, values, submitting, validating, valid }) => (
            <div className="inputs">
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username">Usuario</Label>
                  <Field name="username">
                    {({ input, meta }) => (
                      <div>
                        <div className="username">
                          <div className="fa fa-user-o"></div>
                          <Input
                            {...input}
                            type="text"
                            placeholder="Ingresa tu usuario"
                            invalid={meta.error && meta.touched}
                          />
                        </div>
                        {meta.error && meta.touched && (
                          <span class="danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>

                <Button type="submit" className="btn" disabled={!valid}>Restablecer v&iacute;a correo</Button>
                <div className="buttom-container">
                  <Link to="/recuperacion_preguntas">
                    Cambia tu contrase&ntilde;a via preguntas
                  </Link>
                  <Link to="/login">Cancelar</Link>
                </div>
              </form>
            </div>
          )}
        />

        {/* <h1>Recuperación de contraseña</h1>
                <div class="inputs">
                    <div class="mensaje">¿Olvidaste tu contraseña?</div>
                    <div class="mensaje">Ingresa tu nombre de usuario y selecciona metodo de reinicio.</div>
                    <div class="username">
                        <i class="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            ref={refNombreUsuario} />
                    </div>
                    <button
                        onClick={handleLogin}
                        className='btn'>Restablecer v&iacute;a correo</button>
                    <div className="buttom-container">
                        <Link to="/recuperacion_preguntas">
                            Cambia tu contrase&ntilde;a via preguntas
                        </Link>
                        <Link to="/login">
                            Cancelar
                        </Link>
                    </div>
                </div> */}
      </div>
    </div>
  );
}
