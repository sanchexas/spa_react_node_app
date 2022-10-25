import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import './style.css';

// function ModalWindow({active, setActive})
function ModalWindow() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        Axios.get('http://localhost:3001/signin').then((response)=>{
            if(response.data.signin == true){
                setLogin(response.data.user[0].fio);
            }
            
        });
    }, []);

    const submitSignInForm = () => {
        Axios.post('http://localhost:3001/signin', {
            email: email, 
            password: password}
        ).then((response)=>{
            console.log(response.data);
        })
    }
    return(
        // <div className={active ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActive(false)}></div>
        // <div className='modal__content' onClick={(event) => event.stopPropagation()}>
        <div className='modal__center'>
           <div className='modal__content'>
                <h2>Вход</h2>
                <input type="email" placeholder='e-mail' name='email' onChange={(event)=>setEmail(event.target.value)}/>
                <input type="password" placeholder='пароль' name='password' onChange={(event)=>setPassword(event.target.value)}/>
                <button onClick={submitSignInForm} className='' type='submit'>войти</button>
                <h2>{login}</h2>
            </div>
        </div>
    );
}

export default ModalWindow;

