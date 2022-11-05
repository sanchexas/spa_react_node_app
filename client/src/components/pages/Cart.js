import { useEffect, useState } from 'react';
import '../style.css';

function Cart(){
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        let arr = JSON.parse(localStorage.getItem("cart"))
        console.log(arr)
        setProducts(arr.map((product)=>{
            return(
                <div className='cart__item'>
                    <div className='cart__image'>

                    </div>
                </div>
            );
        }))
    },[])

    return(
        <div className='cart'>
                    <div className='cart__items'>
                        {products}
                    </div>
                    <div className='cart__order__block'>
                        <div className='cart__order__info'>
                            <span>Общая сумма: 2590</span>
                            <div className='card__button' >
                                <button style={{opacity: "1", width: "100%", height: "50px", fontWeight: "700", fontSize: "20px", letterSpacing: "1px"}}>заказать</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Cart;