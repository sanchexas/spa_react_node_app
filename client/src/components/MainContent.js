import './style.css';
import { Routes, Route} from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import Workshop from './pages/Workshop';
import About from './pages/About';
import ModalWindow from './ModalWindow';
import ModalWindowSignUp from './ModalWindowSignUp';
import Account from './pages/Account';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import { useState } from 'react';
import Head from './Head';

function MainContent(){
    let getLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const [cq, setCq] = useState(getLocalStorage.length);
    const [searchArray, setSearchArray] = useState();
    const handlerQuantity = (q) =>{
        setCq(q)
    }
    const handlerSearch = (searchArray) =>{
        setSearchArray(searchArray);
        console.log(searchArray)
    }

    
    return(
        <div className="main__content">
            <Head cq={cq} searchCB={handlerSearch}/>
            <Routes>
                <Route path='/' index element={<NewsPage cartQuantityCB={handlerQuantity} searchArray={searchArray}/>}></Route>
                <Route path='/workshop' element={<Workshop />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/signin' element={<ModalWindow />}></Route>
                <Route path='/signup' element={<ModalWindowSignUp />}></Route>
                <Route path='/account' element={<Account />}></Route>
                <Route path='/productinfo' element={<ProductInfo />}></Route>
                <Route path='/cart' element={<Cart cartQuantityCB={handlerQuantity}/>}></Route>
            </Routes>
            
        </div>
    );
}

export default MainContent;