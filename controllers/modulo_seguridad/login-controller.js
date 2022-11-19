
var LoginModel = require('../../models/modulo_seguridad/login-model'),
LoginController = () => {}

LoginController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	console.log(id_usuario)

	LoginModel.getOne(id_usuario, (err, rows) => {
		// console.log(err, '---', rows)
		if(err){
			let locals = {
				title : `Error al buscar el registro con el id: ${id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.render('error', locals)
			
	       }
		//    console.log('rows=>',rows.rows)
			var locals = {
				title : 'Editar Usuario',
				data : rows
			}
			res.status(200).json(
				{
					status:true,
					message:"Información encontrada exitosamente",
					object:rows.rows,
				}
			)
			// res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		
	})
}

LoginController.login = (req, res, next) => {
	let usuario = {
        nombre_usuario : req.body.nombre_usuario, 
        contrasena : req.body.contrasena,    
	}

	console.log(usuario)

	LoginModel.login(usuario, (err,rows) => {
		if(err)
		{
			// let locals = {
			// 	title : `Error al salvar el registro con el id: ${usuario.id_usuario}`,
			// 	description : "Error de Sintaxis SQL",
			// 	error : err
			// }

			res.status(300).json(
				{
					status:false,
					code:300,
					message:"Usuario o contrasena incorrectos",
					object:[],
				}
			)
		

		}
			// res.status(200).send(rows.rows)
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Login Exitoso",
					object:['enviartokenasdasdfsdf1412341234'],
					object2:rows.rows,
				}
			)
		
		
	})
}

module.exports = LoginController








