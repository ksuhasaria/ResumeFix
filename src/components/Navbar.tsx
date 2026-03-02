'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
    const { setStep } = useAppContext();

    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            padding: '1rem 0',
            borderBottom: '1px solid var(--border)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div
                    onClick={() => setStep('landing')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--primary)'
                    }}
                >
                    <Sparkles size={28} />
                    <span>ResumeFix</span>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#how-it-works" style={{ fontWeight: 500, fontSize: '0.9rem' }}>How it Works</a>
                    <a href="#pricing" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Pricing</a>
                </div>

                <button className="btn btn-primary" onClick={() => setStep('upload')}>
                    Fix Now
                </button>
            </div>
        </nav>
    );
}
