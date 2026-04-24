export function BradsLogoSmall({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center px-3 py-2`}>
      <div className="flex items-center gap-2">
        {/* Circular Logo */}
        <div className="relative flex-shrink-0">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="23" fill="#1E40AF"/>
            <circle cx="25" cy="25" r="16" fill="#3B82F6"/>
            <text x="25" y="31" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">B</text>
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-black text-blue-700">BRAD'S</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-red-600">BIKE</span>
            <span className="text-sm font-black italic text-red-600">SHOP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
