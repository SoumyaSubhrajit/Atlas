import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function DashboardLayout({ children, className = '' }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className={`flex-1 overflow-y-auto ${className}`}>
                <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;
