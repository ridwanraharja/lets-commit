// src/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink,  useNavigate, Outlet } from "react-router-dom";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

import Footer from "../components/Footer";
import ScrollToTheTop from "../components/ScrollToTheTop";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  // scroll effect for shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 35);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // your top‑level links
  const links = [
    { to: "/",        label: "Home"        },
    { to: "/explore", label: "Explore Events" },
    { to: "/create",  label: "Create Event"   },
    { to: "/dashboard", label: "Dashboard"    },
    { to: "/aboutus",   label: "About Us"     },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-body dark:bg-body-dark text-text dark:text-text-dark p-4
          ${isScrolled 
            ? "shadow-md dark:shadow-[0_4px_14px_rgba(255,255,255,0.15)]" 
            : "shadow-none"}`}
      >
        <div className="container mx-auto flex justify-between items-center">
          
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* <img src={} alt="logo" className="w-8 h-8" /> */}
            <h1 className="font-subtitle text-xl font-bold hover:text-orange-400">
              Let'sCommit!
            </h1>
          </div>

          {/* desktop links */}
          <div className="hidden lg:flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-md font-title transition-all duration-200 ${
                    isActive
                      ? "text-first dark:text-first-dark font-bold"
                      : "text-text dark:text-text-dark"
                  } hover:text-first dark:hover:text-first-dark`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="text-text dark:text-text-dark px-3 py-2 rounded-lg transition hover:scale-105"
          >
            {theme === "dark" 
              ? <i className="ri-sun-line text-2xl hover:text-orange-400"></i>
              : <i className="ri-moon-fill text-2xl hover:text-orange-400"></i>
            }
          </button>

          {/* mobile menu + theme toggle */}
          <div className="flex items-center gap-4 lg:hidden">


            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="text-2xl text-text dark:text-text-dark hover:text-orange-400"
            >
              {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>

        {/* mobile links panel */}
        {isMenuOpen && (
          <div className="flex flex-col items-center gap-6 px-4 py-6 lg:hidden bg-body dark:bg-body-dark">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-md font-title transition-all duration-200 ${
                    isActive
                      ? "text-first dark:text-first-dark font-bold"
                      : "text-text dark:text-text-dark"
                  } hover:text-first dark:hover:text-first-dark`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* where your pages render */}
      <div className="pt-[5.5rem] bg-body dark:bg-body-dark font-body">
        <Outlet />
        <ScrollToTheTop />
        <Footer />
      </div>
    </>
  );
}