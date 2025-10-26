import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Trash2, 
  Eye, 
  Mail, 
  FileJson,
  BarChart3,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Activity,
  Calendar,
  LogOut
} from "lucide-react";
import leadStorage, { Lead } from "@/lib/leadStorage";
import pdfGenerator from "@/lib/pdfGenerator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import authService from "@/lib/authService";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const allLeads = leadStorage.getAllLeads();
    setLeads(allLeads);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lead?')) {
      leadStorage.deleteLead(id);
      loadLeads();
      toast.success("Lead supprimé");
    }
  };

  const handleDownloadPDF = (lead: Lead) => {
    pdfGenerator.generateReportPDF(lead);
    toast.success("PDF généré");
  };

  const handleDownloadJSON = (lead: Lead) => {
    pdfGenerator.downloadAsJSON(lead);
    toast.success("JSON téléchargé");
  };

  const handleExportCSV = () => {
    pdfGenerator.downloadAsCSV(filteredLeads);
    toast.success("CSV exporté");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    leadStorage.updateLead(id, { status: newStatus as any });
    loadLeads();
    toast.success("Statut mis à jour");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Déconnexion réussie");
    navigate("/admin-login");
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    avgScore: leads.length > 0 ? (leads.reduce((sum, l) => sum + l.fitScore, 0) / leads.length).toFixed(1) : 0,
  };

  const bgColor = isDarkMode ? theme.colors.primary.dark : '#F5F5F7';
  const cardBg = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';
  const textPrimary = isDarkMode ? theme.colors.text.primary : '#1A1A1A';
  const textSecondary = isDarkMode ? theme.colors.text.secondary : '#6B7280';
  const borderColor = isDarkMode ? theme.colors.primary.electric + '20' : '#E5E7EB';

  return (
    <div style={{ background: bgColor, minHeight: '100vh', transition: 'background 0.3s ease' }}>
      {/* HEADER */}
      <div 
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{ 
          background: isDarkMode ? 'rgba(10, 14, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: borderColor
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>
              Overview
            </h1>
            <p className="text-sm" style={{ color: textSecondary }}>
              Dashboard Admin OKA Tech
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: theme.colors.primary.electric + '20' }}>
                <span style={{ color: theme.colors.primary.electric }} className="font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: textPrimary }}>Admin</p>
                <p className="text-xs" style={{ color: textSecondary }}>admin@okatech.fr</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-500"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* PERIOD SELECTOR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={20} style={{ color: textSecondary }} />
            <span className="text-sm font-medium" style={{ color: textPrimary }}>
              Semaine 2-11 Octobre
            </span>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Users,
              label: "Total Leads",
              value: stats.total,
              change: "+12%",
              trend: "up",
              color: theme.colors.primary.electric
            },
            {
              icon: Target,
              label: "Leads Qualifiés",
              value: stats.qualified,
              change: "+8%",
              trend: "up",
              color: theme.colors.semantic.success
            },
            {
              icon: TrendingUp,
              label: "Taux Conversion",
              value: stats.converted > 0 ? `${((stats.converted / stats.total) * 100).toFixed(1)}%` : "0%",
              change: "+5%",
              trend: "up",
              color: theme.colors.primary.purple
            },
            {
              icon: Activity,
              label: "Score Moyen",
              value: `${stats.avgScore}/100`,
              change: stats.avgScore >= 70 ? "+3%" : "-2%",
              trend: stats.avgScore >= 70 ? "up" : "down",
              color: stats.avgScore >= 70 ? theme.colors.semantic.success : theme.colors.semantic.warning
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-xl backdrop-blur-sm border"
              style={{
                background: cardBg,
                borderColor: borderColor
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg" style={{ background: stat.color + '20' }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: stat.trend === 'up' ? theme.colors.semantic.success : theme.colors.semantic.error }}>
                  {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: textPrimary }}>
                {stat.value}
              </div>
              <p className="text-sm" style={{ color: textSecondary }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* LEADS TABLE */}
        <div 
          className="p-6 rounded-xl backdrop-blur-sm border mb-6"
          style={{
            background: cardBg,
            borderColor: borderColor
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: textPrimary }}>
              Gestion des Leads
            </h2>
            <Button 
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="rounded-lg"
              style={{
                background: theme.colors.primary.electric,
                color: theme.colors.primary.dark
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Chercher par nom, email ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              style={{
                background: isDarkMode ? 'rgba(0, 217, 255, 0.1)' : '#F9FAFB',
                borderColor: borderColor,
                color: textPrimary
              }}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: isDarkMode ? 'rgba(0, 217, 255, 0.1)' : '#F9FAFB',
                borderColor: borderColor,
                color: textPrimary,
                borderWidth: '1px'
              }}
            >
              <option value="all">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="contacted">Contactés</option>
              <option value="qualified">Qualifiés</option>
              <option value="converted">Convertis</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Nom</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Entreprise</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Score</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Statut</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase" style={{ color: textSecondary }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12" style={{ color: textSecondary }}>
                      <Users size={48} className="mx-auto mb-3 opacity-30" />
                      <p>Aucun lead trouvé</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, idx) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="transition-all duration-200"
                      style={{ 
                        borderBottom: `1px solid ${borderColor}`,
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDarkMode ? 'rgba(0, 217, 255, 0.05)' : '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td className="py-4 px-4 font-semibold" style={{ color: textPrimary }}>{lead.name}</td>
                      <td className="py-4 px-4 text-sm" style={{ color: textSecondary }}>{lead.email}</td>
                      <td className="py-4 px-4 text-sm" style={{ color: textSecondary }}>{lead.company}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{
                            background: lead.fitScore >= 80 ? theme.colors.semantic.success + '20' : lead.fitScore >= 60 ? theme.colors.semantic.warning + '20' : theme.colors.semantic.error + '20',
                            color: lead.fitScore >= 80 ? theme.colors.semantic.success : lead.fitScore >= 60 ? theme.colors.semantic.warning : theme.colors.semantic.error
                          }}>
                            {lead.fitScore}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: lead.status === 'new' ? theme.colors.primary.electric + '20' :
                                       lead.status === 'contacted' ? theme.colors.semantic.warning + '20' :
                                       lead.status === 'qualified' ? theme.colors.semantic.success + '20' :
                                       theme.colors.primary.purple + '20',
                            color: lead.status === 'new' ? theme.colors.primary.electric :
                                   lead.status === 'contacted' ? theme.colors.semantic.warning :
                                   lead.status === 'qualified' ? theme.colors.semantic.success :
                                   theme.colors.primary.purple,
                            borderWidth: '0'
                          }}
                        >
                          <option value="new">Nouveau</option>
                          <option value="contacted">Contacté</option>
                          <option value="qualified">Qualifié</option>
                          <option value="converted">Converti</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-sm" style={{ color: textSecondary }}>
                        {new Date(lead.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedLead(lead)}
                            title="Voir le détail"
                            className="hover:bg-opacity-10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadPDF(lead)}
                            title="Télécharger PDF"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadJSON(lead)}
                            title="Télécharger JSON"
                          >
                            <FileJson className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500 hover:bg-red-500/10"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LEAD DETAIL MODAL */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl backdrop-blur-sm border"
            style={{
              background: cardBg,
              borderColor: borderColor
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>
                  Détail du Lead
                </h2>
                <p className="text-sm" style={{ color: textSecondary }}>
                  {selectedLead.name} - {selectedLead.company}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedLead(null)}
                className="rounded-lg"
              >
                Fermer
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 rounded-lg" style={{ background: isDarkMode ? 'rgba(0, 217, 255, 0.05)' : '#F9FAFB' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
                  <Users size={18} />
                  Informations
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Nom", value: selectedLead.name },
                    { label: "Email", value: selectedLead.email },
                    { label: "Entreprise", value: selectedLead.company },
                    { label: "Téléphone", value: selectedLead.phone || 'Non fourni' },
                    { label: "Score de Fit", value: `${selectedLead.fitScore}/100` }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span style={{ color: textSecondary }}>{item.label}:</span>
                      <span className="font-medium" style={{ color: textPrimary }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-lg" style={{ background: isDarkMode ? 'rgba(0, 217, 255, 0.05)' : '#F9FAFB' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
                  <FileText size={18} />
                  Rapport d'Analyse
                </h3>
                <div 
                  className="p-4 rounded text-sm max-h-48 overflow-y-auto"
                  style={{ 
                    background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : '#FFFFFF',
                    color: textSecondary
                  }}
                >
                  {selectedLead.report}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ background: isDarkMode ? 'rgba(0, 217, 255, 0.05)' : '#F9FAFB' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
                <Mail size={18} />
                Conversation
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedLead.conversation.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-lg"
                    style={{
                      background: msg.role === 'user' 
                        ? isDarkMode ? 'rgba(0, 217, 255, 0.1)' : '#E0F2FE'
                        : isDarkMode ? 'rgba(157, 78, 221, 0.1)' : '#F3E8FF',
                      borderLeft: msg.role === 'user' 
                        ? `3px solid ${theme.colors.primary.electric}` 
                        : `3px solid ${theme.colors.primary.purple}`
                    }}
                  >
                    <div className="font-semibold text-xs mb-2 uppercase" style={{ 
                      color: msg.role === 'user' ? theme.colors.primary.electric : theme.colors.primary.purple 
                    }}>
                      {msg.role === 'user' ? 'Prospect' : 'Assistant IA'}
                    </div>
                    <div className="text-sm" style={{ color: textPrimary }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
