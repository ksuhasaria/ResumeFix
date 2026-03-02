'use client';

import React, { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Search, FileText, Cpu, CheckCircle } from 'lucide-react';

export default function Analyzing() {
    const { processAnalysis } = useAppContext();

    useEffect(() => {
        processAnalysis();
    }, []);

    return (
        <section className="section-padding">
            <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 3rem' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: '4px solid var(--muted)',
                            borderTop: '4px solid var(--primary)',
                            borderRadius: '50%'
                        }}
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Cpu size={40} color="var(--primary)" />
                    </div>
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Analyzing Your Resume...</h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '3rem' }}>
                    Our AI is scanning your resume for ATS compliance and role specific criteria.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                    <LoadingStep icon={<Search size={18} />} text="Scanning keywords for target role..." delay={0} />
                    <LoadingStep icon={<FileText size={18} />} text="Evaluating formatting and structure..." delay={1.5} />
                    <LoadingStep icon={<Cpu size={18} />} text="Generating optimized content..." delay={3} />
                    <LoadingStep icon={<CheckCircle size={18} />} text="Finalizing interview questions..." delay={4.5} />
                </div>
            </div>
        </section>
    );
}

function LoadingStep({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius)', background: 'var(--muted)' }}
        >
            <div style={{ color: 'var(--primary)' }}>{icon}</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</span>
        </motion.div>
    );
}
