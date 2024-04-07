import {Link} from "react-router-dom";

export default function Navbar(){
    return <nav className = "nav">
        <a href="/" className="Peekaboo">Peekaboo</a>
        <ul>
            <li>
                <Link to="/aboutus">About Us</Link>
            </li>
            <li>
                <Link to="/datapage">DataPage</Link>
            </li>
            <li>
                <Link to="/globaldata">Global Data</Link>
            </li>
        </ul>
    </nav>
}