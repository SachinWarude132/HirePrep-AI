const generateInterviewReport = require("../services/ai.service");
const InterviewReportModel = require("../models/InterviewReport.model");

const { PDFParse } = require("pdf-parse");

async function GenerateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file;

        // Check if PDF was uploaded
        if (!resumeFile) {
            return res.status(400).json({
                message: "Resume PDF is required"
            });
        }

        // Extract text from PDF
        const parser = new PDFParse({
            data: resumeFile.buffer
        });

        const pdfResult = await parser.getText();

        // Important: release PDF parser resources
        await parser.destroy();

        const ResumeContent = pdfResult.text;

        const { selfDescription, jobDescription } = req.body;

        // Generate AI interview report
        const interviewReportByAI = await generateInterviewReport(
            ResumeContent,
            selfDescription,
            jobDescription
        );

        // Save report
        const InterviewReport = await InterviewReportModel.create({
            user: req.user.id,
            resume: ResumeContent,
            jobDescription,
            selfDescription,
            ...interviewReportByAI
        });

        return res.status(201).json({
            message: "InterviewReport generated successfully",
            InterviewReport
        });

    } catch (error) {
        console.error("Generate Interview Report Error:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

module.exports = {
    GenerateInterviewReportController
};