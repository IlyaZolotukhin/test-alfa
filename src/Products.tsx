import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card, {CardBox, Content, Title} from './Card';
import styled from 'styled-components';
import {AppState, Product} from './store';
import {deleteProduct, toggleLike} from "./actions";
import Add from "./assets/add.png";
import {StyledInput} from "./CreateProduct";

const Products = () => {
    const products: Product[] = useSelector((state: AppState) => state.products);
    const likedProducts: number[] = useSelector((state: AppState) => state.likedProducts);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const perPage = 4; // Количество продуктов на странице

    const onLike = (id: number) => {
        dispatch(toggleLike(id));// диспатчим чтоб добавить лайк
    }

    const Delete = (id: number) => {
        dispatch(deleteProduct(id));// для удаления продукта
    }

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);//сетаем полученное состояние
        setCurrentPage(1); // Сбросим на первую страницу при начале поиска
    };

    // Фильтруем продуктов по заголовку
    const filteredProducts = products.filter((product: Product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Вычисление индексов для пагинации
    const indexOfLastProduct = currentPage * perPage;//последний индекс элемента на выбранной странице
    const indexOfFirstProduct = indexOfLastProduct - perPage;//индекс первого продукта
    //через слайс найдем выбранный продукт при фильтрации чтоб его отрисовать ниже
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Изменения номера страницы при клике
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Общее количество страниц
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    return (
        <Box>
            <ContentBox>
                <StyledInput type="text" value={searchText} onChange={handleSearchTextChange}
                             placeholder="Search by title"/>
                <CardBox to={'/create-product'}>
                    <Image src={Add} alt='add'/>
                    <Content>
                        <Title>Add new product</Title>
                    </Content>
                </CardBox>
                {currentProducts.map((product: Product) => (
                    <Card
                        key={product.id}
                        {...product}
                        liked={likedProducts.includes(product.id)}
                        onToggleLike={() => onLike(product.id)}
                        onDelete={() => Delete(product.id)}
                    />
                ))}
            </ContentBox>
            {totalPages > 1 && <Paginate>
                {Array.from({length: totalPages}, (_, index) => (
                    <StyledButton
                        key={index}
                        onClick={() => paginate(index + 1)}
                        $active={currentPage === index + 1} // передаем активное состояние
                    >
                        {index + 1}
                    </StyledButton>
                ))}
            </Paginate>}
        </Box>

    );
};

export default Products;

const Box = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
;

const ContentBox = styled.div`
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
`;

const Paginate = styled.div`
    display: flex;
    gap: 10px;
margin: 20px;
`;

export const StyledButton = styled.button<{ $active?: boolean }>`
    width: 75%;
    padding: 10px;
    background-color: ${props => props.$active ? '#2944ea' : '#6E83F9'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2944ea;
    }`
;
