import React from 'react';
import styled from 'styled-components';
import {AppState, Product} from './store';
import {Link, useNavigate} from "react-router-dom";
import activeLike from "./assets/activeLike.png";
import like from "./assets/like.png";
import trashCan from "./assets/delete.png";
import edit from "./assets/edit.png";
import star from "./assets/star.png";
import activeStar from "./assets/activeStar.jpg";
import {addSelectProduct, deleteProduct, removeSelectProduct, toggleLike} from "./actions";
import {useDispatch, useSelector} from "react-redux";

interface CardProps extends Product {
    liked: boolean;
}

const Card =
    ({id, image, title, description, rating, liked, price, category}: CardProps) => {
        const selectProducts: Product[] = useSelector((state: AppState) => state.selectCards);
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const handleLikeClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleLike(id));// диспатчим чтоб добавить лайк
        };

        const handleDeleteClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(deleteProduct(id));// для удаления продукта
        };

        const handleUpdateClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/update-product/${id}`,
                {state: {product: {id, title, rating, description, image, category}}});
        };

        const product = {id, image, price, title, description, rating, liked, category};
        const existingProduct = selectProducts.find(item => item.id === id)

        const handleSelectClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (existingProduct) {
                // Если продукт уже есть, удаляем его
                dispatch(removeSelectProduct(id));
            } else {
                // Если продукта нет, добавляем его
                dispatch(addSelectProduct(product));
            }
        };

        return (
            <>
                <CardBox to={`/products/${id}?title=${title}&url=${image}&description=${description}`}>
                    <ImageContainer>
                        <Image src={image} alt={title}/>
                        <ButtonBox>
                            <StyledIconButton onClick={handleSelectClick}>
                                {existingProduct ? <img src={activeStar} alt="activeStar"/> :
                                    <img src={star} alt="select"/>}
                            </StyledIconButton>
                            <StyledIconButton onClick={handleUpdateClick}><img src={edit}
                                                                               alt="trashCan"/></StyledIconButton>
                            <StyledIconButton onClick={handleLikeClick} $liked={liked}>
                                {liked ? <img src={activeLike} alt="activeLike"/> :
                                    <img src={like} alt="like"/>} {Math.floor(rating.rate)}
                            </StyledIconButton>
                            <StyledIconButton onClick={handleDeleteClick}><img src={trashCan}
                                                                               alt="trashCan"/></StyledIconButton>
                        </ButtonBox>
                    </ImageContainer>
                    <Content>
                        <Title>{title.length > 20 ? `${title.substring(0, 50)}... ` : title}</Title>
                        <Paragraph>
                            {description.length > 100 ? `${description.substring(0, 100)}... ` : description}
                        </Paragraph>
                    </Content>
                </CardBox>
            </>

        );
    };

export default Card;

export const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    color: #000000;
    margin: 0 0 15px;
`

export const CardBox = styled(Link)`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 350px;
    background: #FFFFFF;
    box-shadow: 0 4px 20px 5px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 10px 10px 22px;
`
export const ImageContainer = styled.div`
    position: relative;`
;

export const Image = styled.img`
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 20px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 10px;
`

export const Paragraph = styled.p`
    font-weight: 500;
    font-size: 12px;
    line-height: 1.6;
    color: #ABB3BA;
    margin-bottom: 20px;
    flex-grow: 1;
`

const ButtonBox = styled.div`
    position: absolute;
    bottom: 30px;
    right: 10px;
    display: flex;
    gap: 5px;`
;

export const StyledIconButton = styled.button<{ $liked?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px;
    border: 1px solid white;
    color: ${props => props.$liked ? '#54B854' : '#6E83F9'};
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #54B854;
        color: white;
    }
;
    @media screen and (max-width: 768px) {
        &:hover {
            background-color: transparent;
            color: white;
        }

    ;
    }
`;
