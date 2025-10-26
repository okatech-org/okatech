import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Users, Workflow, Brain, Lock, Rocket } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

  return (
    <div style={{ background: theme.colors.primary.dark, minHeight: '100vh' }}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.colors.primary.electric}15, transparent 70%)`
          }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Nous comprenons votre activité
            <span
              className="block mt-3"
              style={{ color: theme.colors.primary.electric }}
            >
              au-delà de vos pensées
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            style={{ color: theme.colors.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            OKA Tech réinvente votre entreprise avec l'IA. Nous ne vous donnons pas une solution générique ; 
            nous construisons l'application qui vous convient, qui allège vos tâches administratives et automatise 
            tout ce qui peut l'être.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Button
              className="px-8 py-6 text-lg font-semibold rounded-lg"
              style={{
                background: theme.colors.primary.electric,
                color: theme.colors.primary.dark
              }}
              onClick={() => document.getElementById('chatbot-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Commençons Ensemble <ChevronRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-lg"
              style={{
                borderColor: theme.colors.primary.electric,
                color: theme.colors.primary.electric
              }}
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Planifier une Démo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== VALUE PROPOSITION SECTION ===== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
            Pourquoi choisir OKA Tech ?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl" style={{ color: theme.colors.text.secondary }}>
            Trois piliers fondamentaux de notre approche
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: 'Expertise au-delà du Code',
              description: 'Nous comprenons vos métiers, vos processus, vos défis spécifiques. Plus de 6 ans d\'expérience en implémentation IA full-stack et ingénierie avancée des prompts.'
            },
            {
              icon: Users,
              title: 'Libérez Votre Équipe',
              description: 'Automatisez les tâches administratives répétitives. Laissez vos collaborateurs se concentrer sur le travail purement humain et augmentez la productivité.'
            },
            {
              icon: Workflow,
              title: 'Transformation Adaptée',
              description: 'Nous nous adaptons à l\'évolution de votre entreprise avec une scalabilité garantie et une architecture cloud native. Résilience et performance 99.9%.'
            }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: theme.colors.primary.electric + '40',
                borderWidth: '1px'
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="mb-4 inline-block p-3 rounded-lg"
                style={{
                  background: theme.colors.primary.electric + '20',
                  color: theme.colors.primary.electric
                }}
                animate={{ scale: hoveredCard === idx ? 1.1 : 1 }}
              >
                <pillar.icon size={32} />
              </motion.div>
              <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
                {pillar.title}
              </h3>
              <p style={{ color: theme.colors.text.secondary }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== SOLUTIONS SECTION ===== */}
      <section className="py-20 px-6" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
              Nos Solutions - En Action
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl" style={{ color: theme.colors.text.secondary }}>
              De l'idée à l'automatisation
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: 'Qualification Automatisée des Leads',
                description: 'Notre agent IA capture, analyse et qualifie vos leads automatiquement',
                features: [
                  'Conversation naturelle avec le prospect',
                  'Extraction automatique des besoins',
                  'Génération de rapports détaillés',
                  'Notification instantanée'
                ],
                cta: 'Voir le Démo'
              },
              {
                icon: Workflow,
                title: 'Orchestration IA - Processus Réinventés',
                description: 'Automatisez les workflows complexes et libérez vos ressources',
                features: [
                  'Analyse intelligente des documents',
                  'Routage automatisé des tâches',
                  'Réduction du temps de 80%',
                  'Intégration multi-systèmes'
                ],
                cta: 'En Savoir Plus'
              },
              {
                icon: Rocket,
                title: 'Analytics & Dashboard Intelligent',
                description: 'Visualisez vos données et prenez des décisions basées sur l\'IA',
                features: [
                  'Tableau de bord personnalisé',
                  'Analyses prédictives',
                  'Recommandations automatisées',
                  'Insights temps réel'
                ],
                cta: 'Découvrir'
              }
            ].map((solution, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: theme.colors.primary.electric + '40',
                  borderWidth: '1px'
                }}
              >
                <div
                  className="mb-6 inline-block p-3 rounded-lg"
                  style={{
                    background: theme.colors.primary.electric + '20',
                    color: theme.colors.primary.electric
                  }}
                >
                  <solution.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.text.primary }}>
                  {solution.title}
                </h3>
                <p className="mb-6" style={{ color: theme.colors.text.secondary }}>
                  {solution.description}
                </p>
                <ul className="mb-8 space-y-2">
                  {solution.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm flex items-start gap-2" style={{ color: theme.colors.text.secondary }}>
                      <span style={{ color: theme.colors.primary.electric }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full text-sm rounded-lg"
                  style={{
                    borderColor: theme.colors.primary.electric,
                    color: theme.colors.primary.electric
                  }}
                >
                  {solution.cta}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ADVANTAGES SECTION ===== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Ce qui nous rend différents
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-12" style={{ color: theme.colors.text.secondary }}>
            L'IA n'est pas une mode, c'est une nécessité. Depuis 2019, OKA Tech anticipe et accompagne la transformation digitale.
          </motion.p>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Expertise Métier Multi-Domaines (6+ ans)',
                description: 'Gestion de projet, développement logiciel, automatisation. Nous parlons votre langue.',
                icon: Brain
              },
              {
                title: 'Architecture Scalable & Sécurisée',
                description: 'Conformité RGPD garantie, infrastructure cloud moderne, monitoring 24/7.',
                icon: Lock
              },
              {
                title: 'Approche Human-Centric',
                description: 'L\'IA doit servir l\'humain. Formation et support inclus pour vos équipes.',
                icon: Users
              },
              {
                title: 'Time-to-Market Rapide',
                description: 'Timeline: 11-17 semaines pour une solution complète. Support 24/7 pendant 6 mois.',
                icon: Rocket
              }
            ].map((adv, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-lg flex gap-6"
                style={{
                  background: 'rgba(0, 212, 212, 0.05)',
                  borderLeft: `4px solid ${theme.colors.primary.electric}`
                }}
              >
                <div
                  className="p-3 rounded-lg h-fit"
                  style={{
                    background: theme.colors.primary.electric + '20',
                    color: theme.colors.primary.electric
                  }}
                >
                  <adv.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.text.primary }}>
                    {adv.title}
                  </h3>
                  <p style={{ color: theme.colors.text.secondary }}>
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== CHATBOT CTA SECTION ===== */}
      <section
        id="chatbot-section"
        className="py-20 px-6 rounded-2xl mx-6 my-20"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.electric}15, ${theme.colors.primary.electric}05)`
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
            Agent IA en Action
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8" style={{ color: theme.colors.text.secondary }}>
            Découvrez comment notre agent IA peut qualifier vos prospects et générer des rapports intelligents. 
            Commencez une conversation.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center">
            <Button
              className="px-10 py-6 text-lg font-semibold rounded-lg"
              style={{
                background: theme.colors.primary.electric,
                color: theme.colors.primary.dark
              }}
            >
              Lancer une Conversation <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm mt-6" style={{ color: theme.colors.text.muted }}>
            Aucune obligation. Aucun spam. Juste une conversation.
          </motion.p>
        </motion.div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact-section" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Parlons de Votre Transformation
          </motion.h2>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8" style={{ color: theme.colors.primary.electric }}>
                Informations de Contact
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm" style={{ color: theme.colors.text.muted }}>ADRESSE</p>
                  <p style={{ color: theme.colors.text.primary }} className="font-semibold">
                    50 Avenue des Champs Élysées<br />75008 Paris, France
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: theme.colors.text.muted }}>EMAIL</p>
                  <p style={{ color: theme.colors.primary.electric }} className="font-semibold">
                    contact@oka-tech.com
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: theme.colors.text.muted }}>TÉLÉPHONE</p>
                  <p style={{ color: theme.colors.text.primary }} className="font-semibold">
                    +33 (0) 1 XX XX XX XX
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: theme.colors.text.muted }}>HEURES DE BUREAU</p>
                  <p style={{ color: theme.colors.text.primary }} className="font-semibold">
                    Lun-Ven: 9h-18h
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="p-8 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primary.electric }}>
                Formulaire de Contact
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    borderColor: theme.colors.primary.electric + '40',
                    color: theme.colors.text.primary,
                    borderWidth: '1px'
                  }}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    borderColor: theme.colors.primary.electric + '40',
                    color: theme.colors.text.primary,
                    borderWidth: '1px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Votre entreprise"
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    borderColor: theme.colors.primary.electric + '40',
                    color: theme.colors.text.primary,
                    borderWidth: '1px'
                  }}
                />
                <textarea
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg resize-none"
                  style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    borderColor: theme.colors.primary.electric + '40',
                    color: theme.colors.text.primary,
                    borderWidth: '1px'
                  }}
                />
                <Button
                  className="w-full py-3 font-semibold rounded-lg"
                  style={{
                    background: theme.colors.primary.electric,
                    color: theme.colors.primary.dark
                  }}
                >
                  Envoyer
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
