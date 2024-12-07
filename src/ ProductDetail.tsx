import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import React from "react";

const ProductDetail = () => {
    const title = new URLSearchParams(useLocation().search).get('title') as string;
    const image = new URLSearchParams(useLocation().search).get('url') as string;
    const description = new URLSearchParams(useLocation().search).get('description') as string;

    return (
        <Container>
            <H2>{title}</H2>
            <Img src={image} alt={title}/>
            <p>{description}</p>
            <LinkStyled to={'/'}>⇦ Back</LinkStyled>
        </Container>
    );
};

export default ProductDetail;

const Container = styled.div`
    width: 100%;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;`
;

const H2 = styled.h2`
    width: 300px;
    text-align: center;
    hyphens: auto;`
;
const Img = styled.img`
    width: 300px;`
;

export const LinkStyled = styled(Link)`
            display: flex;
            align-items: center;
            margin: 10px 0;
            padding: 3px 10px;
            text-decoration: none;
            color: white;
            border: none;
            border-radius: 5px;
            background-color: #6E83F9;
            cursor: pointer;

            &:hover {
                background-color: #2944ea;

            }
        ;
    `
;
