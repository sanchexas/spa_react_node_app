import { useEffect, useState } from 'react';
import '../style.css';

function Cart(){
    const [products, setProducts] = useState();
    const [deleteItem, setDeleteItem] = useState(false)
    const [quantity, setQuantity] = useState();
    useEffect(()=>{
        let arr = JSON.parse(localStorage.getItem("cart"))

        setProducts(arr.map((product, i)=>{
            let getLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
            function deleteItem(key){ //Удаление товара из корзины 
                setDeleteItem(true);
                getLocalStorage.splice(key, 1);
                localStorage.setItem("cart", JSON.stringify(getLocalStorage));
                setTimeout(()=>{
                    setDeleteItem(false);
                },1);
            }

            function plusProduct(key){
                setQuantity(getLocalStorage[key].quantity += 1);
                localStorage.setItem("cart", JSON.stringify(getLocalStorage));
            }

            function minusQuantity(key){
                setQuantity(getLocalStorage[key].quantity -= 1);
                localStorage.setItem("cart", JSON.stringify(getLocalStorage));
            }

            return(
            <div className='cart__item' key={i}>
                <div className='cart__image'>
                    <img src={require(`../../pictures/${product.image}`)} alt="productpic"></img>
                </div>
                <span style={{width:"25%"}}>{product.title}</span>
                <div className='cart__item__quantity'>
                    <button onClick={() => minusQuantity(i)}>-</button>
                    <span style={{fontSize: "20px", paddingLeft: "20px", paddingRight: "20px"}}>{getLocalStorage[i].quantity}</span>
                    <button onClick={() => plusProduct(i)}>+</button>
                </div>
                <div className='cart__item__sum'>
                    <div className='cart__item__delete'>
                        <button onClick={() => deleteItem(i)}>
                            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5446 6.07168C14.846 5.41172 15.4654 5 16.1406 5H22.8594C23.5346 5 24.154 5.41172 24.4554 6.07168L24.8571 6.9375H30.2143C31.202 6.9375 32 7.80332 32 8.875C32 9.94668 31.202 10.8125 30.2143 10.8125H8.78571C7.79799 10.8125 7 9.94668 7 8.875C7 7.80332 7.79799 6.9375 8.78571 6.9375H14.1429L14.5446 6.07168ZM8.78571 12.75H30.2143V32.125C30.2143 34.2623 28.6127 36 26.6429 36H12.3571C10.3873 36 8.78571 34.2623 8.78571 32.125V12.75ZM14.1429 16.625C13.6518 16.625 13.25 17.0609 13.25 17.5938V31.1562C13.25 31.6891 13.6518 32.125 14.1429 32.125C14.6339 32.125 15.0357 31.6891 15.0357 31.1562V17.5938C15.0357 17.0609 14.6339 16.625 14.1429 16.625ZM19.5 16.625C19.0089 16.625 18.6071 17.0609 18.6071 17.5938V31.1562C18.6071 31.6891 19.0089 32.125 19.5 32.125C19.9911 32.125 20.3929 31.6891 20.3929 31.1562V17.5938C20.3929 17.0609 19.9911 16.625 19.5 16.625ZM24.8571 16.625C24.3661 16.625 23.9643 17.0609 23.9643 17.5938V31.1562C23.9643 31.6891 24.3661 32.125 24.8571 32.125C25.3482 32.125 25.75 31.6891 25.75 31.1562V17.5938C25.75 17.0609 25.3482 16.625 24.8571 16.625Z" fill="#DB3939"/>
                            </svg>
                        </button>
                    </div>
                    <span>{product.price} ₽</span>
                </div>
            </div>
            );
        }
    ))
    },[deleteItem, quantity])

    return(
        <div className='cart'>
                    <div className='cart__items'>
                        {products}
                    </div>
                    <div className='cart__order__block'>
                        <div className='cart__order__info'>
                            <span>Общая сумма: 1821 ₽</span>
                            <div className='card__button' >
                                <button style={{opacity: "1", width: "100%", height: "50px", fontWeight: "700", fontSize: "20px", letterSpacing: "1px"}}>заказать</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Cart;