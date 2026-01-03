import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Good morning! 👋
                </h1>
                <p className="text-muted">
                    Ready to make today productive?
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Today', value: '2h 30m', icon: '⏱️', change: '+45m' },
                    { label: 'This Week', value: '18h 15m', icon: '📊', change: '+3h' },
                    { label: 'Current Streak', value: '7 days', icon: '🔥', change: 'Best!' },
                    { label: 'Goals Progress', value: '68%', icon: '🎯', change: '+12%' },
                ].map((stat, index) => (
                    <GlassCard key={index} variant="solid" padding="md" hover={false}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            </div>
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                        <p className="text-xs text-success mt-2">{stat.change}</p>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Timer */}
                <div className="lg:col-span-2">
                    <GlassCard variant="solid" padding="lg" hover={false}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Active Timer</h2>
                            <Tag color="primary">Ready</Tag>
                        </div>

                        <div className="text-center py-8">
                            <div className="text-6xl font-mono font-bold text-foreground mb-4">
                                00:00:00
                            </div>
                            <p className="text-muted mb-6">What will you focus on?</p>
                            <div className="flex items-center justify-center gap-3">
                                <Button size="lg" className="min-w-[140px]">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Start
                                </Button>
                                <Button variant="secondary" size="lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Quick Entry
                                </Button>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4 mt-4">
                            <p className="text-sm text-muted mb-3">Recent tags:</p>
                            <div className="flex flex-wrap gap-2">
                                <Tag color="primary">React</Tag>
                                <Tag color="info">TypeScript</Tag>
                                <Tag color="success">Node.js</Tag>
                                <Tag color="warning">LeetCode</Tag>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Today's Schedule */}
                <div>
                    <GlassCard variant="solid" padding="lg" hover={false}>
                        <h2 className="text-lg font-semibold text-foreground mb-4">
                            Today&apos;s Schedule
                        </h2>

                        <div className="space-y-3">
                            {[
                                { time: '09:00', title: 'React Study', status: 'completed', duration: '1h 30m' },
                                { time: '11:00', title: 'LeetCode Practice', status: 'current', duration: '1h' },
                                { time: '14:00', title: 'Node.js Project', status: 'upcoming', duration: '2h' },
                                { time: '17:00', title: 'Review & Notes', status: 'upcoming', duration: '30m' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`
                    flex items-center gap-3 p-3 rounded-[var(--radius-base)]
                    ${item.status === 'completed' ? 'bg-success/10' : ''}
                    ${item.status === 'current' ? 'bg-primary/10 border border-primary/20' : ''}
                    ${item.status === 'upcoming' ? 'bg-surface-hover' : ''}
                  `}
                                >
                                    <div className="text-sm text-muted w-12">{item.time}</div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${item.status === 'completed' ? 'line-through text-muted' : 'text-foreground'}`}>
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="text-xs text-muted">{item.duration}</div>
                                </div>
                            ))}
                        </div>

                        <Button variant="ghost" className="w-full mt-4">
                            View Full Schedule
                        </Button>
                    </GlassCard>
                </div>
            </div>

            {/* Goals Progress */}
            <div className="mt-6">
                <GlassCard variant="solid" padding="lg" hover={false}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Active Goals</h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { title: 'Master React', target: '100h', logged: '68h', percent: 68, endDate: 'Jan 30' },
                            { title: 'Complete LeetCode 75', target: '75 problems', logged: '45 done', percent: 60, endDate: 'Feb 15' },
                            { title: 'Build Portfolio', target: '40h', logged: '12h', percent: 30, endDate: 'Feb 28' },
                        ].map((goal, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-[var(--radius-base)] border border-border hover:border-primary/30 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-medium text-foreground">{goal.title}</h3>
                                    <span className="text-xs text-muted">Due {goal.endDate}</span>
                                </div>
                                <div className="mb-2">
                                    <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500"
                                            style={{ width: `${goal.percent}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted">{goal.logged} / {goal.target}</span>
                                    <span className="font-medium text-primary">{goal.percent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </DashboardLayout>
    );
}
