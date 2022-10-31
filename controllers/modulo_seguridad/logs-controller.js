'use strict'

// var LogsModel = require('../../models/modulo_seguridad/logs-model'),
var LogsModel = require('../../models/modulo_seguridad/logs-model'),
	LogsController = () => {}

	LogsController.getAll = (req, res, next) => {
	
		LogsModel.getAll((err, rows) => {
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

LogsController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	// console.log(id_usuario)

	LogsModel.getOne(id_usuario, (err, row) => {
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

LogsController.save = (req, res, next) => {
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

	LogsModel.save(usuario, (err) => {
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


module.exports = LogsController