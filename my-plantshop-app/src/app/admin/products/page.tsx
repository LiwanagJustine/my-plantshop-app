'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { AdminRouteGuard } from '@/components/auth';
import { useTheme } from '@/context/ThemeContext';
import { useProductToast } from '@/hooks/useProductToast';
import { AdminLink } from '@/components/admin/AdminNavigation';
import AdminPageLoading from '@/components/ui/AdminPageLoading';

interface Product {
    id: number;
    name: string;
    scientific_name: string;
    price: number;
    original_price: number | null;
    category: string;
    care_level: string;
    light_requirement: string;
    water_frequency: string;
    size: string;
    description: string;
    image: string;
    in_stock: boolean;
    stock_quantity: number;
    rating: number;
    review_count: number;
    features: string[];
    is_popular: boolean;
    is_on_sale: boolean;
    created_at: string;
    updated_at: string;
}

export default function AdminProductsPage() {
    const { theme } = useTheme();
    const { showProductDeleted, showStockUpdated, showProductError } = useProductToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/products');
            const data = await response.json();

            console.log('🌱 Products API response:', data);

            if (data.success) {
                setProducts(data.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getUniqueCategories = () => {
        const categories = [...new Set(products.map(p => p.category))];
        return categories.sort();
    };

    const handleDeleteProduct = async (productId: number) => {
        const product = products.find(p => p.id === productId);
        const productName = product?.name || 'Unknown Product';

        if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setProducts(products.filter(p => p.id !== productId));
                showProductDeleted(productName);
            } else {
                showProductError('Failed to delete product. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            showProductError('An error occurred while deleting the product.');
        }
    };

    const toggleProductStock = async (productId: number, currentStock: boolean) => {
        const product = products.find(p => p.id === productId);
        const productName = product?.name || 'Unknown Product';

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ in_stock: !currentStock })
            });

            if (response.ok) {
                setProducts(products.map(p =>
                    p.id === productId ? { ...p, in_stock: !currentStock } : p
                ));
                showStockUpdated(productName, !currentStock);
            } else {
                showProductError('Failed to update stock status. Please try again.');
            }
        } catch (error) {
            console.error('Error updating stock:', error);
            showProductError('An error occurred while updating stock status.');
        }
    };

    if (loading) {
        return (
            <AdminRouteGuard>
                <DashboardLayout>
                    <AdminPageLoading message="Loading products..." />
                </DashboardLayout>
            </AdminRouteGuard>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        <h2 className="text-xl font-semibold mb-2">Error Loading Products</h2>
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <AdminRouteGuard>
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Products Management
                            </h1>
                            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Manage your plant inventory ({products.length} products)
                            </p>
                        </div>
                        <AdminLink
                            href="/admin/products/add"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            showLoading={true}
                        >
                            Add New Product
                        </AdminLink>
                    </div>

                    {/* Products Grid or Empty State */}
                    {products.length === 0 ? (
                        <div className={`rounded-xl border p-8 text-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
                                🌱
                            </div>
                            <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                No Products Yet
                            </h3>
                            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Start building your plant catalog by adding your first product.
                            </p>
                            <button
                                onClick={() => window.location.href = '/admin/products/add'}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Add Your First Product
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${theme === 'dark'
                                        ? 'bg-gray-800 border border-gray-700'
                                        : 'bg-white border border-gray-200'
                                        }`}
                                >
                                    {/* Product Image */}
                                    <div className="aspect-square relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/plants/default.png';
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                                            {product.is_popular && (
                                                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                                    ⭐ Popular
                                                </span>
                                            )}
                                            {product.is_on_sale && (
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                    🏷️ Sale
                                                </span>
                                            )}
                                            {!product.in_stock && (
                                                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                                                    ❌ Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className={`font-semibold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                            {product.name}
                                        </h3>
                                        {product.scientific_name && (
                                            <p className={`text-sm italic mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {product.scientific_name}
                                            </p>
                                        )}

                                        <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {product.description.length > 80 ?
                                                `${product.description.substring(0, 80)}...` :
                                                product.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                                {formatCurrency(product.price)}
                                            </span>
                                            {product.original_price && product.is_on_sale && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatCurrency(product.original_price)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Details Grid */}
                                        <div className={`grid grid-cols-2 gap-2 text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <div>📂 {product.category}</div>
                                            <div>📏 {product.size}</div>
                                            <div>🌱 {product.care_level}</div>
                                            <div>📦 {product.stock_quantity}</div>
                                            <div>💡 {product.light_requirement}</div>
                                            <div>💧 {product.water_frequency}</div>
                                        </div>

                                        {/* Features Tags */}
                                        {product.features && product.features.length > 0 && (
                                            <div className="mb-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {product.features.slice(0, 2).map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                                                                ? 'bg-green-900 text-green-300'
                                                                : 'bg-green-100 text-green-700'
                                                                }`}
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                    {product.features.length > 2 && (
                                                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            +{product.features.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex space-x-2 mb-3">
                                            <AdminLink
                                                href={`/admin/products/${product.id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                                showLoading={true}
                                            >
                                                Edit
                                            </AdminLink>
                                            <button
                                                onClick={() => toggleProductStock(product.id, product.in_stock)}
                                                className={`px-3 py-1 rounded text-sm transition-colors ${product.in_stock
                                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                            >
                                                {product.in_stock ? 'Mark Out of Stock' : 'Mark In Stock'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        {/* Footer */}
                                        <div className={`pt-3 border-t text-xs ${theme === 'dark'
                                            ? 'border-gray-700 text-gray-500'
                                            : 'border-gray-200 text-gray-500'
                                            }`}>
                                            <div className="flex justify-between items-center">
                                                <span>Added: {formatDate(product.created_at)}</span>
                                                <span className={`px-2 py-1 rounded text-xs ${product.in_stock
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    ID: {product.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </AdminRouteGuard>
    );
}
