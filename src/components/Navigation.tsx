import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Shield, Home, Info, Zap, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import authService from "@/lib/authService";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Accueil", path: "/", icon: Home },
    { name: "À Propos", path: "/about", icon: Info },
    { name: "Solutions", path: "/solutions", icon: Zap },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:flex lg:flex-col lg:border-r lg:z-40"
        style={{
          background: theme.colors.primary.dark,
          borderColor: `${theme.colors.primary.electric}20`
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 p-6 border-b" style={{ borderColor: `${theme.colors.primary.electric}20` }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: theme.colors.primary.electric }}>
            <span className="text-sm font-bold" style={{ color: theme.colors.primary.dark }}>OT</span>
          </div>
          <span className="font-bold" style={{ color: theme.colors.primary.electric }}>OKA Tech</span>
        </Link>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all"
                style={{
                  background: isItemActive ? `${theme.colors.primary.electric}15` : "transparent",
                  color: isItemActive ? theme.colors.primary.electric : theme.colors.text.secondary,
                  borderLeft: isItemActive ? `3px solid ${theme.colors.primary.electric}` : "3px solid transparent"
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t p-4 space-y-3" style={{ borderColor: `${theme.colors.primary.electric}20` }}>
          {currentUser ? (
            <>
              <Link
                to="/admin"
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: theme.colors.primary.electric,
                  color: theme.colors.primary.dark
                }}
              >
                <Shield size={18} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: `${theme.colors.semantic.error}20`,
                  color: theme.colors.semantic.error,
                  border: `1px solid ${theme.colors.semantic.error}30`
                }}
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admin-login"
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: `${theme.colors.primary.electric}15`,
                  color: theme.colors.primary.electric,
                  border: `1px solid ${theme.colors.primary.electric}30`
                }}
              >
                <Shield size={18} />
                <span>Admin</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: theme.colors.primary.electric,
                  color: theme.colors.primary.dark
                }}
              >
                <Zap size={18} />
                <span>Commencer</span>
              </Link>
            </>
          )}
        </div>
      </motion.nav>

      {/* Mobile & Tablet Header */}
      <nav
        className="fixed top-0 left-0 right-0 h-16 lg:hidden flex items-center justify-between px-4 border-b z-40"
        style={{
          background: theme.colors.primary.dark,
          borderColor: `${theme.colors.primary.electric}20`
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: theme.colors.primary.electric }}>
            <span className="text-xs font-bold" style={{ color: theme.colors.primary.dark }}>OT</span>
          </div>
          <span className="font-bold text-sm" style={{ color: theme.colors.primary.electric }}>OKA</span>
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-all"
          style={{
            background: isOpen ? `${theme.colors.primary.electric}20` : "transparent",
            color: theme.colors.primary.electric
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-16 bottom-0 w-64 lg:hidden flex flex-col border-r overflow-y-auto z-40"
              style={{
                background: theme.colors.primary.dark,
                borderColor: `${theme.colors.primary.electric}20`
              }}
            >
              {/* Navigation Items */}
              <div className="px-3 py-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isItemActive = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all"
                      style={{
                        background: isItemActive ? `${theme.colors.primary.electric}15` : "transparent",
                        color: isItemActive ? theme.colors.primary.electric : theme.colors.text.secondary,
                        borderLeft: isItemActive ? `3px solid ${theme.colors.primary.electric}` : "3px solid transparent"
                      }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="flex-1" />

              {/* Bottom Section */}
              <div className="border-t p-4 space-y-3" style={{ borderColor: `${theme.colors.primary.electric}20` }}>
                {currentUser ? (
                  <>
                    <div
                      className="px-3 py-2 rounded-lg text-center"
                      style={{ background: `${theme.colors.primary.electric}10`, color: theme.colors.text.primary }}
                    >
                      <p className="text-sm font-medium truncate">{currentUser.name}</p>
                    </div>
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        background: theme.colors.primary.electric,
                        color: theme.colors.primary.dark
                      }}
                    >
                      <Shield size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        background: `${theme.colors.semantic.error}20`,
                        color: theme.colors.semantic.error,
                        border: `1px solid ${theme.colors.semantic.error}30`
                      }}
                    >
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/admin-login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        background: `${theme.colors.primary.electric}15`,
                        color: theme.colors.primary.electric,
                        border: `1px solid ${theme.colors.primary.electric}30`
                      }}
                    >
                      <Shield size={18} />
                      <span>Admin</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        background: theme.colors.primary.electric,
                        color: theme.colors.primary.dark
                      }}
                    >
                      <Zap size={18} />
                      <span>Commencer</span>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
