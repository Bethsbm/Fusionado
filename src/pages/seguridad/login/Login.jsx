import React, { useEffect, useRef, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
// import { Form, Link, useNavigate } from "react-router-dom";
import { Alert, Button, FormGroup, Input, Label } from "reactstrap";
import md5 from "md5";
// import { Field } from "formik";


import { Form, Field } from "react-final-form";

import "./login.css";
import burridogs from "./loginbg.jpg";

// import { UserContext } from '../../../App';

//  import {Registro} from "./../registro/Registro";
// const axios = require('axios').default;



const urlAPi = "http://localhost:3001";
//
export default function Login(props) {
  /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
  const getAllSettingsParams = async () => {
    fetch(urlAPi + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("dataSettingsParams", responseJson);
        if (!responseJson.status) {
          console.log("algo salio mal en el servidor");
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllSettingsParams();
  }, []);

  // const { history } = this.props;
  let navigate = useNavigate();
  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const enviarData = (url, data) => {
    setColor("danger");
    fetch(url + "/login", {
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
        setIsValid(true);
        if (!responseJson.status) {
          setColor("danger");
          setMesagge(responseJson.message);
          setTimeout(1000, () => {
            setIsValid(false);
          });
          return;
        }
        let dataUser = {
          "x-token": responseJson["x-token"],
          data: responseJson.data,
        };
        localStorage.setItem("data", JSON.stringify(dataUser));
        navigate("/admin/home");
        // }
      })
      .catch((error) => {
        setColor("danger");
        setTimeout(1000, () => {
          setIsValid(false);
        });
      })
      .finally(() => {
        setTimeout(1000, () => {
          setIsValid(false);
        });
      });
  };
  //capturar los datos ingresados
  const refNombreUsuario = useRef(null);
  const RefContrasena = useRef(null);

//   const handleLogin = async () => {
//     const data = {
//       nombre_usuario: refNombreUsuario.current.value.trim().toUpperCase(),
//       contrasena: md5(RefContrasena.current.value),
//     };
//     console.log(data);
//     await enviarData(urlAPi, data);
//   };



  const onSubmit = async  (values) => {
    console.log(values);

    const data = {
        nombre_usuario: (values.username).trim().toUpperCase(),
        pass: values.password,
        contrasena: md5(values.password),
      };
      console.log('data',data);
      await enviarData(urlAPi, data);
  };

  return (
    <div className="background">
      <img src={burridogs} alt="burridogs" />
      <div className="formulario">
        <Alert isOpen={isValid} color={color}>
          {message}
        </Alert>
        <h2>Panel administrativo</h2>
        {/* <h4>Inicio de Sesión</h4> */}
        <h5 className="caption">Ingresa tus credenciales para continuar</h5>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            function validateText(username) {
                var re = /^[a-zA-Z]*$/
                return re.test(String(username).toLowerCase());
              }

              if (!values.username) {
                errors.username = "Required";
              } else if (!validateText(values.username)) {
                errors.username = "Nombre de usuario no válido";
              }
            
            if (!values.password) {
              errors.password = "La contraseña es requerido";
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
                    <div >
                        <div className="username">
                        <div className="fa fa-user-o"></div>
                      <Input
                        {...input}
                        type="text"
                        placeholder="Ingresa tu usuario"
                        invalid={meta.error && meta.touched}
                      />

                        </div>
                      {meta.error && meta.touched && <span class="danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </FormGroup>

              <FormGroup>
                <Label for="password">Contraseña</Label>
                <Field name="password">
                  {({ input, meta }) => (
                    <div >
                        <div className="username">
                        <div className="fa fa-lock"></div>
                      <Input
                        {...input}
                        type={passwordShown ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        invalid={meta.error && meta.touched}
                      />
                      <span className="showPass" onClick={togglePassword}> Ver </span>
                      </div>
                      {meta.error && meta.touched && <span class="danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </FormGroup>

              <Button type="submit" className="btn" disabled={!valid}>
                Iniciar Sesión
              </Button>
                <div className="buttom-container">
                     <Link to="/recuperacion_contrasena">¿Olvidaste tu contraseña?</Link>
                     <Link to="/unlockuser">Desbloquea tu usuario</Link>
                     <Link to="/registro">Crear cuenta</Link>
                 </div>
            </form>
            </div>
          )}
        />
      </div>
    </div>

    // <div className="background">
    //     <img
    //         src={burridogs}
    //         alt="burridogs" />
    //     <div className="formulario" >
    //              <Alert
    //              isOpen={isValid}
    //              color={color}
    //              >{message}</Alert>
    //         <h2>Panel administrativo</h2>
    //         <h4>Inicio de Sesión</h4>
    //         <h5 className='caption'>Ingresa tus credenciales para continuar</h5>
    //         <div className="inputs">
    //             <div className="username">
    //                 <div className="fa fa-user-o"></div>
    //                 <input
    //                     type="text"
    //                     placeholder="Usuario"
    //                     ref={refNombreUsuario}
    //                 />
    //             </div>
    //             <div className="username">
    //             <div className="fa fa-lock"></div>
    //                 <input
    //                     type={passwordShown ? "text" : "password"}
    //                     placeholder="Contraseña"
    //                     ref={RefContrasena}
    //                 />
    //                 <span className="showPass" onClick={togglePassword}> Ver </span>
    //             </div>
    //             <button
    //                 onClick={handleLogin}
    //                 className="btn">Ingresar</button>
    //             <div className="buttom-container">
    //                 <Link to="/recuperacion_contrasena">¿Olvidaste tu contraseña?</Link>
    //                 <Link to="/unlockuser">Desbloquea tu usuario</Link>
    //                 <Link to="/registro">Crear cuenta</Link>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}
