import React from 'react';
import styled from 'styled-components';
import {Product} from './store';
import {Link} from "react-router-dom";
import activeLike from "./assets/activeLike.png";
import like from "./assets/like.png";
import trashCan from "./assets/delete.png";

interface CardProps extends Product {
    liked: boolean;
    onToggleLike: () => void;
    onDelete: () => void;
}

const Card = ({id, image, title, description, rating, liked, onToggleLike, onDelete}: CardProps) => {
    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleLike();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete();
    };

    return (
        <>

            <CardBox to={`/products/${id}?title=${title}&url=${image}&description=${description}`}>
                <ImageContainer>
                    <Image src={image} alt={title}/>
                    <ButtonBox>
                        <LikeButton onClick={handleLikeClick} $liked={liked}>
                            {liked ? <img src={activeLike} alt="activeLike"/> :
                                <img src={like} alt="like"/>} {Math.floor(rating.rate)}
                        </LikeButton>
                        <DeleteButton onClick={handleDeleteClick}><img src={trashCan} alt="trashCan"/>️</DeleteButton>
                    </ButtonBox>
                </ImageContainer>
                <Content>
                    <Title>{title.length > 50 ? `${title.substring(0, 50)}... ` : title}</Title>
                    <Paragraph>{description.length > 100 ? `${description.substring(0, 100)}... ` : description}</Paragraph>
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
const ImageContainer = styled.div`
    position: relative;`
;

const Image = styled.img`
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
    gap: 12px;`
;

const LikeButton = styled.button<{ $liked: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px;
    border: 1px solid white;
    color: ${props => props.$liked ? '#54B854' : '#6E83F9'};
    border-radius: 10px;
    &:hover {
        background-color: #54B854;
        cursor: pointer;
        color: white;
    }
;
`;

const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    padding: 2px;
    border: 1px solid #3a3939;
    border-radius: 10px;
    &:hover {
        background-color: #54B854;
        cursor: pointer;
        color: white;
    }
;
`;