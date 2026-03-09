import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const metrics = [
  { name: "KS Statistic", timeGAN: 0.089, ar2: 0.112, tbcGAN: 0.043, tooltip: "Kolmogorov-Smirnov statistic measures distributional similarity. Lower is better." },
  { name: "Skewness Diff", timeGAN: 0.34, ar2: 0.52, tbcGAN: 0.11, tooltip: "Measures how well the model captures asymmetry in return distributions." },
  { name: "Kurtosis Diff", timeGAN: 1.23, ar2: 2.01, tbcGAN: 0.38, tooltip: "Kurtosis difference measures how well the model captures heavy-tailed distributions present in financial volatility." },
  { name: "ACF MSE", timeGAN: 0.047, ar2: 0.068, tbcGAN: 0.012, tooltip: "Autocorrelation Function Mean Squared Error measures temporal dependency preservation." },
];

const barData = metrics.map((m) => ({
  name: m.name,
  TimeGAN: m.timeGAN,
  "AR(2)": m.ar2,
  "TBC-GAN": m.tbcGAN,
}));

const acfData = Array.from({ length: 20 }, (_, i) => ({
  lag: i + 1,
  real: Math.exp(-i * 0.15) * 0.8 + (Math.random() - 0.5) * 0.05,
  tbcGAN: Math.exp(-i * 0.16) * 0.78 + (Math.random() - 0.5) * 0.06,
  ar2: Math.exp(-i * 0.25) * 0.6 + (Math.random() - 0.5) * 0.08,
}));

const MetricCard = ({ metric, index }: { metric: typeof metrics[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.1 }}
    className="glass-panel-hover p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-mono text-muted-foreground uppercase">{metric.name}</span>
      <UITooltip>
        <TooltipTrigger>
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-card border-border text-foreground">
          <p className="text-xs">{metric.tooltip}</p>
        </TooltipContent>
      </UITooltip>
    </div>
    <div className="text-3xl font-bold font-mono text-primary mb-1">{metric.tbcGAN}</div>
    <div className="text-xs text-muted-foreground">
      TBC-GAN vs TimeGAN ({metric.timeGAN}) / AR(2) ({metric.ar2})
    </div>
    <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(1 - metric.tbcGAN / metric.ar2) * 100}%` }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  </motion.div>
);

const chartTooltipStyle = {
  backgroundColor: "hsl(222, 40%, 10%)",
  border: "1px solid hsl(222, 30%, 22%)",
  borderRadius: "8px",
  fontSize: "12px",
};

const MetricsPage = () => (
  <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold gradient-text mb-2">Evaluation Metrics</h1>
      <p className="text-muted-foreground mb-10">Quantitative comparison across models</p>
    </motion.div>

    {/* Metric Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {metrics.map((m, i) => (
        <MetricCard key={m.name} metric={m} index={i} />
      ))}
    </div>

    {/* Bar Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6"
      >
        <h2 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">Model Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} />
            <YAxis stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="TimeGAN" fill="hsl(220, 90%, 56%)" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="AR(2)" fill="hsl(150, 80%, 50%)" radius={[4, 4, 0, 0]} animationDuration={1800} />
            <Bar dataKey="TBC-GAN" fill="hsl(330, 90%, 60%)" radius={[4, 4, 0, 0]} animationDuration={2100} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ACF Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-6"
      >
        <h2 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">ACF Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={acfData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis dataKey="lag" stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} label={{ value: "Lag", position: "insideBottom", offset: -5, fill: "hsl(215, 20%, 55%)", fontSize: 10 }} />
            <YAxis stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="real" name="Real" stroke="hsl(220, 90%, 56%)" strokeWidth={2} dot={false} animationDuration={1500} />
            <Line type="monotone" dataKey="tbcGAN" name="TBC-GAN" stroke="hsl(330, 90%, 60%)" strokeWidth={2} dot={false} animationDuration={2000} />
            <Line type="monotone" dataKey="ar2" name="AR(2)" stroke="hsl(150, 80%, 50%)" strokeWidth={1.5} dot={false} strokeDasharray="5 5" animationDuration={2500} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Training Loss */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-panel p-6 mt-6"
    >
      <h2 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">Training Loss Curves</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={Array.from({ length: 50 }, (_, i) => ({
            epoch: (i + 1) * 20,
            genLoss: 2.5 * Math.exp(-i * 0.06) + 0.3 + (Math.random() - 0.5) * 0.1,
            discLoss: 1.8 * Math.exp(-i * 0.04) + 0.5 + (Math.random() - 0.5) * 0.08,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis dataKey="epoch" stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} label={{ value: "Epoch", position: "insideBottom", offset: -5, fill: "hsl(215, 20%, 55%)", fontSize: 10 }} />
          <YAxis stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          <Line type="monotone" dataKey="genLoss" name="Generator Loss" stroke="hsl(185, 100%, 50%)" strokeWidth={2} dot={false} animationDuration={2000} />
          <Line type="monotone" dataKey="discLoss" name="Discriminator Loss" stroke="hsl(270, 80%, 60%)" strokeWidth={2} dot={false} animationDuration={2500} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  </div>
);

export default MetricsPage;
