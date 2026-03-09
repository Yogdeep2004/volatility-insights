import { motion } from "framer-motion";
import { Database, Brain, Layers, GitBranch, Zap } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";

const pipelineSteps = [
  { icon: Database, title: "Data Preprocessing", desc: "Log transform & Z-score normalization of VSTOXX volatility data" },
  { icon: Brain, title: "Transformer Generator", desc: "Multi-head self-attention for long-range temporal dependencies" },
  { icon: Layers, title: "CNN Feature Extraction", desc: "Local volatility patterns and short-term fluctuation detection" },
  { icon: GitBranch, title: "BiLSTM Temporal Learning", desc: "Bidirectional sequential relationship modeling" },
  { icon: Zap, title: "WGAN-GP Training", desc: "Gradient penalty stabilized adversarial training" },
];

const HomePage = () => {
  return (
    <div className="relative min-h-full">
      <WaveformBackground />
      <div className="relative z-10 px-6 md:px-12 py-12 max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono text-primary tracking-wider">
            RESEARCH PROJECT
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="gradient-text">Transformer-Based Conditional GAN</span>
            <br />
            <span className="text-foreground">for Financial Time Series</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            Financial volatility modeling is difficult because markets exhibit{" "}
            <span className="text-primary">nonlinear dependencies</span>,{" "}
            <span className="text-secondary">volatility clustering</span>, and{" "}
            <span className="text-neon-pink">heavy-tailed distributions</span>.
            Traditional econometric models struggle to capture these dynamics.
          </p>
        </motion.div>

        {/* Pipeline Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-muted-foreground tracking-wider uppercase mb-6">
            Model Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel-hover p-5 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs font-mono text-primary/70 mb-1">0{i + 1}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Parameters", value: "2.4M", color: "text-primary" },
            { label: "KS Statistic", value: "0.043", color: "text-secondary" },
            { label: "Training Epochs", value: "1,000", color: "text-neon-blue" },
            { label: "Dataset", value: "VSTOXX", color: "text-neon-pink" },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel p-4 text-center">
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
