import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
import { useGlobalState } from "./responseClass";
import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { UserContext } from "../App";

function Layout() {
  const [main_class] = useGlobalState("main_class");

  // const { itemId, otherParam } = route.params;

  return (
    // <BrowserRouter>
        
    // <UserContext.Provider >
    <div className="">
    <Header />
      <Sidebar />
      <main id="main" className={main_class}>
        <section className="section dashboard">
        
      
            <Outlet/>
        </section>
      </main>
      <Footer />
      {/* prints: Reed */}
    {/* </BrowserRouter> */}
    </div>
    // </UserContext.Provider>
    
  );
}

export default Layout;
