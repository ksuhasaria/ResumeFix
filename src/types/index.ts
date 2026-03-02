export type JobRole = 'Software Engineer' | 'Product Manager' | 'Data Scientist' | 'Marketing Executive' | 'Sales Executive' | 'UI/UX Designer' | 'Business Analyst';

export interface ResumeData {
    originalText: string;
    role: JobRole;
    analysis: ResumeAnalysis;
    rewrittenResume: string;
}

export interface ResumeAnalysis {
    score: number;
    strengths: string[];
    weaknesses: string[];
    missingKeywords: string[];
    atsCompatibility: 'High' | 'Medium' | 'Low';
}

export interface InterviewQA {
    question: string;
    answer: string;
    tips: string;
}

export interface ActionPlanStep {
    day: number;
    task: string;
    details: string;
}
