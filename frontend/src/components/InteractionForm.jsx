import { useEffect, useState } from "react";

function InteractionForm({ aiData }) {
  const [formData, setFormData] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    sentiment: "",
    outcomes: "",
    follow_up_actions: "",
  });

  useEffect(() => {
    if (!aiData) return;

    setFormData({
      hcp_name: aiData.hcp_name || "",
      interaction_type: aiData.interaction_type || "Meeting",
      date: aiData.date || "",
      time: aiData.time || "",
      attendees: aiData.attendees || "",
      topics_discussed: aiData.topics_discussed || "",
      materials_shared: aiData.materials_shared || "",
      sentiment: aiData.sentiment || "",
      outcomes: aiData.outcomes || "",
      follow_up_actions: aiData.follow_up_actions || "",
    });
  }, [aiData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: "15px" }}>
      {aiData && (
        <div
          style={{
            background: "#f6ffed",
            border: "1px solid #b7eb8f",
            color: "#135200",
            padding: "14px",
            borderRadius: "6px",
            marginBottom: "25px",
          }}
        >
          ✅ Interaction logged successfully!
          <br />
          The details have been automatically populated based on your AI summary.
        </div>
      )}

      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        Interaction Details
      </h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div style={{ width: "50%" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            HCP Name
          </label>

          <input
            value={formData.hcp_name}
            onChange={(e) =>
              handleChange("hcp_name", e.target.value)
            }
            placeholder="Search or select HCP..."
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ width: "50%" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Interaction Type
          </label>

          <select
            value={formData.interaction_type}
            onChange={(e) =>
              handleChange("interaction_type", e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          >
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div style={{ width: "50%" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Date
          </label>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              handleChange("date", e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ width: "50%" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Time
          </label>

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              handleChange("time", e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        Attendees
      </label>

      <input
        value={formData.attendees}
        onChange={(e) =>
          handleChange("attendees", e.target.value)
        }
        placeholder="Enter names or search..."
        style={{
          width: "100%",
          padding: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          marginBottom: "25px",
        }}
      />

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        Topics Discussed
      </label>

      <textarea
        rows="5"
        value={formData.topics_discussed}
        onChange={(e) =>
          handleChange("topics_discussed", e.target.value)
        }
        placeholder="Enter key discussion points..."
        style={{
          width: "100%",
          padding: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />

      <div
        style={{
          color: "#1677ff",
          marginBottom: "30px",
          cursor: "pointer",
        }}
      >
        🎙 Summarize from Voice Note (Requires Consent)
      </div>

      <h3
        style={{
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Materials Shared / Samples Distributed
      </h3>

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        Materials Shared
      </label>

      <input
        value={formData.materials_shared}
        onChange={(e) =>
          handleChange("materials_shared", e.target.value)
        }
        placeholder="Materials shared..."
        style={{
          width: "100%",
          padding: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          marginBottom: "30px",
        }}
      />

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "15px",
        }}
      >
        Observed/Inferred HCP Sentiment
      </label>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        <label>
          <input
            type="radio"
            checked={formData.sentiment === "Positive"}
            onChange={() =>
              handleChange("sentiment", "Positive")
            }
          />
          😊 Positive
        </label>

        <label>
          <input
            type="radio"
            checked={formData.sentiment === "Neutral"}
            onChange={() =>
              handleChange("sentiment", "Neutral")
            }
          />
          😐 Neutral
        </label>

        <label>
          <input
            type="radio"
            checked={formData.sentiment === "Negative"}
            onChange={() =>
              handleChange("sentiment", "Negative")
            }
          />
          ☹️ Negative
        </label>
      </div>

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        Outcomes
      </label>

      <textarea
        rows="4"
        value={formData.outcomes}
        onChange={(e) =>
          handleChange("outcomes", e.target.value)
        }
        placeholder="Key outcomes or agreements..."
        style={{
          width: "100%",
          padding: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          marginBottom: "25px",
        }}
      />

      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        Follow-up Actions
      </label>

      <textarea
        rows="4"
        value={formData.follow_up_actions}
        onChange={(e) =>
          handleChange("follow_up_actions", e.target.value)
        }
        placeholder="Enter follow-up actions..."
        style={{
          width: "100%",
          padding: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}

export default InteractionForm;