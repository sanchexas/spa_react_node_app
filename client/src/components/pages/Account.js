import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Account(){
    const cookies = new Cookies();
    const [fio, setFio] = useState('sdsdsd');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState('');
    const redirect = useNavigate();

    Axios.defaults.withCredentials = true;

     useEffect(()=>{
        Axios.get('http://localhost:3001/account').then((response)=>{
            if(cookies.get('idUser')){
                setFio(response.data[0].fio);
                setTel(response.data[0].tel);
                setEmail(response.data[0].email);
                
            }else{
                setFio('');
                setTel('');
                setEmail('');
            }
            
        },[]);
        Axios.get('http://localhost:3001/getorder').then((response)=>{
            let resArray = response.data;
            setOrders(resArray.map((order, i)=>{
                let orderStr = order.products;
                let changedStr = orderStr
                    .replace(/idproduct:/gi, " ID товара: ")
                    .replace(/title:/gi, "")
                    .replace(/quantity:/gi, " кол-во: ")
                    .replace(/fullPrice:/gi, " цена: ")
                    .replace(/},/gi, "}");
                let productsStrArr = changedStr.split('}');
                console.log(productsStrArr)
                productsStrArr.map((element, i) =>{
                    console.log(element)
                })
                return(
                    <div className='orderInfo' key={i}>
                        <p>Номер заказа: {order.id_order}</p>
                        <p>{changedStr}</p>
                        <p>Итого: {order.general_price} руб.</p>
                        <p>Дата покупки: {order.date}</p>
                    </div>
                );
            }));
        });
     },[]);
    
    const exit = () =>{
        if(cookies.get('idUser')){
            cookies.remove('idUser');
            redirect('/');
            window.location.reload();
        } 
    }
    const changeProfile = () =>{
        Axios.post('http://localhost:3001/account/change', {
            fio: fio,
            tel: tel,
            email: email,
        }).then((response)=>{
            if(response.data.message){
                window.location.reload();  
            }
        });
    }
    const editProfile = () =>{
        document.getElementById("ab").hidden = true;
        document.getElementById("eai").hidden = false;
    }
    const cancelEditing = () =>{
        document.getElementById("ab").hidden = false;
        document.getElementById("eai").hidden = true;
        window.location.reload();
    }
    return(
        <div className='account__wrap'>
            <div className="account__block" >
                <div className='account__info' id='ab'>
                    <p>{fio}</p>
                    <p>{tel}</p>
                    <p>{email}</p>
                    <div className='buttons__between'>
                        <button className='simple__button' onClick={editProfile}>Редактировать</button>
                        <button className='exit__button' onClick={exit}>Выйти</button>
                    </div>
                    
                </div>
                <div className='edit__account__info' id='eai' hidden>
                    <input type="text" value={fio} onChange={(event)=>{setFio(event.target.value)}}/>
                    <input type="text"value={tel} onChange={(event)=>{setTel(event.target.value)}}></input>
                    <input type="text"value={email} onChange={(event)=>{setEmail(event.target.value)}}></input>
                    <button onClick={changeProfile}>Изменить</button>
                    <button onClick={cancelEditing}>Отменить</button>
                </div>
            </div>
            <div className='account__story'>
                <h2>чеки и заказы: </h2>
                <div className='account__story__goods'>
                    {orders}
                </div>
            </div>
        </div>
    );
}

export default Account;