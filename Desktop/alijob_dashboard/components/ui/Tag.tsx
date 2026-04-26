export function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 9999,
        background: "#F0EDE8",
        color: "#6B6560",
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}
