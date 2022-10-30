
var LoginModel = require('../../models/modulo_seguridad/login-model')
// var regexMail= '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
var regexText= '^[a-zA-Z ]*$'
const jwt = require('jsonwebtoken');

var validator = require('validator');

// Configuraciones
const JWT_SECRET = 'PR0Y3CT0_M0DUL0_D3_S3GUR1D4D';
const timeExpired = '24h';


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

LoginController.login = async (req, res, next) => {
	// const responseApi = new ResponseApi()
    // const { statusCodes } = req
    let response = null
    const bodyParams = req.body
            // console.log(bodyParams)
    try {
        if (bodyParams.nombre_usuario && bodyParams.contrasena) {
      
            // console.log('bodyParams.nombre_usuario',bodyParams.nombre_usuario)
            // console.log('bodyParams.nombre_usuario',bodyParams.contrasena)
            // const consulta = { nombre_usuario: bodyParams.nombre_usuario, status: true }
            const regex_texto = new RegExp(regexText)
            //= =======
            if (!regex_texto.test(bodyParams.nombre_usuario)) {
                
                return res.status(400).send({
					ok : false,
                	code : 400,
                    message : 'usuario y/o contrasena incorrectos',
					object : {}
				})	
				
            }
            // console.log('asdasd')
         
            if (!validator.isMD5(bodyParams.contrasena)) {
                return res.status(400).send({
					ok : false,
                	code : 400,
                    message : 'usuario y/o contrasena incorrectos',
					object : {	 }
				}
				)
            }

           
            let usuario = {
                nombre_usuario : bodyParams.nombre_usuario, 
                contrasena : bodyParams.contrasena,    
            }
            console.log(usuario)
            LoginModel.login(usuario, (err,row) => {
                if(err){
                   res.status(300).send(
                        {
                            status:false,
                            code:300,
                            message:"usuario y/o contrasena incorrectos",
                            object:[],
                        }
                    )
                }
                // console.log('rows.rows',row.rows)
                let dataUser = row.rows[0].ft_login
                dataUser = dataUser.split(',')
                let statusUser=dataUser[2]
                // console.log("statusUser", statusUser)
                if(statusUser.toString()!==('"DATOS CORRECTOS"').toString() ){
                 return res.status(400).send(
                        {
                            status:false,
                            code:400,
                            message:statusUser,
                            object:[]
                        }
                    )
                }

                const payload = {
                        nameUser: (dataUser[1]).toUpperCase(),
                        id: Number(dataUser[0].replace('(','') || 0),
                    };
                            
                 const token = jwt.sign(payload, JWT_SECRET, {expiresIn: timeExpired});

                 response=  res.status(200).send(
                    {
                        status:true,
                        code:200,
                        message:"Login Exitoso",
                        "x-token":token,
                        data:payload,
                    }
                )
            })            
     
                       
            return response
        }

        let emptyParam = ''

        if (!bodyParams.nombre_usuario) {
            emptyParam = 'nombre_usuario'
        }
        if (!bodyParams.contrasena) {
            emptyParam = 'contrasena'
        }

       

        response = res.status(400).send({
            ok : false,
                code : 400,
                message : "No se enviarón algunos parámetros de consulta",
                object : [emptyParam],
        })
        return response
    } catch (e) {
    
        return res.status(500).send({
            ok : false,
            code : 500,
            message : "erro en el sevidor",
            object : e,
        })
    }
	
	
}

module.exports = LoginController








