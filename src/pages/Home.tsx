import { HeroAdvanced } from '@/components/HeroAdvanced';
import { TechStackShowcase } from '@/components/TechStackShowcase';
import { theme } from '@/styles/theme';

const Home = () => {
  return (
    <div style={{ background: theme.colors.primary.dark }}>
      {/* Hero Section - AI-Powered Digital Transformation */}
      <HeroAdvanced />

      {/* Tech Stack Showcase */}
      <TechStackShowcase />
    </div>
  );
};

export default Home;
