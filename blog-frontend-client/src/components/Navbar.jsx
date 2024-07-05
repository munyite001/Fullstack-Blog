import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../../public/logo.png"
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
                    <li>
                        <NavLink to="/Home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/articles">Articles</NavLink>
                    </li>
                    <li className="social">
                        <i className="fa fa-linkedin-square"></i>
                        <i className="fa"></i>
                        <i></i>
                    </li>
                </ul>
            </div>
        </nav>
    )
}