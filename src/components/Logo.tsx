import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <Image
        src="/logo.png"
        alt="BYE AUTO Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 