import { useEffect, useState } from 'react';
import Axios from 'axios';
import './style.css';
import {useNavigate} from 'react-router-dom';

// function ModalWindowSignUp({activeSignUp, setActiveSignUp})
function ModalWindowSignUp() {

    const [fio, setFio] = useState('');
    const [email, setEmail] = useState('');
    const [telNum, setTelNum] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const redirect = useNavigate();

    useEffect(()=>{
        Axios.get("http://localhost:3001/signup").then((response)=>{
            console.log(response);
        },[]); //не забывать прописывать [] вторым параметром, так как мы хотим получить
        //массив данных в json формате
    });

    const submitSignUpForm = () =>{
        redirect("/signin");
        Axios.post('http://localhost:3001/signup', {
            fio: fio, 
            email: email, 
            tel: telNum, 
            password: password}
        ).then((response)=> {
            console.log(response);
            
        });
    }
    return(
        // <div className={activeSignUp ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActiveSignUp(false)}></div>
        // <div className='modal__content sign__up__form' onClick={(event) => event.stopPropagation()}>
        <div className='modal__center'>
            <div className='modal__content sign__up__form'>
                <h2>Регистрация</h2>
                <input type="text" name="fio" onChange={(event)=>{setFio(event.target.value)}} placeholder='фио'/>
                <input type="email" placeholder='e-mail' name="email" onChange={(event)=>{setEmail(event.target.value)}}/>
                <input type="tel" placeholder='номер телефона' name="tel" onChange={(event)=>{setTelNum(event.target.value)}}/>
                <input type="password" placeholder='пароль' name="password" onChange={(event)=>{setPassword(event.target.value)}}/>
                <input type="password" placeholder='повторите пароль' name="reppassword" onChange={(event)=>{setRepPassword(event.target.value)}}/>
                <button className='' onClick={submitSignUpForm} type='submit'>зарегистрироваться</button>
            </div>
        </div>
            
    );
}

export default ModalWindowSignUp;