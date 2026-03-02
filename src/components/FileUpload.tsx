'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUpload() {
    const { state, setResumeFile, setStep } = useAppContext();
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validExtensions = ['pdf', 'docx', 'doc'];
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (extension && validExtensions.includes(extension)) {
            setResumeFile(file);
            setError(null);
        } else {
            setError('Please upload a PDF or Word document (.docx, .doc)');
        }
    };

    return (
        <section className="section-padding">
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 1: Upload Your Resume</h2>
                    <p style={{ color: 'var(--muted-foreground)' }}>Upload your existing resume. We support PDF and DOCX formats.</p>
                </div>

                <div
                    className={`glass ${dragActive ? 'border-primary' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{
                        padding: '3rem',
                        borderRadius: 'var(--radius)',
                        border: dragActive ? '2px dashed var(--primary)' : '2px dashed var(--border)',
                        textAlign: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                    }}
                >
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        accept=".pdf,.docx,.doc"
                    />
                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                        {!state.resumeFile ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--muted)', borderRadius: '50%' }}>
                                    <Upload size={32} color="var(--primary)" />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600 }}>Drag & Drop or Click to Upload</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                                        PDF, DOCX up to 10MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <File size={32} color="var(--primary)" />
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{ fontWeight: 600 }}>{state.resumeFile.name}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                                        {(state.resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => { e.preventDefault(); setResumeFile(null); }}
                                    style={{ marginLeft: '1rem', color: 'var(--error)' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </label>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                marginTop: '1rem',
                                color: 'var(--error)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                justifyContent: 'center'
                            }}
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button
                        className="btn btn-primary"
                        disabled={!state.resumeFile}
                        onClick={() => setStep('role')}
                        style={{ padding: '0.75rem 3rem', opacity: !state.resumeFile ? 0.5 : 1 }}
                    >
                        Continue to Role Selection
                    </button>
                </div>
            </div>
        </section>
    );
}
