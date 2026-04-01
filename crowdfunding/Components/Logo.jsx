import React from "react";

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Outer hexagon */}
      <polygon
        points="110,10 200,57.5 200,162.5 110,210 20,162.5 20,57.5"
        fill="#3A3A38"
        stroke="#5F5E5A"
        strokeWidth="1.5"
      />

      {/* Mid hex ring */}
      <polygon
        points="110,28 182,70 182,150 110,192 38,150 38,70"
        fill="none"
        stroke="#5F5E5A"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Inner hex ring */}
      <polygon
        points="110,46 164,77.5 164,137.5 110,169 56,137.5 56,77.5"
        fill="none"
        stroke="#444441"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Corner accent dots */}
      <circle cx="110" cy="10"    r="3.5" fill="#5F5E5A" />
      <circle cx="200" cy="57.5"  r="3.5" fill="#5F5E5A" />
      <circle cx="200" cy="162.5" r="3.5" fill="#5F5E5A" />
      <circle cx="110" cy="210"   r="3.5" fill="#5F5E5A" />
      <circle cx="20"  cy="162.5" r="3.5" fill="#5F5E5A" />
      <circle cx="20"  cy="57.5"  r="3.5" fill="#5F5E5A" />

      {/* V mark */}
      <polyline
        points="68,82 110,152 152,82"
        stroke="#F1EFE8"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Accent dot below V apex */}
      <circle cx="110" cy="170" r="6" fill="#B4B2A9" />
    </svg>
  );
};

export default Logo;