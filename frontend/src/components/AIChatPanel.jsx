import { useState } from "react";
import axios from "axios";

function AIChatPanel({ setAiData }) {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/ai-log",
        {
          text,
        }
      );

      if (res.data.success) {
        setAiData(res.data.data);

        setResponse(
          "✅ Interaction analyzed successfully. Form fields have been automatically populated."
        );
      } else {
        setResponse("❌ Failed to parse AI response.");
      }
    } catch (err) {
      console.error(err);
      setResponse("❌ Backend Error");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <h2
        style={{
          color: "#1677ff",
          marginBottom: "5px",
          fontWeight: "bold",
        }}
      >
        🤖 AI Assistant
      </h2>

      <p
        style={{
          color: "#666",
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        Log Interaction details here via chat
      </p>

      <hr />

      <div
        style={{
          background: "#e8f7fb",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
          marginBottom: "15px",
          color: "#333",
          lineHeight: "1.6",
        }}
      >
        Log interaction details here
        <br />
        (e.g. "Met Dr. Smith, discussed Product-X efficacy,
        positive sentiment, shared brochure")
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe Interaction..."
        rows="6"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #d9d9d9",
          resize: "none",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "12px",
          background: "#1677ff",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "12px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "AI Log"}
      </button>

      {text && (
        <div
          style={{
            background: "#ffffff",
            borderLeft: "4px solid #1677ff",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
            marginBottom: "15px",
            color: "#333",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>You:</strong>
          <br />
          {text}
        </div>
      )}

      {response && (
        <div
          style={{
            background: "#f6ffed",
            border: "1px solid #b7eb8f",
            padding: "15px",
            borderRadius: "10px",
            color: "#135200",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}

export default AIChatPanel;