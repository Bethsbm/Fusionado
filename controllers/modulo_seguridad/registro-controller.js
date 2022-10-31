'use strict'

var UsuarioModel = require('../../models/modulo_seguridad/registro-model'),
	UsuarioController = () => {}
	const nodemailer = require("nodemailer");

	const urlPanel = "http://localhost:3000";
	const JWT_SECRET = "PR0Y3CT0_M0DUL0_D3_S3GUR1D4D";
	const timeExpired = "24h";
	const mailConfigSender = {
	  user: "dazzebnn@gmail.com",
	  pass: "zdvcmiwfpstkebwy",
	};
	


UsuarioController.getAll = (req, res, next) => {
	
		UsuarioModel.getAll((err, rows) => {
		if(err)
		{
			let locals = {
				title : 'Error al consultar la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			// let locals = {
			// 	title : 'Lista de Usuarios',
			// 	data : rows
			// }
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información encontrada exitosamente",
					object:rows.rows,
				}
			)
			//res.render('index', locals)
		}
	})
}

UsuarioController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	// console.log(id_usuario)

	UsuarioModel.getOne(id_usuario, (err, row) => {
		// console.log(err, '---', row)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			// let locals = {
			// 	title : 'Editar Usuario',
			// 	data : row
			// }
			console.log(row.rows)
			// res.status(200).send(rows.rows)
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información encontrada exitosamente",
					object:row.rows[0],
				}
			)
			//res.render('edit-movie', locals)
		}
	})
}

UsuarioController.save = (req, res, next) => {
	let usuario = {
        id_usuario : req.body.id_usuario,
        usuario : req.body.usuario,
        nombre_usuario : req.body.nombre_usuario,
        estado_usuario : req.body.estado_usuario,
        contrasena : req.body.contrasena,
        id_rol : req.body.id_rol,
        fecha_ultima_conexion : req.body.fecha_ultima_conexion,
        preguntas_contestadas : req.body.preguntas_contestadas,
        primer_ingreso : req.body.primer_ingreso,
        fecha_vencimiento : req.body.fecha_vencimiento,
        correo_electronico : req.body.correo_electronico,
        creado_por : req.body.creado_por,
        fecha_creacion : req.body.fecha_creacion,
        modificado_por : req.body.modificado_por,
        fecha_modificacion : req.body.fecha_modificacion,
        intentos_login : req.body.intentos_login
	}

	console.log(usuario)

	UsuarioModel.save(usuario, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${usuario.id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			res.send('Success')
			//res.redirect('/')
		}
	})
}

UsuarioController.autoregistro = (req, res, next) => {
	let usuario = {
        
        nombre_usuario : req.body.nombre_usuario,
        correo_electronico : req.body.correo_electronico,
        contrasena : req.body.contrasena,
        otp : req.body.otp,
        
	}

	console.log(usuario)

	UsuarioModel.autoregistro(usuario, async (err,row) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${usuario.id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{



			const link = `${urlPanel}/login`;
	
			const transporter = nodemailer.createTransport({
			  service: "gmail",
			  auth: mailConfigSender,
			});
	
			let html = `
			<span>
				<br>
				Hola <strong > <span style="text-transform: capitalize;">${usuario.nombre_usuario}</span></strong> 
				<br/>
				Se ha creado tu cuenta en <strong > plataforma administrativa de BURRI DOGS S.A.</strong>
				<br/>
				Para ingresar da clic <a href="${link}">aquí</a>
				<br/>
				Tus credenciales de acceso son
				<br>
				Usuario: <strong>${usuario.nombre_usuario}</strong>
				<br />
				OTP: <strong>${usuario.otp}</strong>
						<br>
				Recuerda cambiar tu contraseña
						<br>
						<br>
							Módulo desarrollado por el equipo (2)
			
						</span>	
			`;
	
			const mailOptions = {
			  from: mailConfigSender.mail,
			  to: usuario.correo_electronico,
			  subject: "Bienvenido a BURRI DOGS S.A.",
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
				  object: usuario,
				});
			  }
			});
		// return response
		}
	})
}

UsuarioController.delete = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	console.log(id_usuario)

	UsuarioModel.delete(id_usuario, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			res.send('Success')
			//res.redirect('/')
		}
	})
}

UsuarioController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

module.exports = UsuarioController