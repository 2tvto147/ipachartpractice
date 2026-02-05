import "../Button.css";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
