"use strict";

var conn = require("../../config/db-connection"),
  UsuarioModel = () => {};

UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario != 'systemUser'", cb);


UsuarioModel.validateUserState = (id ,cb) => conn.query("SELECT id_usuario,estado_usuario,id_rol,fecha_vencimiento FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",[id], cb);


UsuarioModel.updateUserState = (id ,cb) => conn.query("UPDATE seguridad.tbl_ms_usuario SET estado_usuario=2 WHERE id_usuario = $1",[id], cb);


UsuarioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

UsuarioModel.save = (data, cb) => {
console.log('data',data)


const text = `
INSERT INTO seguridad.tbl_ms_usuario(
  usuario, 
  nombre_usuario, 
  estado_usuario, 
  contrasena, 
  id_rol, 
  preguntas_contestadas,
  primer_ingreso,
  fecha_vencimiento,
  correo_electronico,
  creado_por,
  fecha_creacion,
  intentos_login
)
  VALUES ( 
    $1, 
    $2, 
    1,
    $3, 
    $4,
    0,
    1,
    (NOW() + interval '3 days'), 
    $5,
    $6,
    NOW(),
    0
    )
     `
    const values = [
      data.nombre_usuario,
      data.usuario,
      data.contrasena,
      data.id_rol,
      data.correo_electronico,
      data.creado_por,
    ]
    conn.query(
      text,
      values,
      cb
    );
 

  // conn.query(
  //   "SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",
  //   [data.id_usuario],
  //   (err, rows) => {
  //     console.log(`Número de registros: ${rows.rows.length}`);
  //     console.log(`Número de registros: ${err}`);

  //     if (err) {
  //       return err;
  //     } else {
  //       return rows.rows.length === 1
  //         ? conn.query(
  //             "SELECT seguridad.ft_actualizar_usuario($1,$2,$3,$4,$5,$6,$7)",
  //             [
  //               data.id_usuario,
  //               data.nombre_usuario,
  //               data.estado_usuario,
  //               data.id_rol,
  //               data.correo_electronico,
  //               data.modificado_por,
  //               data.fecha_modificacion
  //             ],
  //             cb
  //           )
  //         : conn.query(
  //           "SELECT seguridad.sp_insert_usuario($1,$2,$3,$4,$5,$6)",
  //             [
  //               data.nombre_usuario,
  //               data.estado_usuario,    //Por default 1
  //               data.contrasena,
  //               data.id_rol,            //Por default 6
  //               data.correo_electronico,
  //               data.creado_por         //Por default "nombre_usuario"
  //             ],
  //             cb
  //           );
  //     }
  //   }
  // );
};

UsuarioModel.autoregistro = (data, cb) => {
  conn.query(
    `
    INSERT INTO seguridad.tbl_ms_usuario(
      usuario, 
      nombre_usuario, 
      estado_usuario, 
      contrasena, 
      id_rol, 
      preguntas_contestadas,
      primer_ingreso,
      fecha_vencimiento,
      correo_electronico,
      creado_por,
      fecha_creacion,
      intentos_login
    )
      VALUES ( 
        $1, 
        $2, 
        1,
        $3, 
        1,
        0,
        1,
        (NOW() + interval '3 days'), 
        $4,
        'Autoregistro',
        NOW(),
        0
        )
        `,
      [
        data.usuario,
        data.nombre_usuario,
        data.contrasena,
        data.correo_electronico,
            
      ],
      cb
  );
};
// UsuarioModel.autoregistro = (data, cb) => {
//   conn.query(
//     "SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario= $1",
//     [data.nombre_usuario],
//     (err, rows) => {
//       console.log(`Número de registros: ${rows.rows.length}`);
//       console.log(`Número de registros: ${err}`);

//       if (err) {
//         return err;
//       } else {
//         return rows.rows.length === 1
//           ? conn.query(
//             "SELECT seguridad.()",
//             [
              
//             ],
//             cb
//             )
//           : 
              
//             conn.query(
//               "SELECT seguridad.ft_insert_autoregistro($1,$2,$3)",
//                 [
//                 data.nombre_usuario,
//                 data.correo_electronico,
//                 data.contrasena,
                      
//                 ],
//                 cb
//             );
//       }
//     }
//   );
// };

UsuarioModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_usuario($1)", [id], cb);

module.exports = UsuarioModel;
