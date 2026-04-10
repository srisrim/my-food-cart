import { Link } from "react-router";

const Header = () => {
    return (
        <>
            <header className="heading"><h1>Header</h1></header>
            <Link to={'/login'}>
                <button>Nav to Login</button>
            </Link>
        </>
    )
}

export default Header;