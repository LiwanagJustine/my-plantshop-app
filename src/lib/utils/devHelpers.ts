// Dev helper functions - remove in production

export function resetLoadingState() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('hasVisited');
        window.location.reload();
    }
}

// Add this to console for testing:
// window.resetLoader = () => { sessionStorage.removeItem('hasVisited'); window.location.reload(); }

if (typeof window !== 'undefined') {
    (window as any).resetLoader = resetLoadingState;
}
