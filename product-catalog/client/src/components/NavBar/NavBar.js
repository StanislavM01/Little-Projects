import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link  to={'/'} className="navbar-brand" >
                Shop
            </Link>
           
            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to={'/'} className="nav-link" >
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={'/my-products'} className="nav-link" >
                            My Cart <span className="sr-only">(current)</span>
                        </Link>
                    </li>


                    
                </ul>
            </div>
        </nav>

    )
}

export default NavBar