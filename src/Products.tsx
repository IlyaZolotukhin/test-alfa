import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card, {CardBox, Content, Title} from './Card';
import styled from 'styled-components';
import {Product} from './store';
import {deleteProduct, toggleLike} from "./actions";
import Add from "./assets/add.png";

const Products = () => {
    const products = useSelector((state: any) => state.products);
    const likedProducts = useSelector((state: any) => state.likedProducts);
    const dispatch = useDispatch();

    const onLike = (id: number) => {
        dispatch(toggleLike(id))
    }

    const Delete = (id: number) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Box>
            <CardBox to={'/create-product'}>
                <Image src={Add} alt='add'/>
                <Content>
                    <Title>Add new product</Title>
                </Content>
            </CardBox>
            {products.map((product: Product) => (
                <Card
                    key={product.id}
                    {...product}
                    liked={likedProducts.includes(product.id)}
                    onToggleLike={() => onLike(product.id)}
                    onDelete={() => Delete(product.id)}
                />
            ))}
        </Box>
    );
};

export default Products;

const Box = styled.div`
    //margin: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 575px) {
        justify-content: center;
    }`
;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 20px;
`
