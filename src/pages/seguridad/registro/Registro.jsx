import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./Registro.css";
import burridogs from "./loginbg.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { Alert } from "reactstrap";
import PasswordChecklist from "react-password-checklist";
import md5 from "md5";
// const URL = "http://190.53.243.69:3001/ms_registro/autoregistro";
const urlApi = "http://localhost:3001";

const Registro = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);
  const refContrasena = useRef(null);
  const refConfirmContrasena = useRef(null);
  const refUserName = useRef(null);
  const refEmail = useRef(null);

  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log("form submitted ✅");
    var x = Math.floor(Math.random() * (100 - 1) + 1);
    console.log('x',x)
    let name_user=(refUserName.current.value).toString()
        name_user= name_user.replace(/\s/g,'')
        name_user= name_user.toUpperCase()
        name_user= name_user+""+x

        let pass=refContrasena.current.value
    let data = {
        nombre_usuario: name_user,
        correo_electronico: refEmail.current.value,
        contrasena:  md5(pass),
        otp: pass ,
        confirmContrasena: md5(refConfirmContrasena.current.value),
    };
    // console.log("refUserName.current.value", refUserName.current.value);
    console.log('data',data)

    fetch(urlApi+ "/ms_registro/autoregistro", {
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
            setMesagge(responseJson.message);
            setIsValid(false);
          }
          setColor("success");
          setIsValid(true);
          setMesagge(responseJson.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          setIsValid(false);
          setMesagge("ha ocurrido un error al actualizar datos");
          navigate("/login");
        });
  };

  return (
    <div className="background">
      <div className="">
        <img src={burridogs} alt="burridogs" />

        <div className="formulario">
          <Alert isOpen={isValid} color={color}>
            {message}
          </Alert>

          <h2>Crea tu cuenta</h2>

          <form >
            <div className="inputs">
              {/* <label>Nombre</label> */}
              <div className="username">
                <div className="fa fa-user-o"></div>
                <input
                  type="text"
                  name="nombre_usuario"
                  placeholder="Nombre"
                  ref={refUserName}
                  
                />
                
              </div>

              {/* <label>Correo electrónico</label> */}
              <div className="username">
                <input
                  type="text"
                  name="correo_electronico"
                  ref={refEmail}
                  placeholder="correo electrónico"
                  
                />
                
              </div>

              {/* <label>Contraseña:</label> */}
              <div className="username">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Contraseña"
                  ref={refContrasena}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>

              {/* <label>Confirmar contraseña:</label> */}

              <div className="username">
                <input
                  placeholder="Confirmar contraseña"
                  type={passwordShown ? "text" : "password"}
                  ref={refConfirmContrasena}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>

              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                messages={{
                  minLength: "La contraseña tiene más de 8 caracteres.",
                  specialChar: "La contraseña tiene caracteres especiales.",
                  number: "La contraseña tiene un número.",
                  capital: "La contraseña tiene una letra mayúscula.",
                  match: "Las contraseñas coinciden.",
                }}
              />
            </div>
            <button onClick={onSubmit} className="btn">
              Cambiar Contrase&ntilde;a
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  // return (
  // <div className="background">
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //         <img
  //             src={burridogs}
  //             alt="burridogs" />
  //         <div className="formulario">
  //             <div className="inputs">
  //                 <h1>Crea tu cuenta</h1>

  //                 <label>Nombre</label>
  //                 <div className="username">
  //                     <div className="fa fa-user-o"></div>
  //                     <input
  //                         type="text"
  //                         name='nombre_usuario'
  //                         placeholder="Ingrese su nombre de usuario"
  //                         {...register('nombre_usuario', {
  //                             required: true
  //                         })}

  //                     />
  //                     {errors.nombre && <span>{errors.nombre.message}</span>}
  //                 </div>

  //                 <label>Correo electrónico</label>
  //                 <div className="username">
  //                     <input
  //                         type="text"
  //                         name='correo_electronico'
  //                         placeholder="Ingrese su correo electrónico"
  //                         {...register("correo_electronico", {
  //                             required: {
  //                                 value: true,
  //                                 message: "El campo es requerido"
  //                             },
  //                             pattern: {
  //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  //                                 message: "El formato no es correcto"
  //                             }
  //                         })}
  //                     />
  //                     {errors.correo && <span>{errors.correo.message}</span>}
  //                 </div>

  //                 <label>Contraseña</label>
  //                 <div className="username">
  //                     <input
  //                         type="password"
  //                         name='contrasena'
  //                         placeholder="Ingrese de nuevo su contraseña" required
  //                         {...register("contrasena", {
  //                             required: {
  //                                 value: true,
  //                                 message: "El campo es requerido"
  //                             },
  //                             minLength: {
  //                                 value: 8,
  //                                 message: "La contraseña debe tener al menos 8 caracteres"
  //                             },
  //                             pattern: {
  //                                 value: "(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*[¡!-_#$&%@*.,].*",
  //                                 message: "Debe tener al menos una mayúscula, una minúscula, un dígito y un caracter especial"

  //                             }
  //                         })}
  //                     />
  //                     {errors.contrasena && <span>{errors.contrasena.message}</span>}
  //                 </div>

  //                 <label>Confirmar contraseña</label>
  //                 <div className="username">
  //                     <input
  //                         type='password'
  //                         placeholder="Ingrese su contraseña"

  //                     />
  //                 </div>
  //                 <button className='btn'>Registrar</button>
  //                 <div className="buttom-container">
  //                     <Link to="/login">
  //                         Cancelar
  //                     </Link>
  //                 </div>
  //             </div>
  //         </div >
  //     </form>
  // </div>
  // )
};
export default Registro;
