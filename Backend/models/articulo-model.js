"use strict";

var conn = require("../config/db-connection"),
  ArticuloModel = () => {};

ArticuloModel.getAll = (cb) => conn.query("SELECT * FROM tbl_articulo", cb);

ArticuloModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_articulo WHERE id_articulo = $1", [id], cb);

ArticuloModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_articulo WHERE id_articulo = $1",
    [data.id_articulo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_articulo_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.id_articulo,
                data.tipo,
                data.descripcion,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo
              ],
              cb
            )
          : conn.query(
              "call prc_articulo_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.id_articulo,
                data.tipo,
                data.descripcion,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.creado_por,
                data.fecha_creacion,
                data.activo
              ],
              cb
            );
      }
    }
  );
};

ArticuloModel.delete = (id, cb) =>
  conn.query("call prc_articulo_delete ($1)", [id], cb);

module.exports = ArticuloModel;
