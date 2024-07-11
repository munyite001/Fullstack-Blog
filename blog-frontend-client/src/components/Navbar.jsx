import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import logo from "/logo.png"
export default function Navbar() {

    const [mobileWidth, setMobileWidth] = useState(window.innerWidth <= 768)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    
    const token = localStorage.getItem("token")

    //  Handle Window Resize
    useEffect(() => {
        const handleResize = () => {
            setMobileWidth(window.innerWidth <= 768)
        }

        window.addEventListener('resize', handleResize)

        //  Cleanup the event Listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="nav">
            {mobileWidth && 
            <div className="mobile-nav">
                <div className="logo-container">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <p>ByteSavvy</p>
                </div>
                <i className="fas fa-bars open-menu" onClick={handleMobileMenu}></i>
            </div>}
            <div className={showMobileMenu ? "mobile-menu show-mobile-menu" : "mobile-menu"}>
                <div className="control">
                    <i className="fas fa-times close-btn" onClick={handleMobileMenu}></i>
                </div>
                <ul className="mobile-nav-links">
                    <li className="nav-link" onClick={handleMobileMenu}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-link" onClick={handleMobileMenu}>
                        <NavLink to="/articles">Articles</NavLink>
                    </li>
                    <li className="social" onClick={handleMobileMenu}>
                        <a href="https://github.com/munyite001" target="_blank">
                            <i className='bx bxl-github'></i>
                        </a>
                        <a href="https://www.linkedin.com/in/munyite/" target="_blank">
                            <i className='bx bxl-linkedin-square' ></i>
                        </a>
                    </li>
                    {!token ? 
                        <li className="auth">
                            <button className="btn" onClick={handleMobileMenu}>
                                <Link to="/login">Login</Link>
                            </button>
                            <button className="btn" onClick={handleMobileMenu}>
                                <Link to="/signup">Sign Up</Link>
                            </button>
                        </li> :
                        <li className="auth">
                            <button className="btn" onClick={handleLogout}>Logout</button>
                        </li>
                    }
                </ul>
            </div>
            {!mobileWidth && 
                <div className="desktop-nav">
                    <div className="logo-container">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <p>ByteSavvy</p>
                    </div>
                    <ul className="desktop-nav-links">
                        <li className="nav-link">
                            <NavLink style={({isActive}) => ({ color: isActive ? "#f55e18" : "black" })}  to="/">Home</NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink style={({ isActive }) => ({ color: isActive ? "#f55e18" : "black" })} to="/articles">Articles</NavLink>
                        </li>
                        <li className="social">
                            <a href="https://github.com/munyite001" target="_blank">
                                <i className='bx bxl-github'></i>
                            </a>
                            <a href="https://www.linkedin.com/in/munyite/" target="_blank">
                                <i className='bx bxl-linkedin-square' ></i>
                            </a>
                        </li>
                        {!token ? 
                            <li className="auth">
                                <button className="btn">
                                    <Link to="/login">Login</Link>
                                </button>
                                <button className="btn">
                                    <Link to="/signup">Sign Up</Link>
                                </button>
                            </li> :
                            <li className="auth">
                                <button className="btn" onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            }
        </nav>
    )
}