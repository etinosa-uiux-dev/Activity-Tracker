import { useEffect, useRef, useState } from "react";
import { logOut } from "../firebase";
import { useNavigate } from "react-router-dom";


function Header () {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef();
    const nav = useNavigate();

    const handleTracker = () => {
        nav("/tracker");
    }

    const handleLogout = async () => {
        const success = await logOut();

        if (success) {
            nav("/login")
        }
    }

    const handleHome = () => nav("/land");
    const handleAbout = () => nav("/about");
    const handleContact = () => nav("/contact");

    useEffect( () => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header ref={navRef} className={`z-50 fixed w-full top-0 py-3 px-5 flex justify-between items-center transition-colors duration-300 ${isScrolled ? "backdrop-blur-md text-white shadow-lg" : "bg-transparent text-white"}`}>
            <div className="cursor-pointer" onClick={handleHome}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    TEMPO{""} <span className="hidden sm:inline text-xs sm:text-sm font-light">
                        keeping pace with your life’s rhythm
                    </span>
                </h1>
            </div>            

            <nav className="hidden md:flex items-center gap-8">
                <ul className="flex items-center gap-8">
                    <li>
                        <p className="cursor-pointer" onClick={handleTracker}>Track</p>
                    </li>
                    <li>
                        <p className="cursor-pointer" onClick={handleHome}>Home</p>
                    </li>
                    <li>
                        <p className="cursor-pointer" onClick={handleAbout}>About</p>
                    </li>
                    <li>
                        <p className="cursor-pointer" onClick={handleContact}>Contact Us</p>
                    </li>
                </ul>

                <div className="relative group">
                    <p className="cursor-pointer flex items-center gap-1">
                        Account
                        <span>
                            <i className="fa-solid fa-caret-down"></i>
                        </span>
                    </p>
                    
                    <div className="bg-indigo-600 p-2 rounded absolute right-0 flex flex-col gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
                        <p className="cursor-pointer hover:underline transition-all duration-300">
                            Settings
                        </p>

                        <p className="cursor-pointer hover:underline transition-all duration-300" onClick={handleLogout}>
                            Sign Out
                        </p>
                    </div>
                </div>
            </nav>

            <button className="block md:hidden text-2xl" onClick={ () => setMenuOpen(!menuOpen)}>
                <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>

            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-indigo-700 flex flex-col item-start gap-4 p-5 md:hidden">
                    <p className="cursor-pointer" onClick={handleTracker}>
                        Track
                    </p>
                    <p className="cursor-pointer" onClick={handleHome}>
                        Home
                    </p>
                    <p className="cursor-pointer" onClick={handleAbout}>
                        About
                    </p>
                    <p className="cursor-pointer" onClick={handleContact}>
                        Contact
                    </p>
                    <hr className="border-indigo-500 w-full" />
                    <p className="cursor-pointer">Settings</p>
                    <p className="cursor-pointer" onClick={handleLogout}>Sign Out</p>
                </div>
            )}
        </header>
    );
}

export default Header;