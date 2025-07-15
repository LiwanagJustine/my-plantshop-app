'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number; // in milliseconds
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
        // Check for duplicate messages (prevent same message within 1 second)
        const now = Date.now();
        const isDuplicate = notifications.some(existing =>
            existing.message === notification.message &&
            existing.type === notification.type
        );

        if (isDuplicate) {
            console.log('Duplicate notification prevented:', notification.message);
            return;
        }

        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: Notification = {
            ...notification,
            id,
            duration: notification.duration || (notification.type === 'success' ? 7000 : 5000), // 7s for success, 5s for others
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto-remove notification after duration
        setTimeout(() => {
            removeNotification(id);
        }, newNotification.duration);
    }, [notifications]);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    return {
        notifications,
        addNotification,
        removeNotification,
        clearAll,
    };
}
