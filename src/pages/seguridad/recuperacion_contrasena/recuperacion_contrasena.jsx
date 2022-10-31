import React, { useRef, useState } from 'react';
import { useParams , Link, useNavigate } from 'react-router-dom';
import { Alert } from 'reactstrap';
// import { FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import '../recuperacion_contrasena/login.css';
import burridogs from '../recuperacion_contrasena/loginbg.jpg';

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
const urlAPi="http://localhost:3001"
export default function RecuperacionContra(props) {
    let navigate = useNavigate();
    //capturar los datos ingresados
    //  const refPregunta = useRef(null);
    //  const RefRespuesta = useRef(null);
     const refNombreUsuario = useRef(null);
     
     const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);

     const handleLogin = () => {
         const data = {
             "nombre_usuario": refNombreUsuario.current.value
         };
        //  console.log("data",data);
        //  console.log('hacer recuperaicon de pass');
        setIsValid(true)
        setColor("primary");
        setMesagge('Enviado solicitud....');
            fetch(urlAPi+'/reset'
                , {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(responseJson => {  
                console.log("responseJson",responseJson)
                console.log("responseJson.status",responseJson.status)
                
                if(!responseJson.status){
                    setColor("danger")
                    setMesagge(responseJson.message)
                    console.log('ha ocurrido un erorr al enviar el correo')
                }
                setMesagge(responseJson.message);
                setColor("success");
                setIsValid(true)
                setTimeout(() => {
                    setIsValid(false)
                  navigate("/login");
                }, 3000);
            })
            .catch(error=>{
               console.log(error)
               setIsValid(false)
               setColor("danger")
            })
            .finally(()=>{
               console.log('asdasda')
               setIsValid(false)
            })
        
        
        }

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">
            <Alert isOpen={isValid} color={color}>
              {message}
            </Alert>

                <h1>Recuperación de contraseña</h1>
                <div class="inputs">
                    <div class="mensaje">¿Olvidaste tu contraseña?</div>
                    <div class="mensaje">Ingresa tu nombre de usuario y selecciona metodo de reinicio.</div>

                    {/* <label>Nombre de usuario</label> */}

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
                </div>
            </div>
        </div>
    )
}
