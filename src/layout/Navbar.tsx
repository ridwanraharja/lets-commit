import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { RiCloseLine, RiSunLine, RiMoonFill } from "react-icons/ri";
import {  Settings, Bell, User, LogOut } from "lucide-react";
import { ConnectButton } from "@xellar/kit";
import { useAccount, useDisconnect, useBalance } from "wagmi";

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
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  useEffect(() => {
    const onScroll = (): void => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      
      if (
        !target.closest(".mobile-menu-button") &&
        !target.closest(".mobile-dropdown")
      ) {
        setIsMenuOpen(false);
      }
      if (
        !target.closest(".profile-button") &&
        !target.closest(".profile-dropdown")
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  
  const links: NavLinkInterface[] = [
    {
      to: "/explore",
      label: "Explore Events",
      icon: "ri-compass-line",
      shortLabel: "Explore",
    },
    {
      to: "/create",
      label: "Create Event",
      icon: "ri-add-circle-line",
      shortLabel: "Create",
    },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-line",
      shortLabel: "Dashboard",
    },
    {
      to: "/aboutus",
      label: "About Us",
      icon: "ri-information-line",
      shortLabel: "About",
    },
  ];


  const mobileNavLinks: MobileNavLink[] = [
    { to: "/", icon: "ri-home-line", label: "Home" },
    {
      to: "/explore",
      icon: "ri-compass-line",
      label: "Explore",
      notification: true,
    },
    {
      to: "/create",
      icon: "ri-add-circle-line",
      label: "Create",
      highlight: true,
    },
    { to: "/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
    { to: "/aboutus", icon: "ri-information-line", label: "About" }, 
  ];


  const handleMobileMenuToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  // Navigate function with scroll to top
  const handleNavigation = (path: string): void => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleLogout = (): void => {
    disconnect();
    setIsProfileOpen(false);
  };

  const handleProfileClick = (): void => {
    navigate("/dashboard");
    setIsProfileOpen(false);
    window.scrollTo(0, 0);
  };

  // Check if current route is home
  const isHome: boolean = location.pathname === "/";

  const getInitials = (address: string): string => {
    return address.slice(2, 4).toUpperCase();
  };

  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl border-b border-gray-200/30 dark:border-gray-700/30"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3.5 md:py-6">
          <div className="flex justify-between items-center">

<div
  className={`flex items-center gap-2 sm:gap-3 cursor-pointer group transition-all duration-200 ease-in-out ${
    isHome ? "scale-105" : ""
  }`}
  onClick={() => handleNavigation("/")}
>
  <div className="relative">
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14  rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-in-out ${
        isHome
          ? "ring-2 ring-blue-300 dark:ring-blue-600 ring-offset-2 dark:ring-offset-gray-900"
          : ""
      }`}
    >
      <img src="/public/CommitLearnFix.svg" alt="Logo CommitLearnFix" className="w-full h-full object-contain" />
    </div>
  </div>
</div>


            <div className="hidden lg:flex gap-0.5 xl:gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-3 rounded-xl lg:rounded-2xl font-semibold transition-all duration-200 ease-in-out group flex items-center gap-2 text-base ${
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
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl lg:rounded-2xl transition-all duration-200 ease-in-out"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"></div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 xl:gap-4">

              <button className="relative p-2.5 lg:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl lg:rounded-2xl transition-all duration-200 ease-in-out group">
                <Bell className="w-5 h-5 group-hover:ring-2 group-hover:ring-blue-300 rounded transition-all duration-200 ease-in-out" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                  <div className="w-full h-full bg-red-400 rounded-full animate-ping"></div>
                </div>
              </button>


              <button
                onClick={toggleTheme}
                className="p-2.5 lg:p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl lg:rounded-2xl transition-all duration-200 ease-in-out group"
              >
                {theme === "dark" ? (
                  <RiSunLine className="w-5 h-5 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-200 ease-in-out" />
                ) : (
                  <RiMoonFill className="w-5 h-5 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-200 ease-in-out" />
                )}
              </button>

              <div className="relative">
                {isConnected && address ? (
                  <>
                    <button
                      onClick={handleProfileToggle}
                      className="profile-button relative p-1.5 lg:p-2 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-200 ease-in-out group shadow-lg hover:shadow-xl"
                    >
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm lg:text-base group-hover:scale-110 transition-transform duration-200 ease-in-out">
                        {getInitials(address)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse">
                        <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                      </div>
                    </button>

                    <div
                      className={`profile-dropdown absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                        isProfileOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {getInitials(address)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {truncateAddress(address)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Connected Wallet
                            </p>
                          </div>
                        </div>

                        {balance && (
                          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                  Balance
                                </p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {parseFloat(balance.formatted).toFixed(4)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                  {balance.symbol}
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  Available
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 ease-in-out group"
                        >
                          <User className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 ease-in-out" />
                          <span className="font-medium">
                            Profile & Dashboard
                          </span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 ease-in-out group"
                        >
                          <LogOut className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 ease-in-out" />
                          <span className="font-medium">Disconnect Wallet</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <ConnectButton />
                )}
              </div>
            </div>

          
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
           
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-500 rounded-lg transition-colors duration-200 ease-in-out touch-manipulation"
                type="button"
              >
                {theme === "dark" ? (
                  <RiSunLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <RiMoonFill className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <div className="lg:hidden">
                {isConnected && address ? (
                  <button
                    onClick={handleProfileToggle}
                    className="profile-button relative p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-200 ease-in-out shadow-lg"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(address)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </button>
                ) : (
                  <ConnectButton />
                )}
              </div>


              <button
                onClick={handleMobileMenuToggle}
                className="mobile-menu-button p-2 sm:p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 ease-in-out touch-manipulation relative z-[60]"
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

   
          <div
            className={`mobile-dropdown lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
              isMenuOpen
                ? "max-h-96 opacity-100 mt-3 sm:mt-4"
                : "max-h-0 opacity-0"
            }`}
            style={{ zIndex: 55 }}
          >
            <div className="bg-white/98 dark:bg-gray-800/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-4 sm:p-6 transition-all duration-200 ease-in-out">
              <div className="flex flex-col gap-2 sm:gap-3">
              
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium sm:font-semibold transition-all duration-200 ease-in-out touch-manipulation text-sm sm:text-base ${
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
              </div>
            </div>
          </div>

          <div
            className={`profile-dropdown lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
              isProfileOpen
                ? "max-h-96 opacity-100 mt-3 sm:mt-4"
                : "max-h-0 opacity-0"
            }`}
            style={{ zIndex: 55 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl p-4 sm:p-6 transition-all duration-200 ease-in-out">
              {isConnected && address && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(address)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {truncateAddress(address)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Connected Wallet
                      </p>
                    </div>
                  </div>

                  {balance && (
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            Balance
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {parseFloat(balance.formatted).toFixed(4)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {balance.symbol}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                            Available
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:gap-3">
                {isConnected && address && (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium sm:font-semibold transition-all duration-200 ease-in-out touch-manipulation text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      Profile & Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium sm:font-semibold transition-all duration-200 ease-in-out touch-manipulation text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      Disconnect Wallet
                    </button>
                  </>
                )}

                {!isConnected && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3 font-medium">
                      Connect your wallet to access all features
                    </p>
                    <ConnectButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>


      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl transition-all duration-200 ease-in-out">
        <div className="flex justify-around items-center py-2 sm:py-3 px-1 sm:px-2">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 sm:gap-1 py-1 sm:py-1 px-1 sm:px-2 transition-all duration-200 ease-in-out min-w-0 flex-1 touch-manipulation ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out flex items-center justify-center ${
                      isActive
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 scale-110 shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    } ${
                      link.highlight
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-lg"
                        : ""
                    }`}
                  >
                    <i
                      className={`${link.icon} text-lg sm:text-xl ${
                        link.highlight && !isActive ? "text-white" : ""
                      }`}
                    ></i>
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                    )}
                    {link.notification && !isActive && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span
                    className={`text-xs pt-1 font-medium transition-all duration-700 ease-in-out text-center leading-tight ${
                      isActive ? "font-bold" : ""
                    } ${
                      link.highlight && !isActive
                        ? "text-purple-600 dark:text-purple-400 font-semibold"
                        : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>


      <div className="pt-16 sm:pt-18 md:pt-20 lg:pt-24 pb-16 sm:pb-18 lg:pb-6 xl:pb-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-200 ease-in-out">
        <Outlet />
      </div>
      <ScrollToTheTop />
      <Footer />
    </>
  );
}
