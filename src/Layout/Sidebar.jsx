import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../globalStates/globalStates";

function Sidebar() {
  const [classSidebar] = useGlobalState("sidebar_class");
  console.log(classSidebar);

  return (
    <aside id="sidebar" className={classSidebar}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/">
            <i className="bi bi-grid"></i> <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            to="/"
          >
            <i className="bi bi-cart3"></i>
            <span>Ventas</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/punto-de-ventas">
                <i className="bi bi-circle"></i>
                <span>Punto de venta</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 4</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#otros-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-ui-checks"></i>
            <span>Administración POS</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="otros-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrarcategorias">
                <i className="bi bi-circle"></i>
                <span>Categorías</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsucursales">
                <i className="bi bi-circle"></i>
                <span>Sucursales</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarimpuestos">
                <i className="bi bi-circle"></i>
                <span>Impuestos</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrardescuentos">
                <i className="bi bi-circle"></i>
                <span>Descuentos</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarmetodospago">
                <i className="bi bi-circle"></i>
                <span>Métodos de Pago</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarmodopedido">
                <i className="bi bi-circle"></i>
                <span>Modo Pedido</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrartalonarioSAR">
                <i className="bi bi-circle"></i>
                <span>Talonario SAR</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarPOS">
                <i className="bi bi-circle"></i>
                <span>POS</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>Inventario</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrararticulos">
                <i className="bi bi-circle"></i>
                <span>Artículos</span>
              </Link>
            </li>

            <li>
              <Link to="/MostrarCentroCosto">
                <i className="bi bi-circle"></i>
                <span>Centro de costo</span>
              </Link>
            </li>

            <li>
              <Link to="/mostrarmateriales">
                <i className="bi bi-circle"></i>
                <span>Lista de Materiales</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarunidadesmedida">
                <i className="bi bi-circle"></i>
                <span>Unidades de Medida</span>
              </Link>
            </li>
            <li>
              <Link to="/mostraringresomds">
                <i className="bi bi-circle"></i>
                <span>Ingreso de Mercadería</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsalidamds">
                <i className="bi bi-circle"></i>
                <span>Salida de Mercadería</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Contabilidad</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrarcatalogo">
                <i className="bi bi-circle"></i>
                <span>Catalogo de cuentas</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarcategoriacont">
                <i className="bi bi-circle"></i>
                <span>Categoria contable</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrardestino">
                <i className="bi bi-circle"></i>
                <span>Destino de cuenta</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarinformefinanciero">
                <i className="bi bi-circle"></i>
                <span>Informe Financiero</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibromayor">
                <i className="bi bi-circle"></i>
                <span>Libro Mayor</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsubcuenta">
                <i className="bi bi-circle"></i>
                <span>SubCuentas</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarestado">
                <i className="bi bi-circle"></i>
                <span>Estado Libro Diario</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibrodetalle">
                <i className="bi bi-circle"></i>
                <span>Libro Diario Detalle</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibroencabezado">
                <i className="bi bi-circle"></i>
                <span>Libro Diario Encabezado</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarperiodo">
                <i className="bi bi-circle"></i>
                <span>Periodo Contable</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-graph-up-arrow"></i>
            <span>Reportes</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="charts-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 2</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 3</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 4</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 5</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 6</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 7</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
