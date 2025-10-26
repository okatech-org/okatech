import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Code2, Database, Users, Lightbulb, Target, TrendingUp, CheckCircle } from "lucide-react";
import { useThemeStyles } from '@/hooks/useThemeStyles';

const About = () => {
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

  const specializations = [
    {
      icon: Code2,
      title: "Software Development",
      description: "Custom software solutions built with modern technologies and best practices",
    },
    {
      icon: Lightbulb,
      title: "AI Integration",
      description: "Seamless integration of AI capabilities into existing business processes",
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Expert guidance from conception to deployment and beyond",
    },
    {
      icon: Database,
      title: "Business Automation",
      description: "Streamline operations with intelligent automation solutions",
    },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We stay at the forefront of AI technology to deliver cutting-edge solutions",
    },
    {
      title: "Client Success",
      description: "Your success is our success. We're committed to measurable results",
    },
    {
      title: "Technical Excellence",
      description: "We maintain the highest standards in code quality and system architecture",
    },
    {
      title: "Transparent Communication",
      description: "Clear, honest communication throughout every stage of your project",
    },
  ];

  return (
    <div style={{ background: themeStyles.backgrounds.primary, minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
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
            style={{ color: themeStyles.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            À Propos d'OKA Tech
            <span
              className="block mt-3"
              style={{ color: theme.colors.primary.electric }}
            >
              6+ Ans d'Excellence IA
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl"
            style={{ color: themeStyles.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Fondée sur la conviction que l'IA doit être accessible et pratique pour chaque entreprise, 
            OKA Tech livre des solutions IA transformatrices depuis plus de 6 ans.
          </motion.p>
        </motion.div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-bold" style={{ color: themeStyles.text.primary }}>
                Notre Histoire
              </h2>
              <div className="space-y-4" style={{ color: themeStyles.text.secondary }}>
                <p className="leading-relaxed">
                  Depuis notre établissement à Paris, OKA Tech est à l'avant-garde de la révolution IA, 
                  aidant les entreprises à exploiter la puissance de l'intelligence artificielle pour résoudre 
                  des défis complexes et déverrouiller de nouvelles opportunités.
                </p>
                <p className="leading-relaxed">
                  Ce qui a commencé comme une passion pour rendre l'IA accessible est devenu un partenariat 
                  de confiance avec des organisations dans diverses industries, des startups aux grandes entreprises.
                </p>
                <p className="leading-relaxed">
                  Notre équipe combine une expertise technique approfondie en machine learning, traitement du langage naturel 
                  et développement full-stack avec une véritable compréhension des besoins et défis métier.
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-6"
            >
              {[
                {
                  icon: Target,
                  title: "Mission",
                  description: "Transformer les entreprises grâce à des solutions IA innovantes et accessibles"
                },
                {
                  icon: TrendingUp,
                  title: "Vision",
                  description: "Être le partenaire privilégié de la transformation numérique et IA"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-xl border"
                  style={{
                    background: themeStyles.card.background,
                    borderColor: themeStyles.card.border,
                    boxShadow: themeStyles.shadows.soft
                  }}
                >
                  <item.icon size={32} style={{ color: theme.colors.primary.electric, marginBottom: '12px' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: themeStyles.text.primary }}>
                    {item.title}
                  </h3>
                  <p style={{ color: themeStyles.text.secondary }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="py-20 px-6" style={{ background: themeStyles.backgrounds.secondary }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            style={{ color: themeStyles.text.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nos Spécialisations
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            {specializations.map((spec, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-xl border"
                style={{
                  background: themeStyles.card.background,
                  borderColor: themeStyles.card.border,
                  boxShadow: themeStyles.shadows.soft
                }}
              >
                <spec.icon size={32} style={{ color: theme.colors.primary.electric, marginBottom: '12px' }} />
                <h3 className="text-lg font-bold mb-3" style={{ color: themeStyles.text.primary }}>
                  {spec.title}
                </h3>
                <p style={{ color: themeStyles.text.secondary }} className="text-sm">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          style={{ color: themeStyles.text.primary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Nos Valeurs Fondamentales
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-xl border flex gap-4"
              style={{
                background: themeStyles.card.background,
                borderColor: themeStyles.card.border,
                boxShadow: themeStyles.shadows.soft
              }}
            >
              <CheckCircle size={24} style={{ color: theme.colors.primary.electric, flexShrink: 0 }} />
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: themeStyles.text.primary }}>
                  {value.title}
                </h3>
                <p style={{ color: themeStyles.text.secondary }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-6" style={{ background: themeStyles.backgrounds.secondary }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            style={{ color: themeStyles.text.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Notre Équipe d'Experts
          </motion.h2>

          <motion.p
            className="text-center max-w-2xl mx-auto mb-16 text-lg"
            style={{ color: themeStyles.text.secondary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Composée de développeurs, architectes IA, et consultants métier passionnés par 
            l'innovation et l'excellence technique.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default About;
