import { useState } from "react";

function ClaimAssessment() {
  const [form, setForm] = useState({
    productName: "Revitalift Clinical Serum",

    claimText:
      "Reduces wrinkles by 20% in 4 weeks",

    evidence: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/claims/assess",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Assessment failed."
        );
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <span className="label">
            L'ORÉAL R&I
          </span>

          <h1>
            Claims Intelligence Engine
          </h1>

          <p>
            AI-assisted scientific claim assessment
          </p>
        </div>

        <div className="grid">

          {/* INPUT PANEL */}

          <div className="card">

            <h2>Clinical Claim</h2>

            <form onSubmit={handleSubmit}>

              <label>
                Product
              </label>

              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                required
              />

              <label>
                Proposed Claim
              </label>

              <textarea
                name="claimText"
                value={form.claimText}
                onChange={handleChange}
                rows="3"
                required
              />

              <label>
                Clinical Evidence
              </label>

              <textarea
                name="evidence"
                value={form.evidence}
                onChange={handleChange}
                rows="10"
                placeholder="Paste clinical study results here..."
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Assessing..."
                  : "Assess Claim"}
              </button>

            </form>

          </div>

          {/* RESULTS PANEL */}

          <div className="card">

            <h2>AI Assessment</h2>

            {!result && !loading && (
              <div className="empty">
                Submit clinical evidence to generate
                an assessment.
              </div>
            )}

            {loading && (
              <div className="empty">
                Analysing scientific evidence...
              </div>
            )}

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            {result && (
              <AssessmentResult
                result={result.assessment}
              />
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

function AssessmentResult({ result }) {
  return (
    <div className="result">

      <div
        className={
          result.justified
            ? "decision success"
            : "decision failure"
        }
      >
        {result.justified
          ? "✓ CLAIM JUSTIFIED"
          : "✕ CLAIM NOT JUSTIFIED"}
      </div>

      <div className="metric">

        <span>Confidence</span>

        <strong>
          {result.confidenceScore}%
        </strong>

      </div>

      <div className="progress">

        <div
          className="progressValue"
          style={{
            width: `${result.confidenceScore}%`,
          }}
        />

      </div>

      <h3>Reasoning</h3>

      <p>
        {result.reasoning}
      </p>

      {result.limitations?.length > 0 && (
        <>
          <h3>Limitations</h3>

          <ul>
            {result.limitations.map(
              (limitation, index) => (
                <li key={index}>
                  {limitation}
                </li>
              )
            )}
          </ul>
        </>
      )}

      <div className="review">

        Human Review:
        <strong>
          {" "}
          {result.humanReview}
        </strong>

      </div>

    </div>
  );
}

export default ClaimAssessment;