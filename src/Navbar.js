import { Link } from "react-router-dom"

const Navbar = () => {
    return (

        <div className="navbar">
            <Link to='/'><h1>Blog App</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </div>
    );
}
 
export default Navbar;