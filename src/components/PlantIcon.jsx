const SIZE = 48;

const STAGE_SVGS = {
  seedling: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 6 38 Q 24 48 42 38" />
      <ellipse cx="24" cy="34" rx="5" ry="4" />
      <path d="M 24 30 Q 28 24 26 20" />
    </svg>
  ),
  sprout: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 24 42 L 24 16" />
      <path d="M 24 28 Q 12 24 10 32 Q 16 28 24 28" />
      <path d="M 24 28 Q 36 24 38 32 Q 32 28 24 28" />
    </svg>
  ),
  plant: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 24 44 L 24 8" />
      <path d="M 24 32 Q 12 26 10 34 Q 16 30 24 32" />
      <path d="M 24 32 Q 36 26 38 34 Q 32 30 24 32" />
      <path d="M 24 18 Q 10 12 8 20 Q 14 16 24 18" />
      <path d="M 24 18 Q 38 12 40 20 Q 34 16 24 18" />
    </svg>
  ),
  bigplant: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22 44 L 22 14" />
      <path d="M 26 44 L 26 14" />
      <path d="M 24 32 Q 10 24 8 34 Q 14 28 24 32" />
      <path d="M 24 30 Q 38 24 40 34 Q 34 28 24 30" />
      <path d="M 24 20 Q 8 12 6 22 Q 12 16 24 20" />
      <path d="M 24 18 Q 40 10 42 20 Q 36 14 24 18" />
      <path d="M 22 44 Q 18 46 14 44" />
      <path d="M 26 44 Q 30 46 34 44" />
    </svg>
  ),
  tree: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22 44 L 22 26" />
      <path d="M 26 44 L 26 26" />
      <path d="M 8 28 Q 24 4 40 28 Q 24 20 8 28" />
    </svg>
  ),
  fruit: (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22 44 L 22 26" />
      <path d="M 26 44 L 26 26" />
      <path d="M 8 28 Q 24 4 40 28 Q 24 20 8 28" />
      <circle cx="18" cy="20" r="3" fill="currentColor" stroke="none" />
      <circle cx="26" cy="16" r="3" fill="currentColor" stroke="none" />
      <circle cx="22" cy="26" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function PlantIcon({ stage, size = 48 }) {
  const svg = STAGE_SVGS[stage] ?? STAGE_SVGS.seedling;
  return (
    <div className="plant-icon" data-stage={stage ?? "seedling"} data-testid="plant-icon">
      {svg}
    </div>
  );
}
