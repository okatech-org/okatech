import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import authService from "@/lib/authService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@oka-tech.fr");
  const [password, setPassword] = useState("Admin@123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = authService.login(email, password);

      if (result) {
        toast.success("Connexion réussie!");
        navigate("/admin");
      } else {
        setError("Email ou mot de passe incorrect");
        toast.error("Erreur de connexion");
      }
    } catch (err) {
      setError("Une erreur est survenue");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20">
      <div className="w-full max-w-md px-4">
        <Card className="p-8 shadow-elegant border-2 border-primary/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin OKA Tech</h1>
            <p className="text-muted-foreground">Accès au tableau de bord</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Identifiants par défaut:</p>
                <p>Email: admin@oka-tech.fr</p>
                <p>Mot de passe: Admin@123</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@oka-tech.fr"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>Cette page est réservée aux administrateurs.</p>
            <p>Pour toute assistance, contactez support@oka-tech.fr</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
