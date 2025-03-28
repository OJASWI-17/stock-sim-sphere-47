
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  BarChart2,
  Shield,
  TrendingUp,
  LineChart,
  Award,
  ArrowRight,
  CheckCircle,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Real-time Charts",
    description:
      "Access interactive stock charts with technical indicators for comprehensive market analysis.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Risk-Free Trading",
    description:
      "Practice trading strategies with virtual money in a realistic market environment.",
  },
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: "Performance Tracking",
    description:
      "Monitor your trading performance with detailed analytics and insights.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Leaderboards",
    description:
      "Compete with other traders and measure your skills against the best performers.",
  },
];

const testimonials = [
  {
    content:
      "StockSim helped me develop my trading strategies without risking real money. The platform is intuitive and provides a realistic trading experience.",
    author: "Alex Thompson",
    position: "Retail Investor",
  },
  {
    content:
      "As someone new to investing, I found StockSim to be an invaluable learning tool. The real-time charts and performance tracking have significantly improved my understanding of the markets.",
    author: "Sarah Johnson",
    position: "Beginner Trader",
  },
  {
    content:
      "The competitive aspect of StockSim's leaderboards adds an exciting dimension to learning trading. It's both educational and entertaining.",
    author: "Michael Chen",
    position: "Finance Student",
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-background/80 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <div className="rounded-full bg-primary/10 p-2 animate-pulse-glow">
              <LineChart className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Stock Trading Without Financial Risk
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              StockSim provides a realistic stock market simulation platform where you can practice trading strategies, track performance, and compete with other traders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Start Trading <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">
                  Explore Demo
                </Link>
              </Button>
            </div>
            <div className="mt-10 border border-border rounded-lg p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">100K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">5M+</p>
                  <p className="text-sm text-muted-foreground">Trades Executed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Stock Symbols</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">4.8/5</p>
                  <p className="text-sm text-muted-foreground">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Trading Features</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform offers all the tools you need to become a successful trader
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="stock-card flex flex-col items-center text-center p-6"
              >
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot/Demo Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background/50 to-background border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Experience a Realistic Trading Environment
              </h2>
              <p className="text-muted-foreground">
                StockSim offers a comprehensive trading platform that mirrors real market conditions, featuring interactive charts, portfolio management, and performance analytics.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Live Market Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Practice with delayed real market data for a realistic experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Advanced Trading Tools</h4>
                    <p className="text-sm text-muted-foreground">
                      Access technical indicators, order types, and portfolio analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Detailed Performance Metrics</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your growth with comprehensive performance statistics
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link to="/chart">
                  Try Our Chart Interface <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-xl">
              <img
                src="https://via.placeholder.com/800x500/1a1a1a/3b82f6?text=StockSim+Dashboard"
                alt="StockSim Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Award className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Hear from traders who have improved their skills using our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="stock-card p-6">
                <p className="mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary/10 border-t border-primary/20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of traders improving their skills with StockSim's risk-free environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Sign Up for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">
                  Explore Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary animate-pulse-glow flex items-center justify-center">
                <span className="text-primary-foreground font-bold">SS</span>
              </div>
              <span className="text-xl font-bold tracking-tight">StockSim</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-primary">
                About Us
              </Link>
              <Link to="#" className="hover:text-primary">
                Contact
              </Link>
              <Link to="#" className="hover:text-primary">
                FAQ
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} StockSim. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
