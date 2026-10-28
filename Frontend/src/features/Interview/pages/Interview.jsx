import React, { useState } from "react";
import "../style/interviewReport.scss";


const Interview = ({ report }) => {

  if (!report) {
    return (
      <main className="report-page">
        <div className="empty-report">
          <span>NO REPORT</span>
          <h1>Interview report not found.</h1>
          <p>
            Generate an interview report first to view your analysis.
          </p>
        </div>
      </main>
    );
  }

  const {
    matchscore,
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
  } = report;

  return (
    <main className="report-page">

      <div className="report-container">

        {/* Header */}

        <header className="report-header">

          <div>

            <p className="report-eyebrow">
              HIREPREP AI / ANALYSIS
            </p>

            <h1>
              Interview readiness
            </h1>

            <p className="report-subtitle">
              A structured analysis of your profile against the
              requirements of the role.
            </p>

          </div>

          <div className="report-id">
            <span>REPORT</span>
            <strong>01</strong>
          </div>

        </header>


        {/* Score */}

        <section className="score-section">

          <div className="score-card">

            <div className="score-label">
              PROFILE MATCH
            </div>

            <div className="score-number">
              {matchscore}
              <span>%</span>
            </div>

            <div className="score-bar">
              <div
                className="score-progress"
                style={{
                  width: `${Math.min(
                    Math.max(matchscore, 0),
                    100
                  )}%`,
                }}
              />
            </div>

            <p>
              Match score based on the requirements identified
              from the job description.
            </p>

          </div>


          <div className="score-summary">

            <div>
              <span>TECHNICAL</span>
              <strong>
                {technicalQuestions.length}
              </strong>
              <small>questions generated</small>
            </div>

            <div>
              <span>BEHAVIORAL</span>
              <strong>
                {behavioralQuestions.length}
              </strong>
              <small>questions generated</small>
            </div>

            <div>
              <span>SKILL GAPS</span>
              <strong>
                {skillGaps.length}
              </strong>
              <small>areas to improve</small>
            </div>

          </div>

        </section>


        {/* Skill gaps */}

        <section className="report-section">

          <div className="section-title">

            <span>01</span>

            <div>
              <h2>Skill gaps</h2>

              <p>
                Areas where additional preparation may be useful.
              </p>
            </div>

          </div>


          <div className="skill-grid">

            {skillGaps.map((gap, index) => {

              const skill =
                typeof gap === "string"
                  ? gap
                  : gap.skill || gap.name;

              const reason =
                typeof gap === "object"
                  ? gap.reason || gap.description
                  : null;

              return (
                <article
                  className="skill-card"
                  key={index}
                >

                  <span className="skill-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>

                    <h3>
                      {skill}
                    </h3>

                    {reason && (
                      <p>
                        {reason}
                      </p>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* Technical questions */}

        <section className="report-section">

          <div className="section-title">

            <span>02</span>

            <div>
              <h2>Technical questions</h2>

              <p>
                Questions generated around the requirements of the role.
              </p>
            </div>

          </div>


          <div className="question-list">

            {technicalQuestions.map((question, index) => {

              const title =
                typeof question === "string"
                  ? question
                  : question.question;

              const topic =
                typeof question === "object"
                  ? question.topic || question.skill
                  : null;

              return (
                <article
                  className="question-item"
                  key={index}
                >

                  <span className="question-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="question-content">

                    {topic && (
                      <span className="question-topic">
                        {topic}
                      </span>
                    )}

                    <h3>
                      {title}
                    </h3>

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* Behavioral questions */}

        <section className="report-section">

          <div className="section-title">

            <span>03</span>

            <div>
              <h2>Behavioral questions</h2>

              <p>
                Questions designed around your experience and communication.
              </p>
            </div>

          </div>


          <div className="question-list">

            {behavioralQuestions.map((question, index) => {

              const title =
                typeof question === "string"
                  ? question
                  : question.question;

              return (
                <article
                  className="question-item"
                  key={index}
                >

                  <span className="question-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="question-content">

                    <h3>
                      {title}
                    </h3>

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* Preparation plan */}

        <section className="report-section preparation-section">

          <div className="section-title">

            <span>04</span>

            <div>
              <h2>Preparation plan</h2>

              <p>
                A focused plan based on your current profile.
              </p>
            </div>

          </div>


          <div className="preparation-list">

            {preparationPlan.map((item, index) => {

              const title =
                typeof item === "string"
                  ? item
                  : item.title ||
                    item.day ||
                    `Day ${index + 1}`;

              const description =
                typeof item === "object"
                  ? item.description ||
                    item.tasks ||
                    item.focus
                  : null;

              return (
                <article
                  className="preparation-item"
                  key={index}
                >

                  <div className="day-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>

                    <h3>
                      {title}
                    </h3>

                    {description && (
                      <p>
                        {description}
                      </p>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        </section>

      </div>

    </main>
  );
};

export default Interview;