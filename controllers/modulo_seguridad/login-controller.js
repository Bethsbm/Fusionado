var LoginModel = require("../../models/modulo_seguridad/login-model");
// var regexMail= '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
var regexText = "^[a-zA-Z 0-9]*$";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var validator = require("validator");

// Configuraciones
const urlThisAPi = "http://localhost:3001";
const urlPanel = "http://localhost:3000";
const JWT_SECRET = "PR0Y3CT0_M0DUL0_D3_S3GUR1D4D";
const timeExpired = "24h";
const mailConfigSender = {
  user: "dazzebnn@gmail.com",
  pass: "zdvcmiwfpstkebwy",
};

LoginController = () => {};
LoginController.getOne = (req, res, next) => {
  let id_usuario = req.params.id_usuario;
  console.log(id_usuario);

  LoginModel.getOne(id_usuario, (err, rows) => {
    // console.log(err, '---', rows)
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };
      res.render("error", locals);
    }
    //    console.log('rows=>',rows.rows)
    var locals = {
      title: "Editar Usuario",
      data: rows,
    };
    res.status(200).json({
      status: true,
      message: "Información encontrada exitosamente",
      object: rows.rows,
    });
    // res.status(200).send(rows.rows)
    //res.render('edit-movie', locals)
  });
};

LoginController.login = async (req, res, next) => {
  let response = null;
  const bodyParams = req.body;
  try {
    if (bodyParams.nombre_usuario && bodyParams.contrasena) {
      const regex_texto = new RegExp(regexText);
      //= =======
      if (!regex_texto.test(bodyParams.nombre_usuario)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }
      // console.log('asdasd')

      if (!validator.isMD5(bodyParams.contrasena)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }

      let usuario = {
        nombre_usuario: bodyParams.nombre_usuario,
        contrasena: bodyParams.contrasena,
      };
      console.log(usuario);
      LoginModel.login(usuario, (err, row) => {
        if (err) {
          res.status(300).send({
            status: false,
            code: 300,
            message: "usuario y/o contrasena incorrectos",
            object: [],
          });
        }
        // console.log('rows.rows',row.rows)
        let dataUser = row.rows[0].ft_login;
        dataUser = dataUser.split(",");
        let statusUser = dataUser[2];
        // console.log("statusUser", statusUser)
        if (statusUser.toString() !== '"DATOS CORRECTOS"'.toString()) {
          return res.status(400).send({
            status: false,
            code: 400,
            message: statusUser,
            object: [],
          });
        }

        const payload = {
          nameUser: dataUser[1].toUpperCase(),
          id: Number(dataUser[0].replace("(", "") || 0),
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: timeExpired });

        response = res.status(200).send({
          status: true,
          code: 200,
          message: "Login Exitoso",
          "x-token": token,
          data: payload,
        });
      });

      return response;
    }

    let emptyParam = "";

    if (!bodyParams.nombre_usuario) {
      emptyParam = "nombre_usuario";
    }
    if (!bodyParams.contrasena) {
      emptyParam = "contrasena";
    }

    response = res.status(400).send({
      ok: false,
      code: 400,
      message: "No se enviarón algunos parámetros de consulta",
      object: [emptyParam],
    });
    return response;
  } catch (e) {
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "error en el servidor",
      object: e,
    });
  }
};
LoginController.resetPassUser = async (req, res, next) => {
  let response = null;
  const bodyParams = req.body;

  try {
    if (bodyParams.nombre_usuario) {
      const regex_texto = new RegExp(regexText);
      //= =======
      if (!regex_texto.test(bodyParams.nombre_usuario)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }

      LoginModel.getByNameUser(bodyParams.nombre_usuario, async (err, row) => {
        if (err) {
          console.log(err);
          return res.status(300).send({
            status: false,
            code: 300,
            message: "ha ocurrido un error al buscar usaurio",
            object: [],
          });
        }

        if (row.rows.length === 0) {
          return res.status(404).send({
            status: false,
            code: 404,
            message: "Usuario no encontrado",
            object: [],
          });
        }
        let dataUsuario = row.rows[0];
        console.log("dataUsuario", dataUsuario);

        //el usuario existe y crear el link
        // const secret = JWT_SECRET + user.password;
        const secret = JWT_SECRET;
        const payload = {
          correo: dataUsuario.correo_electronico,
          id: dataUsuario.id_usuario,
        };

        const token = jwt.sign(payload, secret, { expiresIn: timeExpired });
        const link = `${urlPanel}/cambio_contrasena/${dataUsuario.id_usuario}/${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: mailConfigSender,
        });

        let html = `
            <span>
            <br>
            Hola <strong > <span style="text-transform: capitalize;">${dataUsuario.nombre_usuario}</span></strong> 
            <br/>
            Se ha creado una solicitud para cambiar tu contraseña en la <strong > plataforma administrativa de BURRI DOGS S.A.</strong>
            <br/>
            Si has sido tú da clic <a href="${link}">aquí</a>
            <br/>
            si no has caso omiso de ese correo.
            <br>
            <br>
            <br>
                Módulo desarrollado por el equipo (2)

            </span>`;

        const mailOptions = {
          from: mailConfigSender.mail,
          to: dataUsuario.correo_electronico,
          subject: "Restablece tu contraseña",
          html: html,
        };

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            response = res.status(400).send({
              status: true,
              code: 400,
              message: "ha ocurrido un error el enviar el correo",
              object: error,
            });
          } else {
            // console.log("Email sent: " + info.response);
            response = res.status(200).send({
              status: true,
              code: 200,
              message: "Se ha enviado link a tu correo",
              object: dataUsuario,
            });
          }
        });
      });

      return response;
    }

    let emptyParam = "";

    if (!bodyParams.nombre_usuario) {
      emptyParam = "nombre_usuario";
    }

    response = res.status(400).send({
      ok: false,
      code: 400,
      message: "No se enviarón algunos parámetros de consulta",
      object: [emptyParam],
    });
    return response;
  } catch (e) {
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "error en el servidor",
      object: e,
    });
  }
};

LoginController.validateUser = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    let userValidation = await LoginModel.getOne(id);

    if (!userValidation.rows[0]) {
      return res.status(400).send({
        ok: false,
        code: 400,
        message: "Usuario NO encontrado",
        object: [],
      });
    }
    //Usuario Valido
    const secret = JWT_SECRET;

    // const payload = await jwt.verify(token, secret);
    await jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          return res.status(404).json({
            status: false,
            code: 404,
            message: "Token NO válido",
            object: [],
          });
        }
        res.status(200).json({
          status: true,
          code: 200,
          message: "Usuario encontrado",
          object: [decoded],
        });
      });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "Error en el servidor",
      object: error,
    });
  }
};
LoginController.changePassUser = async (req, res, next) => {
    let response = null;
    const bodyParams = req.body;
  
    try {
      if (bodyParams.password && 
          bodyParams.confirmPassword && 
          bodyParams.newPassword && 
          bodyParams.id_user && 
          bodyParams.email) {
              // console.log("Email sent: " + info.response);
              
              
              
              LoginModel.changuePassById(
                bodyParams.id_user,
                bodyParams.password,
                bodyParams.newPassword,
                 (err, row) => {
                    
                if (err) {
                    console.log('err',err)
                  return res.status(300).send({
                    status: false,
                    code: 300,
                    message: "usuario y/o contrasena incorrectos",
                    object: [],
                  });
                }
                console.log('row',row)
                response = res.status(200).send({
                  status: true,
                  code: 200,
                  message: "Login Exitoso",
                  object:row
                //   data: payload,
                });
              });
            //   response = res.status(200).send({
            //     status: true,
            //     code: 200,
            //     message: "funcioando enpoint",
            //     object: [],
            //   });
            
            
  
        return response;
      }
  
      let emptyParam = "";
  
      if (!bodyParams.password) {
        emptyParam = "password";
      }
      if (!bodyParams.confirmPassword) {
        emptyParam = "confirmPassword";
      }
      if (!bodyParams.newPassword) {
        emptyParam = "newPassword";
      }
      if (!bodyParams.id_user) {
        emptyParam = "id_user";
      }
      if (!bodyParams.email) {
        emptyParam = "email";
      }
  
      response = res.status(400).send({
        ok: false,
        code: 400,
        message: "No se enviarón algunos parámetros de consulta",
        object: [emptyParam],
      });
      return response;
    } catch (e) {
      return res.status(500).send({
        ok: false,
        code: 500,
        message: "error en el servidor",
        object: e,
      });
    }
};
module.exports = LoginController;
