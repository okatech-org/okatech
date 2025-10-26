import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Users, Workflow, Brain, Lock, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const themeStyles = useThemeStyles();

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
    <div style={{ background: themeStyles.backgrounds.primary, minHeight: '100vh' }}>
      {/* ===== HERO SECTION - INSPIRED DESIGN ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-40">
          {/* Cyan gradient circle - top left */}
          <div
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.colors.primary.electric}40, transparent 70%)`
            }}
          />
          {/* Orange/Yellow gradient - bottom right */}
          <div
            className="absolute -bottom-32 right-32 w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, #FF8C4240, transparent 70%)`
            }}
          />
          {/* Purple gradient - top right */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.colors.primary.purple}30, transparent 70%)`
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10 px-6">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border"
              style={{
                background: `${theme.colors.primary.electric}15`,
                border: `1px solid ${theme.colors.primary.electric}40`
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: theme.colors.primary.electric }} />
              <span style={{ color: themeStyles.text.secondary, fontSize: '0.875rem' }}>IA Transformation</span>
            </motion.div>

            {/* Title with gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Nous comprenons votre activité
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary.electric}, #FF8C42)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  au-delà de vos pensées
                </span>
              </h1>
              <p style={{ color: themeStyles.text.secondary, fontSize: '1.125rem', lineHeight: '1.6' }}>
                OKA Tech réinvente votre entreprise avec l'IA. Solutions full-stack personnalisées qui libèrent votre équipe.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                className="px-8 py-3 rounded-xl font-medium text-base text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`,
                  boxShadow: `0 0 20px ${theme.colors.primary.electric}50`
                }}
                whileHover={{
                  boxShadow: `0 0 30px ${theme.colors.primary.electric}70`
                }}
                whileTap={{ scale: 0.95 }}
              >
                Commençons Ensemble
              </motion.button>
              <motion.button
                className="px-8 py-3 rounded-xl font-medium text-base transition-all border"
                style={{
                  color: theme.colors.primary.electric,
                  border: `1px solid ${theme.colors.primary.electric}40`,
                  background: 'transparent'
                }}
                whileHover={{
                  background: `${theme.colors.primary.electric}15`
                }}
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: `1px solid ${themeStyles.borders.light}` }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="text-3xl font-bold" style={{ color: theme.colors.primary.electric }}>6+</div>
                <div className="text-sm" style={{ color: themeStyles.text.muted }}>Ans d'expertise</div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div className="text-3xl font-bold" style={{ color: '#FF8C42' }}>50+</div>
                <div className="text-sm" style={{ color: themeStyles.text.muted }}>Projets réussis</div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <div className="text-3xl font-bold" style={{ color: theme.colors.primary.purple }}>24/7</div>
                <div className="text-sm" style={{ color: themeStyles.text.muted }}>Support</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-full hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-md">
              {/* Gradient circle background */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{
                  background: `radial-gradient(circle, ${theme.colors.primary.electric}, transparent)`
                }}
              />

              {/* Floating element 1 */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.electric}20, ${theme.colors.primary.purple}20)`,
                  border: `1px solid ${theme.colors.primary.electric}40`,
                  boxShadow: `0 0 20px ${theme.colors.primary.electric}20`
                }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Floating element 2 */}
              <motion.div
                className="absolute top-20 right-0 w-40 h-40 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.purple}20, #FF8C4220)`,
                  border: `1px solid ${theme.colors.primary.purple}40`,
                  boxShadow: `0 0 30px ${theme.colors.primary.purple}20`
                }}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Floating element 3 */}
              <motion.div
                className="absolute bottom-10 left-10 w-28 h-28 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.lime}20, ${theme.colors.primary.electric}20)`,
                  border: `1px solid ${theme.colors.primary.lime}40`,
                  boxShadow: `0 0 25px ${theme.colors.primary.lime}15`
                }}
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
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
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6" style={{ color: themeStyles.text.primary }}>
            Pourquoi choisir OKA Tech ?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl" style={{ color: themeStyles.text.secondary }}>
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
              <h3 className="text-xl font-bold mb-4" style={{ color: themeStyles.text.primary }}>
                {pillar.title}
              </h3>
              <p style={{ color: themeStyles.text.secondary }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== SOLUTIONS SECTION ===== */}
      <section className="py-20 px-6" style={{ background: themeStyles.backgrounds.secondary }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6" style={{ color: themeStyles.text.primary }}>
              Nos Solutions - En Action
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl" style={{ color: themeStyles.text.secondary }}>
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
                className="p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{
                  background: themeStyles.card.background,
                  borderColor: themeStyles.card.border,
                  boxShadow: themeStyles.shadows.soft
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
                <h3 className="text-xl font-bold mb-3" style={{ color: themeStyles.text.primary }}>
                  {solution.title}
                </h3>
                <p className="mb-6" style={{ color: themeStyles.text.secondary }}>
                  {solution.description}
                </p>
                <ul className="mb-8 space-y-2">
                  {solution.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm flex items-start gap-2" style={{ color: themeStyles.text.secondary }}>
                      <span style={{ color: theme.colors.primary.electric }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="w-full text-sm font-medium py-2 px-4 rounded-lg border transition-all"
                  style={{
                    borderColor: theme.colors.primary.electric,
                    color: theme.colors.primary.electric,
                    background: `${theme.colors.primary.electric}10`
                  }}
                  whileHover={{
                    background: `${theme.colors.primary.electric}20`,
                    boxShadow: `0 0 15px ${theme.colors.primary.electric}30`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {solution.cta}
                </motion.button>
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
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: themeStyles.text.primary }}>
            Ce qui nous rend différents
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-12" style={{ color: themeStyles.text.secondary }}>
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
                  <h3 className="text-lg font-bold mb-2" style={{ color: themeStyles.text.primary }}>
                    {adv.title}
                  </h3>
                  <p style={{ color: themeStyles.text.secondary }}>
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
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6" style={{ color: themeStyles.text.primary }}>
            Agent IA en Action
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8" style={{ color: themeStyles.text.secondary }}>
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
          <motion.p variants={itemVariants} className="text-sm mt-6" style={{ color: themeStyles.text.muted }}>
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
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: themeStyles.text.primary }}>
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
                  <p className="text-sm" style={{ color: themeStyles.text.muted }}>ADRESSE</p>
                  <p style={{ color: themeStyles.text.primary }} className="font-semibold">
                    50 Avenue des Champs Élysées<br />75008 Paris, France
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: themeStyles.text.muted }}>EMAIL</p>
                  <p style={{ color: theme.colors.primary.electric }} className="font-semibold">
                    contact@oka-tech.com
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: themeStyles.text.muted }}>TÉLÉPHONE</p>
                  <p style={{ color: themeStyles.text.primary }} className="font-semibold">
                    +33 (0) 1 XX XX XX XX
                  </p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: themeStyles.text.muted }}>HEURES DE BUREAU</p>
                  <p style={{ color: themeStyles.text.primary }} className="font-semibold">
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
                    color: themeStyles.text.primary,
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
                    color: themeStyles.text.primary,
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
                    color: themeStyles.text.primary,
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
                    color: themeStyles.text.primary,
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
