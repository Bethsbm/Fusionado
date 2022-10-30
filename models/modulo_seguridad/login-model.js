"use strict";

var conn = require("../../config/db-connection"),
  LoginModel = () => {};

LoginModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

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

