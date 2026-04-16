export default function Button({
  children,
  type = "button",
  variant = "primary", // default defined here
  className = "",
  ...props
}) {
  const base =
    "px-6 py-2.5 rounded-lg font-semibold tracking-wide transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-black hover:opacity-90",

    ghost:
      "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-primary)]",

    outline:
      "border border-white/10 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${base} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}