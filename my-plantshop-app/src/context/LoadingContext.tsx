'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    finishLoading: () => void;
    loadingProgress: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        // Check if user has visited before (simple session storage check)
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
            // Skip loading for returning users in same session
            setIsLoading(false);
            setLoadingProgress(100);
        } else {
            // Show loading for first-time visitors
            sessionStorage.setItem('hasVisited', 'true');

            // Simulate resource loading
            const loadResources = async () => {
                const resources = [
                    // Critical CSS and fonts are usually loaded by Next.js automatically
                    '/images/plants/plant1.png',
                    '/images/plants/plant2.jpg',
                    '/images/plants/plant3.jpg',
                    // Add more critical resources here
                ];

                let loaded = 0;
                const total = resources.length;

                // Simulate loading each resource
                for (const resource of resources) {
                    try {
                        if (resource.endsWith('.png') || resource.endsWith('.jpg')) {
                            await new Promise((resolve) => {
                                const img = new Image();
                                img.onload = () => resolve(null);
                                img.onerror = () => resolve(null); // Continue even if image fails
                                img.src = resource;
                            });
                        }
                    } catch (error) {
                        console.log('Resource loading error:', error);
                    }

                    loaded++;
                    setLoadingProgress((loaded / total) * 100);

                    // Add small delay for smoother progress
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            };

            loadResources();
        }
    }, []);

    const finishLoading = () => {
        setIsLoading(false);
        setHasLoadedOnce(true);
        setLoadingProgress(100);
    };

    return (
        <LoadingContext.Provider value={{
            isLoading,
            setIsLoading,
            finishLoading,
            loadingProgress
        }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
