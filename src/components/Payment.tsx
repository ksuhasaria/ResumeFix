'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { CreditCard, ShieldCheck, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Payment() {
    const { setStep, markPaid } = useAppContext();
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // Simulate payment gateway
        setTimeout(() => {
            setLoading(false);
            markPaid();
            setStep('analyzing');
        }, 2000);
    };

    return (
        <section className="section-padding">
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

                    {/* Summary */}
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>One-time Upgrade</h2>
                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                            Invest once, reap the benefits forever. No monthly subscriptions.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <FeatureItem icon={<Zap size={18} color="var(--primary)" />} text="AI-Powered Resume Transformation" />
                            <FeatureItem icon={<Zap size={18} color="var(--primary)" />} text="ATS Keyword Optimization" />
                            <FeatureItem icon={<Zap size={18} color="var(--primary)" />} text="Role-Specific Interview Q&A" />
                            <FeatureItem icon={<Zap size={18} color="var(--primary)" />} text="7-Day Job Application Strategy" />
                            <FeatureItem icon={<Zap size={18} color="var(--primary)" />} text="Professional PDF Export" />
                        </div>
                    </div>

                    {/* Payment Card */}
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Amount</p>
                            <h3 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>₹499</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>Special Indian Market Launch Price</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Pay ₹499 via UPI/Card'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
                            <Lock size={14} />
                            <span>Secure Encrypted Payment</span>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                                Trusted by job seekers from:
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', opacity: 0.6, fontSize: '0.7rem', fontWeight: 700 }}>
                                <span>INFOSYS</span>
                                <span>TCS</span>
                                <span>WIPRO</span>
                                <span>AMAZON</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                {icon}
            </div>
            <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
    );
}
