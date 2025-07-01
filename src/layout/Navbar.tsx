// src/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { RiCloseLine, RiSunLine, RiMoonFill, RiWallet3Line } from "react-icons/ri";
import { Sparkles, Settings, Bell, ChevronDown } from "lucide-react";

import Footer from "../components/Footer";
import ScrollToTheTop from "../components/ScrollToTheTop";
import { useTheme } from "../hooks/useTheme";

interface NavLinkInterface {
  to: string;
  label: string;
  icon: string;
  shortLabel: string;
}

interface MobileNavLink {
  to: string;
  icon: string;
  label: string;
  notification?: boolean;
  highlight?: boolean;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false); // Wallet connection state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileWalletOpen, setIsMobileWalletOpen] = useState<boolean>(false); // New state for mobile wallet dropdown
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Enhanced scroll effect for glassmorphism
  useEffect(() => {
    const onScroll = (): void => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsMobileWalletOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside - Fixed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      // Check if the click is outside both dropdown containers and mobile menu button
      if (
        !target.closest('.dropdown-container') && 
        !target.closest('.mobile-menu-button') &&
        !target.closest('.mobile-dropdown') &&
        !target.closest('.mobile-wallet-container')
      ) {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        setIsMobileWalletOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Enhanced links without badges - removed Home as it's now handled by logo
  const links: NavLinkInterface[] = [
    { to: "/explore", label: "Explore Events", icon: "ri-compass-line", shortLabel: "Explore" },
    { to: "/create", label: "Create Event", icon: "ri-add-circle-line", shortLabel: "Create" },
    { to: "/dashboard", label: "Dashboard", icon: "ri-dashboard-line", shortLabel: "Dashboard" },
    { to: "/aboutus", label: "About Us", icon: "ri-information-line", shortLabel: "About" },
  ];

  // Mobile-only links for bottom nav - replaced Profile with About Us
  const mobileNavLinks: MobileNavLink[] = [
    { to: "/", icon: "ri-home-line", label: "Home" },
    { to: "/explore", icon: "ri-compass-line", label: "Explore", notification: true },
    { to: "/create", icon: "ri-add-circle-line", label: "Create", highlight: true },
    { to: "/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
    { to: "/aboutus", icon: "ri-information-line", label: "About" }, // Changed from Profile to About Us
  ];

  const handleConnect = (): void => {
    // Simulate wallet connection
    setIsConnected(!isConnected);
    setIsMobileWalletOpen(false);
  };

  // Fixed mobile menu toggle
  const handleMobileMenuToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle mobile wallet toggle
  const handleMobileWalletToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileWalletOpen(!isMobileWalletOpen);
  };

  // Navigate function with scroll to top
  const handleNavigation = (path: string): void => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const walletAddress: string = "0x1234...5678"; // Mock wallet address

  // Check if current route is home
  const isHome: boolean = location.pathname === "/";

  return (
    <>
      {/* Desktop/Tablet Top Navigation - NOW STARTS FROM lg: */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl border-b border-gray-200/30 dark:border-gray-700/30"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3.5 md:py-6">
          <div className="flex justify-between items-center">
            
            {/* Enhanced Logo with Animation - Responsive sizing */}
            <div
              className={`flex items-center gap-2 sm:gap-3 cursor-pointer group transition-all duration-700 ease-in-out ${
                isHome ? "scale-105" : ""
              }`}
              onClick={() => handleNavigation("/")}
            >
              <div className="relative">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg md:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-in-out ${
                  isHome ? "ring-2 ring-blue-300 dark:ring-blue-600 ring-offset-2 dark:ring-offset-gray-900" : ""
                }`}>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-md sm:shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="hidden xs:block">
                <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 transition-all duration-700 ease-in-out ${
                  isHome ? "from-purple-600 via-pink-600 to-blue-600" : ""
                }`}>
                  Let'sCommit!
                </h1>
                <p className={`text-xs sm:text-xs md:text-xs text-gray-500 dark:text-gray-400 -mt-0.5 sm:-mt-1 font-medium transition-colors duration-700 ease-in-out ${
                  isHome ? "text-blue-600 dark:text-blue-400" : ""
                }`}>
                  🚀 Commitment-based Learning
                </p>
              </div>
            </div>

            {/* Desktop Navigation - NOW STARTS FROM lg: ONLY */}
            <div className="hidden lg:flex gap-0.5 xl:gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-3 rounded-xl lg:rounded-2xl font-semibold transition-all duration-700 ease-in-out group flex items-center gap-2 text-base ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        <i className={`${link.icon} text-lg`}></i>
                        <span className="hidden xl:inline">{link.label}</span>
                        <span className="xl:hidden">{link.shortLabel}</span>
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl lg:rounded-2xl transition-all duration-700 ease-in-out"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"></div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Section - NOW STARTS FROM lg: ONLY */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Notifications */}
              <button className="relative p-2.5 lg:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl lg:rounded-2xl transition-all duration-700 ease-in-out group">
                <Bell className="w-5 h-5 group-hover:ring-2 group-hover:ring-blue-300 rounded transition-all duration-700 ease-in-out" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                  <div className="w-full h-full bg-red-400 rounded-full animate-ping"></div>
                </div>
              </button>

              {/* Enhanced Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 lg:p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl lg:rounded-2xl transition-all duration-700 ease-in-out group"
              >
                {theme === "dark" ? (
                  <RiSunLine className="w-5 h-5 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                ) : (
                  <RiMoonFill className="w-5 h-5 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                )}
              </button>

              {/* Connect/Profile Section */}
              {isConnected ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out group text-base"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <RiWallet3Line className="w-4 h-4" />
                    </div>
                    <div className="hidden xl:block text-left">
                      <div className="text-xs opacity-90">Connected</div>
                      <div className="text-sm font-semibold">{walletAddress}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-700 ease-in-out ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-[60] transition-all duration-700 ease-in-out">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-base">U</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-base">User</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{walletAddress}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            handleNavigation("/dashboard");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-700 ease-in-out text-base"
                        >
                          <i className="ri-dashboard-line text-lg"></i>
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            handleNavigation("/aboutus");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-700 ease-in-out text-base"
                        >
                          <i className="ri-information-line text-lg"></i>
                          About Us
                        </button>
                        <button
                          onClick={() => {
                            handleConnect();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-700 ease-in-out text-base"
                        >
                          <i className="ri-logout-box-line text-lg"></i>
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="group relative px-4 py-3 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-700 ease-in-out overflow-hidden text-base font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RiWallet3Line className="w-5 h-5" />
                    <span className="hidden xl:inline">Connect Wallet</span>
                    <span className="xl:hidden">Connect</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
                </button>
              )}
            </div>

            {/* Mobile/Tablet Right Section - VISIBLE UP TO lg: */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-500 rounded-lg transition-colors duration-700 ease-in-out touch-manipulation"
                type="button"
              >
                {theme === "dark" ? (
                  <RiSunLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <RiMoonFill className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Mobile Wallet Button */}
              {isConnected ? (
                <div className="relative mobile-wallet-container">
                  <button
                    onClick={handleMobileWalletToggle}
                    className="p-2 sm:p-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg transition-all duration-700 ease-in-out touch-manipulation"
                    type="button"
                  >
                    <RiWallet3Line className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Mobile Wallet Dropdown */}
                  {isMobileWalletOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-[65] transition-all duration-700 ease-in-out">
                      <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs sm:text-sm">U</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">Connected</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{walletAddress}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            handleNavigation("/dashboard");
                            setIsMobileWalletOpen(false);
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-700 ease-in-out text-sm"
                        >
                          <i className="ri-dashboard-line text-base"></i>
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            handleConnect();
                            setIsMobileWalletOpen(false);
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-700 ease-in-out text-sm"
                        >
                          <i className="ri-logout-box-line text-base"></i>
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="mobile-menu-button p-2 sm:p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-700 ease-in-out touch-manipulation relative z-[60]"
                type="button"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? (
                  <RiCloseLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile/Tablet Dropdown Menu - VISIBLE UP TO lg: */}
          <div
            className={`mobile-dropdown lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0"
            }`}
            style={{ zIndex: 55 }}
          >
            <div className="bg-white/98 dark:bg-gray-800/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-4 sm:p-6 transition-all duration-700 ease-in-out">
              <div className="flex flex-col gap-2 sm:gap-3">
                {/* All Navigation Links for Mobile/Tablet Dropdown */}
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium sm:font-semibold transition-all duration-700 ease-in-out touch-manipulation text-sm sm:text-base ${
                        isActive
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <i className={`${link.icon} text-base sm:text-lg`}></i>
                    {link.label}
                  </NavLink>
                ))}
                
                {/* Mobile/Tablet Connect Section */}
                {!isConnected && (
                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        handleConnect();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium sm:font-bold rounded-xl sm:rounded-2xl shadow-lg transition-all duration-700 ease-in-out flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                      type="button"
                    >
                      <RiWallet3Line className="w-4 h-4 sm:w-5 sm:h-5" />
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Bottom Navigation - VISIBLE UP TO lg: */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl transition-all duration-700 ease-in-out">
        <div className="flex justify-around items-center py-2 sm:py-3 px-1 sm:px-2">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 sm:gap-1 py-1 sm:py-1 px-1 sm:px-2 transition-all duration-700 ease-in-out min-w-0 flex-1 touch-manipulation ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out flex items-center justify-center ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 scale-110 shadow-lg" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  } ${link.highlight ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-lg" : ""}`}>
                    <i className={`${link.icon} text-lg sm:text-xl ${link.highlight && !isActive ? "text-white" : ""}`}></i>
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                    )}
                    {link.notification && !isActive && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className={`text-xs pt-1 font-medium transition-all duration-700 ease-in-out text-center leading-tight ${
                    isActive ? "font-bold" : ""
                  } ${link.highlight && !isActive ? "text-purple-600 dark:text-purple-400 font-semibold" : ""}`}>
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Enhanced Main Content Area with responsive padding */}
      <div className="pt-16 sm:pt-18 md:pt-20 lg:pt-24 pb-16 sm:pb-18 lg:pb-6 xl:pb-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">
        <Outlet />
        <ScrollToTheTop />
        <Footer />
      </div>
    </>
  );
}