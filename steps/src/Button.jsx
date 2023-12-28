export function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ color: textColor, background: bgColor }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
