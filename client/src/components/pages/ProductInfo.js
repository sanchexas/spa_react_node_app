import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';

const ProductInfo = () =>{
    Axios.defaults.withCredentials = true;
    const [searchParams, setSearchParams] = useSearchParams(); //позволяет получить параметр из url строки
    const [productInfo, setProductInfo] = useState();
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [isSent, setIsSent] = useState()
    const cookies = new Cookies();
    const curentId = searchParams.get("id");
    const sendReview = () =>{
        setIsSent(true);
        setTimeout(()=>{
            setIsSent(false);
        },1);
        Axios.post('http://localhost:3001/review', {
            review: reviewText,
            product_id: curentId,
            author_id: cookies.get('idUser')
        }
        );
        document.getElementById('revin').value = '';
    }
    useEffect(()=>{ //получение данных о продукте через GET запрос с ПАРАМЕТРАМИ
        Axios.get(`http://localhost:3001/productinfo/?id=${curentId}`).then((response)=>{
            if(response.data.message){
                setProductInfo(()=>{
                    return(
                        <div className='product__info'>
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
        Axios.get(`http://localhost:3001/showreviews/?id=${curentId}`).then((response)=>{
            if(response.data.message){
                let reviewsArr = response.data.message;
                setReviews(reviewsArr.map((review, i)=>{
                    return(
                        <div key={i} className='review__item'>
                            <span className='review__fio'>{review.fio}</span>
                            <span>{review.review_text}</span>
                        </div>
                    );
                }));
            }
        })
        
    }, [isSent]); 
    return(
        <div className='product__info__wrap'>
            {productInfo}
            <div className='review__block'>
                <div className='review__form'>
                    <input placeholder='оставьте отзыв о товаре' id='revin' onChange={(event)=>setReviewText(event.target.value) } required/>
                    <button className='simple__button' onClick={sendReview}>Отправить</button>
                </div>
                <div className='reviews'>
                    {reviews}
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;