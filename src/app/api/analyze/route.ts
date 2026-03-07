export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
    try {
        const pdf = require('pdf-parse');
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const data = await request.formData();
        const file = data.get('file') as File;
        const role = data.get('role') as string;

        if (!file || !role) {
            return NextResponse.json({ error: 'File and role are required' }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
        }

        // 1. Extract text from the PDF using pdf-parse
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let extractedText = '';
        try {
            const pdfData = await pdf(buffer);
            extractedText = pdfData.text;
        } catch (err) {
            console.error('PDF Parsing failed:', err);
            return NextResponse.json({ error: 'Failed to read PDF file. Please ensure it is a valid PDF.' }, { status: 400 });
        }

        if (!extractedText || extractedText.trim().length === 0) {
            return NextResponse.json({ error: 'Could not extract text from the PDF' }, { status: 400 });
        }

        // 2. US-Specific Master Prompt Strategy
        const systemPrompt = `
            You are an elite executive recruiter and resume writer in the US Tech Market. 
            Analyze the following resume for the role of ${role}.
            Write exclusively in American English (e.g., analyze, optimize). 
            Adhere strictly to US corporate standards and the Harvard Business School / WSO (Wall Street Oasis) 1-column format.
            DO NOT include personal details like age, marital status, religion, or photos (which are illegal or frowned upon in US hiring).
            Convert all bullet points into high-impact, ROI-driven statements. Use strong action verbs.
            
            Return a JSON object with the exact following keys:
            - "score": A number out of 100 representing the ATS score.
            - "strengths": An array of strings describing 2-3 strong points.
            - "weaknesses": An array of strings describing 2-3 areas for improvement.
            - "missingKeywords": An array of strings listing 3-5 important missing industry keywords.
            - "atsCompatibility": A string, either "Low", "Medium", or "High".
            - "rewrittenResume": A single string containing the fully re-written resume text formatted for a clean serif (Times New Roman/Garamond) printout. Format it clearly using plain text and basic spacing.
            - "interviewQA": An array of objects, where each object has "question", "answer", and "tips" string fields, representing 3 potential interview questions based on the resume.
            - "actionPlan": An array of objects, where each object has "day" (number), "task" (string), and "details" (string) fields, outlining a 7-day job application plan.
          `;

        const userPrompt = `Here is the raw extracted text from my resume:\n\n${extractedText}`;

        // 3. Send the text + role to OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective, fast, and highly capable
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }, // Guarantee JSON output
        });

        const rawResponse = completion.choices[0].message.content;

        if (!rawResponse) {
            throw new Error('No response from AI');
        }

        // 4. Return the structured analysis
        const analysisData = JSON.parse(rawResponse);

        return NextResponse.json(analysisData);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
    }
}
