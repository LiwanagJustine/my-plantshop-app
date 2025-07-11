'use client';

import React, { forwardRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
    delay?: number;
    duration?: number;
    threshold?: number;
    as?: React.ElementType;
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({
    children,
    className = '',
    animation = 'fadeIn',
    delay = 0,
    duration = 600,
    threshold = 0.1,
    as: Component = 'div',
}, ref) => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold });

    const animationClasses = {
        fadeIn: {
            initial: 'opacity-0',
            animate: 'opacity-100',
            transition: 'transition-opacity duration-700 ease-out'
        },
        slideUp: {
            initial: 'opacity-0 translate-y-8',
            animate: 'opacity-100 translate-y-0',
            transition: 'transition-all duration-700 ease-out'
        },
        slideInLeft: {
            initial: 'opacity-0 -translate-x-8',
            animate: 'opacity-100 translate-x-0',
            transition: 'transition-all duration-700 ease-out'
        },
        slideInRight: {
            initial: 'opacity-0 translate-x-8',
            animate: 'opacity-100 translate-x-0',
            transition: 'transition-all duration-700 ease-out'
        },
        scaleIn: {
            initial: 'opacity-0 scale-95',
            animate: 'opacity-100 scale-100',
            transition: 'transition-all duration-700 ease-out'
        }
    };

    const selectedAnimation = animationClasses[animation];

    const delayClasses = {
        0: '',
        100: 'delay-100',
        200: 'delay-200',
        300: 'delay-300',
        500: 'delay-500',
    };

    const delayClass = delayClasses[delay as keyof typeof delayClasses] || '';

    const combinedClasses = `
        ${selectedAnimation.transition}
        ${delayClass}
        ${isVisible ? selectedAnimation.animate : selectedAnimation.initial}
        ${className}
    `.trim();

    return React.createElement(
        Component,
        {
            ref: ref || elementRef,
            className: combinedClasses,
        },
        children
    );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
