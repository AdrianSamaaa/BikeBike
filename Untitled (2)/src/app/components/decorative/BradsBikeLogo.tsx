export function BradsBikeLogo({ className = "h-20 w-auto" }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-lg shadow-lg overflow-hidden flex items-center px-4`}>
      <div className="flex items-center gap-2">
        {/* Left Gear Logo */}
        <div className="relative">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="#1E40AF" stroke="#2563EB" strokeWidth="2"/>
            {/* Gear teeth */}
            <circle cx="30" cy="30" r="20" fill="#3B82F6"/>
            <text x="30" y="38" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">B</text>
            <circle cx="30" cy="30" r="12" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
          <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -right-3 top-1/2 -translate-y-1/2">
            <circle cx="20" cy="20" r="18" fill="#2563EB"/>
            <circle cx="20" cy="20" r="8" fill="#60A5FA"/>
          </svg>
        </div>

        {/* Text Logo */}
        <div className="ml-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-700">BRAD'S</span>
            <svg width="30" height="30" viewBox="0 0 30 30" className="inline-block">
              <circle cx="15" cy="15" r="12" fill="none" stroke="#3B82F6" strokeWidth="2"/>
              <circle cx="15" cy="15" r="6" fill="none" stroke="#3B82F6" strokeWidth="2"/>
              <line x1="15" y1="3" x2="15" y2="9" stroke="#3B82F6" strokeWidth="2"/>
              <line x1="15" y1="21" x2="15" y2="27" stroke="#3B82F6" strokeWidth="2"/>
              <line x1="3" y1="15" x2="9" y2="15" stroke="#3B82F6" strokeWidth="2"/>
              <line x1="21" y1="15" x2="27" y2="15" stroke="#3B82F6" strokeWidth="2"/>
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-4xl font-black text-red-600">BIKE</span>
            <span className="text-4xl font-black italic text-red-600">SHOP</span>
            <svg width="50" height="30" viewBox="0 0 50 30" className="ml-1">
              <circle cx="12" cy="20" r="8" fill="none" stroke="#2563EB" strokeWidth="3"/>
              <circle cx="38" cy="20" r="8" fill="none" stroke="#2563EB" strokeWidth="3"/>
              <path d="M 12 20 L 25 8 L 38 20" stroke="#2563EB" strokeWidth="3" fill="none"/>
              <line x1="25" y1="8" x2="25" y2="3" stroke="#2563EB" strokeWidth="3"/>
            </svg>
          </div>
          <div className="bg-yellow-400 px-2 py-0.5 mt-1">
            <span className="text-xs font-bold text-blue-900 tracking-wider">BICYCLE PARTS • ACCESSORIES • SERVICES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
