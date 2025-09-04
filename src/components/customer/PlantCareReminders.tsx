'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CareReminder {
    id: string;
    plantName: string;
    plantIcon: string;
    task: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

const mockCareReminders: CareReminder[] = [
    {
        id: '1',
        plantName: 'Monstera Deliciosa',
        plantIcon: '🌿',
        task: 'Water',
        dueDate: 'Today',
        priority: 'high',
        completed: false
    },
    {
        id: '2',
        plantName: 'Snake Plant',
        plantIcon: '🐍',
        task: 'Check for pests',
        dueDate: 'Tomorrow',
        priority: 'medium',
        completed: false
    },
    {
        id: '3',
        plantName: 'Peace Lily',
        plantIcon: '☮️',
        task: 'Fertilize',
        dueDate: 'In 3 days',
        priority: 'low',
        completed: false
    },
    {
        id: '4',
        plantName: 'Fiddle Leaf Fig',
        plantIcon: '🍃',
        task: 'Rotate for sunlight',
        dueDate: 'This week',
        priority: 'medium',
        completed: true
    }
];

function PriorityIndicator({ priority }: { priority: CareReminder['priority'] }) {
    const { theme } = useTheme();

    const getPriorityColor = () => {
        switch (priority) {
            case 'high':
                return theme === 'dark' ? 'bg-red-500' : 'bg-red-500';
            case 'medium':
                return theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-500';
            case 'low':
                return theme === 'dark' ? 'bg-green-500' : 'bg-green-500';
            default:
                return theme === 'dark' ? 'bg-gray-500' : 'bg-gray-500';
        }
    };

    return (
        <div className={`w-3 h-3 rounded-full ${getPriorityColor()}`} />
    );
}

export function PlantCareReminders() {
    const { theme } = useTheme();

    const pendingReminders = mockCareReminders.filter(reminder => !reminder.completed);
    const completedReminders = mockCareReminders.filter(reminder => reminder.completed);

    return (
        <div className={`p-6 rounded-xl border ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Plant Care Reminders
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {pendingReminders.length} tasks pending
                    </p>
                </div>
                <button className={`text-sm font-medium transition-colors ${theme === 'dark'
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-green-600 hover:text-green-500'
                    }`}>
                    Manage
                </button>
            </div>

            {/* Pending Reminders */}
            <div className="space-y-3 mb-6">
                {pendingReminders.map((reminder) => (
                    <div
                        key={reminder.id}
                        className={`p-3 rounded-lg border transition-colors hover:bg-current/5 ${theme === 'dark'
                                ? 'border-gray-700'
                                : 'border-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <button className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${theme === 'dark'
                                    ? 'border-gray-600 hover:border-green-500'
                                    : 'border-gray-300 hover:border-green-500'
                                }`}>
                                {/* Checkbox circle */}
                            </button>

                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-sm">
                                {reminder.plantIcon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {reminder.task}
                                    </p>
                                    <PriorityIndicator priority={reminder.priority} />
                                </div>
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {reminder.plantName} • Due {reminder.dueDate}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Completed Reminders */}
            {completedReminders.length > 0 && (
                <>
                    <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <p className={`text-xs font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            COMPLETED TODAY
                        </p>

                        <div className="space-y-2">
                            {completedReminders.map((reminder) => (
                                <div
                                    key={reminder.id}
                                    className={`p-3 rounded-lg border opacity-60 ${theme === 'dark'
                                            ? 'border-gray-700 bg-gray-700/20'
                                            : 'border-gray-100 bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>

                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-sm">
                                            {reminder.plantIcon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium line-through ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {reminder.task}
                                            </p>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`}>
                                                {reminder.plantName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <button className={`w-full py-2 text-sm font-medium transition-colors rounded-lg ${theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                    View all care tasks →
                </button>
            </div>
        </div>
    );
}
