import { useState } from "react";
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import AIChatbot from "@/components/AIChatbot";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showChatbot, setShowChatbot] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: theme.animations.easing.smooth }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Le nom de l'entreprise est requis";
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = "Vous devez accepter la politique de confidentialité";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success("Lancement de l'assistant IA...");
      setShowChatbot(true);
    } else {
      toast.error("Veuillez corriger les erreurs du formulaire");
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div style={{ background: theme.colors.primary.dark, minHeight: '100vh' }}>
      {showChatbot && (
        <AIChatbot
          prospectInfo={{
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
          }}
          onClose={() => setShowChatbot(false)}
          onReportGenerated={() => {
            setShowChatbot(false);
            setFormData({
              name: "",
              email: "",
              company: "",
              phone: "",
              message: "",
              gdprConsent: false,
            });
          }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.colors.secondary.cyan}15, transparent 70%)`
          }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: theme.colors.primary.light }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Parlons de Votre Projet
            <span
              className="block mt-3"
              style={{ color: theme.colors.secondary.cyan }}
            >
              Notre équipe est prête à vous aider
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl"
            style={{ color: theme.colors.neutral.light }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Commencez votre parcours de transformation IA dès aujourd'hui. 
            Notre assistant IA analysera vos besoins et vous fournira des recommandations personnalisées.
          </motion.p>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ color: theme.colors.primary.light }}>
                Coordonnées
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Adresse",
                    content: "50 Avenue des Champs Élysées\n75008 Paris, France"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "contact@oka-tech.com"
                  },
                  {
                    icon: Phone,
                    title: "Téléphone",
                    content: "+33 (0) 1 XX XX XX XX"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{
                          background: theme.colors.secondary.cyan + '20',
                          color: theme.colors.secondary.cyan
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: theme.colors.primary.light }}>
                          {item.title}
                        </h3>
                        <p className="text-sm whitespace-pre-line" style={{ color: theme.colors.neutral.light }}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="p-6 rounded-lg border"
              style={{
                background: 'rgba(0, 212, 212, 0.05)',
                borderColor: theme.colors.secondary.cyan + '40',
                borderWidth: '1px'
              }}
            >
              <div className="mb-4 p-3 rounded-lg" style={{ background: theme.colors.secondary.cyan + '20' }}>
                <CheckCircle size={24} style={{ color: theme.colors.secondary.cyan }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: theme.colors.primary.light }}>
                Consultation IA Gratuite
              </h3>
              <p className="text-sm" style={{ color: theme.colors.neutral.light }}>
                Après soumission, notre assistant IA engagera une conversation pour comprendre profondément vos besoins et fournir une analyse complète.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-8 rounded-lg backdrop-blur-sm border"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: theme.colors.secondary.cyan + '40',
              borderWidth: '1px'
            }}
          >
            <h2 className="text-2xl font-bold mb-8" style={{ color: theme.colors.primary.light }}>
              Formulaire de Contact
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: theme.colors.primary.light }}>
                    Nom Complet <span style={{ color: theme.colors.secondary.cyan }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 212, 0.1)',
                      borderColor: errors.name ? '#ef4444' : theme.colors.secondary.cyan + '40',
                      color: theme.colors.primary.light,
                      borderWidth: '1px'
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm" style={{ color: '#ef4444' }}>{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: theme.colors.primary.light }}>
                    Email <span style={{ color: theme.colors.secondary.cyan }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="jean@example.com"
                    className="w-full px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 212, 0.1)',
                      borderColor: errors.email ? '#ef4444' : theme.colors.secondary.cyan + '40',
                      color: theme.colors.primary.light,
                      borderWidth: '1px'
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm" style={{ color: '#ef4444' }}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: theme.colors.primary.light }}>
                    Entreprise <span style={{ color: theme.colors.secondary.cyan }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Votre entreprise"
                    className="w-full px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 212, 0.1)',
                      borderColor: errors.company ? '#ef4444' : theme.colors.secondary.cyan + '40',
                      color: theme.colors.primary.light,
                      borderWidth: '1px'
                    }}
                  />
                  {errors.company && (
                    <p className="text-sm" style={{ color: '#ef4444' }}>{errors.company}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: theme.colors.primary.light }}>
                    Téléphone (Optionnel)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                    className="w-full px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 212, 0.1)',
                      borderColor: theme.colors.secondary.cyan + '40',
                      color: theme.colors.primary.light,
                      borderWidth: '1px'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: theme.colors.primary.light }}>
                  Décrivez Votre Projet (Optionnel)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Parlez-nous de vos défis ou de ce que vous souhaitez réaliser avec l'IA..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg resize-none"
                  style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    borderColor: theme.colors.secondary.cyan + '40',
                    color: theme.colors.primary.light,
                    borderWidth: '1px'
                  }}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={formData.gdprConsent}
                  onChange={(e) => handleChange("gdprConsent", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="gdpr" className="text-sm cursor-pointer" style={{ color: theme.colors.neutral.light }}>
                  J'accepte le traitement de mes données personnelles conformément à la{" "}
                  <a href="#" className="hover:underline" style={{ color: theme.colors.secondary.cyan }}>
                    Politique de Confidentialité
                  </a>
                  {" "}et consens à être contacté par OKA Tech.{" "}
                  <span style={{ color: '#ef4444' }}>*</span>
                </label>
              </div>
              {errors.gdprConsent && (
                <p className="text-sm" style={{ color: '#ef4444' }}>{errors.gdprConsent}</p>
              )}

              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold rounded-lg"
                style={{
                  background: theme.colors.secondary.cyan,
                  color: theme.colors.primary.dark
                }}
              >
                Soumettre et Commencer <Send className="ml-2" size={20} />
              </Button>

              <p className="text-xs text-center" style={{ color: theme.colors.neutral.medium }}>
                En soumettant ce formulaire, vous recevrez une analyse personnalisée générée par l'IA 
                de vos besoins et les solutions recommandées.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
