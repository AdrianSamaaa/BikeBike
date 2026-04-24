export function GearIcon({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="3" fill="none">
        {/* Outer gear teeth */}
        <path d="M 50 5 L 55 15 L 45 15 Z" />
        <path d="M 73.3 14.4 L 75.6 25 L 67 20 Z" />
        <path d="M 85.6 26.7 L 80 35 L 75 25.6 Z" />
        <path d="M 95 50 L 85 55 L 85 45 Z" />
        <path d="M 85.6 73.3 L 75 75.6 L 80 67 Z" />
        <path d="M 73.3 85.6 L 67 80 L 75.6 75 Z" />
        <path d="M 50 95 L 45 85 L 55 85 Z" />
        <path d="M 26.7 85.6 L 25 75.6 L 33 80 Z" />
        <path d="M 14.4 73.3 L 20 67 L 25 75.6 Z" />
        <path d="M 5 50 L 15 45 L 15 55 Z" />
        <path d="M 14.4 26.7 L 25 25 L 20 33 Z" />
        <path d="M 26.7 14.4 L 33 20 L 25 25.6 Z" />

        {/* Outer circle */}
        <circle cx="50" cy="50" r="30" />

        {/* Inner circle */}
        <circle cx="50" cy="50" r="12" fill="currentColor" />
      </g>
    </svg>
  );
}
