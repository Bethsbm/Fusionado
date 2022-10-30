"use strict";

var conn = require("../../config/db-connection"),
  LoginModel = () => {};

LoginModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);



  
  LoginModel.getByNameUser = (nameUser, cb) =>{

    conn.query("SELECT id_usuario,nombre_usuario,estado_usuario,id_rol,correo_electronico FROM seguridad.tbl_ms_usuario WHERE nombre_usuario = $1 and nombre_usuario != 'systemUser' ", [nameUser], cb);
  }

  LoginModel.changuePassById = (id_user,password,newPassword, cb) =>{

    const text = 'SELECT seguridad.sp_registrar_cambio_pass($1,$2,$3)'
    const values = [id_user,password, newPassword]
    conn.query(
      text,
      values,
      cb
    );
  }

LoginModel.login = (data, cb) => {
            const text = 'SELECT seguridad.ft_login($1,$2)'
            const values = [data.nombre_usuario, data.contrasena]
            conn.query(
              text,
              values,
              cb
            );
        }

    
   


module.exports = LoginModel;

