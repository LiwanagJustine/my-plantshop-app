'use client';

import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';

interface UseProductsOptions {
    category?: string;
    inStock?: boolean;
    popular?: boolean;
    limit?: number;
}

interface UseProductsReturn {
    products: Plant[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
    const [products, setProducts] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (options.category) params.append('category', options.category);
            if (options.inStock) params.append('inStock', 'true');
            if (options.popular) params.append('popular', 'true');
            if (options.limit) params.append('limit', options.limit.toString());

            const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
            console.log('🌱 Fetching products from:', url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch products');
            }

            // Transform API data to match Plant interface
            const transformedProducts: Plant[] = result.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                scientificName: item.scientific_name,
                price: parseFloat(item.price),
                originalPrice: item.original_price ? parseFloat(item.original_price) : undefined,
                category: item.category,
                careLevel: item.care_level,
                lightRequirement: item.light_requirement,
                waterFrequency: item.water_frequency,
                size: item.size,
                description: item.description,
                image: item.image,
                inStock: item.in_stock,
                stockQuantity: item.stock_quantity,
                rating: parseFloat(item.rating || '0'),
                reviewCount: item.review_count || 0,
                features: item.features || [],
                isPopular: item.is_popular,
                isOnSale: item.is_on_sale,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }));

            setProducts(transformedProducts);
            console.log(`✅ Loaded ${transformedProducts.length} products from API`);

        } catch (err) {
            console.error('🚨 Error fetching products:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [options.category, options.inStock, options.popular, options.limit]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts
    };
}
