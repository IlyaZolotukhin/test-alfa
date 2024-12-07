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
    selectCards: Product[];
    isSelected: number[];
}

const initialState: AppState = {
    products: [],
    likedProducts: [],
    selectCards: [],
    isSelected: []
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
            const updatedSelectProducts = state.selectCards.map(product => {
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
            return { ...state, likedProducts: updatedLikes, products: updatedProducts, selectCards:  updatedSelectProducts};

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
        case 'ADD_SELECT_PRODUCT':
            return {
                ...state,
                selectCards: [...state.selectCards, action.payload]
            };
        case 'REMOVE_SELECT_PRODUCT':
            return {
                ...state,
                selectCards: state.selectCards.filter(item => item.id !== action.payload)
            };
        case 'SET_IS_SELECT_PRODUCT':
            const { productId: prodId } = action.payload;
            const isSelected = state.likedProducts.includes(prodId);
            const updatedSelect = isSelected
                ? state.selectCards.filter(id => id !== prodId)
                : [...state.selectCards, prodId];
            return { ...state, isSelected: updatedSelect};
    }
};

const store = createStore(reducer);

export default store;
