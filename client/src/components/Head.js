import './style.css';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import  Axios  from 'axios';


function Head({cq, searchCB}){
    
    Axios.defaults.withCredentials = true;
    const [fio, setFio] = useState('');
    const [searchReq, setSearchReq] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const search = () =>{
            Axios.post('http://localhost:3001/search', {
                search: searchReq
            }).then((response)=>{
                searchCB(response.data.message);
            });
    }
    useEffect(()=>{
            Axios.get('http://localhost:3001/signin').then((response)=>{
                setFio(response.data.message);
            });
        }, []); 
    function shownav(){
        if(showNav == true){
            setShowNav(false)
        }else{
            setShowNav(true);
        }
    }
    function regBlock(){
        const cookies = new Cookies();
        if(!cookies.get('idUser')){
            return(
                <div className='sign__buttons__block'>
                    <Link to="/signin"><button className="fake__button head__signin__button">войти</button></Link>
                    <Link to="/signup"><button>Зарегистрироваться</button></Link>
                    <Link to={'/cart'} className="head__button cart__icon__button">
                        <svg  width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18C4 17.45 4.196 16.979 4.588 16.587C4.97933 16.1957 5.45 16 6 16C6.55 16 7.02067 16.1957 7.412 16.587C7.804 16.979 8 17.45 8 18C8 18.55 7.804 19.021 7.412 19.413C7.02067 19.8043 6.55 20 6 20ZM16 20C15.45 20 14.9793 19.8043 14.588 19.413C14.196 19.021 14 18.55 14 18C14 17.45 14.196 16.979 14.588 16.587C14.9793 16.1957 15.45 16 16 16C16.55 16 17.021 16.1957 17.413 16.587C17.8043 16.979 18 17.45 18 18C18 18.55 17.8043 19.021 17.413 19.413C17.021 19.8043 16.55 20 16 20ZM6 15C5.25 15 4.68333 14.6707 4.3 14.012C3.91667 13.354 3.9 12.7 4.25 12.05L5.6 9.6L2 2H0.975C0.691667 2 0.458333 1.904 0.275 1.712C0.0916666 1.52067 0 1.28333 0 1C0 0.716667 0.096 0.479 0.288 0.287C0.479333 0.0956666 0.716667 0 1 0H2.625C2.80833 0 2.98333 0.0500001 3.15 0.15C3.31667 0.25 3.44167 0.391667 3.525 0.575L4.2 2H18.95C19.4 2 19.7083 2.16667 19.875 2.5C20.0417 2.83333 20.0333 3.18333 19.85 3.55L16.3 9.95C16.1167 10.2833 15.875 10.5417 15.575 10.725C15.275 10.9083 14.9333 11 14.55 11H7.1L6 13H17.025C17.3083 13 17.5417 13.0957 17.725 13.287C17.9083 13.479 18 13.7167 18 14C18 14.2833 17.904 14.5207 17.712 14.712C17.5207 14.904 17.2833 15 17 15H6Z" fill="#424242"/>
                        </svg>
                        <div className='cart__counter'>
                            <span>{cq}</span>
                        </div> 
                    </Link>
                </div>
            ); 
        }
        else{
            return(
                <div className='sign__buttons__block'>
                    <Link to={'/account'}>{fio}</Link>
                    <Link to={'/cart'} className="head__button cart__icon__button">
                        <svg  width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18C4 17.45 4.196 16.979 4.588 16.587C4.97933 16.1957 5.45 16 6 16C6.55 16 7.02067 16.1957 7.412 16.587C7.804 16.979 8 17.45 8 18C8 18.55 7.804 19.021 7.412 19.413C7.02067 19.8043 6.55 20 6 20ZM16 20C15.45 20 14.9793 19.8043 14.588 19.413C14.196 19.021 14 18.55 14 18C14 17.45 14.196 16.979 14.588 16.587C14.9793 16.1957 15.45 16 16 16C16.55 16 17.021 16.1957 17.413 16.587C17.8043 16.979 18 17.45 18 18C18 18.55 17.8043 19.021 17.413 19.413C17.021 19.8043 16.55 20 16 20ZM6 15C5.25 15 4.68333 14.6707 4.3 14.012C3.91667 13.354 3.9 12.7 4.25 12.05L5.6 9.6L2 2H0.975C0.691667 2 0.458333 1.904 0.275 1.712C0.0916666 1.52067 0 1.28333 0 1C0 0.716667 0.096 0.479 0.288 0.287C0.479333 0.0956666 0.716667 0 1 0H2.625C2.80833 0 2.98333 0.0500001 3.15 0.15C3.31667 0.25 3.44167 0.391667 3.525 0.575L4.2 2H18.95C19.4 2 19.7083 2.16667 19.875 2.5C20.0417 2.83333 20.0333 3.18333 19.85 3.55L16.3 9.95C16.1167 10.2833 15.875 10.5417 15.575 10.725C15.275 10.9083 14.9333 11 14.55 11H7.1L6 13H17.025C17.3083 13 17.5417 13.0957 17.725 13.287C17.9083 13.479 18 13.7167 18 14C18 14.2833 17.904 14.5207 17.712 14.712C17.5207 14.904 17.2833 15 17 15H6Z" fill="#424242"/>
                        </svg>
                        <div className='cart__counter'>
                            <span>{cq}</span>
                        </div> 
                    </Link>
                </div>
            );
        }
    }
    return(
        <div className="head">
            <button className="mobile__menu" onClick={()=>shownav()}></button>
                <nav className={(showNav === true) ? "menu active" : "menu"}>
                    <ul className="menu__list">
                        <li><Link to="/" className="nav__link">каталог</Link></li>
                        <li><Link to="/workshop" className="nav__link">мастерская</Link></li>
                        <li><Link to="/about" className="nav__link">о нас</Link></li>
                    </ul>
                </nav>
            <div className='search__form'>
                <input className='search__input' placeholder=' найти' onChange={(event)=>setSearchReq(event.target.value)}></input>
                <button onClick={search}>найти</button>
            </div>
        
        {regBlock()}
        
    </div>
    );
}

export default Head;