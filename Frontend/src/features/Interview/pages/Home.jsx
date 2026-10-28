import React, { useState } from "react";
import "../home.scss";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!selfDescription.trim()) {
      alert("Please enter your self description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);
      formData.append("resume", resume);

      /*
        Replace this URL with your actual backend endpoint.
      */

      const response = await fetch(
        "http://localhost:5050/interview",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to generate interview report"
        );
      }

      console.log("Interview Report:", data);

      /*
        Later:
        navigate("/interview-report", {
          state: { report: data }
        });
      */

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home-page">

      <section className="home-container">

        {/* Header */}

        <div className="home-header">

          <div>
            <p className="eyebrow">HIREPREP AI</p>

            <h1>
              Prepare for the
              <br />
              interview that matters.
            </h1>

            <p className="home-description">
              Add the role you're applying for, your resume, and a little
              about yourself. HirePrep analyzes the requirements and builds
              your interview preparation plan.
            </p>
          </div>

          <div className="header-meta">
            <span>01</span>
            <span>ANALYZE</span>
          </div>

        </div>


        {/* Main workspace */}

        <form
          className="interview-workspace"
          onSubmit={handleSubmit}
        >

          {/* Job Description */}

          <section className="job-section">

            <div className="section-header">

              <div>
                <span className="section-number">01</span>

                <h2>Job description</h2>
              </div>

              <span className="section-label">
                REQUIRED
              </span>

            </div>

            <p className="section-description">
              Paste the complete job description. We'll identify the
              skills, experience and requirements expected for the role.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="job-textarea"
            />

            <div className="character-count">
              {jobDescription.length} characters
            </div>

          </section>


          {/* Candidate */}

          <aside className="candidate-section">

            <div className="section-header">

              <div>
                <span className="section-number">02</span>

                <h2>Candidate</h2>
              </div>

              <span className="section-label">
                YOUR PROFILE
              </span>

            </div>


            {/* Resume */}

            <div className="field">

              <label htmlFor="resume">
                Resume
              </label>

              <div className="file-upload">

                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume(e.target.files[0])
                  }
                />

                <div className="file-content">

                  <div className="file-icon">
                    PDF
                  </div>

                  <div className="file-info">

                    <strong>
                      {resume
                        ? resume.name
                        : "Upload your resume"}
                    </strong>

                    <span>
                      {resume
                        ? `${(
                            resume.size /
                            1024 /
                            1024
                          ).toFixed(2)} MB`
                        : "PDF · Max 10 MB"}
                    </span>

                  </div>

                  <span className="upload-arrow">
                    ↑
                  </span>

                </div>

              </div>

            </div>


            {/* Self Description */}

            <div className="field">

              <label htmlFor="selfDescription">
                About you
              </label>

              <textarea
                id="selfDescription"
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(e.target.value)
                }
                placeholder="Tell us about yourself, your experience, strengths, projects or anything else you'd like us to consider..."
                className="self-textarea"
              />

            </div>


            {/* Generate */}

            <button
              type="submit"
              className="generate-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Generating..."
                  : "Generate interview report"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>

          </aside>

        </form>

      </section>

    </main>
  );
};

export default Home;