'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Download, Check, AlertCircle, TrendingUp, Calendar, HelpCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Results() {
    const { state, setStep } = useAppContext();
    const [activeTab, setActiveTab] = useState<'diagnosis' | 'resume' | 'interview' | 'plan'>('diagnosis');

    const downloadPDF = async () => {
        const element = document.getElementById('rewritten-resume-content');
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${state.resumeFile?.name.split('.')[0]}_optimized.pdf`);
    };

    return (
        <section className="section-padding" style={{ background: 'var(--muted)', minHeight: '100vh' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Your Optimized Profile</h2>
                        <p style={{ color: 'var(--muted-foreground)' }}>Tailored for <strong>{state.selectedRole}</strong> roles in India.</p>
                    </div>
                    <button className="btn btn-primary" onClick={downloadPDF}>
                        <Download size={18} /> Download Optimized Resume (PDF)
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    <TabButton active={activeTab === 'diagnosis'} onClick={() => setActiveTab('diagnosis')} icon={<TrendingUp size={16} />} label="Diagnosis" />
                    <TabButton active={activeTab === 'resume'} onClick={() => setActiveTab('resume')} icon={<FileText size={16} />} label="Rewritten Resume" />
                    <TabButton active={activeTab === 'interview'} onClick={() => setActiveTab('interview')} icon={<HelpCircle size={16} />} label="Interview Q&A" />
                    <TabButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')} icon={<Calendar size={16} />} label="7-Day Plan" />
                </div>

                {/* Content */}
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', background: 'var(--background)' }}>

                    {activeTab === 'diagnosis' && (
                        <div className="animate-fade-in">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                                <div>
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <TrendingUp color="var(--primary)" /> Performance Score
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            border: '8px solid var(--primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.8rem',
                                            fontWeight: 800
                                        }}>
                                            {state.analysisResult?.score}%
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>ATS Compatibility: {state.analysisResult?.atsCompatibility}</p>
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>Based on Indian recruitment standards.</p>
                                        </div>
                                    </div>

                                    <h4 style={{ marginBottom: '1rem' }}>Missing Keywords</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {state.analysisResult?.missingKeywords.map(kw => (
                                            <span key={kw} className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h4 style={{ marginBottom: '1rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Check size={18} /> Strengths
                                        </h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {state.analysisResult?.strengths.map(s => (
                                                <li key={s} style={{ marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' }}>
                                                    <span>•</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '1rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={18} /> Areas for Improvement
                                        </h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {state.analysisResult?.weaknesses.map(w => (
                                                <li key={w} style={{ marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' }}>
                                                    <span>•</span> {w}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resume' && (
                        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div id="rewritten-resume-content" style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', color: 'black', fontFamily: 'serif' }}>
                                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.95rem' }}>
                                    {state.rewrittenResume}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'interview' && (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '2rem' }}>Targeted Interview Preparation</h3>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {state.interviewQA.map((qa, i) => (
                                    <div key={i} className="glass" style={{ padding: '1.5rem', background: 'var(--muted)' }}>
                                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>Q: {qa.question}</h4>
                                        <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}><strong>Ideal Answer:</strong> {qa.answer}</p>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <AlertCircle size={14} /> <strong>Tip:</strong> {qa.tips}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'plan' && (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '2rem' }}>7-Day Job Application Action Plan</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {state.actionPlan.map((step) => (
                                    <div key={step.day} style={{ display: 'flex', gap: '1.5rem' }}>
                                        <div style={{
                                            flexShrink: 0,
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700
                                        }}>
                                            {step.day}
                                        </div>
                                        <div>
                                            <h4 style={{ marginBottom: '0.5rem' }}>{step.task}</h4>
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{step.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setStep('landing')}>
                        Start Again
                    </button>
                </div>

            </div>
        </section>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`btn ${active ? 'btn-primary' : ''}`}
            style={{
                background: active ? 'var(--primary)' : 'transparent',
                color: active ? 'white' : 'var(--muted-foreground)',
                border: active ? 'none' : '1px solid var(--border)',
                padding: '0.5rem 1.25rem'
            }}
        >
            {icon} {label}
        </button>
    );
}
