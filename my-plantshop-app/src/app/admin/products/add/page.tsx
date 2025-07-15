'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { AdminRouteGuard } from '@/components/auth';
import { useTheme } from '@/context/ThemeContext';
import { fetchExchangeRate, convertCurrency, getCurrencySymbol, FALLBACK_USD_TO_PHP } from '@/lib/utils/currency';

interface ProductFormData {
    name: string;
    scientificName: string;
    description: string;
    price: string;
    originalPrice: string;
    category: string;
    stock: string;
    image: string;
    careLevel: string;
    wateringFrequency: string;
    lightRequirement: string;
    size: string;
    humidity: string;
    temperature: string;
    fertilizer: string;
    repotting: string;
    toxicity: string;
    growth: string;
    bloomingSeason: string;
    specialNotes: string;
    isPopular: boolean;
    isOnSale: boolean;
}

export default function AddProductPage() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<'basic' | 'care' | 'additional'>('basic');
    const [currency, setCurrency] = useState<'USD' | 'PHP'>('USD');
    const [exchangeRate, setExchangeRate] = useState(FALLBACK_USD_TO_PHP);
    const [isLoadingRate, setIsLoadingRate] = useState(false);

    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        scientificName: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        image: '',
        careLevel: 'Easy',
        wateringFrequency: 'Weekly',
        lightRequirement: 'Medium',
        size: 'Medium',
        humidity: '',
        temperature: '',
        fertilizer: '',
        repotting: '',
        toxicity: '',
        growth: '',
        bloomingSeason: '',
        specialNotes: '',
        isPopular: false,
        isOnSale: false
    });

    const [errors, setErrors] = useState<Partial<ProductFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Fetch live exchange rate on component mount
    useEffect(() => {
        const loadExchangeRate = async () => {
            setIsLoadingRate(true);
            try {
                const rate = await fetchExchangeRate();
                setExchangeRate(rate);
            } catch (error) {
                console.warn('Using fallback exchange rate');
            } finally {
                setIsLoadingRate(false);
            }
        };

        loadExchangeRate();
    }, []);

    const handleInputChange = (field: keyof ProductFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Currency conversion functions
    const convertPrice = (price: string, fromCurrency: 'USD' | 'PHP', toCurrency: 'USD' | 'PHP'): string => {
        if (!price || fromCurrency === toCurrency) return price;
        const numPrice = parseFloat(price);
        if (isNaN(numPrice)) return price;

        const converted = convertCurrency(numPrice, fromCurrency, toCurrency, exchangeRate);
        return converted.toFixed(2);
    };

    const handleCurrencyToggle = () => {
        const newCurrency = currency === 'USD' ? 'PHP' : 'USD';

        // Convert existing prices
        const convertedPrice = convertPrice(formData.price, currency, newCurrency);
        const convertedOriginalPrice = convertPrice(formData.originalPrice, currency, newCurrency);

        setFormData(prev => ({
            ...prev,
            price: convertedPrice,
            originalPrice: convertedOriginalPrice
        }));

        setCurrency(newCurrency);
    };

    const formatCurrencyDisplay = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (isNaN(num)) return '';

        return `${getCurrencySymbol(currency)}${num.toFixed(2)}`;
    };

    const getConvertedAmount = (amount: string, targetCurrency: 'USD' | 'PHP') => {
        if (!amount) return '';
        const num = parseFloat(amount);
        if (isNaN(num)) return '';

        const converted = convertCurrency(num, currency, targetCurrency, exchangeRate);
        return `${getCurrencySymbol(targetCurrency)}${converted.toFixed(2)}`;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('File too large. Maximum size is 5MB.');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (): Promise<string> => {
        if (!imageFile) return '';

        setIsUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                return result.url;
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        } finally {
            setIsUploadingImage(false);
        }
    };

    const validateForm = () => {
        const newErrors: Partial<ProductFormData> = {};

        // Basic Info validation
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.price.trim()) newErrors.price = 'Price is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.stock.trim()) newErrors.stock = 'Stock quantity is required';

        // Care Details validation
        if (!formData.careLevel.trim()) newErrors.careLevel = 'Care level is required';
        if (!formData.wateringFrequency.trim()) newErrors.wateringFrequency = 'Watering frequency is required';
        if (!formData.lightRequirement.trim()) newErrors.lightRequirement = 'Light requirement is required';

        // Price validation
        if (formData.price && isNaN(parseFloat(formData.price))) {
            newErrors.price = 'Price must be a valid number';
        }
        if (formData.originalPrice && isNaN(parseFloat(formData.originalPrice))) {
            newErrors.originalPrice = 'Original price must be a valid number';
        }
        if (formData.stock && isNaN(parseInt(formData.stock))) {
            newErrors.stock = 'Stock must be a valid number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload image first if one is selected
            let imageUrl = formData.image;
            if (imageFile) {
                imageUrl = await uploadImage();
            }

            // Convert prices to USD for storage (database stores in USD)
            const priceInUSD = convertCurrency(
                parseFloat(formData.price),
                currency,
                'USD',
                exchangeRate
            );

            const originalPriceInUSD = formData.originalPrice ?
                convertCurrency(
                    parseFloat(formData.originalPrice),
                    currency,
                    'USD',
                    exchangeRate
                ) : null;

            // Build features array more safely
            const featuresArray = [];
            if (formData.humidity?.trim()) featuresArray.push(`Humidity: ${formData.humidity.trim()}`);
            if (formData.temperature?.trim()) featuresArray.push(`Temperature: ${formData.temperature.trim()}`);
            if (formData.fertilizer?.trim()) featuresArray.push(`Fertilizer: ${formData.fertilizer.trim()}`);
            if (formData.repotting?.trim()) featuresArray.push(`Repotting: ${formData.repotting.trim()}`);
            if (formData.toxicity?.trim()) featuresArray.push(`Toxicity: ${formData.toxicity.trim()}`);
            if (formData.growth?.trim()) featuresArray.push(`Growth Rate: ${formData.growth.trim()}`);
            if (formData.bloomingSeason?.trim()) featuresArray.push(`Blooming: ${formData.bloomingSeason.trim()}`);
            if (formData.specialNotes?.trim()) featuresArray.push(`Notes: ${formData.specialNotes.trim()}`);

            console.log('🌱 Prepared data for submission:', {
                name: formData.name,
                scientificName: formData.scientificName,
                description: formData.description,
                price: priceInUSD,
                originalPrice: originalPriceInUSD,
                category: formData.category,
                stockQuantity: parseInt(formData.stock),
                size: formData.size,
                image: imageUrl,
                careLevel: formData.careLevel,
                lightRequirement: formData.lightRequirement,
                waterFrequency: formData.wateringFrequency,
                features: featuresArray,
                isPopular: formData.isPopular,
                isOnSale: formData.isOnSale
            });

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    scientificName: formData.scientificName,
                    description: formData.description,
                    price: priceInUSD,
                    originalPrice: originalPriceInUSD,
                    category: formData.category,
                    stockQuantity: parseInt(formData.stock),
                    size: formData.size,
                    image: imageUrl,
                    careLevel: formData.careLevel,
                    lightRequirement: formData.lightRequirement,
                    waterFrequency: formData.wateringFrequency,
                    features: featuresArray,
                    isPopular: formData.isPopular,
                    isOnSale: formData.isOnSale
                }),
            });

            console.log('🌱 Product submission response status:', response.status);
            const responseData = await response.json();
            console.log('🌱 Product submission response data:', responseData);

            if (response.ok) {
                // Reset form
                setFormData({
                    name: '',
                    scientificName: '',
                    description: '',
                    price: '',
                    originalPrice: '',
                    category: '',
                    stock: '',
                    image: '',
                    careLevel: 'Easy',
                    wateringFrequency: 'Weekly',
                    lightRequirement: 'Medium',
                    size: 'Medium',
                    humidity: '',
                    temperature: '',
                    fertilizer: '',
                    repotting: '',
                    toxicity: '',
                    growth: '',
                    bloomingSeason: '',
                    specialNotes: '',
                    isPopular: false,
                    isOnSale: false
                });
                setImageFile(null);
                setImagePreview('');
                setActiveTab('basic');
                alert(`Product added successfully! Product ID: ${responseData.data?.id}`);

                // Optionally redirect to products page after successful addition
                setTimeout(() => {
                    window.location.href = '/admin/products';
                }, 2000);
            } else {
                const errorData = responseData || await response.json();
                alert(`Failed to add product: ${errorData.error || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabButtonClass = (tabName: string) => `
        px-4 py-2 text-sm font-medium rounded-lg transition-colors
        ${activeTab === tabName
            ? theme === 'dark'
                ? 'bg-green-600 text-white'
                : 'bg-green-600 text-white'
            : theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }
    `;

    const inputClass = `
        w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
        ${theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }
    `;

    const selectClass = `
        w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
        ${theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        }
    `;

    return (
        <AdminRouteGuard>
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Add New Product
                        </h1>
                        <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Add a new plant to your inventory with detailed information and care instructions.
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className={`rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Tab Navigation */}
                            <div className="flex space-x-1 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('basic')}
                                    className={tabButtonClass('basic')}
                                >
                                    Basic Info
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('care')}
                                    className={tabButtonClass('care')}
                                >
                                    Care Details
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('additional')}
                                    className={tabButtonClass('additional')}
                                >
                                    Additional
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'basic' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., Monstera Deliciosa"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Scientific Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.scientificName}
                                                onChange={(e) => handleInputChange('scientificName', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., Monstera deliciosa"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Category *
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Indoor Plants">Indoor Plants</option>
                                                <option value="Outdoor Plants">Outdoor Plants</option>
                                                <option value="Succulents">Succulents</option>
                                                <option value="Herbs">Herbs</option>
                                                <option value="Flowers">Flowers</option>
                                                <option value="Trees">Trees</option>
                                                <option value="Tropical">Tropical</option>
                                            </select>
                                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Size
                                            </label>
                                            <select
                                                value={formData.size}
                                                onChange={(e) => handleInputChange('size', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="Small">Small</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Large">Large</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                            Description *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className={inputClass}
                                            rows={3}
                                            placeholder="Describe the plant, its features, and benefits..."
                                        />
                                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                    </div>

                                    {/* Currency Toggle Button */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                            Pricing Information
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={handleCurrencyToggle}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                                                ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                            title={`Switch to ${currency === 'USD' ? 'PHP' : 'USD'} (Rate: 1 USD = ₱${exchangeRate})`}
                                            disabled={isLoadingRate}
                                        >
                                            {isLoadingRate ? (
                                                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                                            ) : (
                                                <>
                                                    <span className="text-lg">
                                                        {currency === 'USD' ? '🇺🇸' : '🇵🇭'}
                                                    </span>
                                                    <span className="font-medium">{currency}</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Exchange Rate Info */}
                                    <div className={`text-xs mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {isLoadingRate ? (
                                            <span className="flex items-center gap-2">
                                                <div className="animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full"></div>
                                                Loading live exchange rate...
                                            </span>
                                        ) : (
                                            <>Current Exchange Rate: 1 USD = ₱{exchangeRate} • Prices are stored in USD in the database</>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Price ({currency}) *
                                            </label>
                                            <div className="relative">
                                                <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {getCurrencySymbol(currency)}
                                                </span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.price}
                                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                                    className={`${inputClass} pl-8`}
                                                    placeholder={currency === 'USD' ? '29.99' : '1,687.44'}
                                                />
                                            </div>
                                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                            {formData.price && (
                                                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    ≈ {getConvertedAmount(formData.price, currency === 'USD' ? 'PHP' : 'USD')}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Original Price ({currency}) {formData.isOnSale ? '*' : '(if on sale)'}
                                            </label>
                                            <div className="relative">
                                                <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {getCurrencySymbol(currency)}
                                                </span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.originalPrice}
                                                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                                                    className={`${inputClass} pl-8`}
                                                    placeholder={currency === 'USD' ? '39.99' : '2,258.35'}
                                                />
                                            </div>
                                            {formData.originalPrice && (
                                                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    ≈ {getConvertedAmount(formData.originalPrice, currency === 'USD' ? 'PHP' : 'USD')}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Stock Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => handleInputChange('stock', e.target.value)}
                                                className={inputClass}
                                                placeholder="50"
                                            />
                                            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id="isPopular"
                                                checked={formData.isPopular}
                                                onChange={(e) => setFormData(prev => ({ ...prev, isPopular: e.target.checked }))}
                                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="isPopular" className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Mark as Popular Product
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id="isOnSale"
                                                checked={formData.isOnSale}
                                                onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
                                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="isOnSale" className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Currently on Sale
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                            Product Image
                                        </label>
                                        <div className="space-y-4">
                                            {/* File Upload */}
                                            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className={`cursor-pointer flex flex-col items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                                                >
                                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <span className="text-sm">
                                                        {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        PNG, JPG, WebP up to 5MB
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Image Preview */}
                                            {imagePreview && (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImageFile(null);
                                                            setImagePreview('');
                                                        }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}

                                            {/* Alternative URL Input */}
                                            <div className="text-center">
                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    Or enter image URL
                                                </span>
                                                <input
                                                    type="url"
                                                    value={formData.image}
                                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="https://example.com/plant-image.jpg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'care' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Care Level *
                                            </label>
                                            <select
                                                value={formData.careLevel}
                                                onChange={(e) => handleInputChange('careLevel', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Care Level</option>
                                                <option value="Easy">Easy</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Difficult">Difficult</option>
                                            </select>
                                            {errors.careLevel && <p className="text-red-500 text-sm mt-1">{errors.careLevel}</p>}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Watering Frequency *
                                            </label>
                                            <select
                                                value={formData.wateringFrequency}
                                                onChange={(e) => handleInputChange('wateringFrequency', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Frequency</option>
                                                <option value="Daily">Daily</option>
                                                <option value="Every 2-3 days">Every 2-3 days</option>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Bi-weekly">Bi-weekly</option>
                                                <option value="Monthly">Monthly</option>
                                            </select>
                                            {errors.wateringFrequency && <p className="text-red-500 text-sm mt-1">{errors.wateringFrequency}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Light Requirement *
                                            </label>
                                            <select
                                                value={formData.lightRequirement}
                                                onChange={(e) => handleInputChange('lightRequirement', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Light Requirement</option>
                                                <option value="Direct sunlight">Direct sunlight</option>
                                                <option value="Bright indirect light">Bright indirect light</option>
                                                <option value="Medium light">Medium light</option>
                                                <option value="Low light">Low light</option>
                                            </select>
                                            {errors.lightRequirement && <p className="text-red-500 text-sm mt-1">{errors.lightRequirement}</p>}
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Humidity Level
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.humidity}
                                                onChange={(e) => handleInputChange('humidity', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., 40-60%"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Temperature Range
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.temperature}
                                                onChange={(e) => handleInputChange('temperature', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., 18-24°C"
                                            />
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Fertilizer
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fertilizer}
                                                onChange={(e) => handleInputChange('fertilizer', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., Monthly during growing season"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'additional' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Repotting Frequency
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.repotting}
                                                onChange={(e) => handleInputChange('repotting', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., Every 2-3 years"
                                            />
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Toxicity
                                            </label>
                                            <select
                                                value={formData.toxicity}
                                                onChange={(e) => handleInputChange('toxicity', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Toxicity</option>
                                                <option value="Non-toxic">Non-toxic</option>
                                                <option value="Mildly toxic">Mildly toxic</option>
                                                <option value="Toxic to pets">Toxic to pets</option>
                                                <option value="Toxic to humans">Toxic to humans</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Growth Rate
                                            </label>
                                            <select
                                                value={formData.growth}
                                                onChange={(e) => handleInputChange('growth', e.target.value)}
                                                className={selectClass}
                                            >
                                                <option value="">Select Growth Rate</option>
                                                <option value="Slow">Slow</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Fast">Fast</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                                Blooming Season
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.bloomingSeason}
                                                onChange={(e) => handleInputChange('bloomingSeason', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g., Spring, Summer"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                                            Special Notes
                                        </label>
                                        <textarea
                                            value={formData.specialNotes}
                                            onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                                            className={inputClass}
                                            rows={4}
                                            placeholder="Any special care instructions, tips, or notes about this plant..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex space-x-3">
                                    {activeTab !== 'basic' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (activeTab === 'care') setActiveTab('basic');
                                                if (activeTab === 'additional') setActiveTab('care');
                                            }}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${theme === 'dark'
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Previous
                                        </button>
                                    )}

                                    {activeTab !== 'additional' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (activeTab === 'basic') setActiveTab('care');
                                                if (activeTab === 'care') setActiveTab('additional');
                                            }}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${theme === 'dark'
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isUploadingImage}
                                    className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isSubmitting || isUploadingImage
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                >
                                    {isUploadingImage ? 'Uploading Image...' : isSubmitting ? 'Adding Product...' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </AdminRouteGuard>
    );
}
