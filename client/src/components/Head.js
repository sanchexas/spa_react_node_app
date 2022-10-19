import './style.css';
// import ModalWindow from './ModalWindow';
// import ModalWindowSignUp from './ModalWindowSignUp';
import {Link} from 'react-router-dom';
// import { useState } from 'react';

function Head(){
    // const [modalActive, setModalActive] = useState();
    // const [modalSignUp, setModalSignUpActive] = useState();
    return(
        <div className="head">
        <button className="head__button">
            <svg className="icon" width="35" height="35"  viewBox="0 0 35 35" fill="" xmlns="http://www.w3.org/2000/svg">
                <path className="button__icon" d="M10.9375 8.50367C10.3573 8.50367 9.80094 8.74063 9.3907 9.16242C8.98047 9.5842 8.75 10.1563 8.75 10.7528C8.75 11.3492 8.98047 11.9213 9.3907 12.3431C9.80094 12.7649 10.3573 13.0018 10.9375 13.0018C11.5177 13.0018 12.0741 12.7649 12.4843 12.3431C12.8945 11.9213 13.125 11.3492 13.125 10.7528C13.125 10.1563 12.8945 9.5842 12.4843 9.16242C12.0741 8.74063 11.5177 8.50367 10.9375 8.50367ZM4.74688 8.50367C5.19882 7.18676 6.03693 6.0464 7.14569 5.23978C8.25444 4.43316 9.57925 4 10.9375 4C12.2957 4 13.6206 4.43316 14.7293 5.23978C15.8381 6.0464 16.6762 7.18676 17.1281 8.50367H32.8125C33.3927 8.50367 33.9491 8.74063 34.3593 9.16242C34.7695 9.5842 35 10.1563 35 10.7528C35 11.3492 34.7695 11.9213 34.3593 12.3431C33.9491 12.7649 33.3927 13.0018 32.8125 13.0018H17.1281C16.6762 14.3187 15.8381 15.4591 14.7293 16.2657C13.6206 17.0723 12.2957 17.5055 10.9375 17.5055C9.57925 17.5055 8.25444 17.0723 7.14569 16.2657C6.03693 15.4591 5.19882 14.3187 4.74688 13.0018H2.1875C1.60734 13.0018 1.05094 12.7649 0.640704 12.3431C0.230469 11.9213 0 11.3492 0 10.7528C0 10.1563 0.230469 9.5842 0.640704 9.16242C1.05094 8.74063 1.60734 8.50367 2.1875 8.50367H4.74688ZM24.0625 21.9982C23.4823 21.9982 22.9259 22.2351 22.5157 22.6569C22.1055 23.0787 21.875 23.6508 21.875 24.2472C21.875 24.8437 22.1055 25.4158 22.5157 25.8376C22.9259 26.2594 23.4823 26.4963 24.0625 26.4963C24.6427 26.4963 25.1991 26.2594 25.6093 25.8376C26.0195 25.4158 26.25 24.8437 26.25 24.2472C26.25 23.6508 26.0195 23.0787 25.6093 22.6569C25.1991 22.2351 24.6427 21.9982 24.0625 21.9982ZM17.8719 21.9982C18.3238 20.6813 19.1619 19.5409 20.2707 18.7343C21.3794 17.9277 22.7043 17.4945 24.0625 17.4945C25.4207 17.4945 26.7456 17.9277 27.8543 18.7343C28.9631 19.5409 29.8012 20.6813 30.2531 21.9982H32.8125C33.3927 21.9982 33.9491 22.2351 34.3593 22.6569C34.7695 23.0787 35 23.6508 35 24.2472C35 24.8437 34.7695 25.4158 34.3593 25.8376C33.9491 26.2594 33.3927 26.4963 32.8125 26.4963H30.2531C29.8012 27.8132 28.9631 28.9536 27.8543 29.7602C26.7456 30.5668 25.4207 31 24.0625 31C22.7043 31 21.3794 30.5668 20.2707 29.7602C19.1619 28.9536 18.3238 27.8132 17.8719 26.4963H2.1875C1.60734 26.4963 1.05094 26.2594 0.640704 25.8376C0.230469 25.4158 0 24.8437 0 24.2472C0 23.6508 0.230469 23.0787 0.640704 22.6569C1.05094 22.2351 1.60734 21.9982 2.1875 21.9982H17.8719Z" fill="#424242"/>
            </svg>
                
        </button>
        <div className='sign__buttons__block'>
            {/* <button onClick={()=> setModalActive(true)} className="fake__button head__signin__button">войти</button> */}
            {/* <ModalWindow active={modalActive} setActive={setModalActive}/> */}
            {/* <button onClick={()=> setModalSignUpActive(true)}>Зарегистрироваться</button> */}
            {/* <ModalWindowSignUp activeSignUp={modalSignUp} setActiveSignUp={setModalSignUpActive}/> */}
            <Link to="/signin"><button className="fake__button head__signin__button">войти</button></Link>
            <Link to="/signup"><button>Зарегистрироваться</button></Link>
        </div>
        
    </div>
    );
}

export default Head;