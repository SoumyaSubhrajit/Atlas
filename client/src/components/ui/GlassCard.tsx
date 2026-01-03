import React from 'react';

type GlassVariant = 'default' | 'accent' | 'solid';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: GlassVariant;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const variantStyles: Record<GlassVariant, string> = {
    default: 'glass',
    accent: 'glass border-primary/20',
    solid: 'bg-surface border border-border shadow-base',
};

const paddingStyles: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export function GlassCard({
    variant = 'default',
    hover = true,
    padding = 'md',
    children,
    className = '',
    ...props
}: GlassCardProps) {
    const baseStyles = `
    rounded-[var(--radius-lg)]
    transition-all duration-[var(--transition-base)]
  `;

    const hoverStyles = hover
        ? 'hover:scale-[1.01] hover:shadow-lg cursor-pointer'
        : '';

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default GlassCard;
