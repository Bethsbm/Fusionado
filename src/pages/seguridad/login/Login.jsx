import React, { useRef ,useState} from 'react';
import './login.css';
import burridogs from './loginbg.jpg';
import { Link ,useNavigate} from "react-router-dom";
import { Alert } from 'reactstrap';
import md5 from 'md5';
// import { UserContext } from '../../../App';

//  import {Registro} from "./../registro/Registro";
// const axios = require('axios').default;


const urlAPi="http://localhost:3001"
// 
export default function Login(props) {
    // const { history } = this.props;
    let navigate = useNavigate();
//   var message=''
//   let state = {
//     show: false
//   };
const [message, setMesagge] = useState("");
const [color, setColor] = useState("danger");
const [isValid, setIsValid] = useState(false);

const [passwordShown, setPasswordShown] = useState(false);
const togglePassword = () => {
  setPasswordShown(!passwordShown);
};
    
    const enviarData =  (url, data) => {

        // axios.post(urlAPi+"/login", {
        //     body: JSON.stringify(data),
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
        setColor("danger")
        fetch(url+'/login'
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
            setIsValid(true)
            if(!responseJson.status){
                setColor("danger")
                setMesagge(responseJson.message)
                setTimeout(1000,()=>{
                    setIsValid(false)
                   }) 
                   return
            }
            let dataUser={
                "x-token":responseJson["x-token"],
                data:responseJson.data
            }
            localStorage.setItem('data', JSON.stringify(dataUser))
           navigate("/admin/home");
            // }
        })
        .catch(error=>{
            setColor("danger")
            setTimeout(1000,()=>{
                setIsValid(false)
               }) 
        })
        .finally(()=>{
           setTimeout(1000,()=>{
            setIsValid(false)
           })
        })
    
    }
    //capturar los datos ingresados
    const refNombreUsuario = useRef(null);
    const RefContrasena = useRef(null);

    const handleLogin =async() => {
        const data = {
            "nombre_usuario": refNombreUsuario.current.value,
            "contrasena": md5(RefContrasena.current.value) 

        };
        console.log(data);
       await enviarData (urlAPi, data);

    }

    return (
        
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario" >
                     <Alert 
                     isOpen={isValid} 
                     color={color}
                     >{message}</Alert>

                <h2>Panel administrativo</h2>
                <h4>Inicio de Sesión</h4>
                <div className="inputs">
                    {/* <label>Nombre de usuario</label> */}
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            ref={refNombreUsuario}
                        />
                    </div>

                    {/* <label>Contraseña</label> */}
                    <div className="username">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Contraseña"
                            ref={RefContrasena}
                       /* secureTextEntry={isSecureEntry}
                        icon={
                            <TouchableOpacity
                                onPress={() => { 
                                    setIsSecureEntry((prev) => !prev);
                                }}>
                                <Text>{isSecureEntry ? 'show' : 'Hide'}</Text>
                            </TouchableOpacity>
                        }
                        iconPosition="right"
                        onChangeText={(value) => {
                            onChange({name: 'password',value});
                        }}*/
                        />
                        <span className="showPass" onClick={togglePassword}>
                    Ver
                  </span>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="btn">Ingresar</button>

                    {/* <div id="recordar" className='card-footer'>
                        <a href="https://">¿Olvidó su contraseña?</a>
                    </div> */}

                    <div className="buttom-container">

                        <Link to="/recuperacion_contrasena">
                            ¿Olvidaste tu contraseña?
                        </Link>

                        <Link to="/registro">
                            Crear cuenta
                        </Link>
                    </div>

                    {/* <button className='btn'>Registrarse</button> */}
                </div>

            </div>
        </div>

   
        
    )
}