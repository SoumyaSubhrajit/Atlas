'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface NavBarProps {
    className?: string;
}

export function NavBar({ className = '' }: NavBarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
    ];

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50
        glass
        ${className}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[var(--radius-base)] bg-primary flex items-center justify-center shadow-base">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="font-bold text-xl text-foreground">Atlas</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-muted hover:text-foreground transition-colors duration-[var(--transition-fast)] font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/auth/login">
                            <Button variant="ghost">Log in</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-[var(--radius-base)] hover:bg-surface-hover transition-colors text-muted"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-[var(--radius-base)] transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-4 px-4">
                                <Link href="/auth/login">
                                    <Button variant="secondary" className="w-full">Log in</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button variant="primary" className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default NavBar;
