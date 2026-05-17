const SIZE = 48;

const STAGE_SVGS = {
  seedling: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21v-3 M12 18c-1.5 0-3-1.5-3-3 1.5 0 3 1.5 3 3 M12 18c1.5 0 3-1.5 3-3-1.5 0-3 1.5-3 3" />
    </svg>
  ),
  sprout: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21v-9 M12 12c-2.5 0-5-2-5-5 2.5 0 5 2 5 5 M12 16c2.5 0 5-2 5-5-2.5 0-5 2-5 5" />
    </svg>
  ),
  plant: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V9 M12 9q-2-3 0-6 2 3 0 6 M12 13c-2.5 0-5-2-5-5 2.5 0 5 2 5 5 M12 17c2.5 0 5-2 5-5-2.5 0-5 2-5 5" />
    </svg>
  ),
  bigplant: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V5 M12 17q-4-1-5-5 M12 13q5-1 6-5 M12 9q-3-1-4-4" />
      <path d="M12 5q-1.5-2 0-4 1.5 2 0 4 M7 12c-1.5 0-3-1.5-3-3 1.5 0 3 1.5 3 3 M18 8c1.5 0 3-1.5 3-3-1.5 0-3 1.5-3 3 M8 5c-1.5 0-3-1.5-3-3 1.5 0 3 1.5 3 3" />
    </svg>
  ),
  tree: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21v-7" />
      <path d="M17 14c1.93 0 3.5-1.57 3.5-3.5S18.93 7 17 7c-0.5-2.26-2.52-4-5-4s-4.5 1.74-5 4C5.07 7 3.5 8.57 3.5 10.5S5.07 14 7 14h10z" />
    </svg>
  ),
  fruit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7.5 C9 4.5 4 5.5 4 11 C4 16.5 8 21 12 19.5 C16 21 20 16.5 20 11 C20 5.5 15 4.5 12 7.5 Z" />
      <path d="M12 7.5 V3" />
      <path d="M12 5 C12 3.5 13.5 3 15 3 C15 4.5 13.5 5 12 5 Z" />
    </svg>
  ),
};

export default function PlantIcon({ stage }) {
  const svg = STAGE_SVGS[stage] ?? STAGE_SVGS.seedling;
  return (
    <div className="plant-icon" data-stage={stage ?? "seedling"} data-testid="plant-icon">
      {svg}
    </div>
  );
}
