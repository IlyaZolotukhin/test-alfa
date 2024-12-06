import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNewProduct} from "./actions";
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Title} from "./Card";
import {LinkStyled} from "./ ProductDetail";


const CreateProduct = () => {
    const [product, setProduct] = useState({
        id: Date.now(), // простая генерация
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        rating: {
            rate: 0,
            count: 0,
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({...product, [e.target.name]: e.target.value});//сетаю полученный объект
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addNewProduct(product));
        navigate('/'); // после отправки перехожу на главную страницу
    };

    return (
        <FormContainer>
            <Title>Add new product</Title>
            <form onSubmit={handleSubmit}>
                <StyledInput name="title" placeholder="Title" onChange={handleChange} required/>
                <StyledInput name="price" placeholder="Price" type="number" onChange={handleChange} required/>
                <StyledTextarea name="description" placeholder="Description" onChange={handleChange} required/>
                <StyledInput name="image" placeholder="Image URL" onChange={handleChange} required/>
                <StyledInput name="category" placeholder="Category" onChange={handleChange} required/>
                <ButtonBox>
                    <LinkStyled to={'/'}>⇦ Back</LinkStyled><StyledButton type="submit">Create Product</StyledButton>
                </ButtonBox>
            </form>
        </FormContainer>
    );
};

export default CreateProduct;

export const FormContainer = styled.div`
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);`
;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;`
;

export const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;`
;

export const StyledButton = styled.button`
    width: 75%;
    padding: 10px;
    background-color: #6E83F9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2944ea;
    }`
;

export const ButtonBox = styled.div`    
    display: flex;
    justify-content: space-between;
    gap: 12px;`
;