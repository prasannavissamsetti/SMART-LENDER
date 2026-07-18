import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  Database, 
  MessageSquareCode, 
  Volume2, 
  Sliders, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Landmark,
  Bot,
  X,
  Play,
  CheckCircle,
  FileSignature
} from 'lucide-react';

const Home = () => {
  const [showWatchDemo, setShowWatchDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const featureCards = [
    {
      icon: Cpu,
      title: "AI Prediction",
      desc: "Instant assessment mapping credit history and asset profiles using validated XGBoost classifiers."
    },
    {
      icon: ShieldCheck,
      title: "Risk Analysis",
      desc: "Detailed underwriting audit breakdown with color-coded risk flags (Low, Medium, High)."
    },
    {
      icon: TrendingUp,
      title: "Credit Intelligence",
      desc: "Automated verification checklists scoring applicant repayment ratios against safety boundaries."
    },
    {
      icon: MessageSquareCode,
      title: "AI Chat Assistant",
      desc: "Floating 24/7 financial assistant resolving loan inquiries, calculations, and explanations."
    },
    {
      icon: Volume2,
      title: "Voice Assistant",
      desc: "Speech-to-Text and Synthesis loops translating voice prompts into native speech replies."
    },
    {
      icon: Sliders,
      title: "Loan Simulator",
      desc: "Dynamic what-if calculations detailing monthly installment loads and income requirements."
    },
    {
      icon: FileText,
      title: "Eligibility Report",
      desc: "Downloadable audit certificates summarizing friction zones and action checklists as PDF files."
    },
    {
      icon: Landmark,
      title: "Bank Comparison",
      desc: "Underwriting evaluation tracking lending offers and credit bureau standards."
    }
  ];

  const demoSteps = [
    {
      title: "1. Fill Underwriting Parameters",
      desc: "Provide monthly applicant revenues, repayment durations, and bureau histories inside step categories.",
      element: (
        <div className="demo-step-preview">
          <div className="preview-inputs-mock">
            <div className="mock-input"><span>Income:</span> <strong>$6,400 / mo</strong></div>
            <div className="mock-input"><span>Loan:</span> <strong>$150,000</strong></div>
            <div className="mock-input"><span>History:</span> <strong>Clean ✓</strong></div>
          </div>
        </div>
      )
    },
    {
      title: "2. AI Risk Classifications",
      desc: "Smart Lender interrogates the pre-trained XGBoost classifications, mapping low/high risk ratios.",
      element: (
        <div className="demo-step-preview text-center">
          <div className="preview-gauge-mock">
            <span className="mock-pct text-success">95.4%</span>
            <span className="mock-lbl">Approved Decision</span>
          </div>
        </div>
      )
    },
    {
      title: "3. digital Contract Signature",
      desc: "Borrowers drawing coordinates locks the agreement, auto-generating a printable PDF terms sheet.",
      element: (
        <div className="demo-step-preview text-center">
          <div className="mock-signature-line">
            <span className="cursive-mock-sig">Smart Officer</span>
            <span className="sig-desc">Borrower Contract Signed</span>
          </div>
        </div>
      )
    },
    {
      title: "4. Multilingual Assist Dialogues",
      desc: "Toggling language selector instantly updates chatbot translations, FAQ checklists, and STT accent inputs.",
      element: (
        <div className="demo-step-preview">
          <div className="mock-chat-bubble">
            <span className="chat-avatar-mock">AI</span>
            <p>భాష తెలుగులోకి మార్చబడింది. నేను మీకు ఎలా సహాయం చేయగలను?</p>
          </div>
        </div>
      )
    }
  ];

  const handleNextDemo = () => {
    setDemoStep((prev) => (prev + 1) % demoSteps.length);
  };

  const handlePrevDemo = () => {
    setDemoStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="home-landing-container"
    >
      {/* 1. Hero Landing Section */}
      <section className="hero-landing-section">
        <div className="hero-landing-grid">
          
          {/* Left Text Block */}
          <motion.div variants={itemVariants} className="hero-text-block">
            <div className="hero-pill-badge">
              <Bot size={14} className="text-primary animate-pulse" />
              <span>Next-Gen Banking Underwriting</span>
            </div>
            
            <h1 className="hero-heading">
              AI-Powered Smart Loan <br />
              <span className="gradient-text">Decision Platform</span>
            </h1>
            
            <p className="hero-subtext">
              Predict loan eligibility, understand financial risk, improve approval chances, and receive AI-powered guidance in seconds.
            </p>
            
            <div className="hero-action-buttons">
              <Link to="/predict" className="btn btn-primary-gradient">
                Apply for Loan
                <ArrowRight size={18} />
              </Link>
              {/* Linked directly to Predict with demo parameters populated */}
              <Link to="/predict?demo=true" className="btn btn-secondary-outline">
                Try Demo
              </Link>
              <button 
                onClick={() => {
                  setDemoStep(0);
                  setShowWatchDemo(true);
                }} 
                className="btn btn-tertiary-link"
              >
                Watch AI Demo
              </button>
            </div>
          </motion.div>

          {/* Right Vector Illustration / Animation Card */}
          <motion.div 
            variants={itemVariants} 
            className="hero-media-block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="ai-animation-card">
              <div className="animation-glow-bubble"></div>
              
              {/* Virtual AI Banker Badge */}
              <div className="ai-banker-badge">
                <div className="online-dot"></div>
                <Bot size={18} className="text-primary" />
                <span>AI Banker Online</span>
              </div>

              {/* Bank Graphic Illustration */}
              <div className="vector-bank-graphic">
                <div className="graphic-bar-chart">
                  <div className="bar bar-1 animate-grow-bar" style={{ height: '40%' }}></div>
                  <div className="bar bar-2 animate-grow-bar" style={{ height: '70%' }}></div>
                  <div className="bar bar-3 animate-grow-bar" style={{ height: '55%' }}></div>
                  <div className="bar bar-4 animate-grow-bar" style={{ height: '90%' }}></div>
                </div>
                
                <div className="graphic-metrics-circle">
                  <span className="metrics-pct">95.4%</span>
                  <span className="metrics-lbl">AUC SCORE</span>
                </div>
              </div>

              <div className="assistant-greeting-bubble">
                <p>Hello! Need assistance with credit metrics? Ask me anything below.</p>
                <span className="bubble-arrow"></span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Global Statistics Bar */}
      <section className="stats-landing-bar">
        <div className="stats-landing-grid">
          <div className="stat-col">
            <span className="stat-number gradient-text">95%</span>
            <span className="stat-label">Prediction Accuracy</span>
          </div>
          <div className="stat-col">
            <span className="stat-number gradient-text">50,000+</span>
            <span className="stat-label">Applications Analysed</span>
          </div>
          <div className="stat-col">
            <span className="stat-number gradient-text">10+</span>
            <span className="stat-label">Risk Factors Checked</span>
          </div>
          <div className="stat-col">
            <span className="stat-number gradient-text">24/7</span>
            <span className="stat-label">AI Assistant Active</span>
          </div>
        </div>
      </section>

      {/* 3. Capabilities / Features section */}
      <section className="features-landing-section">
        <div className="section-header-centered">
          <h2 className="section-title">Engine Capabilities & FinTech Modules</h2>
          <p className="section-subtitle">
            Leverage state-of-the-art predictive classifiers and conversational layers to automate decision auditing.
          </p>
        </div>

        <div className="features-modern-grid">
          {featureCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="feature-card-modern"
              >
                <div className="card-icon-wrapper">
                  <IconComponent size={22} />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <div className="card-hover-border"></div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Watch Demo Walkthrough Modal */}
      <AnimatePresence>
        {showWatchDemo && (
          <div className="signature-modal-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="signature-modal-box demo-walkthrough-modal"
            >
              <div className="signature-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Play size={16} className="text-primary animate-pulse" />
                  <h3 style={{ margin: 0 }}>Smart Lender AI Walkthrough</h3>
                </div>
                <button onClick={() => setShowWatchDemo(false)} className="btn-close-modal">
                  <X size={16} />
                </button>
              </div>

              {/* Steps timeline indicator dots */}
              <div className="demo-timeline-dots">
                {demoSteps.map((_, i) => (
                  <span 
                    key={i} 
                    className={`timeline-dot ${i === demoStep ? 'active' : ''}`}
                    onClick={() => setDemoStep(i)}
                  />
                ))}
              </div>

              {/* Render step details */}
              <div className="demo-step-body">
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {demoSteps[demoStep].title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {demoSteps[demoStep].desc}
                </p>

                {/* Render preview frame */}
                <div className="demo-preview-frame">
                  {demoSteps[demoStep].element}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="signature-modal-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={handlePrevDemo} className="btn btn-clear-sig">
                  Previous
                </button>
                <button type="button" onClick={handleNextDemo} className="btn btn-save-sig">
                  Next Step
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
