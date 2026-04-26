interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

export function StarRating({ value, max = 5, size = 14 }: StarRatingProps) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: size, color: i < value ? "#F59E0B" : "#E8E5DF" }}>
          ★
        </span>
      ))}
    </span>
  );
}
