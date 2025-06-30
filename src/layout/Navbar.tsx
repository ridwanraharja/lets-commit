// src/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonFill } from "react-icons/ri";
import { Sparkles } from "lucide-react";

import Footer from "../components/Footer";
import ScrollToTheTop from "../components/ScrollToTheTop";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Enhanced scroll effect for glassmorphism
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Enhanced links with icons
  const links = [
    { to: "/", label: "Home", icon: "ri-home-line" },
    { to: "/explore", label: "Explore Events", icon: "ri-compass-line" },
    { to: "/create", label: "Create Event", icon: "ri-add-circle-line" },
    { to: "/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
    { to: "/aboutus", label: "About Us", icon: "ri-information-line" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Enhanced Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  Let'sCommit!
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                  Commitment-based Learning
                </p>
              </div>
            </div>

            {/* Enhanced Desktop Links */}
            <div className="hidden lg:flex gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 group flex items-center gap-2 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        <i className={`${link.icon} text-lg`}></i>
                        <span className="hidden xl:inline">{link.label}</span>
                        <span className="xl:hidden">{link.label.split(' ')[0]}</span>
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl"></div>
                      )}
                      <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center gap-3">
              {/* Enhanced Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all duration-300 group"
              >
                {theme === "dark" ? (
                  <RiSunLine className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <RiMoonFill className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Enhanced Mobile Menu Button */}
              <div className="lg:hidden mobile-menu-container">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300"
                >
                  {isMenuOpen ? (
                    <RiCloseLine className="w-6 h-6" />
                  ) : (
                    <RiMenuLine className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 mobile-menu-container ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-4">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <i className={`${link.icon} text-lg`}></i>
                    {link.label}
                  </NavLink>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 font-semibold text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content Area */}
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10 transition-colors duration-300">
        <Outlet />
        <ScrollToTheTop />
        <Footer />
      </div>
    </>
  );
}