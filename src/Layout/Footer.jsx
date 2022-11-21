import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../globalStates/globalStates";

function Footer() {
  const [footer_class] = useGlobalState("footer_class");
  return (
    <footer id="footer" className={footer_class}>
      <div className="copyright">
        &copy; Copyright
        <strong>
          <span> BURRIDOGS</span>
        </strong>
        . Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
