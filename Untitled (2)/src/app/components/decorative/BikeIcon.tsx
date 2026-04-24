export function BikeIcon({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Rear wheel */}
        <circle cx="50" cy="140" r="35" />
        <circle cx="50" cy="140" r="5" fill="currentColor" />

        {/* Front wheel */}
        <circle cx="150" cy="140" r="35" />
        <circle cx="150" cy="140" r="5" fill="currentColor" />

        {/* Frame */}
        <path d="M 50 140 L 100 80 L 150 140" />
        <path d="M 100 80 L 100 60" />
        <path d="M 100 80 L 130 80" />
        <path d="M 130 80 L 150 140" />
        <path d="M 50 140 L 85 140" />

        {/* Handlebars */}
        <path d="M 130 80 L 150 70" />
        <path d="M 145 65 L 155 75" />

        {/* Seat */}
        <ellipse cx="100" cy="55" rx="15" ry="5" fill="currentColor" />

        {/* Pedals */}
        <circle cx="85" cy="140" r="8" />
        <line x1="77" y1="140" x2="93" y2="140" />
        <line x1="85" y1="132" x2="85" y2="148" />
      </g>
    </svg>
  );
}
