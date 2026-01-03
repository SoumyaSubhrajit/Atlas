import { NavBar } from '@/components/layout/NavBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  const howItWorks = [
    {
      step: '01',
      title: 'Start Your Timer',
      description: 'Begin tracking with a single click. Tag your sessions for better organization.',
    },
    {
      step: '02',
      title: 'Set Your Goals',
      description: 'Define targets with deadlines. Break them into milestones for steady progress.',
    },
    {
      step: '03',
      title: 'Build Routines',
      description: 'Create recurring schedules that stick. Never miss a study session.',
    },
    {
      step: '04',
      title: 'Get AI Insights',
      description: 'Receive personalized recommendations based on your patterns and goals.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Get started in minutes and transform your productivity journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Powerful features designed for serious learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⏱️',
                title: 'Time Tracking',
                description: 'Precise tracking with tags, notes, and automatic duration calculation.',
              },
              {
                icon: '🎯',
                title: 'Goal Management',
                description: 'Set targets, track milestones, and visualize your progress over time.',
              },
              {
                icon: '📅',
                title: 'Smart Planner',
                description: 'Create recurring routines and drag-drop scheduling with calendar sync.',
              },
              {
                icon: '📊',
                title: 'Rich Analytics',
                description: 'Detailed charts, streak tracking, and productivity insights.',
              },
              {
                icon: '🤖',
                title: 'AI Recommendations',
                description: 'Personalized suggestions based on your study patterns and goals.',
              },
              {
                icon: '🔗',
                title: 'Integrations',
                description: 'Connect with GitHub, Google Calendar, and more.',
              },
            ].map((feature, index) => (
              <GlassCard key={index} variant="solid" padding="lg" hover={true}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-pastel">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Level Up Your Productivity?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already tracking their progress
            and achieving their goals with Atlas.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="min-w-[200px]">
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[var(--radius-base)] bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-foreground">Atlas</span>
            </div>
            <p className="text-sm text-muted">
              © 2026 Atlas. Built for learners, by learners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}