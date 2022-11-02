/* eslint-disable jsx-a11y/anchor-is-valid */
import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

function Workshop() {
    Axios.defaults.withCredentials = true;
    const cookies = new Cookies();
    const [products, setProducts] = useState([]);

    const addProduct = () =>{
        document.getElementById("ap").hidden = false;
        document.getElementById("btn").hidden = true;
    };
    const cancelAddProduct = () =>{
        document.getElementById("ap").hidden = true;
        document.getElementById("btn").hidden = false;
    };

    useEffect(()=>{
        Axios.get('http://localhost:3001/workshop').then((response)=>{
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

    const submitProduct = () =>{
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            Axios.post("http://localhost:3001/workshop", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
            console.log(res);
            window.location.reload();
            })
            .catch((err) => {
            console.log(err);
            });
        });
    };

    if(cookies.get('idUser')){
        return (
        <div className='workshop__wrapper'>
            <div className='create__product'>
                <h2>Заявите о себе сейчас! Предложите свой товар</h2>
                <button onClick={addProduct} id='btn'>Предложить</button>
            </div>
            <div id='ap' hidden="true">
                <form className='add__product'  action='/workshop' encType='multipart/form-data' method='post'>
                    <input type="text" name="title"></input>
                    <textarea name="description" id="" cols="30" rows="10"></textarea>
                    <input type="text" name="adress"></input>
                    <input type="file" accept="image/*,.png,.jpg,.jpeg" name="productImage"></input>
                    <input type="number" name="price"></input>
                    <textarea name="shortDescription" id="" cols="30" rows="10"></textarea>
                    <button type='submit' onClick={submitProduct}>Добавить</button>
                </form>
                <button onClick={cancelAddProduct} id='cncbtn'>Отмена</button>
            </div>
            
            
            <div className='my__products'>
                {products}
                
            </div>
            <script>
                
            </script>
        </div>
        
        );
    }else{
        return(
            <div className='create__product'>
                <h2>Заявите о себе сейчас! Предложите свой товар</h2>
                <h2>Но для этого вам нужно <Link to="/signin">авторизироваться</Link></h2>
            </div>
        );
    }
    
}

export default Workshop;