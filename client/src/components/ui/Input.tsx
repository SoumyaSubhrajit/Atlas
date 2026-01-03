import React, { forwardRef } from 'react';

type InputVariant = 'default' | 'glass';
type InputState = 'default' | 'error' | 'success';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    state?: InputState;
    label?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
    default: `
    bg-surface border border-border
    focus:border-primary focus:ring-2 focus:ring-primary/20
  `,
    glass: `
    glass
    focus:border-primary/50 focus:ring-2 focus:ring-primary/20
  `,
};

const stateStyles: Record<InputState, string> = {
    default: '',
    error: 'border-error! focus:border-error! focus:ring-error/20!',
    success: 'border-success! focus:border-success! focus:ring-success/20!',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant = 'default',
            state = 'default',
            label,
            helperText,
            leftIcon,
            rightIcon,
            className = '',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const baseStyles = `
      w-full px-4 py-2.5
      rounded-[var(--radius-base)]
      text-foreground placeholder:text-muted-light
      transition-all duration-[var(--transition-fast)]
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

        const helperColor = {
            default: 'text-muted',
            error: 'text-error',
            success: 'text-success',
        };

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              ${baseStyles}
              ${variantStyles[variant]}
              ${stateStyles[state]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `}
                        {...props}
                    />
                    {rightIcon && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                            {rightIcon}
                        </span>
                    )}
                </div>
                {helperText && (
                    <span className={`text-sm ${helperColor[state]}`}>{helperText}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
