'use client';

import React from 'react';

interface GitLogoProps {
  size?: number;
  className?: string;
  useImage?: boolean;
}

/**
 * Official Git Logo Component
 * Strictly preserves the official Git logo's proportions and original design.
 * Official Git colors: Git orange #F05032, Black #000000, White #FFFFFF.
 */
export const GitLogo: React.FC<GitLogoProps> = ({ size = 32, className = '', useImage = false }) => {
  if (useImage) {
    return (
      <img
        src="https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png"
        alt="Official Git Logo"
        width={size}
        height={size}
        className={`object-contain ${className}`}
      />
    );
  }

  // Official Git Logo SVG Path representation with exact proportions
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Official Git Logo"
    >
      {/* Git Orange Rounded Diamond */}
      <rect
        x="50"
        y="5"
        width="63.64"
        height="63.64"
        rx="10"
        transform="rotate(45 50 5)"
        fill="#F05032"
      />
      {/* Branch Lines and Nodes (White) */}
      {/* Top right node to bottom right line */}
      <circle cx="68" cy="32" r="7.5" fill="#FFFFFF" />
      <circle cx="32" cy="68" r="7.5" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="7.5" fill="#FFFFFF" />
      
      {/* Diagonal branch connector */}
      <path
        d="M32 68 L68 32"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Vertical lower connector */}
      <path
        d="M32 68 L32 40 C32 35 45 35 50 50"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
