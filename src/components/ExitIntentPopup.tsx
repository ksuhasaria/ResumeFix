'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Mail, ArrowRight, Zap } from 'lucide-react';
import { event } from '@/components/MetaPixel';

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only run on desktop logic using mouseleave on extreme top coordinates
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                // User is likely moving mouse to address bar or close button
                triggerPopup();
            }
        };

        // Mobile logic: fast upward scrolling at the top of the page
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < lastScrollY && currentScrollY < 300 && lastScrollY - currentScrollY > 50 && !hasTriggered) {
                triggerPopup();
            }
            lastScrollY = currentScrollY;
        };

        const triggerPopup = () => {
            // Check session storage so we don't annoy returning users in the same session
            const triggeredThisSession = sessionStorage.getItem('exitIntentTriggered');
            if (!triggeredThisSession) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem('exitIntentTriggered', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasTriggered]);

    const handleCheckout = async () => {
        setLoading(true);
        event('InitiateCheckout', { currency: 'USD', value: 9.00 });

        try {
            // Hardcoding a generic standard/test price ID for the $9 downsell for now
            // The user will need to configure a specific $9 downsell price in Stripe later
            // For now, we reuse standard or mock it to avoid breaking the flow
            const priceId = process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID;

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            background: 'var(--card)',
                            border: '2px solid var(--primary)',
                            borderRadius: '1.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            position: 'relative',
                            boxShadow: '0 25px 50px rgba(79, 70, 229, 0.25)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--muted-foreground)',
                                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', zIndex: 10
                            }}
                        >
                            <X size={18} />
                        </button>

                        {/* Top Banner */}
                        <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', textAlign: 'center', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>
                            WAIT! BEFORE YOU LEAVE...
                        </div>

                        {/* Content */}
                        <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                                Don't leave empty handed. Get the core assets.
                            </h2>
                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Not ready for the full AI system? Grab our proprietary databases used by recruiters to instantly upgrade any resume or email.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', textAlign: 'left', background: 'var(--muted)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: 'var(--primary)', background: 'rgba(79, 70, 229, 0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700 }}>The 500+ Power-Verbs DB</div>
                                        <div style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Categorized by industry and impact.</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: 'var(--primary)', background: 'rgba(79, 70, 229, 0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700 }}>5 Proven Networking Scripts</div>
                                        <div style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Exactly what to say to secure a referral.</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', fontSize: '1.25rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                <Zap size={20} /> {loading ? 'Securing Access...' : 'Get The Assets For $9'}
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--muted-foreground)', fontSize: '0.9rem', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                No thanks, I'll stick to my current strategy.
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
