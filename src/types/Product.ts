export interface Product {
    _id: string;
    model: string;
    generation: string;
    storage: number;
    color: string;
    images: string[];
    warranty: string;
    availability: 'in_stock' | 'out_of_stock';
    condition: 'excellent' | 'good' | 'fair';
    batteryHealth: number;
    price: number
}