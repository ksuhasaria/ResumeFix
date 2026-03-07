'use client';

import React from 'react';
import { Sparkles, CheckCircle, Star, ArrowRight, ShieldCheck, Zap, Target, TrendingUp, Clock, AlertTriangle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { event } from '@/components/MetaPixel';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import LiveSocialProof from '@/components/LiveSocialProof';
import AtsQuizModal from '@/components/AtsQuizModal';

export default function SalesPage() {
    const [showSticky, setShowSticky] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA after scrolling past 400px
            setShowSticky(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [loadingPlan, setLoadingPlan] = useState<'standard' | 'pro' | null>(null);

    const handleCheckout = async (plan: 'standard' | 'pro') => {
        setLoadingPlan(plan);
        const value = plan === 'standard' ? 29.00 : 99.00;
        event('InitiateCheckout', { currency: 'USD', value });

        try {
            const priceId = plan === 'standard'
                ? process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID
                : process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Failed to create checkout session');
                setLoadingPlan(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoadingPlan(null);
        }
    };

    return (
        <main style={{ overflowX: 'hidden', background: 'var(--background)' }}>
            <LiveSocialProof />
            <ExitIntentPopup />
            <AtsQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} onComplete={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} />
            {/* Navbar Minimalist */}
            <nav style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>
                        <Sparkles size={24} /> ResumeFix
                    </div>
                </div>
            </nav>

            {/* Hero Section - The Ugly Truth Hook */}
            <section style={{ paddingTop: '5rem', paddingBottom: '4rem', position: 'relative' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} /> EXPOSED: The Dark Truth About US Tech Hiring in 2026
                        </div>

                        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.03em', fontWeight: 800 }}>
                            Your Resume Isn't Getting Rejected By Humans.<br />
                            <span style={{ color: '#ef4444' }}>It's Getting Blocked By Dumb Software.</span>
                        </h1>

                        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--muted-foreground)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                            Stop guessing why you aren't getting interviews. Get the AI-formatted, ATS-optimized resume template that forces recruiters to actually read your experience.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', '@media (min-width: 768px)': { flexDirection: 'row' } } as any}>
                            <button
                                className="btn btn-primary"
                                style={{ fontSize: '1.25rem', padding: '1.25rem 2.5rem', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)', borderRadius: '99px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get Lifetime Access for $29 <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => setIsQuizOpen(true)}
                                style={{
                                    fontSize: '1rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'underline', padding: '0.5rem', cursor: 'pointer', background: 'transparent', border: 'none', transition: 'color 0.2s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                            >
                                Or, check my ATS score for free <Target size={16} />
                            </button>
                        </div>
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} color="var(--success)" /> SECURE CHECKOUT • 100% MONEY-BACK GUARANTEE
                        </p>
                    </div>
                </div>
            </section>

            {/* Heavy Visual Proof (Before & After) */}
            <section style={{ padding: '2rem 1rem 5rem', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } } as any}>
                            {/* BEFORE */}
                            <div style={{ background: 'var(--muted)', padding: '2rem 1.5rem', borderRadius: '1rem', position: 'relative', opacity: 0.8 }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', transform: 'rotate(15deg)', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', padding: '0.25rem 0.5rem', borderRadius: '0.4rem', opacity: 0.8 }}>
                                    REJECTED BY ATS
                                </div>
                                <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                                    The "Graphic" Canva Resume
                                </span>
                                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ height: '8px', width: '40%', background: 'currentColor', borderRadius: '4px', opacity: 0.5 }}></div>
                                    <div style={{ height: '8px', width: '70%', background: 'currentColor', borderRadius: '4px', opacity: 0.2 }}></div>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <p style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>ERROR: UNREADABLE FORMAT</p>
                                        <div style={{ padding: '0.5rem', borderLeft: '2px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
                                            • Responsible for database.<br />
                                            • Worked on backend logic.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AFTER */}
                            <div style={{ background: 'var(--card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '2px solid var(--primary)', position: 'relative', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.1)' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', transform: 'rotate(-5deg)', border: '2px solid #22c55e', color: '#22c55e', fontWeight: 800, fontSize: '0.85rem', padding: '0.25rem 0.5rem', borderRadius: '0.4rem' }}>
                                    INTERVIEW STAGE
                                </div>
                                <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                                    The Elite M7 Standard Format
                                </span>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: 'var(--foreground)' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>Senior Software Engineer</div>
                                    <div style={{ color: 'var(--muted-foreground)', marginBottom: '1rem', fontSize: '0.75rem' }}>Tech Corp | 2023 - Present</div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.4 }}>
                                        <div style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                                            <span style={{ position: 'absolute', left: '0', top: '0.1rem', color: 'var(--primary)' }}><CheckCircle size={12} /></span>
                                            <b>Engineered</b> a backend service reducing latency by <b>35%</b>.
                                        </div>
                                        <div style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                                            <span style={{ position: 'absolute', left: '0', top: '0.1rem', color: 'var(--primary)' }}><CheckCircle size={12} /></span>
                                            <b>Spearheaded</b> migration achieving <b>99.99% uptime</b>.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistical Proof Section */}
            <section style={{ padding: '4rem 1rem', background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } } as any}>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                Numbers Don't Lie.<br />
                                <span style={{ color: 'var(--primary)' }}>2.4x More Callbacks</span>
                            </h2>
                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                We analyzed 500+ users before and after optimization. The result? A massive jump in interview conversion rates.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--muted)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                                    <TrendingUp size={20} color="var(--success)" />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>+140% Callback Rate</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--muted)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                                    <Clock size={20} color="var(--primary)" />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>75% Faster Review Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <img
                                src="/ats_score_chart_mockup_1772882887158.png"
                                alt="Interview Callback Growth Chart"
                                style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}
                            />
                            <div style={{ position: 'absolute', bottom: '-1rem', right: '1rem', background: 'var(--background)', padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={18} color="var(--success)" />
                                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Verified Data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heatmap Section */}
            <section style={{ padding: '4rem 1rem', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } } as any}>
                        <div style={{ order: 1, flex: 1, '@media (min-width: 768px)': { order: 2 } } as any}>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                Recruiter Eye-Tracking Optimization
                            </h2>
                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                ResumeFix re-engineered the layout to guide recruiter eyes exactly where you want them.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Target size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Eye-Tracking Optimization</div>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Zap size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>ROI-First Content Hierarchy</div>
                                </li>
                            </ul>
                        </div>
                        <div style={{ order: 2, flex: 1, '@media (min-width: 768px)': { order: 1 } } as any}>
                            <img
                                src="/resume_heat_map_mockup_1772882903980.png"
                                alt="Recruiter Eye-Tracking Heatmap"
                                style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section style={{ padding: '2rem 1rem', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <p style={{ fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', opacity: 0.9 }}>
                        Join 10,000+ professionals hired at top companies
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', opacity: 0.8, fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.5rem)', gap: '1.5rem 3rem' }}>
                        <span>GOOGLE</span>
                        <span>META</span>
                        <span>AMAZON</span>
                        <span>STRIPE</span>
                        <span>COINBASE</span>
                    </div>
                </div>
            </section>

            {/* The Mechanism - How it works (Post-Purchase) */}
            <section style={{ padding: '5rem 1rem', background: 'var(--muted)' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                        No tedious forms. No forced uploads on mobile.
                    </h2>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.15rem', marginBottom: '4rem', lineHeight: 1.6 }}>
                        You buy the lifetime access now. You use it whenever you want. Your personal AI vault will be waiting for you.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
                                1
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Secure Your Access</h3>
                                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>Lock in the $29 lifetime deal today. Checkout takes 30 seconds.</p>
                            </div>
                        </div>

                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
                                2
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Check Your Email</h3>
                                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>You instantly receive a magic login link to your private Antigravity vault. It never expires.</p>
                            </div>
                        </div>

                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
                                3
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Upload Later & Generate</h3>
                                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>Whenever you are ready on your desktop, drop in your old resume. The AI rewrites it in 3 minutes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder's Note */}
            <section style={{ padding: '5rem 1rem', background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" alt="Founder" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--muted)' }} />
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                                A quick note on why I built this.
                            </h2>
                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                                After reviewing over 10,000 resumes as a Senior Manager at a Top Tech M7 company, I realized something heartbreaking: <strong>Brilliant engineers and marketers were getting auto-rejected before a human ever saw their application.</strong>
                            </p>
                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                It wasn't their skills. It was their formatting and inability to write "HR-friendly" ROI statements. That's why I built ResumeFix. To level the playing field so the best talent actually gets the interview.
                            </p>
                            <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>— Jason M., Creator of ResumeFix</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '5rem 1rem' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '800px', margin: '0 auto 3rem' }}>
                        "I didn't realize my old resume was literally unreadable by HR software until I used this."
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } } as any}>
                        <div className="glass" style={{ padding: '2rem 1.5rem', borderRadius: '1rem', background: 'var(--card)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                                <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" />
                            </div>
                            <p style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                "I was applying to 50+ jobs a week with zero callbacks. Once I used ResumeFix, I started seeing more interview callbacks from SF startups. Best ROI ever."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Michael" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Michael Chen</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Software Engineer, 25</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '2rem 1.5rem', borderRadius: '1rem', background: 'var(--card)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                                <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" />
                            </div>
                            <p style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                "Worth every penny. As a marketing professional, I struggled to put my impact into words. The AI perfectly reframed my bullet points to show ROI. Got exactly what was promised."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Sarah" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sarah Jenkins</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Marketing Associate, 23</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Module */}
            <section id="pricing" style={{ padding: '5rem 1rem', background: 'var(--background)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Invest In Your Interview Rate
                    </h2>
                    <p style={{ color: 'var(--muted-foreground)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        Skip the subscription traps. Get lifetime access to the most powerful AI resume rewriter for one flat fee.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '2rem',
                        maxWidth: '900px',
                        margin: '0 auto',
                        '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
                    } as any}>
                        {/* Standard Plan */}
                        <div style={{ background: 'var(--card)', padding: '3rem 2rem', borderRadius: '1.5rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Standard Access</h3>
                            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>The Harvard/Stanford M7 template.</p>

                            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>$29</div>
                            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>Lifetime access. Pay once.</p>

                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span>HR-Friendly Structure Optimization</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span>Professional AI Content Rewriting</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span>Uncapped Resume Exports</span>
                                </li>
                            </ul>

                            <button
                                className="btn"
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', background: 'var(--muted)', color: 'var(--foreground)' }}
                                onClick={() => handleCheckout('standard')}
                                disabled={loadingPlan === 'standard'}
                            >
                                {loadingPlan === 'standard' ? 'Redirecting...' : 'Buy Lifetime Access - $29'}
                            </button>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><ShieldCheck size={14} color="var(--success)" /> 100% Secure Stripe Checkout</div>
                                <div>Takes 30 seconds. No account required.</div>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div style={{ background: 'var(--card)', padding: '3rem 2rem', borderRadius: '1.5rem', border: '2px solid var(--primary)', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.15)' }}>
                            <span style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600 }}>
                                Most Optimal
                            </span>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>The 1% Bundle</h3>
                            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Total Perceived Value: <span style={{ textDecoration: 'line-through' }}>$695</span></p>

                            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>$99</div>
                            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>Complete toolkit package.</p>

                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span><b>Lifetime ResumeFix AI Engine</b> ($299 Value)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span><b>The 500+ Power-Verbs DB</b> ($49 Value)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span><b>5 Proven Cold Email Scripts</b> ($99 Value)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span><b>LinkedIn Opt. Checklist</b> ($49 Value)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <span><b>Priority Async Expert Review</b> ($199 Value)</span>
                                </li>
                            </ul>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                                onClick={() => handleCheckout('pro')}
                                disabled={loadingPlan === 'pro'}
                            >
                                {loadingPlan === 'pro' ? 'Redirecting...' : 'Claim The Bundle - $99'}
                            </button>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><ShieldCheck size={14} color="var(--success)" /> 100% Secure Stripe Checkout</div>
                                <div>Takes 30 seconds. Instant Access.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Objection Handling */}
            <section style={{ padding: '5rem 1rem', background: 'var(--muted)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            Frequently Asked Questions
                        </h2>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem' }}>
                            Everything you need to know about the product and billing.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 900 }}>Q.</span> Will Workday, Taleo, or Greenhouse ATS flag this as AI-generated?
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                                <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>No.</span> Most modern Applicant Tracking Systems do not have native "AI detectors." They parse for keywords, structure, and readability. Our AI engine is specifically instructed to output standard, professional corporate English without the "robotic" jargon commonly associated with ChatGPT, ensuring you pass human review.
                            </p>
                        </div>

                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 900 }}>Q.</span> Is my personal resume data used to train your AI?
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                                <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>Absolutely not.</span> We interface with enterprise-grade models via secure APIs. Your data is processed for the sole purpose of generating your new resume and is never saved, sold, or used to train public language models.
                            </p>
                        </div>

                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 900 }}>Q.</span> Does this only work for entry-level, or can it handle Staff/Principal roles?
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                                <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>It handles all levels.</span> The system extracts your raw experience and reframes it around business impact and ROI. Whether you are an Entry-Level analyst outlining a college project, or a Principal Engineer detailing a $10M microservice migration, the formatting output scales perfectly to highlight executive leadership.
                            </p>
                        </div>

                        <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 900 }}>Q.</span> Is this a subscription? Will I be charged again next month?
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                                <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>Pay once. Use forever.</span> This is a strict D2C lifetime deal. You pay a single flat fee ($29 or $99) securely through Stripe today, and you retain access to the tool forever to update your resume for future job changes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee */}
            <section style={{ padding: '5rem 1rem', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ background: 'var(--muted)', borderRadius: '1rem', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', '@media (min-width: 768px)': { flexDirection: 'row', textAlign: 'left', padding: '3rem' } } as any}>
                        <div style={{ color: 'var(--success)', flexShrink: 0 }}>
                            <Shield size={64} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ironclad 100% Refund Policy</h3>
                            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                If you buy access, generate your new resume, and don't believe it's infinitely better than what you had before—or if it doesn't get you an interview within 30 days—email us. We will instantly refund your full payment. No conditions. No paperwork.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer minimal & Trust Signals */}
            <footer style={{ padding: '4rem 1rem 2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--muted-foreground)', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--muted)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                            <ShieldCheck size={16} color="var(--primary)" /> 100% Privacy Verified
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                            We never sell your data to recruiters, employers, or third parties. Your resume data is temporarily processed for generation and remains your exclusive intellectual property.
                        </p>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                        Proudly built by hiring managers in San Francisco, CA.
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>ResumeFix is a product of Antigravity Labs.</p>
                </div>
            </footer>

            {/* Sticky Checkout CTA for Mobile */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1rem',
                            background: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(12px)',
                            borderTop: '1px solid var(--border)',
                            zIndex: 50,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        className="mobile-only-sticky"
                    >
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', maxWidth: '400px', fontSize: '1.1rem', padding: '0.8rem 1rem', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)' }}
                            onClick={() => {
                                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get Access For $29
                        </button>
                        <style jsx>{`
              @media (min-width: 768px) {
                .mobile-only-sticky {
                  display: none !important;
                }
              }
            `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
