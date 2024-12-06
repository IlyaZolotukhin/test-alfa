import { createStore } from 'redux';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export interface AppState {
    products: Product[];
    likedProducts: number[];
}

const initialState: AppState = {
    products: [],
    likedProducts: [],
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'TOGGLE_LIKE':
            const { productId } = action.payload;
            const isLiked = state.likedProducts.includes(productId);
            const updatedLikes = isLiked
                ? state.likedProducts.filter(id => id !== productId)
                : [...state.likedProducts, productId];

            const updatedProducts = state.products.map(product => {
                if (product.id === productId) {
                    const newRate = isLiked ? product.rating.rate - 1 : product.rating.rate + 1;
                    return {
                        ...product,
                        rating: {
                            ...product.rating,
                            rate: newRate,
                        },
                    };
                }
                return product;
            });

            return { ...state, likedProducts: updatedLikes, products: updatedProducts };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        case 'ADD_PRODUCT':
            return { ...state, products: [action.payload,...state.products ] };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
