import React from 'react';
import { motion } from 'framer-motion';
import { 
  Percent, 
  ShieldAlert, 
  BadgeDollarSign, 
  Files, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

const DashboardCard = ({ history }) => {
  const total = history.length;
  const approved = history.filter(item => item.prediction === 'Approved').length;
  const rejected = history.filter(item => item.prediction === 'Rejected').length;
  
  const avgAmtK = total > 0 
    ? Math.round(history.reduce((sum, i) => sum + (parseFloat(i.loan_amount) || 0), 0) / total) 
    : 0;

  const highRisk = history.filter(item => item.risk_level === 'High').length;
  const highRiskPct = total > 0 ? Math.round((highRisk / total) * 100) : 0;

  const metrics = [
    {
      title: "Total Decisions",
      value: total,
      sub: "Historical assessments",
      icon: Files,
      color: "var(--color-primary)",
      bg: "rgba(37, 99, 235, 0.12)"
    },
    {
      title: "Approved Proposals",
      value: approved,
      sub: `${total > 0 ? Math.round((approved / total) * 100) : 0}% Approval Rate`,
      icon: CheckCircle2,
      color: "var(--color-success)",
      bg: "var(--color-success-bg)"
    },
    {
      title: "Avg Requested Principal",
      value: `$${avgAmtK.toLocaleString()}K`,
      sub: "Active loan requests average",
      icon: BadgeDollarSign,
      color: "var(--color-warning)",
      bg: "var(--color-warning-bg)"
    },
    {
      title: "High Risk Ratio",
      value: `${highRiskPct}%`,
      sub: `${highRisk} High-risk applications`,
      icon: ShieldAlert,
      color: "var(--color-error)",
      bg: "var(--color-error-bg)"
    }
  ];

  return (
    <div className="dashboard-metrics-row">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="premium-dashboard-tile"
          >
            <div className="tile-icon-box" style={{ backgroundColor: m.bg, color: m.color }}>
              <Icon size={20} />
            </div>
            <div className="tile-content">
              <span className="tile-label">{m.title}</span>
              <span className="tile-value">{m.value}</span>
              <span className="tile-subtext">{m.sub}</span>
            </div>
            <div className="tile-glowing-accent" style={{ background: `linear-gradient(to right, transparent, ${m.color})` }}></div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardCard;
