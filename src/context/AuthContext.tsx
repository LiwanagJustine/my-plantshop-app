'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        console.log('🔥 checkAuth called, current user state:', user);
        try {
            // Check localStorage first for development
            const localToken = localStorage.getItem('auth-token');
            console.log('🔥 localStorage token:', localToken ? 'present' : 'missing');

            if (localToken) {
                // Try to verify the token
                const response = await fetch('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${localToken}`
                    }
                });
                console.log('🔥 checkAuth with Bearer token status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('🔥 checkAuth received user data:', data.user);
                    setUser(data.user);
                    return;
                }
            }

            // Fallback to cookie-based auth for production
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            });
            console.log('🔥 checkAuth cookie response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('🔥 checkAuth received user data from cookie:', data.user);
                setUser(data.user);
            } else {
                console.log('🔥 checkAuth failed, clearing user state');
                setUser(null);
                // Clear invalid localStorage token
                localStorage.removeItem('auth-token');
            }
        } catch (error) {
            console.error('🚨 Auth check failed:', error);
            setUser(null);
            localStorage.removeItem('auth-token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe = false) => {
        console.log('🔥 AuthContext login called with:', { email, rememberMe });

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies are included
                body: JSON.stringify({ email, password, rememberMe }),
            });

            console.log('🔥 Login API response status:', response.status);
            console.log('🔥 Login API response ok:', response.ok);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('🚨 Login API error response:', errorData);
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            console.log('🔥 AuthContext login - received data:', data);
            console.log('🔥 AuthContext login - setting user:', data.user);

            // Set user state
            setUser(data.user);

            // Also store token in localStorage as backup for development
            if (data.token) {
                localStorage.setItem('auth-token', data.token);
                console.log('🔥 Token stored in localStorage');
            }

            console.log('🔥 AuthContext login - user state updated successfully');

        } catch (error) {
            console.error('🚨 AuthContext login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            setUser(null);
            // Clear localStorage token
            localStorage.removeItem('auth-token');
            // Force a hard redirect to ensure middleware processes the cleared cookie
            window.location.href = '/';
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
