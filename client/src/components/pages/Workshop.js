/* eslint-disable jsx-a11y/anchor-is-valid */
import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

function Workshop() {
    Axios.defaults.withCredentials = true;
    const cookies = new Cookies();

    const addProduct = () =>{
        document.getElementById("ap").hidden = false;
        document.getElementById("btn").hidden = true;
    }
    const cancelAddProduct = () =>{
        document.getElementById("ap").hidden = true;
        document.getElementById("btn").hidden = false;
    }

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
            <form className='add__product' id='ap' hidden="true" action='/workshop' encType='multipart/form-data' method='post'>
                <input type="text" name="title"></input>
                <textarea name="description" id="" cols="30" rows="10"></textarea>
                <input type="text" name="adress"></input>
                <input type="file" accept="image/*,.png,.jpg,.jpeg" name="productImage"></input>
                <input type="number" name="price"></input>
                <textarea name="shortDescription" id="" cols="30" rows="10"></textarea>
                <button type='submit' onClick={submitProduct}>Добавить</button>
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