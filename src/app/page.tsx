'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import RoleSelector from '@/components/RoleSelector';
import Payment from '@/components/Payment';
import Analyzing from '@/components/Analyzing';
import Results from '@/components/Results';

export default function Home() {
  const { state } = useAppContext();

  return (
    <main>
      <Navbar />

      {state.step === 'landing' && (
        <>
          <Hero />
          <FeaturesSection />
          <PricingSection />
        </>
      )}

      {state.step === 'upload' && <FileUpload />}
      {state.step === 'role' && <RoleSelector />}
      {state.step === 'payment' && <Payment />}
      {state.step === 'analyzing' && <Analyzing />}
      {state.step === 'results' && <Results />}

      <Footer />
    </main>
  );
}

function FeaturesSection() {
  return (
    <section id="how-it-works" className="section-padding" style={{ background: 'var(--muted)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Why Choose ResumeFix?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>ATS-First Approach</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>75% of resumes are rejected by bots before a human sees them. We ensure yours gets through.</p>
          </div>
          <div style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Indian Market Context</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>Tailored for top Indian firms like TCS, Infosys, and high-growth startups in Bangalore & Gurgaon.</p>
          </div>
          <div style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Instant Results</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>No waiting for days. Get your optimized resume, interview questions, and action plan in minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { setStep } = useAppContext();

  return (
    <section id="pricing" className="section-padding">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Simple, Transparent Pricing</h2>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '3rem',
          borderRadius: 'var(--radius)',
          border: '2px solid var(--primary)',
          position: 'relative'
        }}>
          <span className="badge" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white' }}>Most Popular</span>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pro Fix</h3>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>₹499</div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>One-time payment</p>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2.5rem' }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>✅ Fully Rewritten Resume</li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>✅ ATS Score Optimization</li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>✅ 20+ Interview Q&A</li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>✅ 7-Day Application Plan</li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setStep('upload')}>Get Started Now</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', background: 'var(--background)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)' }}>ResumeFix</div>
        <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
          © 2026 ResumeFix. Built for the Indian Job Market.
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
