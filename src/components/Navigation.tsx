import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import authService from "@/lib/authService";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Solutions", path: "/solutions" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 backdrop-blur-sm border-b"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.primary.dark} 0%, rgba(0,0,0,0.95) 100%)`,
        borderColor: `${theme.colors.primary.electric}20`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <motion.div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white relative"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`,
                  boxShadow: `0 0 20px ${theme.colors.primary.electric}40`
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                OT
              </motion.div>
              <span 
                className="text-xl font-bold hidden sm:inline-block"
                style={{ color: theme.colors.text.primary }}
              >
                OKA Tech
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className="px-4 py-2 rounded-lg font-medium transition-all relative group"
                  style={{
                    color: isActive(item.path) 
                      ? theme.colors.primary.electric
                      : theme.colors.text.secondary
                  }}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{
                        background: `${theme.colors.primary.electric}15`,
                        border: `1px solid ${theme.colors.primary.electric}30`
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-1 left-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, ${theme.colors.primary.electric}, transparent)`,
                      width: "100%"
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: theme.colors.text.secondary, fontSize: '0.875rem' }}
                >
                  {currentUser.name}
                </motion.span>
                <Link to="/admin">
                  <motion.button
                    className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                    style={{
                      background: `${theme.colors.primary.electric}15`,
                      color: theme.colors.primary.electric,
                      border: `1px solid ${theme.colors.primary.electric}40`
                    }}
                    whileHover={{
                      background: `${theme.colors.primary.electric}25`,
                      boxShadow: `0 0 20px ${theme.colors.primary.electric}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield size={16} />
                    Admin
                  </motion.button>
                </Link>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                  style={{
                    color: theme.colors.semantic.error,
                    border: `1px solid ${theme.colors.semantic.error}40`
                  }}
                  whileHover={{
                    background: `${theme.colors.semantic.error}15`,
                    boxShadow: `0 0 20px ${theme.colors.semantic.error}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/admin-login">
                  <motion.button
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                    style={{
                      color: theme.colors.primary.electric,
                      border: `1px solid ${theme.colors.primary.electric}40`
                    }}
                    whileHover={{
                      background: `${theme.colors.primary.electric}15`,
                      boxShadow: `0 0 20px ${theme.colors.primary.electric}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Admin
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    className="px-6 py-2 rounded-lg font-medium text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`,
                      boxShadow: `0 0 20px ${theme.colors.primary.electric}50`
                    }}
                    whileHover={{
                      boxShadow: `0 0 30px ${theme.colors.primary.electric}70`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-all"
            style={{
              color: theme.colors.text.primary,
              background: isOpen ? `${theme.colors.primary.electric}20` : 'transparent'
            }}
            whileHover={{ background: `${theme.colors.primary.electric}15` }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 space-y-2 border-t"
              style={{ borderColor: `${theme.colors.primary.electric}20` }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg font-medium transition-all"
                  style={{
                    color: isActive(item.path)
                      ? theme.colors.primary.electric
                      : theme.colors.text.secondary,
                    background: isActive(item.path)
                      ? `${theme.colors.primary.electric}15`
                      : 'transparent',
                    border: isActive(item.path)
                      ? `1px solid ${theme.colors.primary.electric}30`
                      : 'none'
                  }}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px my-2" style={{ background: `${theme.colors.primary.electric}20` }} />

              {currentUser ? (
                <>
                  <div 
                    className="px-4 py-2 text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {currentUser.name}
                  </div>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <button
                      className="w-full px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                      style={{
                        color: theme.colors.primary.electric,
                        border: `1px solid ${theme.colors.primary.electric}40`
                      }}
                    >
                      <Shield size={16} />
                      Admin
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                    style={{
                      color: theme.colors.semantic.error,
                      border: `1px solid ${theme.colors.semantic.error}40`
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/admin-login" onClick={() => setIsOpen(false)}>
                    <button
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        color: theme.colors.primary.electric,
                        border: `1px solid ${theme.colors.primary.electric}40`
                      }}
                    >
                      Admin
                    </button>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <button
                      className="w-full px-6 py-2 rounded-lg font-medium text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`
                      }}
                    >
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
