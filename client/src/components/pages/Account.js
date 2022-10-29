import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Account(){
    const cookies = new Cookies();
    const [fio, setFio] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const redirect = useNavigate();

    useEffect(()=>{
        Axios.get("http://localhost:3001/account").then((response)=>{
            // console.log(response.data[0].fio);
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
    });
    
    const exit = () =>{
        if(cookies.get('idUser')){
            cookies.remove('idUser');
            redirect('/');
            window.location.reload();
        } 
    }
    const editProfile = () =>{
        document.getElementById("ab").hidden = true;
        document.getElementById("eai").hidden = false;
    }
    const cancelEditing = () =>{
        document.getElementById("ab").hidden = false;
        document.getElementById("eai").hidden = true;
    }
    return(
        <div className='account__wrap'>
            <div className="account__block" >
                <div className='account__info' id='ab'>
                    <p>{fio}</p>
                    <p>{tel}</p>
                    <p>{email}</p>
                    <button onClick={editProfile}>Редактировать</button>
                    <button onClick={exit}>Выйти</button>
                </div>
                <div className='edit__account__info' id='eai' hidden="true">
                    <input value={fio}></input>
                    <input value={tel}></input>
                    <input value={email}></input>

                    <button onClick={cancelEditing}>Отменить</button>
                </div>
            </div>
            <div className='account__story'>

            </div>
        </div>
    );
}

export default Account;