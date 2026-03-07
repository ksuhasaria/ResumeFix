'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { event } from '@/components/MetaPixel';

function SuccessContent() {
    const searchParams = useSearchParams();
    const [hasFired, setHasFired] = useState(false);

    const plan = searchParams.get('plan');
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // Only fire if plan is present
        if (plan && !hasFired) {
            const value = plan === 'pro' ? 99.00 : 29.00;

            // Log attempt
            console.log(`⌛ Attempting to track Purchase in 1s... Plan: ${plan}, Value: $${value}`);

            // Small delay to ensure the Meta Pixel script is fully initialized and ready to receive events
            const timer = setTimeout(() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    event('Purchase', {
                        currency: 'USD',
                        value: value,
                        content_name: `ResumeFix ${plan.charAt(0).toUpperCase() + plan.slice(1)} Access`,
                        content_type: 'product'
                    });
                    setHasFired(true);
                    console.log(`✅ Purchase event sent to Meta. Value: $${value}`);
                } else {
                    console.error('❌ Meta Pixel (fbq) not found even after delay.');
                }
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [plan, hasFired]);

    const manualTrigger = () => {
        const value = plan === 'pro' ? 99.00 : 29.00;
        event('Purchase', {
            currency: 'USD',
            value: value,
            content_name: `ResumeFix Manual Test`,
            content_type: 'product'
        });
        alert('Purchase event triggered manually. Check your Pixel Helper now!');
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
            <nav style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>
                        <Sparkles size={24} /> ResumeFix
                    </div>
                </div>
            </nav>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
                <div style={{ background: 'var(--card)', padding: '4rem 2rem', borderRadius: '1.5rem', border: '1px solid var(--border)', textAlign: 'center', maxWidth: '600px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--success)' }}>
                        <CheckCircle size={80} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Payment Successful.
                    </h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
                        A receipt and your magic login link will be sent to your email shortly. If you don't receive it within 5 minutes, please check your spam folder.
                    </p>

                    <div style={{ background: 'var(--muted)', padding: '1.5rem', borderRadius: '1rem', display: 'inline-block', textAlign: 'left', marginBottom: '2rem', width: '100%' }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Order Details:</p>
                        <p style={{ color: 'var(--muted-foreground)' }}>Plan: <span style={{ textTransform: 'capitalize', color: 'var(--foreground)' }}>{plan || 'Unknown'} Access</span></p>
                        {sessionId && <p style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem', marginTop: '0.5rem' }}>ID: {sessionId}</p>}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={manualTrigger}
                            style={{ background: 'transparent', border: '1px dashed var(--border)', color: 'var(--muted-foreground)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            Pixel not firing? Click to re-trigger Purchase
                        </button>
                    </div>

                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                        Return to Homepage <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
