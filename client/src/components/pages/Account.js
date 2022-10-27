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

    return(
        <div className='account_wrap'>
            <div className='account_block'>
                <p>{fio}</p>
                <p>{tel}</p>
                <p>{email}</p>
                <button onClick={exit}>Выйти</button>
            </div>
            <div className='account_info'>

            </div>
        </div>
    );
}

export default Account;