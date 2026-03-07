'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, ArrowRight, LayoutTemplate, AlignLeft, Eye } from 'lucide-react';

interface AtsQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export default function AtsQuizModal({ isOpen, onClose, onComplete }: AtsQuizModalProps) {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            icon: <LayoutTemplate size={48} color="var(--primary)" />,
            title: "Does your current resume use a multi-column layout?",
            subtitle: "Think: sidebar with skills, left column for experience.",
            options: [
                { label: "Yes, it has columns", points: 0, danger: true, hint: "Columns confuse 80% of legacy ATS parsers." },
                { label: "No, it's a simple 1-column list", points: 1, danger: false, hint: "Good. 1-column is the only safe format." }
            ]
        },
        {
            icon: <AlignLeft size={48} color="var(--primary)" />,
            title: "How do you describe your daily duties?",
            subtitle: "Look at your bullet points.",
            options: [
                { label: "Tasks & Responsibilities (e.g., 'Responsible for server maintenance')", points: 0, danger: true, hint: "Recruiters skip 'task lists'." },
                { label: "Business Impact & ROI (e.g., 'Reduced latency by 35% saving $50k')", points: 1, danger: false, hint: "Action + Metric is exactly what they look for." }
            ]
        },
        {
            icon: <Eye size={48} color="var(--primary)" />,
            title: "Can a recruiter find your best achievement in under 6 seconds?",
            subtitle: "Be honest.",
            options: [
                { label: "No, they have to read the whole paragraph.", points: 0, danger: true, hint: "They will skim past it." },
                { label: "Yes, it's bolded at the top of my most recent role.", points: 1, danger: false, hint: "Perfect visual hierarchy." }
            ]
        }
    ];

    const handleAnswer = (points: number) => {
        setScore(prev => prev + points);
        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setStep(questions.length); // End step
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            background: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: '1.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            position: 'relative',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '90vh'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertCircle size={18} color="var(--primary)" /> ATS Readiness Diagnostic
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'var(--muted)', border: 'none', color: 'var(--muted-foreground)',
                                    width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                            <AnimatePresence mode="wait">
                                {step < questions.length ? (
                                    <motion.div
                                        key={`step-${step}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                                    >
                                        <div style={{ marginBottom: '1.5rem', background: 'var(--muted)', padding: '1rem', borderRadius: '50%' }}>
                                            {questions[step].icon}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Question {step + 1} of {questions.length}
                                        </div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>{questions[step].title}</h2>
                                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>{questions[step].subtitle}</p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                            {questions[step].options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(option.points)}
                                                    style={{
                                                        padding: '1.25rem',
                                                        borderRadius: '1rem',
                                                        border: `1px solid var(--border)`,
                                                        background: 'var(--background)',
                                                        color: 'var(--foreground)',
                                                        textAlign: 'left',
                                                        fontSize: '1.05rem',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem',
                                                        transition: 'all 0.2s',
                                                        cursor: 'pointer'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        (e.currentTarget as HTMLButtonElement).style.borderColor = option.danger ? 'var(--error)' : 'var(--primary)';
                                                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                                                        (e.currentTarget as HTMLButtonElement).style.transform = 'none';
                                                    }}
                                                >
                                                    {option.label}
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontWeight: 400 }}>{option.hint}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: score === 3 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: score === 3 ? '#22c55e' : '#ef4444', marginBottom: '1.5rem' }}>
                                            {score === 3 ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
                                        </div>
                                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
                                            Your Score: {score}/3
                                        </h2>
                                        {score === 3 ? (
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                                Impressive. Your resume is structurally sound. You might only need ResumeFix to optimize specific action verbs.
                                            </p>
                                        ) : (
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                                <span style={{ color: 'var(--error)', fontWeight: 700 }}>High Risk of Auto-Rejection.</span><br />
                                                Your current formatting and wording are likely actively blocking you from getting interviews. You need the Elite M7 framework.
                                            </p>
                                        )}

                                        <button
                                            className="btn btn-primary"
                                            style={{ width: '100%', fontSize: '1.25rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            onClick={() => {
                                                onClose();
                                                onComplete();
                                            }}
                                        >
                                            Fix My Resume Now <ArrowRight size={20} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
