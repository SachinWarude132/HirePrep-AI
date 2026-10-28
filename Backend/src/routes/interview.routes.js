const express = require("express");

const authmiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");

const InterviewRouter = express.Router();

InterviewRouter.post(
    "/",
    authmiddleware.AuthUser,
    upload.single("resume"),
    interviewController.GenerateInterviewReportController
);

module.exports = InterviewRouter;