import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function generateData(seqLen: number, noise: number, paths: number) {
  const data = [];
  for (let i = 0; i < seqLen; i++) {
    const t = i / seqLen;
    const real = 20 + 5 * Math.sin(t * Math.PI * 4) + 2 * Math.sin(t * Math.PI * 8) + (Math.random() - 0.5) * 2;
    let synAvg = 0;
    for (let p = 0; p < paths; p++) {
      synAvg += 20 + 5 * Math.sin(t * Math.PI * 4 + 0.3) + noise * (Math.random() - 0.5) * 4 + 1.5 * Math.sin(t * Math.PI * 7);
    }
    synAvg /= paths;
    const ar2 = 20 + 3 * Math.sin(t * Math.PI * 3.5) + (Math.random() - 0.5) * 3 + 1;
    data.push({ t: i + 1, real: +real.toFixed(2), synthetic: +synAvg.toFixed(2), ar2: +ar2.toFixed(2) });
  }
  return data;
}

const GeneratorPage = () => {
  const [seqLen, setSeqLen] = useState(50);
  const [noise, setNoise] = useState(1.5);
  const [paths, setPaths] = useState(5);
  const [generated, setGenerated] = useState(false);
  const [showReal, setShowReal] = useState(true);
  const [showSynthetic, setShowSynthetic] = useState(true);
  const [showBaseline, setShowBaseline] = useState(true);
  const [key, setKey] = useState(0);

  const data = useMemo(() => (generated ? generateData(seqLen, noise, paths) : []), [generated, seqLen, noise, paths, key]);

  const handleGenerate = () => {
    setGenerated(false);
    setTimeout(() => {
      setGenerated(true);
      setKey((k) => k + 1);
    }, 100);
  };

  return (
    <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Synthetic Data Generator</h1>
        <p className="text-muted-foreground mb-10">Simulate synthetic financial time series</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 space-y-6"
        >
          <h2 className="text-sm font-mono text-primary tracking-wider uppercase">Controls</h2>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Sequence Length: <span className="text-foreground font-mono">{seqLen}</span>
            </label>
            <Slider value={[seqLen]} onValueChange={([v]) => setSeqLen(v)} min={10} max={100} step={5} className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Noise Intensity: <span className="text-foreground font-mono">{noise.toFixed(1)}</span>
            </label>
            <Slider value={[noise * 10]} onValueChange={([v]) => setNoise(v / 10)} min={1} max={30} step={1} className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Synthetic Paths: <span className="text-foreground font-mono">{paths}</span>
            </label>
            <Slider value={[paths]} onValueChange={([v]) => setPaths(v)} min={1} max={20} step={1} className="[&_[role=slider]]:bg-neon-blue [&_[role=slider]]:border-neon-blue" />
          </div>

          <Button onClick={handleGenerate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Play className="w-4 h-4" />
            Generate Synthetic Data
          </Button>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <h3 className="text-xs font-mono text-muted-foreground uppercase">Display</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neon-blue">Real Data</span>
              <Switch checked={showReal} onCheckedChange={setShowReal} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neon-pink">TBC-GAN</span>
              <Switch checked={showSynthetic} onCheckedChange={setShowSynthetic} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neon-green">AR(2) Baseline</span>
              <Switch checked={showBaseline} onCheckedChange={setShowBaseline} />
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <h2 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">Time Series Output</h2>
          {!generated ? (
            <div className="h-80 flex items-center justify-center text-muted-foreground text-sm">
              Configure parameters and click Generate
            </div>
          ) : (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                  <XAxis dataKey="t" stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 11 }} />
                  <YAxis stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 40%, 10%)",
                      border: "1px solid hsl(222, 30%, 22%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  {showReal && (
                    <Line type="monotone" dataKey="real" name="Real VSTOXX" stroke="hsl(220, 90%, 56%)" strokeWidth={2} dot={false} animationDuration={1500} />
                  )}
                  {showSynthetic && (
                    <Line type="monotone" dataKey="synthetic" name="TBC-GAN" stroke="hsl(330, 90%, 60%)" strokeWidth={2} dot={false} animationDuration={2000} />
                  )}
                  {showBaseline && (
                    <Line type="monotone" dataKey="ar2" name="AR(2)" stroke="hsl(150, 80%, 50%)" strokeWidth={1.5} dot={false} strokeDasharray="5 5" animationDuration={2500} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GeneratorPage;
