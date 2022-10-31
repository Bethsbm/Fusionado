import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "./responseClass";

function Sidebar() {
  const [classSidebar] = useGlobalState("sidebar_class");

  return (
    <aside id="sidebar" className={classSidebar}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/admin/home">
            <i className="bi bi-grid"></i> <span>Inicio</span>
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link " to="/admin/users">
            <i className="bi bi-people"></i> <span>Usuarios</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/admin/params">
            <i className="bi bi-gear"></i> <span>Par&aacute;metros</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/admin/logs">
                <i className="bi bi-list-columns"></i>
                <span>Bit&aacute;coras</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-shield-lock"></i>
            <span>Seguridad</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/admin/roles">
                <i className="bi bi-ui-checks"></i>
                <span>Roles</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/permits">
                <i className="bi bi-toggles"></i>
                <span>Permisos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/questions">
                <i className="bi bi-patch-question"></i>
                <span>Preguntas de Seguridad</span>
              </Link>
            </li>
            
          </ul>
        </li>

        {/* <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            to="/admin/sales"
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
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 4</span>
              </Link>
            </li>
          </ul>
        </li> */}

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
              <Link to="/admin/mostrarcategorias">
                <i className="bi bi-circle"></i>
                <span>Categorías</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarsucursales">
                <i className="bi bi-circle"></i>
                <span>Sucursales</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarimpuestos">
                <i className="bi bi-circle"></i>
                <span>Impuestos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrardescuentos">
                <i className="bi bi-circle"></i>
                <span>Descuentos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarmetodopago">
                <i className="bi bi-circle"></i>
                <span>Métodos de Pago</span>
              </Link>
            </li>
           <li>
              <Link to="/admin/mostrarmodopedido">
                <i className="bi bi-circle"></i>
                <span>Modo Pedido</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrartalonarioSAR">
                <i className="bi bi-circle"></i>
                <span>Talonario SAR</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarPOS">
                <i className="bi bi-circle"></i>
                <span>POS</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarmesas">
                <i className="bi bi-circle"></i>
                <span>Mesas</span>
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
              <Link to="/admin/mostrararticulos">
                <i className="bi bi-circle"></i>
                <span>Artículos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarmateriales">
                <i className="bi bi-circle"></i>
                <span>Lista de Materiales</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarunidadesmedida">
                <i className="bi bi-circle"></i>
                <span>Unidades de Medida</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostraringresomds">
                <i className="bi bi-circle"></i>
                <span>Ingreso de Mercadería</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/mostrarsalidamds">
                <i className="bi bi-circle"></i>
                <span>Salida de Mercadería</span>
              </Link>
            </li>
          </ul>
        </li>
{/* 
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
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 4</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 5</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 6</span>
              </Link>
            </li>
          </ul>
        </li> */}

        {/* <li className="nav-item">
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
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 1</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 2</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 3</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 4</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 5</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 6</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Reporte 7</span>
              </Link>
            </li>
          </ul>
        </li> */}

        {/* <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            to="/admin/"
          >
            <i className="bi bi-gem"></i>
            <span>Otros</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="icons-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
          </ul>
        </li> */}

        {/* <li className="nav-heading">Más</li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i class="bi bi-person"></i> <span>Opción 1</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-question-circle"></i> <span>Opción 2</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-envelope"></i> <span>Opción 3</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-card-list"></i> <span>Opción 4</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-box-arrow-in-right"></i> <span>Opción 5</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-dash-circle"></i> <span>Opción 6</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/">
            <i className="bi bi-file-earmark"></i> <span>Opción 7</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
