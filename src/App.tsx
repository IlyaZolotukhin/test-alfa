import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import Products from './Products';
import CreateProduct from './CreateProduct';
import {setProducts} from './actions'; // Create this action
import ProductDetail from "./ ProductDetail";
import UpdateProduct from "./UpdateProduct";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => dispatch(setProducts(json)));
    }, [dispatch]);

    return (
        <Routes>
            <Route element={<Products/>} path={'/'}/>
            <Route element={<CreateProduct/>} path={'/create-product'}/>
            <Route element={<UpdateProduct/>} path={'/update-product/:id'}/>
            <Route element={<ProductDetail/>} path={'/products/:id'}/>
        </Routes>
    );
}

export default App;
