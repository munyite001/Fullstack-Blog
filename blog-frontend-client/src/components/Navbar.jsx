import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "/logo.png"
export default function Navbar() {

    const [mobileWidth, setMobileWidth] = useState(window.innerWidth <= 768)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

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
                        <i class='bx bxl-github'></i>
                        <i class='bx bxl-linkedin-square' ></i>
                    </li>
                    <li className="auth">
                        <button className="btn">Login</button>
                        <button className="btn">Signup</button>
                    </li>
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
                            <i class='bx bxl-github'></i>
                            <i class='bx bxl-linkedin-square' ></i>
                        </li>
                        <li className="auth">
                            <button className="btn">Login</button>
                            <button className="btn">Signup</button>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}