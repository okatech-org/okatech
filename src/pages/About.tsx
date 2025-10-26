import { Card } from "@/components/ui/card";
import { Code2, Database, Users, Lightbulb, Target, TrendingUp } from "lucide-react";
import { theme } from "@/styles/theme";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const About = () => {
  const specializations = [
    {
      icon: Code2,
      title: "Développement Logiciel",
      description: "Solutions logicielles sur-mesure avec technologies modernes et meilleures pratiques",
    },
    {
      icon: Lightbulb,
      title: "Intégration IA",
      description: "Intégration fluide des capacités IA dans vos processus métiers",
    },
    {
      icon: Users,
      title: "Gestion de Projet",
      description: "Accompagnement d'experts de la conception au déploiement et au-delà",
    },
    {
      icon: Database,
      title: "Automatisation Business",
      description: "Industrialisez vos opérations avec des automatisations intelligentes",
    },
  ];

  const values = [
    {
      title: "Innovation d'abord",
      description: "Nous restons à la pointe de l'IA pour délivrer des solutions de rupture",
    },
    {
      title: "Succès Client",
      description: "Votre réussite est la nôtre. Objectif: résultats mesurables",
    },
    {
      title: "Excellence Technique",
      description: "Qualité de code, architecture robuste, sécurité et performance",
    },
    {
      title: "Communication Transparente",
      description: "Échanges clairs et honnêtes à chaque étape du projet",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: theme.animations.easing.smooth },
    },
  };

  return (
    <div style={{ background: theme.colors.primary.dark, minHeight: "100vh" }} className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.colors.primary.electric}15, transparent 70%)`,
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold" style={{ color: theme.colors.text.primary }}>
              À propos <span style={{ color: theme.colors.primary.electric }}>d'OKA Tech</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: theme.colors.text.secondary }}>
              Fondée sur la conviction que l'IA doit être accessible et utile, OKA Tech
              délivre depuis plus de 6 ans des solutions IA transformantes pour les entreprises.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Company Story */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.03)" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: theme.colors.text.primary }}>Notre Histoire</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: theme.colors.text.secondary }}>
                <p>
                  Depuis Paris, nous aidons les organisations à exploiter l'intelligence artificielle pour
                  résoudre des défis complexes et saisir de nouvelles opportunités.
                </p>
                <p>
                  Partie d'une passion pour l'IA accessible, notre démarche s'est muée en partenariats de confiance
                  avec startups et ETI/Grands Groupes.
                </p>
                <p>
                  Notre équipe conjugue expertise en machine learning, NLP et développement full‑stack avec une
                  compréhension métier concrète.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <Target className="w-10 h-10 mb-4" style={{ color: theme.colors.primary.electric }} />
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.text.primary }}>Mission</h3>
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  Apporter des solutions IA qui livrent des résultats réels et mesurables
                </p>
              </Card>
              <Card className="p-6">
                <TrendingUp className="w-10 h-10 mb-4" style={{ color: theme.colors.primary.electric }} />
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.text.primary }}>Vision</h3>
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  Un futur où chaque entreprise s'appuie sur l'IA pour atteindre son plein potentiel
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Specializations */}
      <section className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
              Nos <span style={{ color: theme.colors.primary.electric }}>Spécialisations</span>
            </h2>
            <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
              Quatre piliers au cœur de nos implémentations IA
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 text-center border">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: theme.colors.primary.electric + "20",
                        color: theme.colors.primary.electric,
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text.primary }}>
                      {spec.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: theme.colors.text.secondary }}>
                      {spec.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
              Nos <span style={{ color: theme.colors.primary.electric }}>Valeurs Fondamentales</span>
            </h2>
            <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
              Les principes qui guident chacune de nos actions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 border">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: theme.colors.primary.electric }}>
                    {value.title}
                  </h3>
                  <p style={{ color: theme.colors.text.secondary }}>
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Company Details */}
      <section className="py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-8 border">
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>Informations Légales</h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-3">
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>Raison sociale :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>OKA Tech SAS</p>
                  </div>
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>SIREN :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>988 507 356</p>
                  </div>
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>Forme juridique :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>SAS (Société par Actions Simplifiée)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>Capital :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>€1,000</p>
                  </div>
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>Adresse :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>50 Avenue des Champs Élysées, 75008 Paris</p>
                  </div>
                  <div>
                    <span style={{ color: theme.colors.text.secondary }}>Secteur :</span>
                    <p className="font-medium" style={{ color: theme.colors.text.primary }}>Développement logiciel & Solutions IA</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <motion.h3 variants={itemVariants} className="text-3xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
            Discutons de votre transformation IA
          </motion.h3>
          <motion.p variants={itemVariants} className="mb-8" style={{ color: theme.colors.text.secondary }}>
            Planifions une session pour évaluer vos besoins et définir un plan d'action concret.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="/contact">
              <Button
                className="px-8 py-6 text-lg font-semibold rounded-lg"
                style={{ background: theme.colors.primary.electric, color: theme.colors.primary.dark }}
              >
                Contacter l'équipe
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
