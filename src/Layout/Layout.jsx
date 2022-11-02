import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
import { useGlobalState } from "./responseClass";
import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
// import { UserContext } from "../App";


const urlapi = "http://localhost:3001";
function Layout() {

/** *
 ** Aqui obtengo del local storagae los parametros de la bd ,estos s epueden obyet en cualquier poantalla
 mientras el usuario este logeado 
 */
let settingsParams=  JSON.parse(localStorage.getItem('params'))
console.log("settingsParams",settingsParams)

  const [main_class] = useGlobalState("main_class");
  return (
    <div className="">
    <Header />
      <Sidebar />
      <main id="main" className={main_class}>
        <section className="section dashboard">
            <Outlet/>
        </section>
      </main>
      <Footer />
    </div>
    
  );
}

export default Layout;
