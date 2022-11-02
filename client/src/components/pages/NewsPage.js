/* eslint-disable jsx-a11y/anchor-is-valid */
import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

function NewsPage(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:3001/newspage').then((response)=>{
            if(response.data.message){
                let resArray = response.data.message;
                console.log(resArray);
                
                setProducts(resArray.map((product) => {  
                    return (
                        <a href="" className="product__card" key={product.id_product}>
                            <span>{product.title}</span>
                            <span>{product.price}</span>
                            <img src={require(`../../pictures/${product.image}`)} alt="productpic"></img>
                        </a>
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