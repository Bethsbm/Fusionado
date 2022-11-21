"use strict";

var conn = require("../config/db-connection"),
  ModoPedidoModel = () => {};

ModoPedidoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_modo_pedido", cb);

ModoPedidoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_modo_pedido WHERE id_modo_pedido = $1", [id], cb);

ModoPedidoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_modo_pedido WHERE id_modo_pedido = $1",
    [data.id_modo_pedido],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_modo_pedido_update ($1,$2,$3,$4,$5)",
              [
                data.id_modo_pedido,
                data.descripcion,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo,
              ],
              cb
            )
          : conn.query(
              "call prc_modo_pedido_insert ($1,$2,$3,$4,$5)",
              [
                data.id_modo_pedido,
                data.descripcion,
                data.creado_por,
                data.fecha_creacion,
                data.activo,
              ],
              cb
            );
      }
    }
  );
};

ModoPedidoModel.delete = (id, cb) =>
  conn.query("call prc_modo_pedido_delete ($1)", [id], cb);

module.exports = ModoPedidoModel;
