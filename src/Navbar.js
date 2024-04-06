import {Link} from "react-router-dom";

export default function Navbar(){
    return <nav className = "nav">
        <a href="/" className="Peekaboo">Peekaboo</a>
        <ul>
            <li className="active">
                <Link to="/datapage">DataPage</Link>
            </li>
            <li>
                <Link to="/blogs">Blogs</Link>
            </li>
        </ul>
    </nav>
}