import { Link } from "react-router-dom";
import "./NaviMenuBox.css";

function NaviMenuBox(){

    return (
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    );
}

export default NaviMenuBox;