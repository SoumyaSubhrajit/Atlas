import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

interface HeroSectionProps {
    className?: string;
}

export function HeroSection({ className = '' }: HeroSectionProps) {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Smart Timer',
            description: 'Track study sessions with tags and auto-duration calculation',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Goal Tracking',
            description: 'Set targets, track milestones, and visualize your progress',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: 'AI Insights',
            description: 'Get personalized recommendations to boost your productivity',
        },
    ];

    return (
        <section
            className={`
        relative min-h-screen pt-24 pb-16 overflow-hidden
        bg-gradient-pastel
        ${className}
      `}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-mid/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-end/50 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Now with AI-powered insights
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                        Master Your Study Time with{' '}
                        <span className="text-gradient">Atlas</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
                        The all-in-one productivity tracker designed for learners.
                        Track time, set goals, build routines, and get AI-powered insights
                        to accelerate your growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth/signup">
                            <Button size="lg" className="min-w-[180px]">
                                Start Free Trial
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="secondary" size="lg" className="min-w-[180px]">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <GlassCard
                            key={index}
                            padding="lg"
                            hover={true}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-primary/10 text-primary mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted text-sm">
                                {feature.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 text-center">
                    <p className="text-sm text-muted mb-6">Trusted by learners worldwide</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                        <div>
                            <div className="text-3xl font-bold text-foreground">10K+</div>
                            <div className="text-sm text-muted">Active Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-foreground">500K+</div>
                            <div className="text-sm text-muted">Hours Tracked</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-foreground">95%</div>
                            <div className="text-sm text-muted">Goal Completion</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
