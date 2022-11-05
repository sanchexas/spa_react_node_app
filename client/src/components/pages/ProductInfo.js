import '../style.css';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';

const ProductInfo = () =>{
    Axios.defaults.withCredentials = true;
    const [searchParams, setSearchParams] = useSearchParams(); //позволяет получить параметр из url строки
    const [productInfo, setProductInfo] = useState();
    const curentId = searchParams.get("id")
    useEffect(()=>{ //получение данных о продукте через GET запрос с ПАРАМЕТРАМИ
        Axios.get(`http://localhost:3001/productinfo/?id=${curentId}`).then((response)=>{
            if(response.data.message){
                setProductInfo(()=>{
                    return(
                        <div>
                            <h1>{response.data.message[0].title}</h1>
                            <img style={{width: "500px"}} src={require(`../../pictures/${response.data.message[0].image}`)} alt='productpic'></img>
                            <p>{response.data.message[0].description}</p>
                            <p>{response.data.message[0].adress}</p>
                            <p>{response.data.message[0].price} руб</p>
                        </div>
                    );
                });
                
            }
        });
    }, []); 
    return(
        <div>
            {productInfo}
        </div>
    );
}

export default ProductInfo;