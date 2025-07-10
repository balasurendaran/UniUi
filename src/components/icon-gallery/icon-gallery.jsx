import React from "react";
import { ICONS } from "components/constants/icon-mapper";

const IconsGallery = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Icons Gallery</h1>
      <div style={styles.grid}>
        {Object.entries(ICONS).map(([name, IconComponent]) => (
          <div key={name} style={styles.iconContainer}>
            <div style={styles.iconWrapper}>
              {React.createElement(IconComponent)}
            </div>
            <span style={styles.iconName}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    transition: "all 0.2s ease",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#e0e0e0",
      transform: "scale(1.05)",
    },
  },
  iconWrapper: {
    fontSize: "32px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconName: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    wordBreak: "break-word",
  },
};

export default IconsGallery;
