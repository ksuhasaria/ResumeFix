import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
            <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: '2rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                    <CheckCircle size={40} />
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Payment Successful!</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--muted-foreground)', marginBottom: '3rem', lineHeight: 1.6 }}>
                    Your lifetime access has been unlocked. Please check your email for the receipt and your personal magic link to access your ResumeFix vault.
                </p>

                <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '3rem', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Next Steps:</h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--muted-foreground)' }}>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>1.</span>
                            Find your welcome email (check spam if you don't see it).
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>2.</span>
                            Click the secure link to log in.
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>3.</span>
                            Upload your old resume and let the AI go to work!
                        </li>
                    </ul>
                </div>

                <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Return to Homepage <ArrowRight size={18} />
                </Link>
            </div>
        </main>
    );
}
