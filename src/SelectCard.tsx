import React from 'react';
import {CardBox, Content, Image, ImageContainer, Paragraph, StyledIconButton, Title} from "./Card";
import activeLike from "./assets/activeLike.png";
import like from "./assets/like.png";
import trashCan from "./assets/delete.png";
import {ButtonBox} from "./CreateProduct";
import {useDispatch} from "react-redux";
import {removeSelectProduct, toggleLike} from "./actions";
import {Product} from "./store";
import {SelectedProductsType} from "./Products";

interface SelectCardsProps extends Product {
    liked: boolean;
    setSelectedProducts: (prev: any) => void;
}

const SelectCard = ({id, image, title, description, rating, liked, setSelectedProducts }: SelectCardsProps) => {
    const dispatch = useDispatch();

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleLike(id));// диспатчим чтоб добавить лайк
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeSelectProduct(id));// для удаления продукта из избранного
        setSelectedProducts((prev: SelectedProductsType) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <CardBox to={`/products/${id}?title=${title}&url=${image}&description=${description}`}>
                <ImageContainer>
                    <Image src={image} alt={title}/>
                    <ButtonBox>
                        <StyledIconButton onClick={handleLikeClick} $liked={liked}>
                            {liked ? <img src={activeLike} alt="activeLike"/> :
                                <img src={like} alt="like"/>} {Math.floor(rating.rate)}
                        </StyledIconButton>
                        <StyledIconButton onClick={handleDeleteClick}>
                            <img src={trashCan} alt="trashCan"/>
                        </StyledIconButton>
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

export default SelectCard;