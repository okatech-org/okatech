import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import authService from "@/lib/authService";
import { useNavigate } from "react-router-dom";

interface AdminDropdownProps {
  isDarkMode: boolean;
  currentColors: any;
  onSettingsClick?: () => void;
}

export const AdminDropdown = ({
  isDarkMode,
  currentColors,
  onSettingsClick
}: AdminDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsOpen(false);
    navigate("/admin-login");
  };

  const handleSettings = () => {
    setIsOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const menuItems = [
    {
      icon: User,
      label: "Profil",
      onClick: () => setIsOpen(false),
      color: "#00D9FF"
    },
    {
      icon: Settings,
      label: "Paramètres",
      onClick: handleSettings,
      color: "#8B5CF6"
    },
    {
      icon: LogOut,
      label: "Déconnexion",
      onClick: handleLogout,
      color: "#EF4444",
      isDangerous: true
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        style={{
          background: isOpen ? currentColors.hoverBg : 'transparent',
          color: currentColors.textPrimary
        }}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ 
            background: 'linear-gradient(135deg, #00D9FF, #8B5CF6)',
            color: '#FFFFFF'
          }}
        >
          A
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-semibold">Admin</p>
          <p className="text-xs" style={{ color: currentColors.textMuted }}>
            admin@okatech.fr
          </p>
        </div>
        <ChevronDown 
          size={16}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border shadow-lg z-50"
            style={{
              background: currentColors.cardBg,
              borderColor: currentColors.borderColor
            }}
          >
            {/* Header */}
            <div 
              className="px-4 py-3 border-b"
              style={{ borderColor: currentColors.borderColor }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ 
                    background: 'linear-gradient(135deg, #00D9FF, #8B5CF6)',
                    color: '#FFFFFF'
                  }}
                >
                  A
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: currentColors.textPrimary }}>
                    Admin
                  </p>
                  <p className="text-xs" style={{ color: currentColors.textMuted }}>
                    admin@okatech.fr
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={item.onClick}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-all text-left"
                    style={{
                      color: currentColors.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = currentColors.hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div 
              className="px-4 py-3 border-t text-xs"
              style={{ 
                background: isDarkMode ? 'rgba(0,217,255,0.05)' : 'rgba(0,217,255,0.1)',
                borderColor: currentColors.borderColor,
                color: currentColors.textMuted
              }}
            >
              <p>Version 1.0.0</p>
              <p>© 2025 OKA Tech</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDropdown;
