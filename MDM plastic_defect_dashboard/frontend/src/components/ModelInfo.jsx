import { Cpu, Target, Database } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

const METRICS = [
  { name: "Precision",   value: 63.73, color: "#2563eb" },
  { name: "Recall",      value: 59.59, color: "#7c3aed" },
  { name: "mAP50",       value: 63.50, color: "#16a34a" },
  { name: "mAP50-95",    value: 42.54, color: "#d97706" },
];

const COMPARISON_DATA = [
  { name: "YOLO11s Balanced",    mAP50: 60.41, fill: "#94a3b8" },
  { name: "YOLO11s WRS+Focal",   mAP50: 59.39, fill: "#94a3b8" },
  { name: "YOLO11m Targeted Aug.",mAP50: 63.50, fill: "#16a34a" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-value">mAP50: {payload[0].value.toFixed(2)}%</div>
      </div>
    );
  }
  return null;
};

export function ModelInfo() {
  return (
    <section id="model" className="section">
      <div className="ref-section-header">
        <div className="ref-section-header-main">
          <div className="ref-section-icon">
            <Cpu size={20} />
          </div>
          <div className="ref-section-text">
            <div className="ref-section-eyebrow">
              <span className="ref-section-eyebrow-dot"></span>
              BENCHMARK • EVALUATION METRICS
            </div>
            <h2 className="ref-section-title">Model Performance</h2>
            <p className="ref-section-subtitle">
              Evaluation results on the fixed test set — these are project metrics, not live prediction scores.
            </p>
          </div>
        </div>
        <div className="ref-section-aside">
          <span className="ref-section-badge">
            <Target size={13} style={{ color: "var(--accent)" }} />
            <span>YOLO11m Architecture</span>
          </span>
        </div>
      </div>

      <div className="model-layout">
        {/* Specs */}
        <div className="model-spec-card">
          <div className="model-spec-title">
            <Cpu size={15} style={{ marginRight: 8 }} />
            Specifications
          </div>
          <div className="model-specs">
            <ModelSpec label="Model"          value="YOLO11m" />
            <ModelSpec label="Image Size"     value="832 × 832 px" />
            <ModelSpec label="Classes"        value="16 defect types" />
            <ModelSpec label="Dataset"        value="Plastic Gear Surface Defects" />
            <ModelSpec label="Training"       value="Targeted rare-class augmentation" />
            <ModelSpec label="Evaluated on"   value="Fixed clean test set" />
          </div>
        </div>

        {/* Metrics */}
        <div className="model-metrics-card">
          <div className="model-spec-title">
            <Target size={15} style={{ marginRight: 8 }} />
            Evaluation Metrics
          </div>
          <div className="metrics-grid">
            {METRICS.map((m) => (
              <div key={m.name} className="metric-tile">
                <div className="metric-value" style={{ color: m.color }}>{m.value.toFixed(2)}%</div>
                <div className="metric-label">{m.name}</div>
                <div className="metric-bar-bg">
                  <div className="metric-bar-fill" style={{ width: `${m.value}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="metrics-note">
            Averaged across all 16 defect classes. These are not per-class values.
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="chart-card">
        <div className="model-spec-title">
          <Database size={15} style={{ marginRight: 8 }} />
          Model Comparison — mAP50 (%)
        </div>
        <p className="chart-subtitle">
          Comparing training strategies on the same test set. The final model (YOLO11m with targeted augmentation) achieves the best result.
        </p>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={COMPARISON_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 8 }} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={{ stroke: "#e9ecef" }} tickLine={false} />
              <YAxis domain={[55, 66]} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={63.50} stroke="#16a34a" strokeDasharray="4 4"
                label={{ value: "Best: 63.50%", fill: "#16a34a", fontSize: 11, position: "right" }} />
              <Bar dataKey="mAP50" radius={[4, 4, 0, 0]}>
                {COMPARISON_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function ModelSpec({ label, value }) {
  return (
    <div className="model-spec-row">
      <div className="model-spec-label">{label}</div>
      <div className="model-spec-value">{value}</div>
    </div>
  );
}
