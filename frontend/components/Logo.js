export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#3B82F6"/>
      <path 
        d="M12 20L18 26L28 14" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <rect x="8" y="8" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
      <rect x="26" y="8" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
      <rect x="8" y="26" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
      <rect x="26" y="26" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
    </svg>
  )
}
