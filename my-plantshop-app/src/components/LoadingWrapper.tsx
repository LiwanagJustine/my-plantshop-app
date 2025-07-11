'use client';

import { useLoading } from '../context/LoadingContext';
import PageLoader from '../components/ui/PageLoader';

interface LoadingWrapperProps {
    children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
    const { isLoading, finishLoading } = useLoading();

    if (isLoading) {
        return <PageLoader onLoadingComplete={finishLoading} minLoadingTime={2500} />;
    }

    return <>{children}</>;
}
