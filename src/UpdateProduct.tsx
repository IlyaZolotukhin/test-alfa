import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateProduct} from "./actions";
import {useLocation, useNavigate} from 'react-router-dom';
import {Paragraph, Title} from "./Card";
import {ButtonBox, FormContainer, StyledInput, StyledTextarea} from "./CreateProduct";
import {Product} from "./store";
import {LinkStyled} from "./ ProductDetail";
import {StyledButton} from "./Products";

const UpdateProduct = () => {
    const location = useLocation();
    const productFromState = location.state?.product;//получаю переданное при нажатии кнопки handleUpdateClick

    const [product, setProduct] = useState<Product>(productFromState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });//сетаю изменёное
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();//перехватываем вновь введеные данные при нажатии на кнопку
        dispatch(updateProduct(product));//диспачи в экшн и далее в стор
        navigate('/'); // после отправки перехожу на главную страницу
    };

    return (
        <FormContainer>
            <Title>Update product</Title>
            <form onSubmit={handleSubmit}>
                <Paragraph>
                    Title:
                    <StyledInput
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required />
                </Paragraph>
                <Paragraph>
                    Description:
                    <StyledTextarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required />
                </Paragraph>
                <Paragraph>
                    Image:
                    <StyledInput
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required />
                </Paragraph>
                <Paragraph>
                    Category:
                    <StyledInput
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required />
                </Paragraph>
                <ButtonBox>
                    <LinkStyled to={'/'}>⇦ Back</LinkStyled>
                    <StyledButton type="submit">Update Product</StyledButton>
                </ButtonBox>
            </form>
        </FormContainer>
    );
};

export default UpdateProduct;