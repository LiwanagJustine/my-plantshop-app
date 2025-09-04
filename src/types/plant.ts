export interface Plant {
    id: string;
    name: string;
    scientificName: string;
    price: number;
    originalPrice?: number; // For discounted items
    category: string;
    careLevel: 'Easy' | 'Medium' | 'Hard';
    lightRequirement: 'Low' | 'Medium' | 'High';
    waterFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
    size: 'Small' | 'Medium' | 'Large';
    description: string;
    image: string;
    inStock: boolean;
    stockQuantity: number;
    rating: number;
    reviewCount: number;
    features: string[];
    isPopular?: boolean;
    isOnSale?: boolean;
}

export interface PlantFilters {
    category: string[];
    careLevel: string[];
    priceRange: [number, number];
    lightRequirement: string[];
    size: string[];
    inStock: boolean;
    onSale: boolean;
}

export interface CartItem {
    plantId: string;
    quantity: number;
    plant: Plant;
}

export interface Order {
    id: string;
    date: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
    items: CartItem[];
    shippingAddress: string;
    trackingNumber?: string;
}
