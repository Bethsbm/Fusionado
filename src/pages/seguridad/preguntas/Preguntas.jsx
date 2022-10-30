import React, { useRef } from 'react';
import '../preguntas/preguntas.css';
// import burridogs from '../preguntas/loginbg.jpg';

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

export default function Pregunta(props) {

    //capturar los datos ingresados
   /* const refPregunta = useRef(null);
    const RefRespuesta = useRef(null);

    const handleLogin = () => {
        const data = {
          //  "usuario": refPregunta.current.value,
            "contra": RefRespuesta.current.value
        };
        console.log(data);
        //enviarData (URL_LOGIN, data);*/

    return (
        <div className="background">
            preguntas de seguridad
        </div>
    )
}
