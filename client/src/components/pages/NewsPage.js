/* eslint-disable jsx-a11y/anchor-is-valid */
import '../style.css';
import  Axios  from 'axios';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

function NewsPage(){
    const [products, setProducts] = useState([]);
    // const [generalPrice, setGeneralPrice] = useState();
    
    useEffect(()=>{
        if(!localStorage.getItem("general_price")){
            localStorage.setItem("general_price", 0);
        }   
        Axios.get('http://localhost:3001/newspage').then((response)=>{
            if(response.data.message){
                let resArray = response.data.message;

                setProducts(resArray.map((product, i) => {  //ВЫВОДИМ ВСЕ ТОВАРЫ ИЗ response
                    

                    const addToCart = () =>{ // ДОБАВЛЯЕМ В КОРЗИНУ
                        let getLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
                        let getLocalStorageGeneralPrice = JSON.parse(localStorage.getItem("general_price"))
                        console.log(getLocalStorageGeneralPrice)
                        product.quantity = 1;
                        product.fullPrice = product.price;
                        let generalPrice = getLocalStorageGeneralPrice + product.price
                        getLocalStorage.push(product)
                        let arrJSON = JSON.stringify(getLocalStorage)
                        localStorage.setItem("general_price", generalPrice)
                        localStorage.setItem("cart", arrJSON);

                    }


                    return (
                        <div className='product__card' key={i}>
                            <Link to={`/productinfo?id=${product.id_product}`} className="product__card__link" key={product.id_product}>
                                <div className="product__card__picture">
                                    <img src={require(`../../pictures/${product.image}`)} alt="productpic"></img>
                                </div>
                                <div className='product__card__info'>
                                    <div><span className='product__card__price'>{product.price}</span><span style={{color: 'black',}}> ₽</span></div>
                                    <span>{product.title}</span>
                                    <span>{product.short_description}</span>
                                    
                                </div>
                            </Link>
                            <div className='card__button'>
                                <button onClick={addToCart} >В корзину</button>
                            </div>
                        </div>
                        
                    );
                }));
            }
        });
    }, []);

    return(
    // <h1 className="page__title">Новинки</h1>
    <div className="main__products">
        {products}
    </div>);
}

export default NewsPage;