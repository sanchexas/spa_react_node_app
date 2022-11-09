import '../style.css';
import  Axios  from 'axios';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

function NewsPage(){
    const [products, setProducts] = useState([]);
    let [cartProductsId, setCartProductsId] = useState([]);
    const [inCart, setInCart] = useState(false);
    useEffect(()=>{
        Axios.get('http://localhost:3001/newspage').then((response)=>{
            let getLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
            
            if(response.data.message){
                let resArray = response.data.message;
                if(!localStorage.getItem("general_price")){
                    localStorage.setItem("general_price", 0);
                }  

                function getArrayOfIdFromCart(){
                    let arrOfLocalStorage = Object.entries(getLocalStorage); //преобразование cart в массив и его перебор с получением id продуктов, которые лежат в корзине
                    arrOfLocalStorage.map((element)=>{
                        let arr = cartProductsId.push(element[1].id_product)
                        setCartProductsId(cartProductsId.concat(arr));
                    });
                }
                
                getArrayOfIdFromCart();

                setProducts(resArray.map((product, i) => {  //ВЫВОДИМ ВСЕ ТОВАРЫ ИЗ response
                        cartProductsId.map((cp)=>{
                            if(product.id_product === cp){
                                setInCart(true);
                                product.inCart = inCart; // присваивание стиля кнопкам товаров, которые лежат в корзине
                                setTimeout(()=>{
                                    setInCart(false);
                                },1)
                            }
                        })
                    function addToCart (key) { // ДОБАВЛЯЕМ В КОРЗИНУ
                        let getLocalStorageGeneralPrice = JSON.parse(localStorage.getItem("general_price"));
                        product.quantity = 1;
                        
                        product.fullPrice = product.price;
                        let generalPrice = getLocalStorageGeneralPrice + product.price;
                        getLocalStorage.push(product);
                        let arrJSON = JSON.stringify(getLocalStorage);
                        localStorage.setItem("general_price", generalPrice);
                        localStorage.setItem("cart", arrJSON);
                        setInCart(true); // Присвоить кнопке "в корзине"
                        setTimeout(()=>{
                            setInCart(false);
                        },1);
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
                                <button  className={(product.inCart === inCart) ? "lock__button" : ""} onClick={()=>addToCart(i)} >В корзину </button>
                            </div>
                        </div>
                        
                    );
                }));
            }
        });
    }, [inCart]);

    return(
    // <h1 className="page__title">Новинки</h1>
    <div className="main__products">
        {products}
    </div>);
}

export default NewsPage;