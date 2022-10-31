"use strict";

var conn = require("../../config/db-connection"),
  LogsModel = () => {};

LogsModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_bitacora", cb);

LogsModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_bitacora WHERE id_usuario = $1", [id], cb);

LogsModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_bitacora WHERE id_usuario = $1",
    [data.id_usuario],
    (err, rows) => {
     
     console.log(rows || err)
    }
  );
};

module.exports = LogsModel;
