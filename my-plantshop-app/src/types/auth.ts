export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    avatar?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}
