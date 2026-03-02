'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { ArrowRight, CheckCircle, FileText, Download, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    const { setStep } = useAppContext();

    return (
        <section className="section-padding" style={{ paddingTop: '10rem' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="badge" style={{ background: 'var(--muted)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        Trusted by 10,000+ Indian Job Seekers
                    </span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', maxWidth: '900px', margin: '0 auto 1.5rem' }}>
                        Get More Interviews with an <span style={{ color: 'var(--primary)' }}>ATS-Optimized</span> Resume
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        We rewrite your resume to beat the bots and impress Indian recruiters. Professional, ATS-friendly, and role-specific.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
                        <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setStep('upload')}>
                            Fix My Resume ₹499 <ArrowRight size={20} />
                        </button>
                        <button className="btn" style={{ border: '1px solid var(--border)' }}>
                            View Sample
                        </button>
                    </div>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginTop: '4rem'
                }}>
                    <FeatureCard
                        icon={<FileText color="var(--primary)" />}
                        title="Professional Rewriting"
                        desc="ATS-compliant formatting and impactful language."
                    />
                    <FeatureCard
                        icon={<Briefcase color="var(--secondary)" />}
                        title="Role-Specific"
                        desc="Tailored for your target job in the Indian market."
                    />
                    <FeatureCard
                        icon={<CheckCircle color="var(--success)" />}
                        title="Interview Prep"
                        desc="Top Q&A based on your specific profile."
                    />
                    <FeatureCard
                        icon={<Download color="var(--accent)" />}
                        title="Job Action Plan"
                        desc="7-day strategy to get your first 10 interviews."
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>{icon}</div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{title}</h3>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{desc}</p>
        </div>
    );
}
