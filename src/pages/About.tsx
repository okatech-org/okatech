import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Code2, Database, Users, Lightbulb, Target, TrendingUp, CheckCircle } from "lucide-react";

const About = () => {
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
    <div style={{ background: theme.colors.primary.dark, minHeight: '100vh' }}>
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
            style={{ color: theme.colors.text.primary }}
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
            style={{ color: theme.colors.text.secondary }}
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
              <h2 className="text-4xl font-bold" style={{ color: theme.colors.text.primary }}>
                Notre Histoire
              </h2>
              <div className="space-y-4" style={{ color: theme.colors.text.secondary }}>
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
                  description: "Autonomiser les entreprises avec des solutions IA qui livrent des résultats réels et mesurables"
                },
                {
                  icon: TrendingUp,
                  title: "Vision",
                  description: "Un avenir où chaque entreprise exploite l'IA pour atteindre son plein potentiel"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-6 rounded-lg backdrop-blur-sm border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: theme.colors.primary.electric + '40',
                      borderWidth: '1px'
                    }}
                  >
                    <div
                      className="mb-4 p-3 rounded-lg inline-block"
                      style={{
                        background: theme.colors.primary.electric + '20',
                        color: theme.colors.primary.electric
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text.primary }}>
                      {item.title}
                    </h3>
                    <p style={{ color: theme.colors.text.secondary }}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SPECIALIZATIONS SECTION */}
      <section className="py-20 px-6" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: theme.colors.text.primary }}
            >
              Nos Domaines de Spécialisation
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg"
              style={{ color: theme.colors.text.secondary }}
            >
              Quatre domaines fondamentaux qui forment la base de l'implémentation IA réussie
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-lg backdrop-blur-sm border text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: theme.colors.primary.electric + '40',
                    borderWidth: '1px'
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
                    style={{
                      background: theme.colors.primary.electric + '20',
                      color: theme.colors.primary.electric
                    }}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: theme.colors.text.primary }}>
                    {spec.title}
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                    {spec.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
          >
            Nos Valeurs Fondamentales
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg"
            style={{ color: theme.colors.text.secondary }}
          >
            Les principes qui guident tout ce que nous faisons
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-lg backdrop-blur-sm border"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: theme.colors.primary.electric + '40',
                borderWidth: '1px'
              }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle size={24} style={{ color: theme.colors.primary.electric, flexShrink: 0 }} className="mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.text.primary }}>
                    {value.title}
                  </h3>
                  <p style={{ color: theme.colors.text.secondary }}>
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* COMPANY INFO SECTION */}
      <section className="py-20 px-6" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariants}
            className="p-8 rounded-lg backdrop-blur-sm border"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: theme.colors.primary.electric + '40',
              borderWidth: '1px'
            }}
          >
            <h2 className="text-2xl font-bold mb-8" style={{ color: theme.colors.text.primary }}>
              Informations sur l'Entreprise
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              {[
                { label: "Nom Légal", value: "OKA Tech SAS" },
                { label: "SIREN", value: "988 507 356" },
                { label: "Forme Juridique", value: "SAS (Société par Actions Simplifiée)" },
                { label: "Capital", value: "€1,000" },
                { label: "Adresse", value: "50 Avenue des Champs Élysées, 75008 Paris" },
                { label: "Secteur", value: "Développement Logiciel & Solutions IA" },
              ].map((info, idx) => (
                <div key={idx}>
                  <p className="text-xs mb-1" style={{ color: theme.colors.text.muted }}>
                    {info.label.toUpperCase()}
                  </p>
                  <p className="font-semibold" style={{ color: theme.colors.text.primary }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
