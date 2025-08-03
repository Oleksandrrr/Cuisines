export interface Restaurant {
  id: string;
  restaurantName: string;
  shortDesc: string;
  currency: string;
  deliveryCost: number;
  rating: number;
  minOrder: number;
  deliveryTime: string;
  speciality?: string;
  imageUrl: string;
  cuisineId?: string;
  isOpen?: boolean;
}

export interface CuisineData {
  open: Restaurant[];
  close: Restaurant[];
}

export interface FetchCuisinesData {
  chinese: CuisineData;
  indian: CuisineData;
  italian: CuisineData;
}

export interface Cuisine {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export interface RestaurantDetail extends Restaurant {
  fullDescription?: string;
  images?: string[];
  menu?: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
    }[];
  }[];
  reviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}
