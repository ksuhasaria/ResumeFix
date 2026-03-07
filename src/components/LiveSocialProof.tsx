'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, CheckCircle2 } from 'lucide-react';

const NOTIFICATIONS = [
    { name: 'John D.', location: 'Austin, TX', role: 'Software Engineer', company: 'Google' },
    { name: 'Sarah M.', location: 'San Francisco, CA', role: 'Product Manager', company: 'Meta' },
    { name: 'David L.', location: 'Seattle, WA', role: 'Data Scientist', company: 'Amazon' },
    { name: 'Emily R.', location: 'New York, NY', role: 'Marketing Manager', company: 'Stripe' },
    { name: 'Michael C.', location: 'Chicago, IL', role: 'UX Designer', company: 'Coinbase' },
];

export default function LiveSocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial delay before showing first notification
        const initialDelay = setTimeout(() => {
            setIsVisible(true);
        }, 12000); // 12 seconds in

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        let hideTimer: NodeJS.Timeout;
        let nextTimer: NodeJS.Timeout;

        if (isVisible) {
            // Hide after 5 seconds
            hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        } else if (currentIndex < NOTIFICATIONS.length - 1) {
            // Show next notification after a random delay between 15-30 seconds
            const randomDelay = Math.floor(Math.random() * 15000) + 15000;
            nextTimer = setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % NOTIFICATIONS.length);
                setIsVisible(true);
            }, randomDelay);
        } else {
            // Loop back after a longer delay
            nextTimer = setTimeout(() => {
                setCurrentIndex(0);
                setIsVisible(true);
            }, 35000);
        }

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, [isVisible, currentIndex]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '2rem',
                        zIndex: 9999,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '1rem',
                        padding: '1rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        maxWidth: '320px',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}
                    className="social-proof-toast"
                >
                    <div style={{
                        background: 'var(--success)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: '0.1rem' }}>
                            Just secured an interview at <strong style={{ color: 'var(--foreground)' }}>{NOTIFICATIONS[currentIndex].company}</strong>
                        </p>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                            {NOTIFICATIONS[currentIndex].name} • <span style={{ color: 'var(--primary)' }}>{NOTIFICATIONS[currentIndex].role}</span>
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                            <MapPin size={10} /> {NOTIFICATIONS[currentIndex].location}
                        </p>
                    </div>
                    <style jsx>{`
            @media (max-width: 768px) {
              .social-proof-toast {
                top: 1rem !important; /* Move to top on mobile */
                bottom: auto !important;
                left: 1rem !important;
                right: 1rem !important;
                max-width: none !important;
              }
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
