'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Sparkles, CheckCircle, Star, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/components/FileUpload';
import RoleSelector from '@/components/RoleSelector';
import Payment from '@/components/Payment';
import Analyzing from '@/components/Analyzing';
import Results from '@/components/Results';

export default function Home() {
  const { state } = useAppContext();

  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* Navbar Minimalist */}
      <nav style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>
            <Sparkles size={24} /> ResumeFix
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '4rem', paddingBottom: '3rem', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', padding: '0 1rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>🔥</span> Built for Indian Job Seekers (20-30 Yrs)
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Stop Applying.<br />Start <span style={{ color: 'var(--primary)' }}>Interviewing.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', marginBottom: '2rem', lineHeight: 1.6 }}>
              75% of resumes are rejected by bots. We rewrite your resume to beat the ATS, optimize it for your dream role at top Indian firms, and get you hired faster. All in 3 minutes.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16} color="var(--success)" /> TCS Aligned</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16} color="var(--success)" /> Infosys Format</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16} color="var(--success)" /> Startup Ready</div>
            </div>
          </div>

          {/* Interactive Widget */}
          <div id="interactive-widget" style={{ maxWidth: '700px', margin: '0 auto', background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {state.step === 'landing' && <FileUpload />}
                {state.step === 'upload' && <FileUpload />}
                {state.step === 'role' && <RoleSelector />}
                {state.step === 'payment' && <Payment />}
                {state.step === 'analyzing' && <Analyzing />}
                {state.step === 'results' && <Results />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '3rem 1rem', background: 'var(--muted)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Trusted by professionals hired at</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.6, fontWeight: 800, fontSize: '1.25rem' }}>
            <span>TCS</span>
            <span>INFOSYS</span>
            <span>WIPRO</span>
            <span>ZOMATO</span>
            <span>AMAZON</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 1rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Don't take our word for it.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Testimonial 1 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" />
              </div>
              <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                "I was applying to 50+ jobs a week with zero callbacks. Once I used ResumeFix, I literally got 3 interview calls the same week from Bangalore startups. Money well spent."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Rahul" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Rahul Sharma</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>Software Engineer, 24</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" />
              </div>
              <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                "The ATS optimization is no joke. I never knew my formatting was killing my chances. The generated interview questions were super on-point for my role too."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Priya" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Priya Patel</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>Data Analyst, 26</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" /> <Star size={18} fill="currentColor" />
              </div>
              <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                "Worth every rupee. As a marketing professional, I struggled to put my impact into words. The AI perfectly reframed my bullet points to show ROI."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Arjun" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Arjun K.</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>Marketing Associate, 23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Direct & Honest */}
      <section style={{ padding: '5rem 1rem', background: 'var(--muted)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>One Price. Endless Interviews.</h2>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
            We know job hunting in India is stressful. That's why we don't do sneaky subscriptions. Just pay once, secure your future.
          </p>

          <div style={{ maxWidth: '400px', margin: '0 auto', background: 'var(--card)', padding: '3rem 2rem', borderRadius: '1.5rem', border: '2px solid var(--primary)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600 }}>
              Launch Price
            </span>

            <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>₹499</div>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>Only pay when you generate.</p>

            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>Full ATS System Optimization</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>Professional Content Rewriting</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>Custom Interview Preparation PDF</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>High-Quality PDF Resume Export</span>
              </li>
            </ul>

            <button
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
              onClick={() => {
                document.getElementById('interactive-widget')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start My Free Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--muted-foreground)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '1rem' }}>
            <Sparkles size={24} /> ResumeFix
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Made for the ambitious Indian professional.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
