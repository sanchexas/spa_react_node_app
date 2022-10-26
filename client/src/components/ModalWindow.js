import  Axios  from 'axios';
import { useState } from 'react';
import './style.css';
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';

// function ModalWindow({active, setActive})
function ModalWindow() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const redirect = useNavigate();
    const cookies = new Cookies();

    Axios.defaults.withCredentials = true;

    // useEffect(()=>{
    //     Axios.get('http://localhost:3001/signin').then((response)=>{
    //         console.log(response.data)
    //         if(response.data.signin === true){
    //             setLogin(response.data.user[0].fio);
    //         }
    //         if(response.data.message){
    //             setLogin(response.data.message);
    //         }
    //     });
    // }, []);

    const submitSignInForm = () => {
        Axios.post('http://localhost:3001/signin', {
            email: email, 
            password: password}
        ).then((response)=>{
            //cookies.set('user', response.data.message, { path: '/' });
            console.log(cookies.get('id'));
            // setLogin(response.data.message);
            window.location.reload();
        });
        redirect("/")
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
                <span>{login}</span>
            </div>
        </div>
    );
}

export default ModalWindow;

