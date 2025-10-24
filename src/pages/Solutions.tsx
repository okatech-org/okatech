import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Brain, 
  Code, 
  Workflow, 
  MessageSquare, 
  Sparkles,
  CheckCircle2,
  ArrowRight 
} from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Bot,
      title: "Custom AI Chatbots",
      description: "Intelligent conversational agents tailored to your business needs",
      features: [
        "Natural language understanding",
        "Multi-channel deployment",
        "24/7 customer support automation",
        "Integration with existing systems",
      ],
      benefits: "Reduce support costs by 60% while improving customer satisfaction",
    },
    {
      icon: Brain,
      title: "Advanced Prompt Engineering",
      description: "Optimize AI performance for your specific use cases",
      features: [
        "Custom prompt optimization",
        "Model fine-tuning",
        "Performance benchmarking",
        "Continuous improvement",
      ],
      benefits: "Achieve up to 3x better results from your AI systems",
    },
    {
      icon: Code,
      title: "Full-Stack AI Implementation",
      description: "End-to-end AI solution development and deployment",
      features: [
        "Architecture design",
        "Backend development",
        "Frontend integration",
        "Cloud deployment",
      ],
      benefits: "Complete, production-ready AI systems in weeks, not months",
    },
    {
      icon: Workflow,
      title: "Business Process Automation",
      description: "Streamline operations with intelligent automation",
      features: [
        "Workflow analysis",
        "Automation strategy",
        "Implementation",
        "Monitoring & optimization",
      ],
      benefits: "Save 20+ hours per week on repetitive tasks",
    },
  ];

  const caseStudies = [
    {
      industry: "E-commerce",
      challenge: "High customer support volume overwhelming the team",
      solution: "Implemented AI chatbot handling 80% of common queries",
      result: "70% reduction in support tickets, 45% cost savings",
    },
    {
      industry: "Financial Services",
      challenge: "Manual document processing taking weeks",
      solution: "Deployed AI-powered document analysis system",
      result: "95% faster processing, 99.2% accuracy",
    },
    {
      industry: "Healthcare",
      challenge: "Patient appointment scheduling inefficiencies",
      solution: "Created intelligent scheduling assistant",
      result: "50% reduction in no-shows, improved patient satisfaction",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              AI <span className="gradient-text">Solutions</span> That Deliver
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From custom chatbots to complete AI system implementation, 
              we provide solutions that drive measurable business results.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card 
                  key={index} 
                  className="p-8 shadow-card hover:shadow-elegant transition-smooth border-2 hover:border-primary/20 group"
                >
                  <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-smooth">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-start gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{solution.benefits}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from real clients across various industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-card hover:shadow-elegant transition-smooth border-2 hover:border-primary/20"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  {study.industry}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      Challenge
                    </h4>
                    <p className="text-sm font-medium">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      Solution
                    </h4>
                    <p className="text-sm">{study.solution}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs uppercase tracking-wide text-primary mb-2">
                      Result
                    </h4>
                    <p className="text-sm font-semibold gradient-text">{study.result}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-16 shadow-elegant border-2 border-primary/10 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Discuss Your <span className="gradient-text">AI Needs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Every business is unique. Our intelligent consultation system will analyze your 
              specific challenges and recommend the perfect AI solution for you.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Start Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
