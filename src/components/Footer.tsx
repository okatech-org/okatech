import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const footerSections = [
    {
      title: "Produit",
      links: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Solutions", path: "/solutions" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "AI Implementation" },
        { label: "Custom Chatbots" },
        { label: "Prompt Engineering" },
        { label: "Business Automation" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation" },
        { label: "Blog" },
        { label: "FAQ" },
        { label: "Support" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      className="relative border-t"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.primary.dark} 0%, rgba(0,0,0,0.98) 100%)`,
        borderColor: `${theme.colors.primary.electric}20`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary.electric}, ${theme.colors.primary.purple})`,
                  boxShadow: `0 0 20px ${theme.colors.primary.electric}40`,
                }}
                whileHover={{ scale: 1.1 }}
              >
                OT
              </motion.div>
              <span
                className="text-lg font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                OKA Tech
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: theme.colors.text.secondary }}
            >
              Solutions IA full-stack pour transformer votre entreprise. Excellence
              technologique et expertise métier.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: `${theme.colors.primary.electric}15`,
                      color: theme.colors.primary.electric,
                      border: `1px solid ${theme.colors.primary.electric}40`,
                    }}
                    whileHover={{
                      background: `${theme.colors.primary.electric}25`,
                      scale: 1.1,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-4">
              <h4
                className="font-semibold text-base"
                style={{ color: theme.colors.text.primary }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={`${section.title}-${linkIndex}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-sm transition-all inline-flex items-center gap-1 group"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        {link.label}
                        <motion.span
                          className="w-1 h-1 rounded-full"
                          style={{
                            background: theme.colors.primary.electric,
                            opacity: 0,
                          }}
                          whileHover={{ opacity: 1 }}
                        />
                      </Link>
                    ) : (
                      <span
                        className="text-sm"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        {link.label}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4
              className="font-semibold text-base"
              style={{ color: theme.colors.text.primary }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=50+Avenue+des+Champs+Élysées,+75008+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="mt-1 flex-shrink-0"
                  style={{ color: theme.colors.primary.electric }}
                >
                  <MapPin size={18} />
                </motion.div>
                <span
                  className="text-sm leading-relaxed transition-colors"
                  style={{ color: theme.colors.text.secondary }}
                >
                  50 Avenue des Champs Élysées<br />
                  75008 Paris, France
                </span>
              </a>

              <a
                href="mailto:info@oka-tech.fr"
                className="flex items-center gap-3 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex-shrink-0"
                  style={{ color: theme.colors.primary.electric }}
                >
                  <Mail size={18} />
                </motion.div>
                <span
                  className="text-sm transition-colors"
                  style={{ color: theme.colors.text.secondary }}
                >
                  info@oka-tech.fr
                </span>
              </a>

              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex-shrink-0"
                  style={{ color: theme.colors.primary.electric }}
                >
                  <Phone size={18} />
                </motion.div>
                <span
                  className="text-sm"
                  style={{ color: theme.colors.text.secondary }}
                >
                  +33 (0) 1 XX XX XX XX
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.colors.primary.electric}40, transparent)`,
            transformOrigin: "center",
          }}
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm"
        >
          <p style={{ color: theme.colors.text.secondary }}>
            © {currentYear} OKA Tech. All rights reserved. SIREN: 988 507 356
          </p>

          <div className="flex items-center gap-6">
            <motion.a
              href="#"
              className="transition-all"
              style={{ color: theme.colors.text.secondary }}
              whileHover={{
                color: theme.colors.primary.electric,
                scale: 1.05,
              }}
            >
              Privacy Policy
            </motion.a>
            <div
              className="w-px h-4"
              style={{ background: `${theme.colors.primary.electric}30` }}
            />
            <motion.a
              href="#"
              className="transition-all"
              style={{ color: theme.colors.text.secondary }}
              whileHover={{
                color: theme.colors.primary.electric,
                scale: 1.05,
              }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${theme.colors.primary.electric}, transparent)`,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
