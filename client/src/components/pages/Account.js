import '../style.css';
import  Axios  from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';



function Account(){
    const cookies = new Cookies();
    const [fio, setFio] = useState('');

    useEffect(()=>{
        Axios.post("http://localhost:3001/account").then((response)=>{
            console.log(response);
        },[]);
    });
    

    return(
        <div className='account_wrap'>
            <div className='account_block'>

            </div>
            <div className='account_info'>

            </div>
        </div>
    );
}

export default Account;