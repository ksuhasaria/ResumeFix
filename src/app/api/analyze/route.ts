import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const role = data.get('role') as string;

        if (!file || !role) {
            return NextResponse.json({ error: 'File and role are required' }, { status: 400 });
        }

        // In a real production app, you would:
        // 1. Extract text from the PDF/DOCX using a library like pdf-parse or mammoth
        // 2. US-Specific Master Prompt Strategy:
        /*
          const systemPrompt = `
            You are an elite executive recruiter and resume writer in the US Tech Market. 
            Analyze the following resume for the role of ${role}.
            Write exclusively in American English (e.g., analyze, optimize). 
            Adhere strictly to US corporate standards and the Harvard Business School / WSO (Wall Street Oasis) 1-column format.
            DO NOT include personal details like age, marital status, religion, or photos (which are illegal or frowned upon in US hiring).
            Convert all bullet points into high-impact, ROI-driven statements. Use strong action verbs.
            Return a JSON object containing the ATS score, strengths, weaknesses, missing keywords, and the fully re-written resume text formatted for a clean serif (Times New Roman/Garamond) printout.
          `;
        */
        // 3. Send the text + role to an LLM (OpenAI/Gemini) with the above prompt
        // 4. Return the structured analysis

        // For now, we return mock data as requested for a "simple" build
        const mockAnalysis = {
            score: 72,
            strengths: ['Relevant technical skills', 'Professional layout'],
            weaknesses: ['Vague bullet points', 'Missing certifications section'],
            missingKeywords: ['Agile', 'System Design', 'Team Leadership'],
            atsCompatibility: 'Medium',
            rewrittenResume: `REWRITTEN RESUME CONTENT FOR ${role.toUpperCase()}...`,
            interviewQA: [
                { question: 'What is your greatest strength?', answer: 'My ability to solve complex problems...', tips: 'Be specific.' }
            ],
            actionPlan: [
                { day: 1, task: 'Fix Headline', details: 'Use the new headline from your optimized resume.' }
            ]
        };

        return NextResponse.json(mockAnalysis);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
    }
}
