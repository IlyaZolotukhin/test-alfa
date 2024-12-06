import {Product} from './store';

export const setProducts = (products: Product[]) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});

export const deleteProduct = (id: number) => ({
    type: 'DELETE_PRODUCT',
    payload: id
});

export const toggleLike = (id: number) => ({
    type: 'TOGGLE_LIKE',
    payload: {productId: id}
});

export const addNewProduct = (product: Product) => ({
    type: 'ADD_PRODUCT',
    payload: product
});

export const updateProduct = (product: Product) => ({
    type: 'UPDATE_PRODUCT',
    payload: product
});