import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Mail,
  Calendar,
  Shield,
  X
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
  const [showProfileModal, setShowProfileModal] = useState(false);
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

  const handleProfileClick = () => {
    setShowProfileModal(true);
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: "Profil",
      onClick: handleProfileClick,
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

  const profileInfo = [
    { icon: User, label: "Nom", value: "Administrateur OKA Tech" },
    { icon: Mail, label: "Email", value: "admin@okatech.fr" },
    { icon: Shield, label: "Rôle", value: "Administrateur" },
    { icon: Calendar, label: "Depuis", value: "1er Janvier 2025" }
  ];

  return (
    <>
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

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border p-6"
              style={{
                background: currentColors.cardBg,
                borderColor: currentColors.borderColor
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: currentColors.textPrimary }}>
                    Profil Admin
                  </h2>
                  <p className="text-sm" style={{ color: currentColors.textMuted }}>
                    Informations du compte administrateur
                  </p>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="rounded-lg transition-all"
                  style={{
                    background: currentColors.hoverBg,
                    color: currentColors.textPrimary,
                    padding: '8px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Profile Info Grid */}
              <div className="space-y-4 mb-6">
                {profileInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border flex items-start gap-4"
                      style={{
                        background: currentColors.bg,
                        borderColor: currentColors.borderColor
                      }}
                    >
                      <div 
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ background: '#00D9FF20' }}
                      >
                        <Icon size={20} style={{ color: '#00D9FF' }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: currentColors.textMuted }}>
                          {item.label}
                        </p>
                        <p className="text-sm font-medium" style={{ color: currentColors.textPrimary }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div 
                className="rounded-xl border p-4 mb-6"
                style={{
                  background: isDarkMode ? 'rgba(0,217,255,0.05)' : 'rgba(0,217,255,0.1)',
                  borderColor: '#00D9FF'
                }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: currentColors.textMuted }}>
                  Statistiques
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#00D9FF' }}>
                      0
                    </p>
                    <p className="text-xs" style={{ color: currentColors.textMuted }}>
                      Leads Gérés
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                      0
                    </p>
                    <p className="text-xs" style={{ color: currentColors.textMuted }}>
                      Actions
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 rounded-lg font-semibold"
                  style={{
                    background: currentColors.bg,
                    color: currentColors.textPrimary,
                    border: `1px solid ${currentColors.borderColor}`
                  }}
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminDropdown;
