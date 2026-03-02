'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { JobRole } from '@/types';
import { ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const roles: JobRole[] = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'Marketing Executive',
    'Sales Executive',
    'UI/UX Designer',
    'Business Analyst'
];

export default function RoleSelector() {
    const { state, setSelectedRole, setStep } = useAppContext();

    return (
        <div style={{ padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 2: What's your target role?</h2>
                    <p style={{ color: 'var(--muted-foreground)' }}>We'll optimize your resume specifically for this job category in India.</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {roles.map((role) => (
                        <div
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                borderRadius: 'var(--radius)',
                                cursor: 'pointer',
                                border: state.selectedRole === role ? '2px solid var(--primary)' : '1px solid var(--border)',
                                transition: 'var(--transition)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                backgroundColor: state.selectedRole === role ? 'rgba(79, 70, 229, 0.05)' : ''
                            }}
                        >
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: state.selectedRole === role ? 'var(--primary)' : 'var(--muted)',
                                border: '2px solid var(--border)'
                            }} />
                            <span style={{ fontWeight: 500 }}>{role}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn" style={{ border: '1px solid var(--border)', flex: '1 1 auto' }} onClick={() => setStep('upload')}>
                        Back
                    </button>
                    <button
                        className="btn btn-primary"
                        disabled={!state.selectedRole}
                        onClick={() => setStep('payment')}
                        style={{ padding: '0.75rem 1rem', opacity: !state.selectedRole ? 0.5 : 1, flex: '2 1 auto' }}
                    >
                        Confirm & Proceed to Payment ₹499 <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
