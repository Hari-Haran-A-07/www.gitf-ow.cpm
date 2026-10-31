'use client';

import React from 'react';

interface GitHubMarkProps {
  size?: number;
  className?: string;
  fill?: string;
}

/**
 * Official GitHub Invertocat / Octocat Mark
 * Used strictly for GitHub account connection and authorized GitHub integration references.
 */
export const GitHubMark: React.FC<GitHubMarkProps> = ({
  size = 24,
  className = '',
  fill = '#FFFFFF',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GitHub Mark"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.34 0-1.16-.046-5.074-.067-9.236-13.59 2.977-16.455-6.505-16.455-6.505-2.222-5.703-5.426-7.225-5.426-7.225-4.436-3.056.335-2.99.335-2.99 4.908.345 7.492 5.077 7.492 5.077 4.36 7.54 11.435 5.361 14.225 4.098.44-3.187 1.706-5.368 3.106-6.602-10.846-1.24-22.25-5.464-22.25-24.327 0-5.376 1.91-9.77 5.05-13.21-.506-1.246-2.19-6.254.48-13.028 0 0 4.1-1.324 13.435 5.05a46.29 46.29 0 0 1 12.24-1.655c4.15.02 8.326.565 12.24 1.655 9.324-6.374 13.413-5.05 13.413-5.05 2.68 6.774 1 11.782.49 13.028 3.15 3.44 5.04 7.834 5.04 13.21 0 18.913-11.42 23.07-22.31 24.28 1.76 1.53 3.34 4.54 3.34 9.15 0 6.61-.06 11.94-.06 13.57 0 1.29.87 2.86 3.34 2.38C84.03 89.37 98 70.96 98 49.217 98 22 76.15 0 48.854 0z"
        fill={fill}
      />
    </svg>
  );
};
