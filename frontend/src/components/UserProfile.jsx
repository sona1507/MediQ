import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState({
    personal: true,
    address: false,
    health: false,
    prefs: false,
    security: false,
  });

  const toggleSection = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-alert">User not logged in.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 My Profile</h2>

      <div className="profile-card">
        {/* Section Generator */}
        {[
          {
            key: "personal",
            title: "Personal Information",
            fields: [
              { label: "Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Phone", value: user.phone },
              { label: "Date of Birth", value: user.dob },
              { label: "Gender", value: user.gender },
            ],
          },
          {
            key: "address",
            title: "Address",
            fields: [
              { label: "Street", value: user.address?.street },
              { label: "City", value: user.address?.city },
              { label: "State", value: user.address?.state },
              { label: "Pincode", value: user.address?.pincode },
            ],
          },
          {
            key: "health",
            title: "Health Information",
            fields: [
              { label: "Allergies", value: user.allergies },
              { label: "Current Medications", value: user.currentMedications },
              { label: "Chronic Conditions", value: user.chronicConditions },
            ],
          },
          {
            key: "prefs",
            title: "Preferences",
            fields: [
              { label: "Communication", value: user.communicationPref },
              {
                label: "Refill Reminders",
                value: user.refillReminders ? "Enabled" : "Disabled",
              },
            ],
          },
          {
            key: "security",
            title: "Account Security",
            fields: [
              { label: "Role", value: user.role },
              {
                label: "Two-Factor Auth",
                value: user.twoFactor ? "Enabled" : "Disabled",
              },
            ],
          },
        ].map((section) => (
          <div key={section.key} className="profile-section">
            <h3
              className="section-heading clickable"
              onClick={() => toggleSection(section.key)}
            >
              {section.title}
            </h3>
            {open[section.key] && (
              <div className="section-body">
                {section.fields.map((field, index) => (
                  <div key={index} className="profile-item">
                    <span className="profile-label">{field.label}</span>
                    <span className="profile-value">
                      {field.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="logout-btn" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
