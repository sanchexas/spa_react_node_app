import { useEffect, useState } from 'react';
import '../style.css';

function Cart(){
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        let arr = JSON.parse(localStorage.getItem("cart"))
        console.log(arr)
        setProducts(arr.map((product)=>{
            return(
                <p style={{display: "flex", flexDirection: "column"}}>
                    <span>{product.title}</span>
                    <span>{product.price}</span>
                    <span>{product.description}</span>
                </p>
            );
        }))
    },[])

    return(
        <div>{products}</div>
    );
}

export default Cart;