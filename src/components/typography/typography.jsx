import React from "react";
import "components/typography/typography.css";

const Typography = ({
  variant = "body",
  component: Component,
  color = "inherit",
  align = "left",
  gutterBottom = false,
  className = "",
  error = false,
  warning = false,
  success = false,
  info = false,
  children,
  ...props
}) => {
  // Determine the HTML tag based on variant if not explicitly provided
  const Tag =
    Component ||
    (variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : variant === "h4"
      ? "h4"
      : variant === "button"
      ? "span"
      : "p");

  // Determine status color (priority: error > warning > success > info > color prop)
  const statusColor = error
    ? "error"
    : warning
    ? "warning"
    : success
    ? "success"
    : info
    ? "info"
    : color;

  // Combine class names
  const combinedClassName = [
    "typography",
    `typography--${variant}`,
    `typography--align-${align}`,
    `typography--color-${statusColor}`,
    gutterBottom ? "typography--gutter-bottom" : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
