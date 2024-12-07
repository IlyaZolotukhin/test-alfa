import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Card, {CardBox, Content, Title} from './Card';
import styled from 'styled-components';
import {AppState, Product} from './store';
import Add from "./assets/add.png";
import {StyledInput} from "./CreateProduct";
import SelectCard from "./SelectCard";

const Products = () => {
    const products: Product[] = useSelector((state: AppState) => state.products);
    const selectProducts: Product[] = useSelector((state: AppState) => state.selectCards);
    const likedProducts: number[] = useSelector((state: AppState) => state.likedProducts);
    const isSelected: number[] = useSelector((state: AppState) => state.isSelected);
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(true);
    const perPage = 4;// Количество продуктов на странице
//открываем все или избранные карточки
    const toggle = () => {
        setOpen(!open);
        setSearchText('');
    }
    console.log()
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);//сетаем полученное состояние
        setCurrentPage(1);// Сбросим на первую страницу при начале поиска
    };
// Фильтруем продуктов по заголовку
    const filterProducts = (productList: Product[]) => {
        return productList.filter(product =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        );
    };
    // Вычисление индексов для пагинации
    const paginateProducts = (productList: Product[]) => {
        const indexOfLastProduct = currentPage * perPage;//последний индекс элемента на выбранной странице
        const indexOfFirstProduct = indexOfLastProduct - perPage;//индекс первого продукта
        //через слайс найдем выбранный продукт при фильтрации чтоб его отрисовать ниже
        return productList.slice(indexOfFirstProduct, indexOfLastProduct);
    };
//назначаем общую переменную для фильтрованных и всех продуктов
    const filteredProducts = filterProducts(products);
    const filteredSelectProducts = filterProducts(selectProducts);
    //выбранные продукты на фильтре
    const currentProducts = paginateProducts(open ? filteredProducts : filteredSelectProducts);
    //количество страниц на выбранном фильтре
    const totalPages = Math.ceil((open ? filteredProducts.length : filteredSelectProducts.length) / perPage);

    return (
        <Box>
            <SearchBar>
                <StyledInput type="text" value={searchText} onChange={handleSearchTextChange}
                             placeholder="Search by title"/>
                <StyledButton onClick={toggle}>{open ? 'избранные карточки' : 'все карточки'}</StyledButton>
            </SearchBar>
            <ContentBox>

                {open && <CardBox to={'/create-product'}>
                    <Image src={Add} alt='add'/>
                    <Content>
                        <Title>Add new product</Title>
                    </Content>
                </CardBox>}
                {currentProducts.map((product: Product) => (
                    open ? (
                        <Card key={product.id} {...product} isSelected={isSelected.includes(product.id)} liked={likedProducts.includes(product.id)}/>
                    ) : (
                        <SelectCard key={product.id} {...product} liked={likedProducts.includes(product.id)}/>
                    )
                ))}
            </ContentBox>
            {totalPages > 1 && (
                <Paginate>
                    {Array.from({length: totalPages}, (_, index) => (
                        <StyledButton
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            $active={currentPage === index + 1}
                        >
                            {index + 1}
                        </StyledButton>
                    ))}
                </Paginate>
            )}
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
const SearchBar = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    gap: 10px;
`
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
    //width: 75%;
    margin: 10px 0;
    padding: 5px;
    background-color: ${props => props.$active ? '#2944ea' : '#6E83F9'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2944ea;
    }`
;
