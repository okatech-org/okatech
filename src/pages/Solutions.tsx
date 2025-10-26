import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Workflow, TrendingUp, Brain, CheckCircle, ArrowRight } from 'lucide-react';

const Solutions = () => {
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

  const solutions = [
    {
      id: 1,
      icon: Zap,
      title: 'Qualification Automatisée des Leads',
      description: 'Notre agent IA capture, analyse et qualifie vos prospects 24/7',
      features: [
        'Conversation naturelle et contextuelle',
        'Extraction automatique des besoins',
        'Génération de rapports détaillés avec score de fit',
        'Notification instantanée à votre équipe',
        'Intégration CRM seamless',
        'Multi-langue support'
      ],
      benefits: [
        '80% réduction du temps de qualification',
        'Augmentation de 40% du taux de conversion',
        'Disponibilité 24/7',
        'Zéro coût de ressources additionnelles'
      ],
      timeline: '6-8 semaines'
    },
    {
      id: 2,
      icon: Workflow,
      title: 'Orchestration IA - Processus Réinventés',
      description: 'Automatisez vos workflows complexes avec l\'intelligence artificielle',
      features: [
        'Analyse intelligente des documents',
        'Routage automatisé des tâches',
        'Extraction de données avancée',
        'Intégration multi-systèmes',
        'Validation intelligente',
        'Audit trail complet'
      ],
      benefits: [
        'Réduction du temps de traitement jusqu\'à 80%',
        'Zéro erreur manuelle',
        'Scalabilité illimitée',
        'ROI visible en 3 mois'
      ],
      timeline: '8-12 semaines'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Analytics & Dashboard Intelligent',
      description: 'Visualisez vos données et prenez des décisions éclairées avec l\'IA',
      features: [
        'Tableaux de bord personnalisés',
        'Analyses prédictives en temps réel',
        'Recommandations automatisées',
        'Export et reporting avancé',
        'Alertes intelligentes',
        'API complète pour intégration'
      ],
      benefits: [
        'Insights exploitables en secondes',
        'Réduction des erreurs de 90%',
        'Meilleure allocation des ressources',
        'Décisions data-driven'
      ],
      timeline: '7-10 semaines'
    }
  ];

  return (
    <div style={{ background: theme.colors.primary.dark, minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
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
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Nos Solutions IA
            <span
              className="block mt-3"
              style={{ color: theme.colors.primary.electric }}
            >
              Transformez Votre Entreprise
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8"
            style={{ color: theme.colors.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Des solutions IA adaptées à vos besoins spécifiques, conçues pour automatiser, 
            accélérer et transformer votre activité.
          </motion.p>
        </motion.div>
      </section>

      {/* SOLUTIONS SHOWCASE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-20"
        >
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={solution.id}
                variants={itemVariants}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Content */}
                <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        background: theme.colors.primary.electric + '20',
                        color: theme.colors.primary.electric
                      }}
                    >
                      <Icon size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold" style={{ color: theme.colors.text.primary }}>
                        {solution.title}
                      </h2>
                      <p className="text-sm" style={{ color: theme.colors.primary.electric }}>
                        Timeline: {solution.timeline}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg mb-8" style={{ color: theme.colors.text.secondary }}>
                    {solution.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="font-bold mb-4" style={{ color: theme.colors.text.primary }}>
                      Fonctionnalités Clés
                    </h3>
                    <ul className="space-y-3">
                      {solution.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-3" style={{ color: theme.colors.text.secondary }}>
                          <CheckCircle size={20} style={{ color: theme.colors.primary.electric, flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-4" style={{ color: theme.colors.text.primary }}>
                      Bénéfices
                    </h3>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-center gap-2" style={{ color: theme.colors.primary.electric }}>
                          <span className="w-2 h-2 rounded-full" style={{ background: theme.colors.primary.electric }} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="px-8 py-6 text-lg font-semibold rounded-lg"
                    style={{
                      background: theme.colors.primary.electric,
                      color: theme.colors.primary.dark
                    }}
                  >
                    En Savoir Plus <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>

                {/* Visual */}
                <motion.div
                  className={isEven ? 'md:order-2' : 'md:order-1'}
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="p-8 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary.electric}15, ${theme.colors.primary.electric}05)`,
                      border: `1px solid ${theme.colors.primary.electric}40`
                    }}
                  >
                    <div className="aspect-video rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 212, 0.1)' }}>
                      <Icon size={80} style={{ color: theme.colors.primary.electric + '40' }} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
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
              Pourquoi nos Solutions?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl" style={{ color: theme.colors.text.secondary }}>
              Ce qui nous rend différents
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
                title: 'IA Adaptée à Votre Métier',
                description: 'Nous customisons chaque solution à vos processus et besoins spécifiques, pas du générique.'
              },
              {
                icon: Zap,
                title: 'Implémentation Rapide',
                description: 'De 6 à 17 semaines pour une solution complète. Time-to-market optimisé.'
              },
              {
                icon: TrendingUp,
                title: 'ROI Garanti',
                description: 'Résultats mesurables dès les premiers mois. Support 24/7 pendant 6 mois.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-lg backdrop-blur-sm border"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: theme.colors.primary.electric + '40',
                  borderWidth: '1px'
                }}
              >
                <div
                  className="mb-4 inline-block p-3 rounded-lg"
                  style={{
                    background: theme.colors.primary.electric + '20',
                    color: theme.colors.primary.electric
                  }}
                >
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
                  {item.title}
                </h3>
                <p style={{ color: theme.colors.text.secondary }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6" style={{ color: theme.colors.text.primary }}>
            Prêt à Transformer Votre Entreprise?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8" style={{ color: theme.colors.text.secondary }}>
            Contactez nos experts pour discuter de la solution IA adaptée à vos besoins.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
            <Button
              className="px-8 py-6 text-lg font-semibold rounded-lg"
              style={{
                background: theme.colors.primary.electric,
                color: theme.colors.primary.dark
              }}
            >
              Planifier une Consultation
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Solutions;
