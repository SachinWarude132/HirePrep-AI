const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithRetry(prompt, retries = 3) {

    const models = [
        "gemini-3.6-flash",
        "gemini-3.5-flash"
    ];

    let lastError;

    for (const model of models) {

        for (let attempt = 1; attempt <= retries; attempt++) {

            try {

                console.log(
                    `Trying ${model} | Attempt ${attempt}/${retries}`
                );

                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,

                    config: {
                        responseMimeType: "application/json",

                        responseSchema: {
                            type: Type.OBJECT,

                            properties: {

                                matchscore: {
                                    type: Type.NUMBER,
                                    description:
                                        "A score between 0 and 100 indicating match quality"
                                },

                                technicalQuestions: {
                                    type: Type.ARRAY,

                                    items: {
                                        type: Type.OBJECT,

                                        properties: {
                                            question: {
                                                type: Type.STRING
                                            },

                                            intention: {
                                                type: Type.STRING
                                            },

                                            answer: {
                                                type: Type.STRING
                                            }
                                        },

                                        required: [
                                            "question",
                                            "intention",
                                            "answer"
                                        ]
                                    }
                                },

                                behavioralQuestions: {
                                    type: Type.ARRAY,

                                    items: {
                                        type: Type.OBJECT,

                                        properties: {
                                            question: {
                                                type: Type.STRING
                                            },

                                            intention: {
                                                type: Type.STRING
                                            },

                                            answer: {
                                                type: Type.STRING
                                            }
                                        },

                                        required: [
                                            "question",
                                            "intention",
                                            "answer"
                                        ]
                                    }
                                },

                                skillGaps: {
                                    type: Type.ARRAY,

                                    items: {
                                        type: Type.OBJECT,

                                        properties: {

                                            skill: {
                                                type: Type.STRING
                                            },

                                            severity: {
                                                type: Type.STRING,

                                                enum: [
                                                    "low",
                                                    "medium",
                                                    "high"
                                                ]
                                            }
                                        },

                                        required: [
                                            "skill",
                                            "severity"
                                        ]
                                    }
                                },

                                preparationPlan: {
                                    type: Type.ARRAY,

                                    items: {
                                        type: Type.OBJECT,

                                        properties: {

                                            day: {
                                                type: Type.NUMBER
                                            },

                                            focusArea: {
                                                type: Type.STRING
                                            },

                                            tasks: {
                                                type: Type.ARRAY,
                                                items: {
                                                    type: Type.STRING
                                                }
                                            }
                                        },

                                        required: [
                                            "day",
                                            "focusArea",
                                            "tasks"
                                        ]
                                    }
                                }
                            },

                            required: [
                                "matchscore",
                                "technicalQuestions",
                                "behavioralQuestions",
                                "skillGaps",
                                "preparationPlan"
                            ]
                        }
                    }
                });

                return JSON.parse(response.text);

            } catch (error) {

                lastError = error;

                const status =
                    error?.status ||
                    error?.response?.status ||
                    error?.error?.code;

                console.error(
                    `Gemini error using ${model}:`,
                    error.message
                );

                // Only retry temporary availability/rate-limit errors
                if (
                    status === 503 ||
                    status === 429
                ) {

                    if (attempt < retries) {

                        const delay = attempt * 2000;

                        console.log(
                            `Retrying in ${delay}ms...`
                        );

                        await sleep(delay);

                    }

                    continue;
                }

                // Don't retry invalid request/authentication errors
                throw error;
            }
        }

        console.log(
            `${model} unavailable. Trying fallback model...`
        );
    }

    throw lastError;
}


async function generateInterviewReport(
    resumeInput,
    selfDescriptionInput,
    jobDescriptionInput
) {

    const resumeData = resumeInput || "";
    const selfDescData = selfDescriptionInput || "";
    const jobDescData = jobDescriptionInput || "";

    const prompt = `
You are an expert technical recruiter and interviewer.

Generate a detailed candidate evaluation report based on:

RESUME:
${resumeData}

SELF DESCRIPTION:
${selfDescData}

JOB DESCRIPTION:
${jobDescData}

Analyze the candidate objectively.

Generate:
1. Match score
2. Technical interview questions
3. Behavioral interview questions
4. Skill gaps
5. A practical preparation plan
`;

    const parsedData = await generateWithRetry(prompt);

    console.log(
        JSON.stringify(parsedData, null, 2)
    );

    return parsedData;
}

module.exports = generateInterviewReport;