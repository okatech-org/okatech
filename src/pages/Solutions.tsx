import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Brain, Zap, Workflow, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = () => {
  const themeStyles = useThemeStyles();
  const { t } = useLanguage();

  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Automate complex business processes with intelligent agents"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimize system performance and resource utilization"
    },
    {
      icon: Workflow,
      title: "Workflow Integration",
      description: "Seamlessly integrate AI into existing workflows"
    },
  ];

  const benefits = [
    { icon: TrendingUp, title: "Growth", description: "Accelerate business growth with AI" },
    { icon: Shield, title: "Security", description: "Enterprise-grade security and compliance" },
    { icon: Zap, title: "Efficiency", description: "Increase operational efficiency by 300%" },
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
            {t('solutions.ourSolutions')}
            <span
              className="block mt-3"
              style={{ color: theme.colors.primary.electric }}
            >
              {t('solutions.subtitle')}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl"
            style={{ color: themeStyles.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            {t('solutions.startTransformation')}
          </motion.p>
        </motion.div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          style={{ color: themeStyles.text.primary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('solutions.domainExpertise')}
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-xl border"
              style={{
                background: themeStyles.card.background,
                borderColor: themeStyles.card.border,
                boxShadow: themeStyles.shadows.soft
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <solution.icon
                size={40}
                style={{
                  color: theme.colors.primary.electric,
                  marginBottom: '16px'
                }}
              />
              <h3 className="text-xl font-bold mb-3" style={{ color: themeStyles.text.primary }}>
                {solution.title}
              </h3>
              <p style={{ color: themeStyles.text.secondary }}>
                {solution.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6" style={{ background: themeStyles.backgrounds.secondary }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: themeStyles.text.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('solutions.whyChoose')}
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-xl border text-center"
                style={{
                  background: themeStyles.card.background,
                  borderColor: themeStyles.card.border,
                  boxShadow: themeStyles.shadows.soft
                }}
              >
                <benefit.icon
                  size={40}
                  style={{
                    color: theme.colors.primary.electric,
                    margin: '0 auto 16px'
                  }}
                />
                <h3 className="text-xl font-bold mb-3" style={{ color: themeStyles.text.primary }}>
                  {benefit.title}
                </h3>
                <p style={{ color: themeStyles.text.secondary }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          style={{ color: themeStyles.text.primary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('solutions.startTransformation')}
        </motion.h2>

        <motion.p
          className="text-lg mb-8"
          style={{ color: themeStyles.text.secondary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('contact.description')}
        </motion.p>

        <motion.button
          className="px-8 py-3 rounded-xl font-medium text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`,
            boxShadow: `0 0 20px ${theme.colors.primary.electric}50`
          }}
          whileHover={{
            boxShadow: `0 0 30px ${theme.colors.primary.electric}70`
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t('solutions.cta')}
        </motion.button>
      </section>
    </div>
  );
};

export default Solutions;
