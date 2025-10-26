import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  Download,
  Archive,
  ArchiveRestore,
  Filter,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  fitScore: number;
  status: string;
  createdAt: string;
  priority?: 'high' | 'medium' | 'low';
  archived?: boolean;
}

interface LeadManagementAdvancedProps {
  leads: Lead[];
  onLeadsUpdate: (leads: Lead[]) => void;
  currentColors: any;
  isDarkMode: boolean;
}

export const LeadManagementAdvanced = ({
  leads,
  onLeadsUpdate,
  currentColors,
  isDarkMode
}: LeadManagementAdvancedProps) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [filterArchived, setFilterArchived] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredLeads = leads.filter(lead => {
    const matchesArchived = filterArchived ? lead.archived : !lead.archived;
    const matchesPriority = filterPriority === 'all' ? true : (lead.priority === filterPriority);
    return matchesArchived && matchesPriority;
  });

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  const handleToggleSelect = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Supprimer ${selectedLeads.length} lead(s) ?`)) return;

    setBulkLoading(true);
    try {
      const updatedLeads = leads.filter(l => !selectedLeads.includes(l.id));
      onLeadsUpdate(updatedLeads);
      setSelectedLeads([]);
      toast.success(`${selectedLeads.length} lead(s) supprimé(s)`);
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkArchive = async () => {
    setBulkLoading(true);
    try {
      const updatedLeads = leads.map(l =>
        selectedLeads.includes(l.id) ? { ...l, archived: true } : l
      );
      onLeadsUpdate(updatedLeads);
      setSelectedLeads([]);
      toast.success(`${selectedLeads.length} lead(s) archivé(s)`);
    } catch (error) {
      toast.error("Erreur lors de l'archivage");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkUnarchive = async () => {
    setBulkLoading(true);
    try {
      const updatedLeads = leads.map(l =>
        selectedLeads.includes(l.id) ? { ...l, archived: false } : l
      );
      onLeadsUpdate(updatedLeads);
      setSelectedLeads([]);
      toast.success(`${selectedLeads.length} lead(s) restauré(s)`);
    } catch (error) {
      toast.error("Erreur lors de la restauration");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkPriority = async (priority: 'high' | 'medium' | 'low') => {
    setBulkLoading(true);
    try {
      const updatedLeads = leads.map(l =>
        selectedLeads.includes(l.id) ? { ...l, priority } : l
      );
      onLeadsUpdate(updatedLeads);
      setSelectedLeads([]);
      toast.success(`Priorité mise à jour pour ${selectedLeads.length} lead(s)`);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleExportSelected = () => {
    if (selectedLeads.length === 0) {
      toast.error("Sélectionnez au moins un lead");
      return;
    }

    const selectedData = leads.filter(l => selectedLeads.includes(l.id));
    const csv = [
      ["Nom", "Email", "Entreprise", "Score", "Priorité", "Statut"],
      ...selectedData.map(l => [
        l.name,
        l.email,
        l.company,
        l.fitScore,
        l.priority || 'N/A',
        l.status
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast.success(`${selectedLeads.length} lead(s) exporté(s)`);
  };

  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981'
  };

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return 'Non défini';
    }
  };

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: currentColors.cardBg,
        borderColor: currentColors.borderColor
      }}
    >
      {/* Bulk Actions Bar */}
      {selectedLeads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border flex justify-between items-center"
          style={{
            background: isDarkMode ? '#00D9FF10' : '#E0F2FE',
            borderColor: '#00D9FF'
          }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} style={{ color: '#00D9FF' }} />
            <span className="font-semibold" style={{ color: currentColors.textPrimary }}>
              {selectedLeads.length} lead(s) sélectionné(s)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              onClick={() => handleBulkPriority('high')}
              disabled={bulkLoading}
              className="rounded-lg text-xs"
              variant="outline"
              style={{
                borderColor: priorityColors.high,
                color: priorityColors.high
              }}
            >
              Haute Priorité
            </Button>
            <Button
              size="sm"
              onClick={() => handleBulkPriority('medium')}
              disabled={bulkLoading}
              className="rounded-lg text-xs"
              variant="outline"
              style={{
                borderColor: priorityColors.medium,
                color: priorityColors.medium
              }}
            >
              Priorité Moyenne
            </Button>
            <Button
              size="sm"
              onClick={() => handleBulkPriority('low')}
              disabled={bulkLoading}
              className="rounded-lg text-xs"
              variant="outline"
              style={{
                borderColor: priorityColors.low,
                color: priorityColors.low
              }}
            >
              Basse Priorité
            </Button>
            <Button
              size="sm"
              onClick={handleBulkArchive}
              disabled={bulkLoading || filterArchived}
              className="rounded-lg text-xs"
              variant="outline"
            >
              <Archive size={14} className="mr-1" />
              Archiver
            </Button>
            <Button
              size="sm"
              onClick={handleBulkUnarchive}
              disabled={bulkLoading || !filterArchived}
              className="rounded-lg text-xs"
              variant="outline"
            >
              <ArchiveRestore size={14} className="mr-1" />
              Restaurer
            </Button>
            <Button
              size="sm"
              onClick={handleExportSelected}
              disabled={bulkLoading}
              className="rounded-lg text-xs"
              style={{ background: '#00D9FF', color: '#000' }}
            >
              <Download size={14} className="mr-1" />
              Export
            </Button>
            <Button
              size="sm"
              onClick={handleBulkDelete}
              disabled={bulkLoading}
              className="rounded-lg text-xs text-red-400 hover:text-red-300"
              variant="outline"
            >
              <Trash2 size={14} className="mr-1" />
              Supprimer
            </Button>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} style={{ color: currentColors.textMuted }} />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-3 py-2 rounded-lg border text-sm font-medium"
            style={{
              background: currentColors.bg,
              borderColor: currentColors.borderColor,
              color: currentColors.textPrimary
            }}
          >
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>

        <div>
          <select
            value={filterArchived ? 'archived' : 'active'}
            onChange={(e) => setFilterArchived(e.target.value === 'archived')}
            className="px-3 py-2 rounded-lg border text-sm font-medium"
            style={{
              background: currentColors.bg,
              borderColor: currentColors.borderColor,
              color: currentColors.textPrimary
            }}
          >
            <option value="active">Leads actifs</option>
            <option value="archived">Leads archivés</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${currentColors.borderColor}` }}>
              <th className="text-left py-4 px-4 w-10">
                <Checkbox
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Lead
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Entreprise
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Score
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Priorité
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Statut
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: currentColors.textMuted }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <AlertCircle size={48} className="opacity-20" style={{ color: currentColors.textMuted }} />
                    <p className="font-medium" style={{ color: currentColors.textMuted }}>
                      {filterArchived ? 'Aucun lead archivé' : 'Aucun lead trouvé'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, idx) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{ borderBottom: `1px solid ${currentColors.borderColor}` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = currentColors.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleToggleSelect(lead.id)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: currentColors.textPrimary }}>
                        {lead.name}
                      </p>
                      <p className="text-xs" style={{ color: currentColors.textMuted }}>
                        {lead.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-sm" style={{ color: currentColors.textSecondary }}>
                      {lead.company}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        background: lead.fitScore >= 80 ? '#10B981' : lead.fitScore >= 60 ? '#F59E0B' : '#EF4444',
                        color: '#FFFFFF'
                      }}
                    >
                      {lead.fitScore}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: priorityColors[lead.priority || 'low'] + '20',
                        color: priorityColors[lead.priority || 'low']
                      }}
                    >
                      {getPriorityLabel(lead.priority)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: lead.status === 'new' ? '#00D9FF20' : '#8B5CF620',
                        color: lead.status === 'new' ? '#00D9FF' : '#8B5CF6'
                      }}
                    >
                      {lead.status === 'new' ? 'Nouveau' : lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm" style={{ color: currentColors.textMuted }}>
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManagementAdvanced;
