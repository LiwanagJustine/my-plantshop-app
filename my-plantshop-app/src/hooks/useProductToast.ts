'use client';

import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export function useProductToast() {
    const { addToast } = useToast();
    const router = useRouter();

    const showProductSuccess = (productName: string, productId?: number) => {
        addToast({
            type: 'success',
            title: 'Product Created Successfully! 🌱',
            message: `"${productName}" has been added to your inventory.`,
            duration: 6000,
            action: {
                label: 'View Product',
                onClick: () => {
                    if (productId) {
                        router.push(`/admin/products/${productId}`);
                    } else {
                        router.push('/admin/products');
                    }
                }
            }
        });
    };

    const showProductError = (error: string) => {
        addToast({
            type: 'error',
            title: 'Failed to Create Product',
            message: error,
            duration: 8000,
        });
    };

    const showProductUpdate = (productName: string) => {
        addToast({
            type: 'success',
            title: 'Product Updated! ✨',
            message: `"${productName}" has been successfully updated.`,
            duration: 5000,
            action: {
                label: 'View All Products',
                onClick: () => router.push('/admin/products')
            }
        });
    };

    const showProductDeleted = (productName: string) => {
        addToast({
            type: 'warning',
            title: 'Product Deleted',
            message: `"${productName}" has been removed from your inventory.`,
            duration: 5000,
        });
    };

    const showStockUpdated = (productName: string, inStock: boolean) => {
        addToast({
            type: 'info',
            title: 'Stock Status Updated',
            message: `"${productName}" is now marked as ${inStock ? 'in stock' : 'out of stock'}.`,
            duration: 4000,
        });
    };

    const showValidationError = (message: string) => {
        addToast({
            type: 'warning',
            title: 'Please Check Your Input',
            message: message,
            duration: 6000,
        });
    };

    return {
        showProductSuccess,
        showProductError,
        showProductUpdate,
        showProductDeleted,
        showStockUpdated,
        showValidationError,
    };
}
