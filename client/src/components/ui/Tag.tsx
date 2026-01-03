import React from 'react';

type TagColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type TagSize = 'sm' | 'md';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: TagColor;
    size?: TagSize;
    removable?: boolean;
    onRemove?: () => void;
    children: React.ReactNode;
}

const colorStyles: Record<TagColor, string> = {
    default: 'bg-surface-hover text-foreground border-border',
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success-light text-success border-success/20',
    warning: 'bg-warning-light text-warning border-warning/20',
    error: 'bg-error-light text-error border-error/20',
    info: 'bg-info-light text-info border-info/20',
};

const sizeStyles: Record<TagSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
};

export function Tag({
    color = 'default',
    size = 'md',
    removable = false,
    onRemove,
    children,
    className = '',
    ...props
}: TagProps) {
    const baseStyles = `
    inline-flex items-center gap-1.5
    font-medium rounded-full border
    transition-colors duration-[var(--transition-fast)]
  `;

    return (
        <span
            className={`${baseStyles} ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
            {removable && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.();
                    }}
                    className="ml-0.5 hover:text-foreground transition-colors"
                    aria-label="Remove tag"
                >
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </span>
    );
}

export default Tag;
