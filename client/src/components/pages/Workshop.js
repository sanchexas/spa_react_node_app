import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Workshop() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [adress, setAdress] = useState('');
    const [productImage, setProductImage] = useState('');
    const [price, setPrice] = useState(0);
    const [shortDescription, setShortDescription] = useState('');
    Axios.defaults.withCredentials = true;
    const cookies = new Cookies();

    const submitProduct = () =>{
        axios.post("http://localhost:3001/workshop", {
            title: title,
            description: description,
            adress: adress,
            productImage: productImage,
            price: price,
            shortDescription: shortDescription,
            authorId : cookies.get('idUser'),
        }).then((response)=>{
            console.log(response);
        });
    }

    const addProduct = () =>{
        document.getElementById("ap").hidden = false;
        document.getElementById("btn").hidden = true;
    }
    const cancelAddProduct = () =>{
        document.getElementById("ap").hidden = true;
        document.getElementById("btn").hidden = false;
    }

    if(cookies.get('idUser')){
        return (
        <div className='workshop__wrapper'>
            <div className='create__product'>
                <h2>Заявите о себе сейчас! Предложите свой товар</h2>
                <button onClick={addProduct} id='btn'>Предложить</button>
            </div>
            <form className='add__product' id='ap' hidden="true" action='/workshop' encType="multipart/form-data">
                <input type="text" name="title" onChange={(event)=>{setTitle(event.target.value)}}></input>
                <textarea name="description" onChange={(event)=>{setDescription(event.target.value)}} id="" cols="30" rows="10"></textarea>
                <input type="text" name="adress" onChange={(event)=>{setAdress(event.target.value)}}></input>
                <input type="file" name="productImage" onChange={(event)=>{setProductImage(event.target.files[0].name)}}></input>
                <input type="number" name="price" onChange={(event)=>{setPrice(event.target.value)}}></input>
                <textarea name="shortDescription" onChange={(event)=>{setShortDescription(event.target.value)}} id="" cols="30" rows="10"></textarea>
                <button onClick={submitProduct}>Добавить</button>
                <button onClick={cancelAddProduct} id='cncbtn'>Отмена</button>
            </form>
            <div className='my__products'>
                <a href="" className="product__card">

                </a>
                <a href="" className="product__card">

                </a>
                <a href="" className="product__card">

                </a>
            </div>
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