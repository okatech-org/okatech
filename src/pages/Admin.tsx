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
  BarChart3 
} from "lucide-react";
import leadStorage, { Lead } from "@/lib/leadStorage";
import pdfGenerator from "@/lib/pdfGenerator";
import { toast } from "sonner";

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    avgScore: leads.length > 0 ? (leads.reduce((sum, l) => sum + l.fitScore, 0) / leads.length).toFixed(1) : 0,
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-muted-foreground">Gérez tous les leads et rapports d'analyse</p>
        </div>

        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Leads totaux</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <p className="text-sm text-muted-foreground">Nouveaux</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            <p className="text-sm text-muted-foreground">Contactés</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
            <p className="text-sm text-muted-foreground">Qualifiés</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.converted}</div>
            <p className="text-sm text-muted-foreground">Convertis</p>
          </Card>
          <Card className="p-4">
            <div className={`text-2xl font-bold ${getScoreColor(parseInt(stats.avgScore as any))}`}>
              {stats.avgScore}/100
            </div>
            <p className="text-sm text-muted-foreground">Score moyen</p>
          </Card>
        </div>

        <Card className="p-6 shadow-elegant border-2 border-primary/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Chercher par nom, email ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg"
            >
              <option value="all">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="contacted">Contactés</option>
              <option value="qualified">Qualifiés</option>
              <option value="converted">Convertis</option>
            </select>
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              disabled={filteredLeads.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Entreprise</th>
                  <th className="text-left py-3 px-4 font-semibold">Score</th>
                  <th className="text-left py-3 px-4 font-semibold">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucun lead trouvé
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => (
                    <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-3 px-4 font-medium">{lead.name}</td>
                      <td className="py-3 px-4 text-sm">{lead.email}</td>
                      <td className="py-3 px-4 text-sm">{lead.company}</td>
                      <td className={`py-3 px-4 font-bold ${getScoreColor(lead.fitScore)}`}>
                        {lead.fitScore}/100
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(lead.status)}`}
                        >
                          <option value="new">Nouveau</option>
                          <option value="contacted">Contacté</option>
                          <option value="qualified">Qualifié</option>
                          <option value="converted">Converti</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedLead(lead)}
                            title="Voir le détail"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPDF(lead)}
                            title="Télécharger PDF"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadJSON(lead)}
                            title="Télécharger JSON"
                          >
                            <FileJson className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-destructive hover:bg-destructive/10"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {selectedLead && (
          <Card className="p-6 shadow-elegant border-2 border-primary/10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Détail du Lead</h2>
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)}>
                Fermer
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Nom:</span> {selectedLead.name}</div>
                  <div><span className="font-medium">Email:</span> {selectedLead.email}</div>
                  <div><span className="font-medium">Entreprise:</span> {selectedLead.company}</div>
                  <div><span className="font-medium">Téléphone:</span> {selectedLead.phone || 'Non fourni'}</div>
                  <div><span className="font-medium">Score:</span> {selectedLead.fitScore}/100</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Rapport</h3>
                <div className="bg-muted p-4 rounded text-sm max-h-48 overflow-y-auto">
                  {selectedLead.report}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Conversation</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedLead.conversation.map((msg, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded">
                    <div className="font-medium text-sm mb-1">
                      {msg.role === 'user' ? 'Prospect' : 'Assistant IA'}
                    </div>
                    <div className="text-sm">{msg.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
