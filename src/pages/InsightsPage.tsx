import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, TrendingUp, Shield, AlertTriangle, Zap, BarChart3, Briefcase, Database, LineChart } from "lucide-react";

const insights = [
  {
    title: "Volatility Clustering",
    icon: TrendingUp,
    content: "Financial markets exhibit volatility clustering where high-volatility periods are followed by high-volatility periods and low by low. The TBC-GAN captures this through its BiLSTM component which models sequential dependencies bidirectionally, preserving the temporal structure of volatility regimes.",
  },
  {
    title: "Heavy-Tail Distributions",
    icon: BarChart3,
    content: "Real financial returns have heavier tails than Gaussian distributions, meaning extreme events occur more frequently than normal distributions predict. The WGAN-GP framework with gradient penalty allows the generator to learn these tail behaviors without mode collapse, achieving a kurtosis difference of only 0.38.",
  },
  {
    title: "Mode Collapse in GANs",
    icon: AlertTriangle,
    content: "Traditional GANs suffer from mode collapse where the generator produces limited diversity of outputs. In financial time series, this would mean generating repetitive patterns. WGAN-GP addresses this by replacing the Jensen-Shannon divergence with the Wasserstein distance, providing meaningful gradients even when distributions don't overlap.",
  },
  {
    title: "Why WGAN-GP Stabilizes Training",
    icon: Shield,
    content: "The gradient penalty in WGAN-GP enforces a soft Lipschitz constraint on the discriminator, preventing it from becoming too powerful too quickly. This creates a smoother optimization landscape where the generator receives useful gradient information throughout training, avoiding the vanishing gradient problem common in standard GANs.",
  },
];

const applications = [
  { icon: Shield, title: "Risk Modeling", desc: "Generate stress scenarios for VaR and CVaR estimation" },
  { icon: Briefcase, title: "Portfolio Stress Testing", desc: "Simulate extreme market conditions for portfolio resilience" },
  { icon: Database, title: "Synthetic Dataset Generation", desc: "Create training data for ML models when real data is scarce" },
  { icon: LineChart, title: "Market Simulation", desc: "Build realistic market simulators for algorithmic trading" },
];

const InsightCard = ({ insight, index }: { insight: typeof insights[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className="glass-panel-hover overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center gap-4 text-left"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <insight.icon className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold text-foreground flex-1">{insight.title}</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
              {insight.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InsightsPage = () => (
  <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold gradient-text mb-2">Research Insights</h1>
      <p className="text-muted-foreground mb-10">Key findings and practical applications</p>
    </motion.div>

    <div className="space-y-3 mb-16">
      {insights.map((insight, i) => (
        <InsightCard key={insight.title} insight={insight} index={i} />
      ))}
    </div>

    {/* Practical Applications */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-sm font-mono text-primary tracking-wider uppercase mb-6">Practical Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {applications.map((app, i) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-panel-hover p-5 text-center cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors">
              <app.icon className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{app.title}</h3>
            <p className="text-xs text-muted-foreground">{app.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Footer */}
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="mt-20 pt-8 border-t border-border/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
        <div>
          <h3 className="text-xs font-mono text-primary uppercase mb-2">Dataset</h3>
          <p>EURO STOXX 50 Volatility Index (VSTOXX)</p>
        </div>
        <div>
          <h3 className="text-xs font-mono text-primary uppercase mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {["TensorFlow", "GANs", "Transformers", "Deep Learning"].map((t) => (
              <span key={t} className="px-2 py-1 rounded-md bg-muted text-xs">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-mono text-primary uppercase mb-2">Framework</h3>
          <p>WGAN-GP with Attention-Based Generator</p>
        </div>
      </div>
    </motion.footer>
  </div>
);

export default InsightsPage;
