import { Card } from "@/components/ui/card";
import { Code2, Database, Users, Lightbulb, Target, TrendingUp } from "lucide-react";

const About = () => {
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              About <span className="gradient-text">OKA Tech</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded on the belief that AI should be accessible and practical for every business, 
              OKA Tech has been delivering transformative AI solutions for over 6 years.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Since our establishment in Paris, OKA Tech has been at the forefront of the AI revolution, 
                  helping businesses harness the power of artificial intelligence to solve complex challenges 
                  and unlock new opportunities.
                </p>
                <p>
                  What started as a passion for making AI accessible has grown into a trusted partnership with 
                  organizations across various industries, from startups to established enterprises.
                </p>
                <p>
                  Our team combines deep technical expertise in machine learning, natural language processing, 
                  and full-stack development with a genuine understanding of business needs and challenges.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Mission</h3>
                <p className="text-sm text-muted-foreground">
                  Empower businesses with AI solutions that deliver real, measurable results
                </p>
              </Card>
              <Card className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                <TrendingUp className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-semibold mb-2">Vision</h3>
                <p className="text-sm text-muted-foreground">
                  A future where every business leverages AI to reach its full potential
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Specializations</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We excel in four core areas that form the foundation of successful AI implementation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 shadow-card hover:shadow-elegant transition-smooth text-center border-2 hover:border-primary/20 group"
                >
                  <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-smooth">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{spec.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {spec.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-8 shadow-card hover:shadow-elegant transition-smooth border-2 hover:border-primary/20"
              >
                <h3 className="text-xl font-semibold mb-3 gradient-text">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 shadow-elegant border-2 border-primary/10">
            <h2 className="text-2xl font-bold mb-6">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Legal Name:</span>
                  <p className="font-medium">OKA Tech SAS</p>
                </div>
                <div>
                  <span className="text-muted-foreground">SIREN:</span>
                  <p className="font-medium">988 507 356</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Legal Form:</span>
                  <p className="font-medium">SAS (Société par Actions Simplifiée)</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Capital:</span>
                  <p className="font-medium">€1,000</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Address:</span>
                  <p className="font-medium">50 Avenue des Champs Élysées, 75008 Paris</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Industry:</span>
                  <p className="font-medium">Software Development & AI Solutions</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
