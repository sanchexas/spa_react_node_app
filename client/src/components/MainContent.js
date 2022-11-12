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

function MainContent(){
    return(
        <div className="main__content">
            <Routes>
                <Route path='/' index element={<NewsPage />}></Route>
                <Route path='/workshop' element={<Workshop />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/signin' element={<ModalWindow />}></Route>
                <Route path='/signup' element={<ModalWindowSignUp />}></Route>
                <Route path='/account' element={<Account />}></Route>
                <Route path='/productinfo' element={<ProductInfo />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
            </Routes>
            
        </div>
    );
}

export default MainContent;