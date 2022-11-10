"use strict";

var VentaModel = require("../../models/modulo_facturacion_inventario/venta-model"),
  VentaController = () => {};

VentaController.getAll = (req, res, next) => {
  VentaModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

VentaController.getOne = (req, res, next) => {
  let cod_sucursal = req.params.cod_sucursal;
  console.log(cod_sucursal);

  VentaModel.getOne(cod_sucursal, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar Película",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

VentaController.post = (req, res, next) => {
  let sucursal = {
    cod_sucursal: req.body.cod_sucursal,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    rtn: req.body.rtn,
    id_centro_costo: req.body.id_centro_costo,
    id_mapa: req.body.id_mapa,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(sucursal);

  VentaModel.post(sucursal, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${sucursal.cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

VentaController.delete = (req, res, next) => {
  let cod_sucursal = req.params.cod_sucursal;
  console.log(cod_sucursal);

  VentaModel.delete(cod_sucursal, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

VentaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

VentaController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso No Encontrado",
      error: error,
    };

  error.status = 404;

  res.render("error", locals);

  next();
};

module.exports = VentaController;
