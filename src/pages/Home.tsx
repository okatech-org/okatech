import { HeroAdvanced } from '@/components/HeroAdvanced';
import { TechStackShowcase } from '@/components/TechStackShowcase';
import { CapabilityMatrix } from '@/components/CapabilityMatrix';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import { DataVisualization } from '@/components/DataVisualization';
import { LiveCodeDemo } from '@/components/LiveCodeDemo';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { theme } from '@/styles/theme';

const Home = () => {
  return (
    <div style={{ background: theme.colors.primary.dark }}>
      {/* Hero Section */}
      <HeroAdvanced />

      {/* Tech Stack Showcase */}
      <TechStackShowcase />

      {/* Capability Matrix */}
      <CapabilityMatrix />

      {/* Performance Dashboard */}
      <PerformanceDashboard />

      {/* Data Visualization */}
      <DataVisualization />

      {/* Live Code Demo */}
      <LiveCodeDemo />

      {/* Architecture Diagram */}
      <ArchitectureDiagram />

      {/* Spacer for other sections */}
      <div style={{ height: '400px' }} />
    </div>
  );
};

export default Home;
