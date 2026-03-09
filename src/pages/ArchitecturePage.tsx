import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const tooltips: Record<string, string> = {
  "Input Data": "Raw EURO STOXX 50 Volatility Index (VSTOXX) daily closing prices.",
  "Log Transform": "Applies natural logarithm to stabilize variance and reduce skewness.",
  "Z-Score Normalization": "Standardizes features to zero mean and unit variance for stable training.",
  "Lagged Sequences": "Creates sliding windows of past observations as temporal context.",
  "Generator": "Produces synthetic time series from random noise + conditional inputs.",
  "Discriminator": "Evaluates whether a given sequence is real or synthetically generated.",
  "Synthetic Time Series": "The final output — realistic financial volatility sequences.",
  "Transformer Encoder": "Captures long-range temporal dependencies using multi-head self-attention.",
  "Bidirectional LSTM": "Models bidirectional sequential relationships in financial time series.",
  "CNN Feature Extractor": "Extracts local volatility patterns and short-term fluctuations.",
  "Synthetic Output": "Generated sequence that mimics real volatility distributions.",
  "CNN": "Convolutional layers for local feature extraction from time series input.",
  "BiLSTM": "Bidirectional LSTM for sequential pattern recognition.",
  "Real vs Fake Score": "Wasserstein distance estimate — no sigmoid, enables stable training.",
};

const FlowBlock = ({ label, className = "", delay = 0 }: { label: string; className?: string; delay?: number }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className={`glass-panel-hover px-5 py-3 text-sm font-medium text-center cursor-pointer flex items-center justify-center gap-2 ${className}`}
      >
        {label}
        <Info className="w-3 h-3 text-muted-foreground" />
      </motion.div>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs bg-card border-border text-foreground">
      <p className="text-xs">{tooltips[label] || label}</p>
    </TooltipContent>
  </Tooltip>
);

const FlowArrow = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ opacity: 1, scaleY: 1 }}
    transition={{ delay, duration: 0.2 }}
    className="flex justify-center"
  >
    <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-primary/20 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary/60" />
    </div>
  </motion.div>
);

const ExpandableCard = ({
  title,
  items,
  color,
  delay,
}: {
  title: string;
  items: string[];
  color: string;
  delay: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-panel overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full px-5 py-4 flex items-center justify-between text-left border-l-2 ${color}`}
      >
        <span className="font-semibold text-foreground">{title}</span>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-4 space-y-2">
          {items.map((item, i) => (
            <div key={item} className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="glass-panel px-4 py-2 text-xs font-mono text-muted-foreground w-full text-center cursor-pointer hover:text-foreground transition-colors">
                    {item}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-card border-border text-foreground">
                  <p className="text-xs">{tooltips[item] || item}</p>
                </TooltipContent>
              </Tooltip>
              {i < items.length - 1 && (
                <div className="w-px h-4 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArchitecturePage = () => {
  const pipeline = [
    "Input Data",
    "Log Transform",
    "Z-Score Normalization",
    "Lagged Sequences",
    "Generator",
    "Discriminator",
    "Synthetic Time Series",
  ];

  return (
    <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Model Architecture</h1>
        <p className="text-muted-foreground mb-10">Interactive pipeline diagram with component details</p>
      </motion.div>

      {/* Main Pipeline */}
      <div className="flex flex-col items-center mb-16">
        {pipeline.map((step, i) => (
          <div key={step} className="flex flex-col items-center w-full max-w-xs">
            <FlowBlock
              label={step}
              delay={0.1 + i * 0.08}
              className={i === 4 ? "border-primary/40 neon-glow-cyan" : i === 5 ? "border-secondary/40 neon-glow-purple" : ""}
            />
            {i < pipeline.length - 1 && <FlowArrow delay={0.15 + i * 0.08} />}
          </div>
        ))}
      </div>

      {/* Expandable Internals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpandableCard
          title="Generator Internals"
          items={["Transformer Encoder", "Bidirectional LSTM", "CNN Feature Extractor", "Synthetic Output"]}
          color="border-primary"
          delay={0.8}
        />
        <ExpandableCard
          title="Discriminator Internals"
          items={["CNN", "BiLSTM", "Real vs Fake Score"]}
          color="border-secondary"
          delay={0.9}
        />
      </div>
    </div>
  );
};

export default ArchitecturePage;
